"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import CategoryHeader from "@/components/ui/CategoryHeader";
import { RESTAURANT } from "@/lib/constants";
import MenuItemCard from "./MenuItemCard";

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
  allergens?: string[];
  tags?: string[];
  extras?: { name: string; price: number }[];
}

interface MenuContentProps {
  categories: Category[];
  items: MenuItem[];
}

function getSlug(slug: { current: string } | string | undefined): string {
  if (!slug) return "";
  if (typeof slug === "string") return slug;
  return slug.current;
}

function normalize(value: string | undefined) {
  return (value ?? "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export default function MenuContent({ categories, items }: MenuContentProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0] ? getSlug(categories[0].slug) : ""
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [compactMode, setCompactMode] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const tabsRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

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
          ? categoryItems.filter((item) => {
              const haystack = [
                item.name,
                item.description,
                item.tags?.join(" "),
                item.allergens?.join(" "),
              ]
                .filter(Boolean)
                .join(" ");

              return normalize(haystack).includes(normalizedSearch);
            })
          : categoryItems;

        return {
          ...category,
          slug,
          items: filteredItems,
        };
      })
      .filter((category) => category.items.length > 0);
  }, [categories, items, normalizedSearch]);

  const uncategorized = useMemo(() => {
    const base = items.filter((item) => !item.category);
    if (!normalizedSearch) return base;

    return base.filter((item) =>
      normalize([item.name, item.description, item.tags?.join(" ")].filter(Boolean).join(" ")).includes(normalizedSearch)
    );
  }, [items, normalizedSearch]);

  const totalVisibleItems = filteredCategories.reduce(
    (count, category) => count + category.items.length,
    uncategorized.length
  );

  const visibleCategoryIds = useMemo(() => {
    const ids = filteredCategories.map((category) => category.slug);
    if (uncategorized.length > 0) {
      ids.push("autres");
    }
    return ids;
  }, [filteredCategories, uncategorized.length]);

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
      const element = sectionRefs.current.get(slug);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [observerCallback, visibleCategoryIds]);

  useEffect(() => {
    if (!tabsRef.current) return;
    const activeElement = tabsRef.current.querySelector("[data-active='true']");
    if (activeElement instanceof HTMLElement) {
      activeElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentActiveCategory]);

  const scrollToCategory = (slug: string) => {
    const element = sectionRefs.current.get(slug);
    if (!element) return;

    isScrolling.current = true;
    setActiveCategory(slug);

    element.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      isScrolling.current = false;
    }, 700);
  };

  return (
    <section className="bg-brand-dark pb-16">
      <div className="border-y border-brand-cream/10 bg-brand-dark/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Rechercher dans la carte</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Rechercher un plat, une boisson, un ingrédient..."
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

            <button
              type="button"
              onClick={() => setCompactMode((current) => !current)}
              aria-pressed={compactMode}
              className={`rounded-full border px-4 py-3 text-xs uppercase tracking-[0.2em] transition-colors ${
                compactMode
                  ? "border-byzantin-gold bg-byzantin-gold/12 text-brand-cream"
                  : "border-brand-cream/15 text-brand-cream/70"
              }`}
            >
              {compactMode ? "Vue détaillée" : "Vue rapide"}
            </button>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/reservation"
                className="rounded-sm bg-byzantin-gold px-5 py-3 text-xs font-nav uppercase tracking-[0.15em] text-byzantin-chocolate"
              >
                Réserver
              </Link>
              <a
                href={RESTAURANT.phoneHref}
                className="rounded-full border border-brand-cream/15 px-5 py-3 text-xs uppercase tracking-[0.2em] text-brand-cream/75"
              >
                Appeler
              </a>
            </div>
          </div>

          <p className="mt-4 text-sm text-brand-cream/55">
            {totalVisibleItems} proposition{totalVisibleItems > 1 ? "s" : ""} visible
            {searchTerm ? ` pour “${searchTerm}”` : ""}.
          </p>
        </div>
      </div>

      {visibleCategoryIds.length > 0 && (
        <div className="sticky top-[79px] z-30 border-b border-brand-cream/10 bg-brand-dark/92 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-6">
            <div ref={tabsRef} className="scrollbar-hide flex gap-2 overflow-x-auto py-3">
              {filteredCategories.map((category) => {
              const isActive = currentActiveCategory === category.slug;

                return (
                  <button
                    key={category.slug}
                    type="button"
                    data-active={isActive}
                    onClick={() => scrollToCategory(category.slug)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                      isActive
                        ? "border-byzantin-gold bg-byzantin-gold/12 text-brand-cream"
                        : "border-brand-cream/10 text-brand-cream/55 hover:text-brand-cream"
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
              {uncategorized.length > 0 && (
                <button
                  type="button"
                  data-active={currentActiveCategory === "autres"}
                  onClick={() => scrollToCategory("autres")}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                    currentActiveCategory === "autres"
                      ? "border-byzantin-gold bg-byzantin-gold/12 text-brand-cream"
                      : "border-brand-cream/10 text-brand-cream/55 hover:text-brand-cream"
                  }`}
                >
                  Autres
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-6 pt-12">
        {filteredCategories.length === 0 && uncategorized.length === 0 ? (
          <div className="rounded-[2rem] border border-brand-cream/10 bg-brand-navy/30 p-10 text-center">
            <p className="font-subtitle text-lg text-brand-cream">
              Aucun résultat
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-cream/55">
              Essayez un autre mot-clé ou appelez-nous si vous cherchez une envie
              précise, une composition particulière ou une option sur mesure.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="rounded-full border border-brand-cream/15 px-5 py-3 text-xs uppercase tracking-[0.2em] text-brand-cream/75"
              >
                Réinitialiser
              </button>
              <a
                href={RESTAURANT.phoneHref}
                className="rounded-sm bg-byzantin-gold px-5 py-3 text-xs font-nav uppercase tracking-[0.15em] text-byzantin-chocolate"
              >
                Nous appeler
              </a>
            </div>
          </div>
        ) : null}

        {filteredCategories.map((category, index) => {
          const isFormules = category.slug === "formules";
          const iconKey = category.slug.replace(/-/g, "_");

          return (
            <section
              key={category.slug}
              id={category.slug}
              ref={(element) => {
                if (element) {
                  sectionRefs.current.set(category.slug, element);
                }
              }}
              className={`${index > 0 ? "mt-16" : ""} scroll-mt-36 ${
                isFormules
                  ? "relative rounded-sm border border-byzantin-gold/20 bg-byzantin-gold/5 p-6 md:p-8"
                  : ""
              }`}
            >
              <ScrollReveal stagger staggerChildren={0.08}>
                <CategoryHeader
                  icon={iconKey}
                  title={category.name}
                />
                {category.description && (
                  <p className="-mt-4 mb-8 max-w-xl text-sm leading-relaxed text-brand-cream/60">
                    {category.description}
                  </p>
                )}

                <div className="divide-y divide-brand-cream/10">
                  {category.items.map((item) => (
                    <ScrollReveal key={item._id}>
                      <div className="group -mx-2 rounded-sm px-2 py-3 transition-colors hover:bg-byzantin-gold/5">
                        <MenuItemCard item={item} compact={compactMode} />
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>
            </section>
          );
        })}

        {uncategorized.length > 0 && (
          <section
            id="autres"
            ref={(element) => {
              if (element) {
                sectionRefs.current.set("autres", element);
              }
            }}
            className="mt-16 scroll-mt-36"
          >
            <ScrollReveal stagger staggerChildren={0.08}>
              <span className="mb-2 block font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
                Autres
              </span>
              <div className="mb-8 mt-2 h-px w-10 bg-byzantin-gold/50" />

              <div className="divide-y divide-brand-cream/10">
                {uncategorized.map((item) => (
                  <ScrollReveal key={item._id}>
                    <div className="group -mx-2 rounded-sm px-2 py-3 transition-colors hover:bg-byzantin-gold/5">
                      <MenuItemCard item={item} compact={compactMode} />
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </section>
        )}
      </div>
    </section>
  );
}
