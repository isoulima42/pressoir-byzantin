import { defineField, defineType } from "sanity";

export default defineType({
  name: "menuCategory",
  title: "Catégorie du menu",
  type: "document",
  icon: () => "🍽️",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "menuType",
      title: "Type de carte",
      type: "string",
      options: {
        list: [
          { title: "Mets", value: "food" },
          { title: "Boissons", value: "drink" },
        ],
      },
      initialValue: "food",
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "description" },
  },
});
