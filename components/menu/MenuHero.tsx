"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { RESTAURANT } from "@/lib/constants";

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

export default function MenuHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[40vh] min-h-[320px] overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src="/images/stock/turkish-pide-with-minced-meat-kiymali-pide-turkis-2025-03-27-00-56-46-utc-scaled.jpg"
          alt="Une pide doree a la sortie du four"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={72}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/50 to-brand-dark" />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none bg-noise" />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div {...fade(0)} className="mb-6 h-px w-12 bg-byzantin-gold" />

        <motion.span
          {...fade(0.1)}
          className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold"
        >
          Le Pressoir Byzantin
        </motion.span>

        <motion.h1
          {...fade(0.2)}
          className="mt-3 font-heading text-4xl font-bold text-brand-cream md:text-5xl lg:text-6xl"
        >
          Notre Carte
        </motion.h1>

        <motion.p
          {...fade(0.4)}
          className="mt-4 max-w-md text-base text-brand-cream/60 md:text-lg"
        >
          Braises, pâtes dorées, mezzés de caractère et douceurs à partager
        </motion.p>

        <motion.div {...fade(0.55)} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/reservation"
            className="rounded-sm bg-byzantin-gold px-6 py-3 text-sm font-nav uppercase tracking-[0.15em] text-byzantin-chocolate"
          >
            Réserver
          </Link>
          <a
            href={RESTAURANT.phoneHref}
            className="rounded-sm border border-byzantin-gold/40 px-6 py-3 text-sm font-nav uppercase tracking-[0.15em] text-byzantin-gold"
          >
            Appeler
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
