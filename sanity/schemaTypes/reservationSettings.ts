import { defineField, defineType } from "sanity";

export default defineType({
  name: "reservationSettings",
  title: "Paramètres de réservation",
  type: "document",
  icon: () => "⚙️",
  fields: [
    defineField({
      name: "maxGuestsPerSlot",
      title: "Capacité max par créneau",
      description: "Nombre maximum de couverts par créneau horaire",
      type: "number",
      initialValue: 30,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "slotDuration",
      title: "Durée d'un créneau (minutes)",
      type: "number",
      initialValue: 30,
      validation: (Rule) => Rule.required().min(15).max(120),
    }),
    defineField({
      name: "serviceHours",
      title: "Créneaux de service",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Nom du service",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "startTime",
              title: "Début",
              description: "Format HH:mm (ex: 11:30)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "endTime",
              title: "Fin",
              description: "Format HH:mm (ex: 14:00)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { label: "label", start: "startTime", end: "endTime" },
            prepare: ({ label, start, end }) => ({
              title: label,
              subtitle: `${start} – ${end}`,
            }),
          },
        },
      ],
    }),
    defineField({
      name: "closedDays",
      title: "Jours de fermeture",
      description: "Jours de la semaine où le restaurant est fermé (0=Dimanche, 1=Lundi, ...)",
      type: "array",
      of: [{ type: "number" }],
      options: {
        list: [
          { title: "Dimanche", value: 0 },
          { title: "Lundi", value: 1 },
          { title: "Mardi", value: 2 },
          { title: "Mercredi", value: 3 },
          { title: "Jeudi", value: 4 },
          { title: "Vendredi", value: 5 },
          { title: "Samedi", value: 6 },
        ],
      },
    }),
    defineField({
      name: "advanceBookingDays",
      title: "Réservation max à l'avance (jours)",
      type: "number",
      initialValue: 30,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "minAdvanceHours",
      title: "Délai minimum avant réservation (heures)",
      type: "number",
      initialValue: 2,
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Paramètres de réservation",
    }),
  },
});
