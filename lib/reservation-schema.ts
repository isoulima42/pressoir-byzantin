import { z } from "zod";

export const reservationSchema = z.object({
  date: z
    .string()
    .min(1, "Veuillez sélectionner une date"),
  time: z
    .string()
    .min(1, "Veuillez sélectionner un créneau"),
  guests: z
    .number({ message: "Veuillez indiquer le nombre de personnes" })
    .min(1, "Minimum 1 personne")
    .max(20, "Maximum 20 personnes — contactez-nous pour les groupes"),
  name: z
    .string()
    .min(2, "Nom trop court")
    .max(100, "Nom trop long"),
  email: z
    .string()
    .email("Adresse email invalide"),
  phone: z
    .string()
    .min(6, "Numéro de téléphone invalide")
    .max(20, "Numéro de téléphone trop long"),
  specialRequests: z
    .string()
    .max(500, "Maximum 500 caractères"),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;

/* ── Default settings (used when Sanity has no data) ── */

export const DEFAULT_SETTINGS = {
  maxGuestsPerSlot: 30,
  slotDuration: 30,
  serviceHours: [
    { label: "Midi", startTime: "11:30", endTime: "14:00" },
    { label: "Soir", startTime: "18:00", endTime: "22:00" },
  ],
  closedDays: [] as number[],
  advanceBookingDays: 30,
  minAdvanceHours: 2,
};

export type ReservationSettings = typeof DEFAULT_SETTINGS;

/* ── Time slot generation ─────────────────────────────── */

export function generateTimeSlots(
  serviceHours: { label: string; startTime: string; endTime: string }[],
  slotDuration: number,
): { label: string; value: string; service: string }[] {
  const slots: { label: string; value: string; service: string }[] = [];

  for (const service of serviceHours) {
    const [startH, startM] = service.startTime.split(":").map(Number);
    const [endH, endM] = service.endTime.split(":").map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    for (let m = startMinutes; m < endMinutes; m += slotDuration) {
      const h = Math.floor(m / 60);
      const min = m % 60;
      const value = `${h.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
      slots.push({
        label: value,
        value,
        service: service.label,
      });
    }
  }

  return slots;
}
