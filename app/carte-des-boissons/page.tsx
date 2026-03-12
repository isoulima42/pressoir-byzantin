import type { Metadata } from "next";
import {
  getMenuCategories,
  getMenuItemsByType,
  getRestaurantInfo,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/client";
import { RESTAURANT } from "@/lib/constants";
import { getLayoutData } from "@/lib/get-layout-data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeverageContent from "@/components/beverages/BeverageContent";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Carte des Boissons | Le Pressoir Byzantin",
  description:
    "Découvrez notre carte des boissons : vins, cocktails, bières, thés et cafés. Le Pressoir Byzantin à Villeneuve.",
  openGraph: {
    title: "Carte des Boissons | Le Pressoir Byzantin",
    description:
      "Vins, cocktails maison, bières artisanales et boissons chaudes — la carte des boissons du Pressoir Byzantin.",
    images: [{ url: "/images/generated/drinks/cocktail_pressoir.webp" }],
  },
};

/* ── Image helper ─────────────────────────────────────── */

function resolveImage(
  image: { asset?: { _ref: string }; alt?: string } | string | undefined
): string | undefined {
  if (!image) return undefined;
  if (typeof image === "string") return image;
  if (image.asset?._ref) return urlFor(image).width(400).height(400).url();
  return undefined;
}

/* ── Fallback data ────────────────────────────────────── */

const FALLBACK_CATEGORIES = [
  {
    _id: "cat-vins",
    name: "Vins",
    slug: { current: "vins" },
    description: "Une sélection de vins pour accompagner chaque plat.",
    order: 0,
  },
  {
    _id: "cat-cocktails",
    name: "Cocktails",
    slug: { current: "cocktails" },
    description: "Cocktails classiques et créations de la maison.",
    order: 1,
  },
  {
    _id: "cat-bieres",
    name: "Bières",
    slug: { current: "bieres" },
    description: "Pression et bouteilles, locales et importées.",
    order: 2,
  },
  {
    _id: "cat-boissons-chaudes",
    name: "Boissons chaudes",
    slug: { current: "boissons-chaudes" },
    description: "Cafés, thés et infusions pour conclure le repas.",
    order: 3,
  },
  {
    _id: "cat-boissons-fraiches",
    name: "Boissons fraîches",
    slug: { current: "boissons-fraiches" },
    description: "Limonades, jus et softs.",
    order: 4,
  },
];

const DRINK_IMAGE_MAP: Record<string, string> = {
  vins: "/images/generated/drinks/vin_rouge.webp",
  cocktails: "/images/generated/drinks/cocktail_pressoir.webp",
  bieres: "/images/generated/drinks/biere_pression.webp",
  "boissons-chaudes": "/images/generated/drinks/cafe_cappuccino.webp",
  "boissons-fraiches": "/images/generated/drinks/limonade.webp",
};

/* ── Page ──────────────────────────────────────────────── */

export default async function BoissonsPage() {
  const [categories, drinkItems, layout] = await Promise.all([
    getMenuCategories("drink").catch(() => null),
    getMenuItemsByType("drink").catch(() => null),
    getLayoutData(),
  ]);

  const finalCategories =
    categories?.length > 0 ? categories : FALLBACK_CATEGORIES;

  const finalItems =
    drinkItems?.length > 0
      ? drinkItems.map(
          (item: {
            _id: string;
            name: string;
            slug: { current: string };
            description?: string;
            price: number;
            image?: { asset?: { _ref: string }; alt?: string } | string;
            category?: {
              _id: string;
              name: string;
              slug: { current: string };
            };
            allergens?: string[];
            tags?: string[];
            extras?: { name: string; price: number }[];
          }) => ({
            ...item,
            image: resolveImage(item.image),
          })
        )
      : [];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", url: "/" },
          { name: "Carte des Boissons", url: "/carte-des-boissons" },
        ])}
      />
      <Header />
      <main id="main-content">
        <BeverageContent
          categories={finalCategories}
          items={finalItems}
          drinkImageMap={DRINK_IMAGE_MAP}
        />
      </main>
      <Footer
        name={layout.name}
        hours={layout.hours}
        socialLinks={layout.socialLinks}
        legalEntity={layout.legalEntity}
        copyrightNotice={layout.copyrightNotice}
      />
    </>
  );
}
