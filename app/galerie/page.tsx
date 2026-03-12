import type { Metadata } from "next";
import { getGallery, getPageBySlug } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/client";
import { getLayoutData } from "@/lib/get-layout-data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryContent from "@/components/gallery/GalleryContent";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("galerie").catch(() => null);
  return {
    title: page?.seo?.metaTitle ?? "Galerie | Le Pressoir Byzantin",
    description:
      page?.seo?.metaDescription ??
      "Découvrez en images l'ambiance, les plats et les moments partagés au Pressoir Byzantin à Villeneuve.",
    openGraph: {
      title: "Galerie | Le Pressoir Byzantin",
      description:
        "Parcourez l'univers du Pressoir Byzantin entre lumière, tablée et gestes de cuisine.",
      images: [{ url: "/images/restaurant/WhatsApp-Image-2025-05-22-at-22.59.13-4-scaled.jpeg" }],
    },
  };
}

/* ── Fallback images ──────────────────────────────────── */

const FALLBACK_GALLERY = [
  { _id: "g1", title: "L'intérieur du restaurant", image: "/images/restaurant/WhatsApp-Image-2025-05-22-at-22.59.13-4-scaled.jpeg" },
  { _id: "g2", title: "Ambiance chaleureuse", image: "/images/restaurant/WhatsApp-Image-2025-05-22-at-22.59.12-3-scaled.jpeg" },
  { _id: "g3", title: "Notre espace", image: "/images/restaurant/WhatsApp-Image-2025-05-22-at-22.59.11-1-scaled.jpeg" },
];

export default async function GaleriePage() {
  const [gallery, layout] = await Promise.all([
    getGallery().catch(() => null),
    getLayoutData(),
  ]);

  const photos =
    gallery?.length > 0
      ? gallery.map(
          (item: {
            _id: string;
            title: string;
            image: { asset?: { _ref: string }; alt?: string };
          }) => ({
            _id: item._id,
            title: item.title,
            alt: item.image?.alt ?? item.title,
            src: item.image?.asset?._ref
              ? urlFor(item.image).width(800).height(600).url()
              : "/images/restaurant/WhatsApp-Image-2025-05-22-at-22.59.13-4-scaled.jpeg",
            srcFull: item.image?.asset?._ref
              ? urlFor(item.image).width(1400).url()
              : "/images/restaurant/WhatsApp-Image-2025-05-22-at-22.59.13-4-scaled.jpeg",
          })
        )
      : FALLBACK_GALLERY.map((item) => ({
          _id: item._id,
          title: item.title,
          alt: item.title,
          src: item.image,
          srcFull: item.image,
        }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", url: "/" }, { name: "Galerie", url: "/galerie" }])} />
      <Header />
      <main id="main-content">
        <GalleryContent photos={photos} />
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
