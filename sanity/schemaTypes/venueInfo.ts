import { defineField, defineType } from "sanity";

export default defineType({
  name: "venueInfo",
  title: "Notre Salle",
  type: "document",
  icon: () => "🏛️",
  fields: [
    defineField({
      name: "capacity",
      title: "Capacité (personnes assises)",
      type: "number",
      initialValue: 60,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "features",
      title: "Caractéristiques",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "images",
      title: "Photos de la salle",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Texte alternatif",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Notre Salle" };
    },
  },
});
