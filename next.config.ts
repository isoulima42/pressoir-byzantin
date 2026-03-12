import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  /* ── WordPress → Next.js 301 redirects ────────────────── */
  async redirects() {
    return [
      // Main pages
      { source: "/menu", destination: "/carte-des-mets", permanent: true },
      { source: "/menu/", destination: "/carte-des-mets", permanent: true },
      { source: "/carte-des-boissons", destination: "/carte-des-mets", permanent: true },
      { source: "/carte-des-boissons/", destination: "/carte-des-mets", permanent: true },
      { source: "/livraison", destination: "/carte-des-mets", permanent: true },
      { source: "/livraison/", destination: "/carte-des-mets", permanent: true },

      // WordPress food single pages → menu
      { source: "/food/:slug", destination: "/carte-des-mets", permanent: true },
      { source: "/food/:slug/", destination: "/carte-des-mets", permanent: true },

      // WordPress feeds
      { source: "/feed", destination: "/", permanent: true },
      { source: "/feed/", destination: "/", permanent: true },
      { source: "/comments/feed", destination: "/", permanent: true },
      { source: "/comments/feed/", destination: "/", permanent: true },

      // WordPress API and admin
      { source: "/wp-json/:path*", destination: "/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/admin", permanent: true },
      { source: "/wp-login.php", destination: "/admin", permanent: true },
      { source: "/wp-content/:path*", destination: "/", permanent: true },

      // WordPress pagination
      { source: "/page/:num", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
