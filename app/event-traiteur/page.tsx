import type { Metadata } from "next";
import {
  getServiceCategories,
  getServiceItems,
  getVenueInfo,
  getAdditionalServices,
  getPageBySlug,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/client";
import { getLayoutData } from "@/lib/get-layout-data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesContent from "@/components/services/ServicesContent";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("event-traiteur").catch(() => null);
  return {
    title:
      page?.seo?.metaTitle ?? "Événements & Traiteur | Le Pressoir Byzantin",
    description:
      page?.seo?.metaDescription ??
      "Sous les voûtes de notre ancien pressoir ou chez vous, confiez-nous vos grandes occasions. Mariages, séminaires et événements sur mesure.",
    openGraph: {
      title: "Événements & Traiteur | Le Pressoir Byzantin",
      description:
        "Sous les voûtes de notre ancien pressoir ou chez vous, confiez-nous l'organisation de vos réceptions.",
      images: [{ url: "/images/events/event-2.png" }],
    },
  };
}

/* ── Fallback data ─────────────────────────────────────── */

const FALLBACK_CATEGORIES = [
  {
    _id: "svc-cat-prives",
    title: "Événements Privés",
    slug: "evenements-prives",
    description: "Célébrez vos instants précieux dans une atmosphère intimiste et authentique. Notre équipe veille à chaque détail pour que votre fête soit mémorable.",
    icon: "✨",
    items: [
      { _id: "f1", title: "Anniversaires d'exception" },
      { _id: "f2", title: "Fiançailles & Réceptions de mariage" },
      { _id: "f3", title: "Retrouvailles familiales" },
      { _id: "f4", title: "Célébrations intimes" },
    ],
  },
  {
    _id: "svc-cat-pro",
    title: "Rencontres Professionnelles",
    slug: "evenements-professionnels",
    description: "Alliez convivialité et professionnalisme. Notre espace s'adapte à vos besoins pour des réunions stimulantes et des dîners d'affaires mémorables.",
    icon: "🖋️",
    items: [
      { _id: "f5", title: "Déjeuners & Dîners d'affaires" },
      { _id: "f6", title: "Lancements de produits" },
      { _id: "f7", title: "Soirées de networking" },
      { _id: "f8", title: "Fêtes de fin d'année" },
    ],
  },
  {
    _id: "svc-cat-traiteur",
    title: "Service Traiteur & Chef à Domicile",
    slug: "service-traiteur",
    description: "L'excellence du Pressoir Byzantin s'invite à votre table. De la conception sur mesure à la mise en scène, nous orchestons vos réceptions avec passion.",
    icon: "🍽️",
    items: [
      { _id: "f9", title: "Mezzés & Pièces cocktails" },
      { _id: "f10", title: "Buffets aux saveurs du Levant" },
      { _id: "f11", title: "Dîners de gala" },
      { _id: "f12", title: "Ateliers culinaires & animations" },
    ],
  },
  {
    _id: "svc-cat-salle",
    title: "Privatisation du Pressoir",
    slug: "location-de-salle",
    description: "Sous les voûtes de notre ancien pressoir, découvrez un écrin de caractère, privatisable pour donner à vos événements une dimension unique.",
    icon: "🏛️",
    items: [],
  },
];

const FALLBACK_VENUE = {
  capacity: 60,
  features: [
    "Un écrin historique au charme préservé",
    "Capacité d'accueil jusqu'à 60 convives assis",
    "Dressage de tables raffiné et personnalisable",
    "Scénographie lumineuse modulable",
  ],
  images: [
    "/images/events/event-1.png",
    "/images/events/event-2.png",
    "/images/events/event-3-scaled.png",
    "/images/events/evennt-4-scaled.png",
  ],
};

const FALLBACK_ADDITIONAL = [
  { _id: "a1", title: "Curatelle musicale", description: "Orchestration, DJ ou artistes live." },
  { _id: "a2", title: "Immortalisation", description: "Photographes et vidéastes professionnels." },
  { _id: "a3", title: "Scénographie florale", description: "Compositions sur mesure par notre fleuriste." },
  { _id: "a4", title: "Créations culinaires exclusives", description: "Menus conçus spécialement pour votre événement." },
];

/* ── Page ──────────────────────────────────────────────── */

export default async function EventTraiteurPage() {
  const [sanityCategories, sanityItems, sanityVenue, sanityAdditional, layout] =
    await Promise.all([
      getServiceCategories().catch(() => null),
      getServiceItems().catch(() => null),
      getVenueInfo().catch(() => null),
      getAdditionalServices().catch(() => null),
      getLayoutData(),
    ]);

  // Build categories with their items
  let categories;
  if (sanityCategories?.length > 0) {
    categories = sanityCategories.map(
      (cat: {
        _id: string;
        title: string;
        slug: { current: string } | string;
        description?: string;
        icon?: string;
        image?: { asset?: { _ref: string }; alt?: string };
      }) => {
        const slug =
          typeof cat.slug === "string" ? cat.slug : cat.slug.current;
        const items = (sanityItems ?? []).filter(
          (item: {
            category?: { slug?: { current: string } | string };
          }) => {
            if (!item.category?.slug) return false;
            const s =
              typeof item.category.slug === "string"
                ? item.category.slug
                : item.category.slug.current;
            return s === slug;
          }
        );
        return {
          _id: cat._id,
          title: cat.title,
          slug,
          description: cat.description,
          icon: cat.icon,
          imageUrl: cat.image?.asset?._ref
            ? urlFor(cat.image).width(800).height(500).url()
            : undefined,
          items: items.map(
            (i: { _id: string; title: string; description?: string }) => ({
              _id: i._id,
              title: i.title,
              description: i.description,
            })
          ),
        };
      }
    );
  } else {
    categories = FALLBACK_CATEGORIES;
  }

  // Venue
  const venue = sanityVenue
    ? {
      capacity: sanityVenue.capacity ?? 60,
      features: sanityVenue.features ?? FALLBACK_VENUE.features,
      images: sanityVenue.images?.length
        ? sanityVenue.images.map(
          (img: { asset?: { _ref: string }; alt?: string }) =>
            img.asset?._ref
              ? urlFor(img).width(600).height(450).url()
              : "/images/events/event-1.png"
        )
        : FALLBACK_VENUE.images,
    }
    : FALLBACK_VENUE;

  // Additional services
  const additionalServices =
    sanityAdditional?.length > 0
      ? sanityAdditional.map(
        (s: { _id: string; title: string; description?: string }) => ({
          _id: s._id,
          title: s.title,
          description: s.description,
        })
      )
      : FALLBACK_ADDITIONAL;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", url: "/" },
          { name: "Événements & Traiteur", url: "/event-traiteur" },
        ])}
      />
      <Header />
      <main id="main-content">
        <ServicesContent
          categories={categories}
          venue={venue}
          additionalServices={additionalServices}
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
