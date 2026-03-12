"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import GoldButton from "./ui/GoldButton";

export default function VilleneuveSection() {
  return (
    <section className="bg-brand-dark py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* Image */}
        <ScrollReveal>
          <div className="relative aspect-[3/2] overflow-hidden rounded-sm">
            <Image
              src="/images/restaurant/WhatsApp-Image-2025-05-22-at-22.59.12-3-scaled.jpeg"
              alt="Vue du restaurant Le Pressoir Byzantin à Villeneuve"
              fill
              quality={72}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </ScrollReveal>

        {/* Text */}
        <ScrollReveal delay={0.15}>
          <span className="mb-4 block font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
            Découvrez Villeneuve
          </span>
          <h2 className="font-subtitle text-3xl font-semibold text-brand-cream md:text-4xl leading-tight">
            Une table au bord du Léman
          </h2>
          <div className="mt-6 mb-6 h-px w-12 bg-byzantin-gold" />
          <p className="text-lg leading-relaxed text-brand-cream/70">
            Au cœur de Villeneuve, entre lac et vignobles, Le Pressoir Byzantin
            vous invite à un voyage culinaire où chaque plat raconte une
            histoire méditerranéenne. Un cadre chaleureux, une cuisine de
            caractère et l&apos;hospitalité comme art de vivre.
          </p>
          <div className="mt-8">
            <GoldButton href="/a-propos" variant="outline">
              Notre histoire
            </GoldButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
