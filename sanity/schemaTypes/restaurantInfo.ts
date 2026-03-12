import { defineField, defineType } from "sanity";

export default defineType({
  name: "restaurantInfo",
  title: "Informations du restaurant",
  type: "document",
  icon: () => "🏠",
  fields: [
    defineField({
      name: "name",
      title: "Nom du restaurant",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Téléphone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "hours",
      title: "Horaires d'ouverture",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "days",
              title: "Jours",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "openTime",
              title: "Ouverture",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "closeTime",
              title: "Fermeture",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { days: "days", open: "openTime", close: "closeTime" },
            prepare: ({ days, open, close }) => ({
              title: days,
              subtitle: `${open} – ${close}`,
            }),
          },
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Réseaux sociaux",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Plateforme",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "Facebook", value: "facebook" },
                  { title: "X (Twitter)", value: "twitter" },
                  { title: "YouTube", value: "youtube" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "mapsEmbed",
      title: "URL Google Maps (embed)",
      type: "url",
    }),
    defineField({
      name: "legalEntity",
      title: "Entité légale",
      type: "string",
    }),
    defineField({
      name: "copyrightNotice",
      title: "Mention de copyright",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
