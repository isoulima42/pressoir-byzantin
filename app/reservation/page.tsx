import type { Metadata } from "next";
import { getReservationSettings } from "@/sanity/lib/queries";
import { getLayoutData } from "@/lib/get-layout-data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ReservationForm from "@/components/reservation/ReservationForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Réserver une table | Le Pressoir Byzantin",
  description:
    "Réservez votre table au Pressoir Byzantin à Villeneuve. Une invitation au voyage entre les rives de la Méditerranée et les traditions de l'Orient.",
  openGraph: {
    title: "Réserver une table | Le Pressoir Byzantin",
    description: "Réservez votre table pour un voyage culinaire d'exception au Pressoir Byzantin.",
    images: [{ url: "/images/logo/Artboard-1.png" }],
  },
};

export default async function ReservationPage() {
  const [settings, layout] = await Promise.all([
    getReservationSettings().catch(() => null),
    getLayoutData(),
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", url: "/" }, { name: "Réservation", url: "/reservation" }])} />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="bg-brand-dark pb-4 pt-32 md:pt-40">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <ScrollReveal>
              <div className="mx-auto mb-6 h-px w-12 bg-byzantin-gold" />
              <span className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
                Le Pressoir Byzantin
              </span>
              <h1 className="mt-3 font-heading text-4xl font-bold text-brand-cream md:text-5xl lg:text-6xl">
                Réservation
              </h1>
              <p className="mt-4 text-base text-brand-cream/50">
                Choisissez le moment, nous préparons le reste. Une table vous attend, dressée avec la même attention que nos assiettes.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Form */}
        <section className="bg-brand-dark pb-24 pt-8">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-sm border border-brand-cream/10 bg-brand-navy/30 p-5">
                <p className="font-nav text-xs uppercase tracking-[0.24em] text-byzantin-gold">
                  Déjeuner & dîner
                </p>
                <p className="mt-3 text-sm text-brand-cream/60">
                  Choisissez votre moment puis validez en quelques étapes claires.
                </p>
              </div>
              <div className="rounded-sm border border-brand-cream/10 bg-brand-navy/30 p-5">
                <p className="font-nav text-xs uppercase tracking-[0.24em] text-byzantin-gold">
                  Groupes
                </p>
                <p className="mt-3 text-sm text-brand-cream/60">
                  Pour les tablées importantes, nous vous orientons vers un échange plus précis.
                </p>
              </div>
              <div className="rounded-sm border border-brand-cream/10 bg-brand-navy/30 p-5">
                <p className="font-nav text-xs uppercase tracking-[0.24em] text-byzantin-gold">
                  Modification
                </p>
                <p className="mt-3 text-sm text-brand-cream/60">
                  Une fois la demande envoyée, un appel suffit pour ajuster les détails.
                </p>
              </div>
            </div>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="rounded-sm border border-brand-cream/10 bg-brand-navy/30 p-8 md:p-10 shadow-2xl transition-all hover:border-byzantin-gold/30">
                <ReservationForm settings={settings} />
              </div>
            </ScrollReveal>

            <p className="mt-6 text-center text-xs text-brand-cream/40">
              Pour les réceptions de plus de 20 convives, la privatisation ou un format traiteur,
              le plus simple reste de nous joindre directement au{" "}
              <a
                href={`tel:${layout.phone?.replace(/\s/g, "") ?? "+41796594152"}`}
                className="text-byzantin-gold transition-colors hover:text-brand-cream"
              >
                {layout.phone ?? "079 659 41 52"}
              </a>
            </p>
          </div>
        </section>
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
