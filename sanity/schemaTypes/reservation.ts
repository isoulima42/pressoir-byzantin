import { defineField, defineType } from "sanity";

export default defineType({
  name: "reservation",
  title: "Réservation",
  type: "document",
  icon: () => "📋",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Téléphone",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "time",
      title: "Heure",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "guests",
      title: "Nombre de personnes",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(20),
    }),
    defineField({
      name: "specialRequests",
      title: "Demandes spéciales",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "status",
      title: "Statut",
      type: "string",
      options: {
        list: [
          { title: "En attente", value: "pending" },
          { title: "Confirmée", value: "confirmed" },
          { title: "Annulée", value: "cancelled" },
        ],
      },
      initialValue: "pending",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "confirmationId",
      title: "ID de confirmation",
      type: "string",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Date (récent)",
      name: "dateDesc",
      by: [
        { field: "date", direction: "desc" },
        { field: "time", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: {
      name: "name",
      date: "date",
      time: "time",
      guests: "guests",
      status: "status",
    },
    prepare: ({ name, date, time, guests, status }) => {
      const statusEmoji =
        status === "confirmed"
          ? "✅"
          : status === "cancelled"
            ? "❌"
            : "⏳";
      return {
        title: `${statusEmoji} ${name ?? "Sans nom"} — ${guests ?? "?"} pers.`,
        subtitle: date && time ? `${date} à ${time}` : "Date non définie",
      };
    },
  },
});
