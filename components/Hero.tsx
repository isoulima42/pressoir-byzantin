"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import GoldButton from "./ui/GoldButton";

interface HeroProps {
  name: string;
  tagline: string;
}

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
});

export default function Hero({ name, tagline }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const letters = useMemo(() => name.split(""), [name]);

  return (
    <div ref={ref} className="relative h-[100dvh] overflow-hidden w-full flex items-center justify-center">
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0 origin-top"
        style={{ y: imageY }}
      >
        <Image
          src="/images/restaurant/WhatsApp-Image-2025-05-22-at-22.59.11-1-scaled.jpeg"
          alt="L'intérieur du Pressoir Byzantin"
          fill
          priority
          className="object-cover scale-105"
          sizes="100vw"
          quality={72}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/50 to-brand-dark" />
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none bg-noise" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center mt-12"
      >
        {/* Decorative line */}
        <motion.div
          {...fade(0.1)}
          className="mb-8 h-px w-16 bg-byzantin-gold"
        />

        <motion.h1
          className="font-heading text-5xl font-bold text-brand-cream md:text-7xl lg:text-8xl drop-shadow-lg"
          aria-label={name}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.03,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="inline-block"
              style={{ whiteSpace: letter === " " ? "pre" : undefined }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 + letters.length * 0.03 + 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-brand-cream/80 md:text-xl font-accent italic tracking-wide"
        >
          {tagline}
        </motion.p>

        <motion.div
          {...fade(0.62)}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 font-nav text-xs uppercase tracking-[0.18em] text-brand-cream/70"
        >
          <span className="rounded-full border border-brand-cream/15 bg-brand-dark/25 px-4 py-2 backdrop-blur-sm">
            Villeneuve
          </span>
          <span className="rounded-full border border-brand-cream/15 bg-brand-dark/25 px-4 py-2 backdrop-blur-sm">
            Cuisine maison
          </span>
          <span className="rounded-full border border-brand-cream/15 bg-brand-dark/25 px-4 py-2 backdrop-blur-sm">
            Réservation en 1 minute
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          {...fade(0.7)}
          className="mt-12 flex flex-col gap-4 sm:flex-row"
        >
          <GoldButton href="/reservation" className="px-8 py-4">
            Réserver votre table
          </GoldButton>
          <GoldButton href="/carte-des-mets" variant="outline" className="px-8 py-4">
            Découvrir nos créations
          </GoldButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — fades on scroll */}
      <motion.div
        {...fade(1.2)}
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-10 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="20"
            height="30"
            viewBox="0 0 20 30"
            fill="none"
            className="text-byzantin-gold/50"
          >
            <rect
              x="1"
              y="1"
              width="18"
              height="28"
              rx="9"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="10" cy="10" r="2" fill="currentColor" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Seamless blend to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark to-transparent z-10 pointer-events-none" />
    </div>
  );
}
