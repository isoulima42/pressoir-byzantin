import type { MetadataRoute } from "next";
import { RESTAURANT } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/reservation/confirmation"],
      },
    ],
    sitemap: `${RESTAURANT.url}/sitemap.xml`,
  };
}
