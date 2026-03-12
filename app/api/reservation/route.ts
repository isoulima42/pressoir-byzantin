import { NextRequest, NextResponse } from "next/server";
import { reservationSchema, DEFAULT_SETTINGS } from "@/lib/reservation-schema";
import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = reservationSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Données invalides" },
        { status: 400 }
      );
    }

    const { date, time, guests, name, email, phone, specialRequests } =
      parsed.data;

    // Fetch settings
    const settings = await client
      .fetch(
        `*[_type == "reservationSettings"][0] {
          maxGuestsPerSlot, slotDuration, serviceHours, closedDays,
          advanceBookingDays, minAdvanceHours
        }`
      )
      .catch(() => null);

    const config = settings ?? DEFAULT_SETTINGS;

    // Check closed days
    const dateObj = new Date(date + "T00:00:00");
    const dayOfWeek = dateObj.getDay();
    if (config.closedDays?.includes(dayOfWeek)) {
      return NextResponse.json(
        { error: "Le restaurant est fermé ce jour-là." },
        { status: 400 }
      );
    }

    // Check date is not in the past
    const now = new Date();
    if (dateObj < new Date(now.toDateString())) {
      return NextResponse.json(
        { error: "La date sélectionnée est passée." },
        { status: 400 }
      );
    }

    // Check availability: count existing guests for this time slot
    const existingReservations = await client.fetch(
      `*[_type == "reservation" && date == $date && time == $time && status != "cancelled"] {
        guests
      }`,
      { date, time }
    );

    const totalGuests = (existingReservations ?? []).reduce(
      (sum: number, r: { guests: number }) => sum + r.guests,
      0
    );

    const maxGuests = config.maxGuestsPerSlot ?? DEFAULT_SETTINGS.maxGuestsPerSlot;

    if (totalGuests + guests > maxGuests) {
      return NextResponse.json(
        {
          error: `Ce créneau est complet. Il reste ${Math.max(0, maxGuests - totalGuests)} place(s) disponible(s).`,
        },
        { status: 409 }
      );
    }

    // Generate confirmation ID
    const confirmationId = `PB-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Save to Sanity
    await writeClient.create({
      _type: "reservation",
      name,
      email,
      phone,
      date,
      time,
      guests,
      specialRequests: specialRequests || undefined,
      status: "pending",
      confirmationId,
    });

    // Send confirmation email to customer
    await sendConfirmationEmail({
      name,
      email,
      date,
      time,
      guests,
      confirmationId,
    });

    // Send notification to restaurant
    await sendRestaurantNotification({
      name,
      email,
      phone,
      date,
      time,
      guests,
      specialRequests,
      confirmationId,
    });

    return NextResponse.json({ success: true, confirmationId });
  } catch (error) {
    console.error("Reservation error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}

/* ── Email helpers ─────────────────────────────────────── */

async function sendConfirmationEmail(data: {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  confirmationId: string;
}) {
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const dateFormatted = new Date(data.date + "T00:00:00").toLocaleDateString(
      "fr-CH",
      { weekday: "long", day: "numeric", month: "long", year: "numeric" }
    );

    await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ??
        "Le Pressoir Byzantin <onboarding@resend.dev>",
      to: data.email,
      subject: `Votre demande de réservation — ${data.confirmationId}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0b1214; color: #fffcec; padding: 40px 24px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #fb8f2c; font-size: 24px; margin: 0;">Le Pressoir Byzantin</h1>
            <p style="color: #fffcec99; font-size: 14px;">Demande de réservation</p>
          </div>

          <p>Bonjour ${escapeHtml(data.name)},</p>
          <p>Votre demande a bien été enregistrée. Voici les détails :</p>

          <div style="background: #0e1c21; padding: 20px; border-radius: 4px; margin: 24px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #fffcec80;">Date</td>
                <td style="padding: 8px 0; text-align: right;">${dateFormatted}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #fffcec80;">Heure</td>
                <td style="padding: 8px 0; text-align: right;">${data.time}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #fffcec80;">Personnes</td>
                <td style="padding: 8px 0; text-align: right;">${data.guests}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #fffcec80;">Référence</td>
                <td style="padding: 8px 0; text-align: right; color: #fb8f2c; font-weight: bold;">${data.confirmationId}</td>
              </tr>
            </table>
          </div>

          <p style="color: #fffcec80; font-size: 14px;">
            Pour toute modification, contactez-nous au
            <a href="tel:+41796594152" style="color: #fb8f2c;">079 659 41 52</a>
            en mentionnant votre référence.
          </p>

          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #333; text-align: center;">
            <p style="color: #fffcec40; font-size: 12px;">
              Le Pressoir Byzantin — Grand Rue 29, 1844 Villeneuve
            </p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Failed to send confirmation email:", err);
  }
}

async function sendRestaurantNotification(data: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  confirmationId: string;
}) {
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const recipientEmail =
      process.env.CONTACT_EMAIL ?? "info@lepressoirbyzantin.ch";

    const dateFormatted = new Date(data.date + "T00:00:00").toLocaleDateString(
      "fr-CH",
      { weekday: "long", day: "numeric", month: "long", year: "numeric" }
    );

    await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ??
        "Le Pressoir Byzantin <onboarding@resend.dev>",
      to: recipientEmail,
      replyTo: data.email,
      subject: `[Réservation] ${data.name} — ${dateFormatted} à ${data.time} (${data.guests} pers.)`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #fb8f2c;">Nouvelle réservation</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #888;">Référence</td><td style="padding: 6px 0; font-weight: bold;">${data.confirmationId}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Nom</td><td style="padding: 6px 0;">${escapeHtml(data.name)}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Date</td><td style="padding: 6px 0;">${dateFormatted}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Heure</td><td style="padding: 6px 0;">${data.time}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Personnes</td><td style="padding: 6px 0;">${data.guests}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Téléphone</td><td style="padding: 6px 0;"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td></tr>
          </table>
          ${data.specialRequests ? `<div style="margin-top: 16px; padding: 12px; background: #f9f9f9; border-radius: 4px;"><strong>Demandes spéciales :</strong><p style="margin: 4px 0 0;">${escapeHtml(data.specialRequests)}</p></div>` : ""}
        </div>
      `,
    });
  } catch (err) {
    console.error("Failed to send restaurant notification:", err);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
