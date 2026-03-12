"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import { RESTAURANT } from "@/lib/constants";

interface ServiceCategory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  items: { _id: string; title: string; description?: string }[];
}

interface VenueInfo {
  capacity: number;
  features: string[];
  images: string[];
}

interface AdditionalService {
  _id: string;
  title: string;
  description?: string;
}

interface ServicesContentProps {
  categories: ServiceCategory[];
  venue: VenueInfo;
  additionalServices: AdditionalService[];
}

const PROCESS_STEPS = [
  {
    title: "Le cadre",
    text: "Date, format, nombre d’invités et niveau de service souhaité.",
  },
  {
    title: "La proposition",
    text: "Nous cadrons le lieu, la cuisine, le rythme et les besoins utiles.",
  },
  {
    title: "La mise en place",
    text: "Vous avancez avec une formule lisible, sans flou sur l’organisation.",
  },
];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
});

function buildContactHref(title: string, message?: string) {
  const params = new URLSearchParams({
    subject: "evenement",
    message:
      message ??
      `Bonjour,\n\nJe souhaite échanger au sujet de la formule “${title}”. Merci de me recontacter pour construire une proposition adaptée.`,
  });

  return `/contact?${params.toString()}`;
}

export default function ServicesContent({
  categories,
  venue,
  additionalServices,
}: ServicesContentProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const venueCategory =
    categories.find((category) => category.slug === "location-de-salle") ?? null;
  const serviceCategories = categories.filter(
    (category) => category.slug !== "location-de-salle"
  );

  const topCards = [
    ...serviceCategories.map((category) => ({
      key: category.slug,
      title: category.title,
      href: `#${category.slug}`,
      description: category.description,
      items: category.items.slice(0, 3).map((item) => item.title),
      icon: category.icon,
    })),
    {
      key: "nos-espaces",
      title: venueCategory?.title ?? "Privatisation du Pressoir",
      href: "#nos-espaces",
      description:
        venueCategory?.description ??
        "Un lieu de caractère pour recevoir dans un cadre immédiatement mémorable.",
      items: [
        `${venue.capacity} convives assis`,
        "Voûtes en pierre et ambiance chaleureuse",
        "Service sur mesure",
      ],
      icon: venueCategory?.icon ?? "🏛️",
    },
  ];

  return (
    <>
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-brand-cream/10 bg-brand-dark"
      >
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <Image
            src="/images/events/event-2.png"
            alt="Réception au Pressoir Byzantin"
            fill
            priority
            quality={72}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark" />

        <div className="relative z-10 mx-auto grid min-h-[58vh] max-w-7xl items-end gap-10 px-6 pb-12 pt-36 lg:grid-cols-[1.3fr_0.7fr] lg:px-10">
          <div>
            <motion.div {...fade(0)} className="mb-6 h-px w-14 bg-byzantin-gold" />
            <motion.span
              {...fade(0.08)}
              className="font-nav text-xs uppercase tracking-[0.32em] text-byzantin-gold"
            >
              Le Pressoir Byzantin
            </motion.span>
            <motion.h1
              {...fade(0.16)}
              className="mt-4 max-w-4xl font-heading text-4xl font-bold text-brand-cream md:text-5xl lg:text-6xl"
            >
              Événements & Traiteur
            </motion.h1>
            <motion.p
              {...fade(0.28)}
              className="mt-5 max-w-2xl text-base leading-relaxed text-brand-cream/72 md:text-lg"
            >
              Réceptions privées, rendez-vous professionnels, service traiteur et
              privatisation du Pressoir. Le but est simple: trouver vite la bonne
              formule, puis construire une proposition claire.
            </motion.p>

            <motion.div
              {...fade(0.4)}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/contact?subject=evenement"
                className="rounded-sm bg-byzantin-gold px-6 py-3 text-center text-sm font-nav uppercase tracking-[0.15em] text-byzantin-chocolate"
              >
                Demander une proposition
              </Link>
              <a
                href={RESTAURANT.phoneHref}
                className="rounded-sm border border-byzantin-gold/40 px-6 py-3 text-center text-sm font-nav uppercase tracking-[0.15em] text-byzantin-gold"
              >
                Appeler le restaurant
              </a>
            </motion.div>
          </div>

          <motion.div
            {...fade(0.5)}
            className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1"
          >
            <div className="rounded-[1.5rem] border border-brand-cream/10 bg-brand-dark/45 p-5 backdrop-blur-sm">
              <p className="font-nav text-xs uppercase tracking-[0.24em] text-byzantin-gold">
                Capacité
              </p>
              <p className="mt-3 font-heading text-3xl text-brand-cream">
                {venue.capacity}
              </p>
              <p className="mt-1 text-sm text-brand-cream/55">convives assis</p>
            </div>
            <div className="rounded-[1.5rem] border border-brand-cream/10 bg-brand-dark/45 p-5 backdrop-blur-sm">
              <p className="font-nav text-xs uppercase tracking-[0.24em] text-byzantin-gold">
                Lieu ou extérieur
              </p>
              <p className="mt-3 text-sm leading-relaxed text-brand-cream/65">
                Privatisation sur place, chef à domicile ou formule traiteur.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-brand-cream/10 bg-brand-dark/45 p-5 backdrop-blur-sm">
              <p className="font-nav text-xs uppercase tracking-[0.24em] text-byzantin-gold">
                Réponse
              </p>
              <p className="mt-3 text-sm leading-relaxed text-brand-cream/65">
                {RESTAURANT.responseSla}. Pour un besoin urgent, l’appel va plus vite.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-[79px] z-20 border-b border-brand-cream/10 bg-brand-dark/92 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-3 lg:px-10">
          <div className="scrollbar-hide flex gap-2 overflow-x-auto">
            {serviceCategories.map((category) => (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                className="whitespace-nowrap rounded-full border border-brand-cream/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-brand-cream/70 transition-colors hover:border-byzantin-gold/40 hover:text-brand-cream"
              >
                {category.title}
              </a>
            ))}
            <a
              href="#nos-espaces"
              className="whitespace-nowrap rounded-full border border-brand-cream/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-brand-cream/70 transition-colors hover:border-byzantin-gold/40 hover:text-brand-cream"
            >
              Nos espaces
            </a>
            {additionalServices.length > 0 ? (
              <a
                href="#prestations-complementaires"
                className="whitespace-nowrap rounded-full border border-brand-cream/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-brand-cream/70 transition-colors hover:border-byzantin-gold/40 hover:text-brand-cream"
              >
                Prestations
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-brand-dark py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {topCards.map((card, index) => (
              <ScrollReveal key={card.key} delay={Math.min(index * 0.06, 0.18)}>
                <a
                  href={card.href}
                  className="block rounded-[1.5rem] border border-brand-cream/10 bg-brand-navy/22 p-6 transition-colors hover:border-byzantin-gold/35"
                >
                  <div className="flex items-center gap-3">
                    {card.icon ? (
                      <span aria-hidden="true" className="text-xl">
                        {card.icon}
                      </span>
                    ) : null}
                    <p className="font-nav text-sm uppercase tracking-[0.14em] text-brand-cream">
                      {card.title}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-brand-cream/58">
                    {card.description}
                  </p>
                  <div className="mt-5 space-y-2">
                    {card.items.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm text-brand-cream/70">
                        <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-byzantin-gold" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 font-nav text-xs uppercase tracking-[0.22em] text-byzantin-gold">
                    Voir ce format
                  </p>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="nos-espaces" className="border-y border-brand-cream/10 bg-brand-navy py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.6fr_0.4fr] lg:px-10">
          <div>
            <ScrollReveal>
              <p className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
                Privatiser le Pressoir
              </p>
              <h2 className="mt-4 font-subtitle text-3xl font-semibold text-brand-cream md:text-4xl">
                Le lieu n’est pas un détail, c’est une partie de la réception
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-cream/58">
                Sous les voûtes du Pressoir, l’atmosphère existe déjà. Cela permet
                de recevoir dans un cadre marqué, sans surcharger la mise en scène
                et en gardant une lecture claire du service.
              </p>
            </ScrollReveal>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {venue.features.map((feature) => (
                <ScrollReveal key={feature}>
                  <div className="rounded-2xl border border-brand-cream/10 bg-brand-dark/30 p-4 text-sm leading-relaxed text-brand-cream/65">
                    {feature}
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={buildContactHref(
                    venueCategory?.title ?? "Privatisation du Pressoir",
                    `Bonjour,\n\nJe souhaite échanger au sujet de la privatisation du Pressoir pour un événement. Merci de me recontacter pour cadrer le lieu, la date et le format.`
                  )}
                  className="rounded-sm bg-byzantin-gold px-6 py-3 text-center text-sm font-nav uppercase tracking-[0.15em] text-byzantin-chocolate"
                >
                  Privatiser le lieu
                </Link>
                <a
                  href={RESTAURANT.phoneHref}
                  className="rounded-sm border border-byzantin-gold/40 px-6 py-3 text-center text-sm font-nav uppercase tracking-[0.15em] text-byzantin-gold"
                >
                  {RESTAURANT.phone}
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid gap-4 self-start sm:grid-cols-2 lg:grid-cols-2">
            <ScrollReveal>
              <div className="rounded-[1.5rem] border border-byzantin-gold/20 bg-brand-dark/30 p-6">
                <p className="font-nav text-xs uppercase tracking-[0.22em] text-byzantin-gold">
                  Capacité assise
                </p>
                <p className="mt-4 font-heading text-5xl text-brand-cream">
                  {venue.capacity}
                </p>
                <p className="mt-2 text-sm text-brand-cream/55">convives</p>
              </div>
            </ScrollReveal>

            {venue.images.slice(0, 3).map((src, index) => (
              <ScrollReveal key={src} delay={Math.min(index * 0.08, 0.16)}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={src}
                    alt={`Le Pressoir Byzantin, espace de réception ${index + 1}`}
                    fill
                    quality={70}
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-dark py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal className="max-w-3xl">
            <p className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
              Nos formats
            </p>
            <h2 className="mt-4 font-subtitle text-3xl font-semibold text-brand-cream md:text-4xl">
              Trois portes d’entrée, selon la nature de votre réception
            </h2>
          </ScrollReveal>

          <div className="mt-10 space-y-6">
            {serviceCategories.map((category, index) => {
              const isEven = index % 2 === 1;
              return (
                <ScrollReveal key={category._id} delay={Math.min(index * 0.06, 0.18)}>
                  <article
                    id={category.slug}
                    className="rounded-sm border border-brand-cream/10 bg-brand-navy/22 p-6 md:p-8"
                  >
                    <div className={`grid gap-8 lg:grid-cols-2 ${isEven ? "lg:direction-rtl" : ""}`}>
                      {/* Image side */}
                      <div className={`space-y-4 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                        {category.imageUrl ? (
                          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                            <Image
                              src={category.imageUrl}
                              alt={category.title}
                              fill
                              quality={72}
                              className="object-cover transition-transform duration-700 hover:scale-105"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                          </div>
                        ) : null}
                      </div>

                      {/* Text side */}
                      <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                        <div className="flex items-center gap-3">
                          {category.icon ? (
                            <span aria-hidden="true" className="text-2xl">
                              {category.icon}
                            </span>
                          ) : null}
                          <div>
                            <p className="font-nav text-xs uppercase tracking-[0.24em] text-byzantin-gold">
                              {String(index + 1).padStart(2, "0")}
                            </p>
                            <h3 className="mt-2 font-subtitle text-2xl text-brand-cream">
                              {category.title}
                            </h3>
                          </div>
                        </div>

                        {category.description ? (
                          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-cream/58">
                            {category.description}
                          </p>
                        ) : null}

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          {category.items.map((item) => (
                            <div
                              key={item._id}
                              className="rounded-sm border border-brand-cream/10 bg-brand-dark/28 p-4"
                            >
                              <p className="font-nav text-sm uppercase tracking-[0.12em] text-brand-cream">
                                {item.title}
                              </p>
                              {item.description ? (
                                <p className="mt-2 text-sm leading-relaxed text-brand-cream/52">
                                  {item.description}
                                </p>
                              ) : null}
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                          <Link
                            href={buildContactHref(category.title)}
                            className="rounded-sm bg-byzantin-gold px-5 py-3 text-center text-xs font-nav uppercase tracking-[0.15em] text-byzantin-chocolate"
                          >
                            Demander ce format
                          </Link>
                          <a
                            href={RESTAURANT.phoneHref}
                            className="rounded-sm border border-byzantin-gold/40 px-5 py-3 text-center text-xs uppercase tracking-[0.2em] text-byzantin-gold"
                          >
                            En parler au téléphone
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                  {index < serviceCategories.length - 1 && (
                    <SectionDivider variant="simple" className="mt-6" />
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-brand-cream/10 bg-brand-navy py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.42fr_0.58fr] lg:px-10">
          <ScrollReveal>
            <p className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
              Comment on avance
            </p>
            <h2 className="mt-4 font-subtitle text-3xl font-semibold text-brand-cream md:text-4xl">
              Une demande simple, puis un cadrage précis
            </h2>
            <div className="relative mt-8 pl-8">
              {/* Vertical gold line */}
              <div className="absolute left-3 top-1 bottom-1 w-px bg-byzantin-gold/30" />
              <div className="space-y-8">
                {PROCESS_STEPS.map((step, idx) => (
                  <div key={step.title} className="relative">
                    {/* Gold dot on the line */}
                    <div className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-byzantin-gold/40 bg-brand-dark">
                      <span className="font-price text-xs text-byzantin-gold">{idx + 1}</span>
                    </div>
                    <h3 className="font-subtitle text-lg text-brand-cream">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-cream/58">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {additionalServices.length > 0 ? (
            <div id="prestations-complementaires" className="scroll-mt-36">
              <ScrollReveal>
              <p className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
                Prestations complémentaires
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {additionalServices.map((service) => (
                  <div
                    key={service._id}
                    className="rounded-2xl border border-brand-cream/10 bg-brand-dark/28 p-5"
                  >
                    <p className="font-nav text-sm uppercase tracking-[0.12em] text-brand-cream">
                      {service.title}
                    </p>
                    {service.description ? (
                      <p className="mt-2 text-sm leading-relaxed text-brand-cream/58">
                        {service.description}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
              </ScrollReveal>
            </div>
          ) : null}
        </div>
      </section>

      {/* ── Photo Gallery ─────────────────────────────── */}
      {venue.images.length > 0 && (
        <section className="bg-brand-dark py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <ScrollReveal className="mb-10 text-center">
              <p className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
                En images
              </p>
              <h2 className="mt-4 font-subtitle text-3xl font-semibold text-brand-cream md:text-4xl">
                L&apos;ambiance du lieu
              </h2>
            </ScrollReveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {venue.images.slice(0, 4).map((src, i) => (
                <ScrollReveal key={src} delay={i * 0.1}>
                  <button
                    onClick={() => setLightboxIndex(i)}
                    className="group relative block aspect-[4/3] w-full overflow-hidden rounded-sm"
                  >
                    <Image
                      src={src}
                      alt={`Le Pressoir Byzantin ${i + 1}`}
                      fill
                      quality={70}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-brand-dark/0 transition-colors duration-300 group-hover:bg-brand-dark/20" />
                  </button>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Gallery Lightbox ──────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute right-6 top-6 z-10 text-brand-cream/60 transition-colors hover:text-brand-cream"
              aria-label="Fermer"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((c) => c !== null ? (c - 1 + venue.images.length) % venue.images.length : null); }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-brand-dark/50 p-3 text-brand-cream/60 transition-colors hover:text-brand-cream md:left-8"
              aria-label="Photo précédente"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((c) => c !== null ? (c + 1) % venue.images.length : null); }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-brand-dark/50 p-3 text-brand-cream/60 transition-colors hover:text-brand-cream md:right-8"
              aria-label="Photo suivante"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m9 18 6-6-6-6" /></svg>
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[85vh] max-w-[90vw] md:max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={venue.images[lightboxIndex]}
                alt={`Le Pressoir Byzantin ${lightboxIndex + 1}`}
                width={1400}
                height={900}
                quality={78}
                className="max-h-[80vh] w-auto rounded-sm object-contain"
                sizes="90vw"
                priority
              />
              <p className="mt-3 text-center font-nav text-sm uppercase tracking-wider text-brand-cream/60">
                {lightboxIndex + 1} / {venue.images.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="bg-brand-dark py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <p className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
              Ouvrir la discussion
            </p>
            <h2 className="mt-4 font-subtitle text-3xl font-semibold text-brand-cream md:text-4xl">
              Vous pouvez maintenant nous parler de votre événement concrètement
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-cream/58">
              Date, nombre d’invités, type de réception, sur place ou hors les murs:
              avec ces quelques éléments, on peut déjà te guider proprement.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact?subject=evenement"
                className="rounded-sm bg-byzantin-gold px-6 py-3 text-sm font-nav uppercase tracking-[0.15em] text-byzantin-chocolate"
              >
                Décrire votre projet
              </Link>
              <a
                href={RESTAURANT.phoneHref}
                className="rounded-sm border border-byzantin-gold/40 px-6 py-3 text-sm font-nav uppercase tracking-[0.15em] text-byzantin-gold"
              >
                {RESTAURANT.phone}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
