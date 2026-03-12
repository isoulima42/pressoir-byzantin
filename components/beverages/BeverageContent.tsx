"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import CategoryHeader from "@/components/ui/CategoryHeader";
import GoldButton from "@/components/ui/GoldButton";
import { RESTAURANT } from "@/lib/constants";

/* ── Types ─────────────────────────────────────────────── */

interface Category {
  _id: string;
  name: string;
  slug: { current: string } | string;
  description?: string;
}

interface MenuItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: { _id: string; name: string; slug: { current: string } | string };
  tags?: string[];
  extras?: { name: string; price: number }[];
}

interface BeverageContentProps {
  categories: Category[];
  items: MenuItem[];
  drinkImageMap: Record<string, string>;
}

/* ── Helpers ───────────────────────────────────────────── */

function getSlug(slug: { current: string } | string | undefined): string {
  if (!slug) return "";
  if (typeof slug === "string") return slug;
  return slug.current;
}

function normalize(value: string | undefined) {
  return (value ?? "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
});

const COCKTAIL_IMAGES: Record<string, string> = {
  mojito: "/images/generated/drinks/mojito.webp",
  "aperol-spritz": "/images/generated/drinks/aperol_spritz.webp",
  "pina-colada": "/images/generated/drinks/pina_colada.webp",
  "cocktail-pressoir": "/images/generated/drinks/cocktail_pressoir.webp",
};

/* ── Component ─────────────────────────────────────────── */

export default function BeverageContent({ categories, items, drinkImageMap }: BeverageContentProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0] ? getSlug(categories[0].slug) : ""
  );
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const tabsRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const normalizedSearch = normalize(searchTerm.trim());

  const filteredCategories = useMemo(() => {
    return categories
      .map((category) => {
        const slug = getSlug(category.slug);
        const categoryItems = items.filter((item) => {
          if (!item.category) return false;
          return getSlug(item.category.slug) === slug;
        });
        const filteredItems = normalizedSearch
          ? categoryItems.filter((item) =>
              normalize([item.name, item.description, item.tags?.join(" ")].filter(Boolean).join(" ")).includes(normalizedSearch)
            )
          : categoryItems;
        return { ...category, slug, items: filteredItems };
      })
      .filter((cat) => cat.items.length > 0);
  }, [categories, items, normalizedSearch]);

  const visibleCategoryIds = useMemo(
    () => filteredCategories.map((c) => c.slug),
    [filteredCategories]
  );

  const currentActiveCategory = visibleCategoryIds.includes(activeCategory)
    ? activeCategory
    : visibleCategoryIds[0] ?? "";

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    if (isScrolling.current) return;
    for (const entry of entries) {
      if (entry.isIntersecting) {
        setActiveCategory(entry.target.id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-160px 0px -55% 0px",
      threshold: 0,
    });
    visibleCategoryIds.forEach((slug) => {
      const el = sectionRefs.current.get(slug);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [observerCallback, visibleCategoryIds]);

  useEffect(() => {
    if (!tabsRef.current) return;
    const active = tabsRef.current.querySelector("[data-active='true']");
    if (active instanceof HTMLElement) {
      active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [currentActiveCategory]);

  const scrollToCategory = (slug: string) => {
    const el = sectionRefs.current.get(slug);
    if (!el) return;
    isScrolling.current = true;
    setActiveCategory(slug);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => { isScrolling.current = false; }, 700);
  };

  const totalVisible = filteredCategories.reduce((n, c) => n + c.items.length, 0);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[40vh] min-h-[320px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <Image
            src="/images/generated/drinks/cocktail_pressoir.webp"
            alt="Cocktail signature du Pressoir Byzantin"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={72}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/50 to-brand-dark" />
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none bg-noise" />
        <motion.div
          style={{ opacity: heroContentOpacity }}
          className="relative flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <motion.div {...fade(0)} className="mb-6 h-px w-12 bg-byzantin-gold" />
          <motion.span {...fade(0.1)} className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
            Le Pressoir Byzantin
          </motion.span>
          <motion.h1 {...fade(0.2)} className="mt-3 font-heading text-4xl font-bold text-brand-cream md:text-5xl lg:text-6xl">
            Carte des Boissons
          </motion.h1>
          <motion.p {...fade(0.4)} className="mt-4 max-w-md text-base text-brand-cream/60 md:text-lg">
            Vins, cocktails, bières artisanales et boissons de caractère
          </motion.p>
          <motion.div {...fade(0.55)} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <GoldButton href="/reservation">Réserver</GoldButton>
            <GoldButton href="/carte-des-mets" variant="outline">Voir les mets</GoldButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Search + Tabs ─────────────────────────────── */}
      <section className="bg-brand-dark pb-16">
        <div className="border-y border-brand-cream/10 bg-brand-dark/80 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-6 py-6">
            <label className="relative block">
              <span className="sr-only">Rechercher une boisson</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un vin, cocktail, bière..."
                className="w-full rounded-full border border-brand-cream/10 bg-brand-navy/40 px-5 py-3 text-sm text-brand-cream placeholder:text-brand-cream/30 focus:border-byzantin-gold focus:outline-none"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-brand-cream/50"
                >
                  Effacer
                </button>
              )}
            </label>
            <p className="mt-4 text-sm text-brand-cream/55">
              {totalVisible} boisson{totalVisible > 1 ? "s" : ""} disponible{totalVisible > 1 ? "s" : ""}
              {searchTerm ? ` pour "${searchTerm}"` : ""}.
            </p>
          </div>
        </div>

        {visibleCategoryIds.length > 0 && (
          <div className="sticky top-[79px] z-30 border-b border-brand-cream/10 bg-brand-dark/92 backdrop-blur-xl">
            <div className="mx-auto max-w-6xl px-6">
              <div ref={tabsRef} className="scrollbar-hide flex gap-2 overflow-x-auto py-3">
                {filteredCategories.map((cat) => {
                  const isActive = currentActiveCategory === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      data-active={isActive}
                      onClick={() => scrollToCategory(cat.slug)}
                      className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                        isActive
                          ? "border-byzantin-gold bg-byzantin-gold/12 text-brand-cream"
                          : "border-brand-cream/10 text-brand-cream/55 hover:text-brand-cream"
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Category sections ────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 pt-12">
          {filteredCategories.length === 0 && (
            <div className="rounded-sm border border-brand-cream/10 bg-brand-navy/30 p-10 text-center">
              <p className="font-subtitle text-lg text-brand-cream">Aucun résultat</p>
              <p className="mt-3 text-sm text-brand-cream/55">
                Essayez un autre mot-clé ou consultez notre carte des mets.
              </p>
              <div className="mt-6">
                <GoldButton href="/carte-des-mets" variant="outline">Carte des mets</GoldButton>
              </div>
            </div>
          )}

          {filteredCategories.map((category, index) => {
            const isVins = category.slug === "vins";
            const isCocktails = category.slug === "cocktails";
            const iconKey = category.slug.replace(/-/g, "_");

            return (
              <section
                key={category.slug}
                id={category.slug}
                ref={(el) => { if (el) sectionRefs.current.set(category.slug, el); }}
                className={`${index > 0 ? "mt-16" : ""} scroll-mt-36`}
              >
                {/* Wines: special premium layout */}
                {isVins ? (
                  <div className="rounded-sm border border-brand-cream/8 bg-brand-navy/20 p-6 md:p-8">
                    <ScrollReveal>
                      <CategoryHeader icon={iconKey} title={category.name} />
                      {category.description && (
                        <p className="-mt-4 mb-8 max-w-xl text-sm leading-relaxed text-brand-cream/60">
                          {category.description}
                        </p>
                      )}
                    </ScrollReveal>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {category.items.map((item) => (
                        <ScrollReveal key={item._id}>
                          <div className="group rounded-sm border border-brand-cream/10 bg-brand-dark/40 p-5 transition-colors hover:border-byzantin-gold/30">
                            {item.image && (
                              <div className="mb-4 overflow-hidden rounded-sm">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={300}
                                  height={200}
                                  className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                            )}
                            <h3 className="font-subtitle text-xl text-brand-cream">{item.name}</h3>
                            {item.description && (
                              <p className="mt-2 text-sm leading-relaxed text-brand-cream/50">{item.description}</p>
                            )}
                            <p className="mt-3 font-price text-lg text-byzantin-gold">{item.price} CHF</p>
                          </div>
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                ) : isCocktails ? (
                  /* Cocktails: card grid with round images */
                  <ScrollReveal>
                    <CategoryHeader icon={iconKey} title={category.name} />
                    {category.description && (
                      <p className="-mt-4 mb-8 max-w-xl text-sm leading-relaxed text-brand-cream/60">
                        {category.description}
                      </p>
                    )}

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {category.items.map((item) => {
                        const slugStr = item.name.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/\p{Diacritic}/gu, "");
                        const cocktailImg = item.image ?? COCKTAIL_IMAGES[slugStr] ?? "/images/generated/drinks/cocktail_pressoir.webp";
                        return (
                          <div key={item._id} className="group text-center">
                            <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-2 border-byzantin-gold/20 transition-all group-hover:border-byzantin-gold/50">
                              <Image
                                src={cocktailImg}
                                alt={item.name}
                                width={128}
                                height={128}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <h3 className="font-subtitle text-lg text-brand-cream">{item.name}</h3>
                            {item.description && (
                              <p className="mt-1 text-xs leading-relaxed text-brand-cream/50">{item.description}</p>
                            )}
                            <p className="mt-2 font-price text-byzantin-gold">{item.price} CHF</p>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollReveal>
                ) : (
                  /* Default: list layout like MenuContent */
                  <ScrollReveal stagger staggerChildren={0.08}>
                    <CategoryHeader icon={iconKey} title={category.name} />
                    {category.description && (
                      <p className="-mt-4 mb-8 max-w-xl text-sm leading-relaxed text-brand-cream/60">
                        {category.description}
                      </p>
                    )}

                    <div className="divide-y divide-brand-cream/10">
                      {category.items.map((item) => (
                        <div key={item._id} className="group -mx-2 rounded-sm px-2 py-4 transition-colors hover:bg-byzantin-gold/5">
                          <div className="flex items-baseline gap-2">
                            <span className="shrink-0 font-serif text-brand-cream">{item.name}</span>
                            <div className="flex-1 translate-y-[-4px] border-b border-dotted border-neutral-700" />
                            <span className="shrink-0 font-price tracking-wider text-byzantin-gold">{item.price} CHF</span>
                          </div>
                          {item.description && (
                            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-brand-cream/40">{item.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollReveal>
                )}
              </section>
            );
          })}
        </div>

        {/* ── Bottom CTA ──────────────────────────────── */}
        <ScrollReveal className="mx-auto mt-20 max-w-6xl px-6">
          <div className="rounded-sm border border-byzantin-gold/10 bg-brand-navy/30 p-8 text-center">
            <p className="font-nav text-xs uppercase tracking-[0.28em] text-byzantin-gold">
              À table
            </p>
            <h2 className="mt-4 font-subtitle text-2xl text-brand-cream md:text-3xl">
              Mariez vos envies
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-cream/55">
              Découvrez nos mets pour accompagner votre choix de boisson, ou
              réservez une table pour vivre l&apos;expérience complète.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <GoldButton href="/carte-des-mets">Voir les mets</GoldButton>
              <GoldButton href="/reservation" variant="outline">Réserver</GoldButton>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
