"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import SectionDivider from "./ui/SectionDivider";

interface PhilosophyProps {
  title: string;
  text: string;
}

export default function Philosophy({ title, text }: PhilosophyProps) {
  return (
    <section className="bg-brand-dark py-24 md:py-32">
      <SectionDivider variant="ornate" className="mb-16" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* Text */}
        <ScrollReveal stagger staggerChildren={0.15}>
          <span className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold block mb-4">
            Notre philosophie
          </span>
          <h2 className="font-subtitle text-3xl font-semibold text-brand-cream md:text-4xl lg:text-5xl leading-tight">
            {title}
          </h2>
          <div className="mt-6 mb-8 h-px w-12 bg-byzantin-gold" />
          <p className="text-lg leading-relaxed text-brand-cream/70">
            {text}
          </p>
        </ScrollReveal>

        {/* Image */}
        <ScrollReveal delay={0.2}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/images/restaurant/WhatsApp-Image-2025-05-22-at-22.59.13-4-scaled.jpeg"
              alt="L'intérieur du Pressoir Byzantin"
              fill
              quality={72}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </ScrollReveal>
      </div>
      <SectionDivider variant="ornate" className="mt-16" />
    </section>
  );
}
