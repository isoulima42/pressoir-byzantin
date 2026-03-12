import { NextRequest, NextResponse } from "next/server";

// Lazy-init to avoid build-time crash when RESEND_API_KEY is not set
let _resend: import("resend").Resend | null = null;
function getResend() {
  if (!_resend) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Resend } = require("resend") as typeof import("resend");
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const SUBJECTS: Record<string, string> = {
  reservation: "Réservation",
  information: "Demande d'information",
  evenement: "Événement / Traiteur",
  autre: "Autre demande",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Nom invalide" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message trop court (min. 10 caractères)" },
        { status: 400 }
      );
    }
    if (!subject || !SUBJECTS[subject]) {
      return NextResponse.json({ error: "Sujet invalide" }, { status: 400 });
    }

    const subjectLabel = SUBJECTS[subject];
    const recipientEmail =
      process.env.CONTACT_EMAIL ?? "info@lepressoirbyzantin.ch";

    await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Le Pressoir Byzantin <onboarding@resend.dev>",
      to: recipientEmail,
      replyTo: email,
      subject: `[Site Web] ${subjectLabel} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #fb8f2c; border-bottom: 1px solid #eee; padding-bottom: 12px;">
            ${subjectLabel}
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #888; width: 100px;">Nom</td>
              <td style="padding: 8px 0;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
            </tr>
            ${
              phone
                ? `<tr>
              <td style="padding: 8px 0; color: #888;">Téléphone</td>
              <td style="padding: 8px 0;"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td>
            </tr>`
                : ""
            }
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f9f9f9; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #aaa;">
            Envoyé depuis le formulaire de contact du site lepressoirbyzantin.ch
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
