import type { Metadata } from "next";
import { getTeamMembers, getPageBySlug } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/client";
import { getLayoutData } from "@/lib/get-layout-data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutContent from "@/components/about/AboutContent";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("a-propos").catch(() => null);
  return {
    title: page?.seo?.metaTitle ?? "Notre Histoire | Le Pressoir Byzantin",
    description:
      page?.seo?.metaDescription ??
      "Découvrez l'histoire du Pressoir Byzantin, notre passion pour la cuisine orientale et méditerranéenne au cœur de Villeneuve.",
    openGraph: {
      title: "Notre Histoire | Le Pressoir Byzantin",
      description: "Découvrez l'histoire du Pressoir Byzantin.",
      images: [{ url: "/images/restaurant/WhatsApp-Image-2025-05-22-at-22.59.12-3-scaled.jpeg" }],
    },
  };
}

export default async function AProposPage() {
  const [team, layout] = await Promise.all([
    getTeamMembers().catch(() => null),
    getLayoutData(),
  ]);

  // Resolve team member photos
  const teamMembers = (team ?? []).map(
    (m: {
      _id: string;
      name: string;
      role?: string;
      photo?: { asset?: { _ref: string } };
      bio?: string;
      order: number;
    }) => ({
      ...m,
      photoUrl: m.photo?.asset?._ref
        ? urlFor(m.photo).width(400).height(500).url()
        : null,
    })
  );

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", url: "/" }, { name: "À propos", url: "/a-propos" }])} />
      <Header />
      <main id="main-content">
        <AboutContent teamMembers={teamMembers} />
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
