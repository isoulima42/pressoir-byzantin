import { defineField, defineType } from "sanity";

export default defineType({
  name: "menuItem",
  title: "Plat",
  type: "document",
  icon: () => "🥘",
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
      rows: 3,
    }),
    defineField({
      name: "price",
      title: "Prix (CHF)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Texte alternatif",
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "reference",
      to: [{ type: "menuCategory" }],
    }),
    defineField({
      name: "allergens",
      title: "Allergènes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Gluten", value: "gluten" },
          { title: "Lait", value: "lait" },
          { title: "Oeufs", value: "oeufs" },
          { title: "Poisson", value: "poisson" },
          { title: "Fruits à coque", value: "fruits-a-coque" },
          { title: "Soja", value: "soja" },
          { title: "Sésame", value: "sesame" },
          { title: "Moutarde", value: "moutarde" },
          { title: "Céleri", value: "celeri" },
          { title: "Crustacés", value: "crustaces" },
          { title: "Mollusques", value: "mollusques" },
          { title: "Lupin", value: "lupin" },
          { title: "Sulfites", value: "sulfites" },
          { title: "Arachides", value: "arachides" },
        ],
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Végétarien", value: "vegetarien" },
          { title: "Vegan", value: "vegan" },
          { title: "Épicé", value: "epice" },
          { title: "Sans gluten", value: "sans-gluten" },
          { title: "Fait maison", value: "fait-maison" },
          { title: "Nouveau", value: "nouveau" },
          { title: "Populaire", value: "populaire" },
        ],
      },
    }),
    defineField({
      name: "available",
      title: "Disponible",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "extras",
      title: "Suppléments",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Nom",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "price",
              title: "Prix (CHF)",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "price" },
            prepare: ({ title, subtitle }) => ({
              title,
              subtitle: subtitle != null ? `+${subtitle} CHF` : undefined,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "price", media: "image" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle != null ? `${subtitle} CHF` : undefined,
      media,
    }),
  },
});
