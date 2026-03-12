"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import GoldButton from "./ui/GoldButton";
import SectionDivider from "./ui/SectionDivider";
import { urlFor } from "@/sanity/lib/client";

interface Dish {
  name: string;
  slug?: { current: string } | string;
  description: string;
  price: number;
  image?: { asset?: { _ref: string } } | string;
}

interface SignatureDishesProps {
  dishes: Dish[];
}

function getImageSrc(dish: Dish): string {
  if (typeof dish.image === "string") return dish.image;
  if (dish.image?.asset?._ref) return urlFor(dish.image).width(600).height(700).url();
  // Fallback to generated food images
  const slug = getSlug(dish);
  const fallbacks: Record<string, string> = {
    "pizza-turque-lahmacun": "/images/generated/food/lahmacun.webp",
    "pide-fromage": "/images/generated/food/pide_fromage.webp",
    "assiette-adana": "/images/generated/food/assiette_adana.webp",
    "lahmacun": "/images/generated/food/lahmacun.webp",
  };
  return fallbacks[slug] ?? "/images/generated/food/lahmacun.webp";
}

function getSlug(dish: Dish): string {
  if (typeof dish.slug === "string") return dish.slug;
  return dish.slug?.current ?? "";
}

export default function SignatureDishes({ dishes }: SignatureDishesProps) {
  return (
    <section className="bg-brand-navy py-24 md:py-32">
      <SectionDivider variant="simple" className="mb-16" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal className="text-center">
          <span className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
            La carte
          </span>
          <h2 className="mt-4 font-subtitle text-3xl font-semibold text-brand-cream md:text-4xl lg:text-5xl">
            Nos signatures
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-byzantin-gold" />
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {dishes.map((dish, i) => (
            <ScrollReveal key={getSlug(dish) || i} delay={i * 0.15} direction="up">
              <Link
                href="/carte-des-mets"
                className="group block h-full"
                aria-label={`Découvrir ${dish.name} dans la carte`}
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full min-h-[400px] overflow-hidden rounded-sm shadow-xl ring-2 ring-byzantin-gold/0 transition-all duration-500 group-hover:ring-byzantin-gold/40"
                >
                  <Image
                    src={getImageSrc(dish)}
                    alt={dish.name}
                    fill
                    quality={72}
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Hover overlay with noise */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                  <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-10" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-8 translate-y-4 transition-transform duration-500 group-hover:translate-y-0 ease-out">
                    <p className="font-subtitle text-2xl text-brand-cream drop-shadow-md">
                      {dish.name}
                    </p>
                    <p className="mt-3 text-sm text-brand-cream/70 line-clamp-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 leading-relaxed">
                      {dish.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                      <p className="font-price text-xl text-byzantin-gold">
                        {dish.price} <span className="text-sm">CHF</span>
                      </p>
                      <span className="text-byzantin-gold text-sm font-nav uppercase tracking-wider">
                        Voir la carte
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-20 text-center" direction="up">
          <GoldButton href="/carte-des-mets" variant="outline" className="px-10 py-4">
            Voir toute la carte
          </GoldButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
