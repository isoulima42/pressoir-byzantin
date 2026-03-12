import type { Metadata } from "next";
import { getRestaurantInfo, getPageBySlug } from "@/sanity/lib/queries";
import { RESTAURANT } from "@/lib/constants";
import { getLayoutData } from "@/lib/get-layout-data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/contact/ContactForm";
import SectionDivider from "@/components/ui/SectionDivider";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("contact").catch(() => null);
  return {
    title: page?.seo?.metaTitle ?? "Contact | Le Pressoir Byzantin",
    description:
      page?.seo?.metaDescription ??
      "Contactez Le Pressoir Byzantin à Villeneuve. Réservation, événements, traiteur — nous sommes à votre écoute.",
    openGraph: {
      title: "Contact | Le Pressoir Byzantin",
      description:
        "Réservation, événement, traiteur ou simple question : nous vous répondons avec attention et clarté.",
      images: [{ url: "/images/logo/Artboard-1.png" }],
    },
  };
}

export default async function ContactPage() {
  const [info, layout] = await Promise.all([
    getRestaurantInfo().catch(() => null),
    getLayoutData(),
  ]);

  const address = info?.address ?? RESTAURANT.address;
  const phone = info?.phone ?? RESTAURANT.phone;
  const email = info?.email ?? RESTAURANT.email;
  const mapsEmbed = info?.mapsEmbed ?? RESTAURANT.mapsEmbed;

  const hours = layout.hours;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", url: "/" }, { name: "Contact", url: "/contact" }])} />
      <Header />
      <main id="main-content">
        {/* ── Hero ──────────────────────────────────────── */}
        <section className="pb-8 pt-32 md:pt-40">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
            <ScrollReveal>
              <div className="mx-auto mb-6 h-px w-12 bg-byzantin-gold" />
              <span className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
                Le Pressoir Byzantin
              </span>
              <h1 className="mt-3 font-heading text-4xl font-bold text-brand-cream md:text-5xl lg:text-6xl">
                Contact
              </h1>
              <p className="mt-4 text-base text-brand-cream/50 max-w-2xl mx-auto">
                Une réservation, un événement, un service traiteur ou simplement une question : écrivez-nous. Nous vous répondons avec la même attention que celle que nous mettons à table.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Content ───────────────────────────────────── */}
        <section className="bg-brand-dark pb-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
            {/* Form */}
            <ScrollReveal>
              <div className="rounded-sm border border-neutral-800 bg-brand-navy/30 p-8 md:p-10">
                <h2 className="mb-8 font-subtitle text-xl text-brand-cream">
                  Parlez-nous de votre projet
                </h2>
                <ContactForm />
              </div>
            </ScrollReveal>

            {/* Info + Map */}
            <ScrollReveal delay={0.15}>
              <div className="space-y-10">
                <div className="grid gap-4 sm:grid-cols-3">
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="rounded-sm border border-brand-cream/10 bg-brand-navy/30 p-5 transition-colors hover:border-byzantin-gold/40"
                  >
                    <p className="font-nav text-xs uppercase tracking-[0.24em] text-byzantin-gold">
                      Appeler
                    </p>
                    <p className="mt-3 text-sm text-brand-cream/70">{phone}</p>
                  </a>

                  <a
                    href={`mailto:${email}`}
                    className="rounded-sm border border-brand-cream/10 bg-brand-navy/30 p-5 transition-colors hover:border-byzantin-gold/40"
                  >
                    <p className="font-nav text-xs uppercase tracking-[0.24em] text-byzantin-gold">
                      Email
                    </p>
                    <p className="mt-3 text-sm text-brand-cream/70">{email}</p>
                  </a>

                  <div className="rounded-sm border border-brand-cream/10 bg-brand-navy/30 p-5">
                    <p className="font-nav text-xs uppercase tracking-[0.24em] text-byzantin-gold">
                      Délai habituel
                    </p>
                    <p className="mt-3 text-sm text-brand-cream/70">{RESTAURANT.responseSla}</p>
                  </div>
                </div>

                {/* Contact details */}
                <div className="space-y-4">
                  <h3 className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
                    Coordonnées
                  </h3>

                  <div className="space-y-3 text-brand-cream/60">
                    <p className="flex items-center gap-3">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="shrink-0 text-byzantin-gold"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {address}
                    </p>
                    <p className="flex items-center gap-3">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="shrink-0 text-byzantin-gold"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                      </svg>
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="transition-colors hover:text-brand-cream"
                      >
                        {phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-3">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="shrink-0 text-byzantin-gold"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <a
                        href={`mailto:${email}`}
                        className="transition-colors hover:text-brand-cream"
                      >
                        {email}
                      </a>
                    </p>
                  </div>
                </div>

                <SectionDivider variant="simple" className="my-6" />

                {/* Hours */}
                <div className="space-y-3">
                  <h3 className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
                    Horaires
                  </h3>
                  {hours.map((slot: { days: string; openTime: string; closeTime: string }) => (
                    <div key={slot.days} className="flex items-center justify-between border-b border-neutral-800 pb-3 text-sm">
                      <span className="text-brand-cream/50">{slot.days}</span>
                      <span className="font-price tracking-wider text-brand-cream">
                        {slot.openTime} – {slot.closeTime}
                      </span>
                    </div>
                  ))}
                </div>

                <SectionDivider variant="simple" className="my-6" />

                {/* Map */}
                <div className="overflow-hidden rounded-sm border border-byzantin-gold/10">
                  <div style={{ filter: "grayscale(1) invert(0.92) contrast(0.85)" }} className="transition-all duration-500 hover:filter-none">
                    <iframe
                      src={mapsEmbed}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Emplacement du restaurant"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
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
