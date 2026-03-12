import { RESTAURANT } from "@/lib/constants";

const SITE_URL = RESTAURANT.url;

/* ── Breadcrumb ───────────────────────────────────────── */

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/* ── Restaurant (homepage) ────────────────────────────── */

export function restaurantJsonLd(info: {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: { days: string; openTime: string; closeTime: string }[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurant`,
    name: info.name,
    description: RESTAURANT.description,
    url: SITE_URL,
    telephone: info.phone,
    email: info.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Grand Rue 29",
      addressLocality: "Villeneuve",
      postalCode: "1844",
      addressCountry: "CH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.3978,
      longitude: 6.9253,
    },
    image: `${SITE_URL}/images/logo/Artboard-1.png`,
    servesCuisine: [
      "Méditerranéenne",
      "Orientale",
      "Turque",
      "Pizza",
      "Kebab",
    ],
    priceRange: "CHF 12 – CHF 25",
    currenciesAccepted: "CHF",
    paymentAccepted: "Cash, Credit Card",
    openingHoursSpecification: info.hours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: parseDays(slot.days),
      opens: normalizeTime(slot.openTime),
      closes: normalizeTime(slot.closeTime),
    })),
    sameAs: [RESTAURANT.social.instagram, RESTAURANT.social.tiktok],
    menu: `${SITE_URL}/carte-des-mets`,
    acceptsReservations: true,
    hasMenu: {
      "@type": "Menu",
      url: `${SITE_URL}/carte-des-mets`,
    },
  };
}

/* ── Menu + MenuItems ─────────────────────────────────── */

export function menuJsonLd(
  categories: { name: string; items: { name: string; description?: string; price: number }[] }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Carte des mets",
    url: `${SITE_URL}/carte-des-mets`,
    hasMenuSection: categories.map((cat) => ({
      "@type": "MenuSection",
      name: cat.name,
      hasMenuItem: cat.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description ?? "",
        offers: {
          "@type": "Offer",
          price: item.price,
          priceCurrency: "CHF",
        },
      })),
    })),
  };
}

/* ── Service (Event & Traiteur page) ──────────────────── */

export function serviceJsonLd(services: {
  name: string;
  description?: string;
}[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FoodService",
    name: `${RESTAURANT.name} — Événements & Traiteur`,
    url: `${SITE_URL}/event-traiteur`,
    provider: {
      "@type": "Restaurant",
      name: RESTAURANT.name,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Place",
      name: "Villeneuve, Suisse",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Prestations",
      itemListElement: services.map((svc) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: svc.name,
          description: svc.description ?? "",
        },
      })),
    },
  };
}

/* ── Helpers ───────────────────────────────────────────── */

function parseDays(days: string): string[] {
  const mapping: Record<string, string> = {
    lundi: "Monday",
    mardi: "Tuesday",
    mercredi: "Wednesday",
    jeudi: "Thursday",
    vendredi: "Friday",
    samedi: "Saturday",
    dimanche: "Sunday",
  };

  const lower = days.toLowerCase();
  const result: string[] = [];

  // Handle ranges like "Lundi – Jeudi"
  const rangeMatch = lower.match(/(\w+)\s*[–-]\s*(\w+)/);
  if (rangeMatch) {
    const dayOrder = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
    const startIdx = dayOrder.indexOf(rangeMatch[1]);
    const endIdx = dayOrder.indexOf(rangeMatch[2]);
    if (startIdx >= 0 && endIdx >= 0) {
      for (let i = startIdx; i <= endIdx; i++) {
        const eng = mapping[dayOrder[i]];
        if (eng) result.push(eng);
      }
    }
  }

  // If nothing matched, try individual days
  if (result.length === 0) {
    for (const [fr, en] of Object.entries(mapping)) {
      if (lower.includes(fr)) result.push(en);
    }
  }

  return result;
}

function normalizeTime(time: string): string {
  // "10h00" → "10:00", "23h30" → "23:30"
  return time.replace("h", ":");
}
