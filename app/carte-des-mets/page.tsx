import type { Metadata } from "next";
import {
  getMenuCategories,
  getAllMenuItems,
  getRestaurantInfo,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/client";
import { RESTAURANT, MENU_ITEMS } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuHero from "@/components/menu/MenuHero";
import MenuContent from "@/components/menu/MenuContent";
import MenuLegend from "@/components/menu/MenuLegend";
import JsonLd from "@/components/JsonLd";
import { menuJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Notre Carte | Le Pressoir Byzantin",
  description:
    "Découvrez notre carte : pizzas, shawarma, pide, crêpes, cocktails, vins et bien plus. Saveurs orientales & méditerranéennes à Villeneuve.",
  openGraph: {
    title: "Notre Carte | Le Pressoir Byzantin",
    description:
      "Découvrez notre carte complète : mets et boissons aux saveurs orientales & méditerranéennes.",
    images: [{ url: "/images/stock/turkish-pide-with-minced-meat-kiymali-pide-turkis-2025-03-27-00-56-46-utc-scaled.jpg" }],
  },
};

/* ── Fallback categories built from constants ────────── */

const FALLBACK_CATEGORIES = [
  {
    _id: "cat-pizzas",
    name: "Pizzas",
    slug: { current: "pizzas" },
    description:
      "Des classiques généreux et des créations voyageuses, cuites jusqu'à la juste dorure.",
    order: 0,
  },
  {
    _id: "cat-box",
    name: "Box & Shawarma",
    slug: { current: "box-shawarma" },
    description:
      "Le goût du Pressoir en format généreux, entre viandes marinées, falafels et sauces maison.",
    order: 1,
  },
  {
    _id: "cat-crepes",
    name: "Crêpes",
    slug: { current: "crepes" },
    description:
      "Des crêpes pensées pour la douceur, du réconfort simple aux envies les plus gourmandes.",
    order: 2,
  },
];

const PIZZA_SLUGS = new Set([
  "byzantinne",
  "chevremiel",
  "la-tonnata",
  "nordique",
  "romaine",
  "tartiflette",
  "tunisienne",
]);

function buildFallbackItems() {
  return MENU_ITEMS.map((item) => {
    let categorySlug: string;
    if (PIZZA_SLUGS.has(item.slug)) {
      categorySlug = "pizzas";
    } else if (item.slug === "nutella") {
      categorySlug = "crepes";
    } else {
      categorySlug = "box-shawarma";
    }

    const cat = FALLBACK_CATEGORIES.find(
      (c) => c.slug.current === categorySlug
    )!;

    return {
      _id: `fallback-${item.slug}`,
      name: item.name,
      slug: { current: item.slug },
      description: item.description,
      price: item.price,
      image: item.image,
      category: { _id: cat._id, name: cat.name, slug: cat.slug },
      allergens: undefined,
      tags: undefined,
      extras: undefined,
    };
  });
}

/* ── Image helper ─────────────────────────────────────── */

function resolveImage(
  image: { asset?: { _ref: string }; alt?: string } | string | undefined
): string | undefined {
  if (!image) return undefined;
  if (typeof image === "string") return image;
  if (image.asset?._ref) return urlFor(image).width(400).height(400).url();
  return undefined;
}

/* ── Page ──────────────────────────────────────────────── */

export default async function CartePage() {
  const [categories, menuItems, info] = await Promise.all([
    getMenuCategories().catch(() => null),
    getAllMenuItems().catch(() => null),
    getRestaurantInfo().catch(() => null),
  ]);

  // Categories with fallback
  const finalCategories =
    categories?.length > 0 ? categories : FALLBACK_CATEGORIES;

  // Items with fallback — resolve Sanity images to URLs
  const finalItems =
    menuItems?.length > 0
      ? menuItems.map(
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
      : buildFallbackItems();

  // Restaurant info for Header/Footer
  const name = info?.name ?? RESTAURANT.name;
  const legalEntity = info?.legalEntity ?? RESTAURANT.legal.entity;
  const copyrightNotice = info?.copyrightNotice ?? RESTAURANT.legal.notice;

  const hours = info?.hours?.length
    ? info.hours
    : [
        {
          days: RESTAURANT.hours.weekdays.label,
          openTime: "10h00",
          closeTime: "23h30",
        },
        {
          days: RESTAURANT.hours.weekend.label,
          openTime: "10h00",
          closeTime: "22h30",
        },
      ];

  const socialLinks = info?.socialLinks?.length
    ? info.socialLinks
    : [
        { platform: "instagram", url: RESTAURANT.social.instagram },
        { platform: "tiktok", url: RESTAURANT.social.tiktok },
      ];

  // Build JSON-LD menu data
  const menuCategories = finalCategories.map((cat: { _id: string; name: string; slug: { current: string } }) => {
    const catSlug = typeof cat.slug === "string" ? cat.slug : cat.slug.current;
    const catItems = finalItems.filter((item: { category?: { slug: { current: string } | string } }) => {
      if (!item.category) return false;
      const s = typeof item.category.slug === "string" ? item.category.slug : item.category.slug.current;
      return s === catSlug;
    });
    return {
      name: cat.name,
      items: catItems.map((item: { name: string; description?: string; price: number }) => ({
        name: item.name,
        description: item.description,
        price: item.price,
      })),
    };
  });

  return (
    <>
      <JsonLd data={menuJsonLd(menuCategories)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", url: "/" }, { name: "Notre carte", url: "/carte-des-mets" }])} />
      <Header />
      <main id="main-content">
        <MenuHero />
        <MenuContent categories={finalCategories} items={finalItems} />
        <MenuLegend />
      </main>
      <Footer
        name={name}
        hours={hours}
        socialLinks={socialLinks}
        legalEntity={legalEntity}
        copyrightNotice={copyrightNotice}
      />
    </>
  );
}
