import type { MetadataRoute } from "next";
import { RESTAURANT } from "@/lib/constants";

const BASE = RESTAURANT.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/carte-des-mets`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/event-traiteur`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/galerie`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/reservation`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
