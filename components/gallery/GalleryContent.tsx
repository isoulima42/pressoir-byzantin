"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

interface Photo {
  _id: string;
  title: string;
  alt: string;
  src: string;
  srcFull: string;
}

interface GalleryContentProps {
  photos: Photo[];
}

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

export default function GalleryContent({ photos }: GalleryContentProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = useCallback(() => {
    setLightboxIndex((c) =>
      c !== null ? (c - 1 + photos.length) % photos.length : null
    );
  }, [photos.length]);
  const next = useCallback(() => {
    setLightboxIndex((c) =>
      c !== null ? (c + 1) % photos.length : null
    );
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();

    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();

      if (e.key !== "Tab" || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handle);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handle);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxIndex, prev, next]);

  return (
    <>
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="bg-brand-dark pb-8 pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <motion.div {...fade(0)} className="mx-auto mb-6 h-px w-12 bg-byzantin-gold" />
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
            Galerie
          </motion.h1>
          <motion.p
            {...fade(0.35)}
            className="mt-4 text-base text-brand-cream/50"
          >
            Fragments d&apos;ambiance, gestes de cuisine et tables qui prennent vie
          </motion.p>
          <motion.div {...fade(0.5)} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/reservation"
              className="rounded-sm bg-byzantin-gold px-6 py-3 text-sm font-nav uppercase tracking-[0.18em] text-byzantin-chocolate"
            >
              Réserver une table
            </Link>
            <Link
              href="/contact?subject=evenement"
              className="rounded-sm border border-byzantin-gold/40 px-6 py-3 text-sm font-nav uppercase tracking-[0.18em] text-byzantin-gold"
            >
              Demander une privatisation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Masonry grid ────────────────────────────────── */}
      <section className="bg-brand-dark pb-24 pt-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {photos.map((photo, i) => (
              <ScrollReveal key={photo._id} delay={Math.min(i * 0.08, 0.5)}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => open(i)}
                  className="group relative mb-4 block w-full overflow-hidden rounded-sm"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={600}
                    height={400}
                    quality={70}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-brand-dark/70 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                    <p className="p-4 font-nav text-sm uppercase tracking-wider text-brand-cream">
                      {photo.title}
                    </p>
                  </div>
                </motion.button>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-12">
            <div className="rounded-[2rem] border border-byzantin-gold/10 bg-brand-navy/30 p-8 text-center">
              <p className="font-nav text-xs uppercase tracking-[0.28em] text-byzantin-gold">
                Prolongez l&apos;ambiance
              </p>
              <h2 className="mt-4 font-subtitle text-2xl text-brand-cream md:text-3xl">
                Passez de l&apos;image à l&apos;expérience
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-cream/55">
                Réservez une table pour vivre la maison au quotidien, ou ouvrez une
                discussion si vous imaginez une célébration plus ample.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/reservation"
                  className="rounded-sm bg-byzantin-gold px-6 py-3 text-sm font-nav uppercase tracking-[0.18em] text-byzantin-chocolate"
                >
                  Réserver
                </Link>
                <Link
                  href="/contact?subject=evenement"
                  className="rounded-sm border border-byzantin-gold/40 px-6 py-3 text-sm font-nav uppercase tracking-[0.18em] text-byzantin-gold"
                >
                  Parler d&apos;un événement
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Lightbox ────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex items-center justify-center"
            onClick={close}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Close */}
            <button
              onClick={close}
              className="absolute right-6 top-6 z-10 text-brand-cream/60 transition-colors hover:text-brand-cream"
              aria-label="Fermer"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-brand-dark/50 p-3 text-brand-cream/60 transition-colors hover:text-brand-cream md:left-8"
              aria-label="Photo précédente"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-brand-dark/50 p-3 text-brand-cream/60 transition-colors hover:text-brand-cream md:right-8"
              aria-label="Photo suivante"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              ref={dialogRef}
              key={lightboxIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              role="dialog"
              aria-modal="true"
              aria-label={photos[lightboxIndex].title}
              className="relative max-h-[85vh] max-w-[90vw] md:max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[lightboxIndex].srcFull}
                alt={photos[lightboxIndex].alt}
                width={1400}
                height={900}
                quality={78}
                className="max-h-[80vh] w-auto rounded-sm object-contain"
                sizes="90vw"
                priority
              />
              <p className="mt-3 text-center font-nav text-sm uppercase tracking-wider text-brand-cream/60">
                {photos[lightboxIndex].title}
                <span className="ml-3 text-brand-cream/30">
                  {lightboxIndex + 1} / {photos.length}
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
