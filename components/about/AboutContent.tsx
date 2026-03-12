"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

interface TeamMember {
  _id: string;
  name: string;
  role?: string;
  photoUrl?: string | null;
  bio?: string;
  order: number;
}

interface AboutContentProps {
  teamMembers: TeamMember[];
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

/* ── Timeline milestones ──────────────────────────────── */

const MILESTONES = [
  {
    year: "Les origines",
    title: "Une passion née en Orient",
    text: "Inspirés par les saveurs authentiques de la cuisine turque, libanaise et méditerranéenne, nous avons rêvé d'un lieu où ces traditions culinaires prendraient vie en Suisse.",
  },
  {
    year: "L'ouverture",
    title: "Villeneuve nous accueille",
    text: "Au cœur de la Grand Rue, Le Pressoir Byzantin ouvre ses portes. Un restaurant chaleureux où chaque plat raconte une histoire, chaque épice évoque un voyage.",
  },
  {
    year: "Aujourd'hui",
    title: "Un voyage culinaire unique",
    text: "Pizzas artisanales, shawarma, pide, crêpes, tacos — notre carte est un carrefour de saveurs. Chaque recette est élaborée avec des ingrédients frais et un savoir-faire qui honore nos racines.",
  },
];

export default function AboutContent({ teamMembers }: AboutContentProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-[50vh] min-h-[360px] overflow-hidden"
      >
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <Image
            src="/images/restaurant/WhatsApp-Image-2025-05-22-at-22.59.12-3-scaled.jpeg"
            alt="L'intérieur du Pressoir Byzantin"
            fill
            priority
            quality={72}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/40 to-brand-dark" />

        <motion.div
          style={{ opacity: contentOpacity }}
          className="relative flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <motion.div {...fade(0)} className="mb-6 h-px w-12 bg-byzantin-gold" />
          <motion.span
            {...fade(0.1)}
            className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold"
          >
            Notre histoire
          </motion.span>
          <motion.h1
            {...fade(0.2)}
            className="mt-3 font-heading text-4xl font-bold text-brand-cream md:text-5xl lg:text-6xl"
          >
            À Propos
          </motion.h1>
        </motion.div>
      </section>

      {/* ── Philosophy quote ──────────────────────────── */}
      <section className="bg-brand-dark py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <div className="mx-auto mb-6 h-px w-12 bg-byzantin-gold" />
            <blockquote className="font-serif text-2xl leading-relaxed text-brand-cream/80 md:text-3xl">
              &laquo;&nbsp;La cuisine est un voyage — chaque plat est une
              escale, chaque saveur un souvenir.&nbsp;&raquo;
            </blockquote>
            <p className="mt-6 font-nav text-sm uppercase tracking-[0.2em] text-byzantin-gold">
              Le Pressoir Byzantin
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────── */}
      <section className="bg-brand-navy py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <ScrollReveal className="text-center">
            <span className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
              Notre parcours
            </span>
            <h2 className="mt-4 font-subtitle text-3xl font-semibold text-brand-cream md:text-4xl">
              L&apos;histoire du Pressoir
            </h2>
            <div className="mx-auto mt-4 h-px w-12 bg-byzantin-gold" />
          </ScrollReveal>

          <div className="relative mt-16">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 hidden h-full w-px bg-neutral-700 md:left-1/2 md:block" />

            {MILESTONES.map((milestone, i) => (
              <ScrollReveal
                key={milestone.year}
                delay={i * 0.15}
                className={`relative mb-12 last:mb-0 md:flex md:items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
              >
                {/* Dot on timeline */}
                <div className="absolute left-6 top-2 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-byzantin-gold bg-brand-dark md:left-1/2 md:block" />

                {/* Content */}
                <div
                  className={`md:w-1/2 ${i % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:pl-16 md:text-left"
                    }`}
                >
                  <span className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
                    {milestone.year}
                  </span>
                  <h3 className="mt-2 font-subtitle text-xl font-semibold text-brand-cream">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-brand-cream/50">
                    {milestone.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story + image ─────────────────────────────── */}
      <section className="overflow-hidden bg-brand-dark py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <ScrollReveal>
            <span className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
              Notre histoire
            </span>
            <h2 className="mt-4 font-subtitle text-3xl font-semibold text-brand-cream md:text-4xl">
              Entre croisée des mondes
            </h2>
            <div className="mt-2 h-px w-12 bg-byzantin-gold" />
            <p className="mt-6 text-lg leading-relaxed text-brand-cream/60">
              Il était une fois un lieu où les époques et les cultures se rencontrent. L&apos;histoire du Pressoir Byzantin commence par une passion viscérale pour les épices, le pain chaud et les tablées où l&apos;on partage bien plus qu&apos;un repas.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-brand-cream/60">
              Dans ce cadre chargé d&apos;histoire, nous avons voulu recréer l&apos;atmosphère des grandes demeures hospitalières : un endroit où les produits de la région embrassent l&apos;exotisme de l&apos;Orient avec justesse, respect et générosité.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src="/images/restaurant/WhatsApp-Image-2025-05-22-at-22.59.13-4-scaled.jpeg"
                alt="L'ambiance du Pressoir Byzantin"
                fill
                quality={72}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 border border-byzantin-gold/10" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────── */}
      {teamMembers.length > 0 && (
        <section className="bg-brand-navy py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <ScrollReveal className="text-center">
              <span className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
                L&apos;équipe
              </span>
              <h2 className="mt-4 font-subtitle text-3xl font-semibold text-brand-cream md:text-4xl">
                Les visages du Pressoir
              </h2>
              <div className="mx-auto mt-4 h-px w-12 bg-byzantin-gold" />
            </ScrollReveal>

            <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, i) => (
                <ScrollReveal key={member._id} delay={i * 0.12}>
                  <div className="group text-center">
                    {member.photoUrl ? (
                      <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-sm">
                        <Image
                          src={member.photoUrl}
                          alt={member.name}
                          fill
                          quality={72}
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 border border-byzantin-gold/10" />
                      </div>
                    ) : (
                      <div className="relative mx-auto flex aspect-[3/4] w-full max-w-[280px] items-center justify-center overflow-hidden rounded-sm bg-brand-dark">
                        <span className="font-heading text-5xl text-brand-cream/10">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <h3 className="mt-5 font-subtitle text-lg text-brand-cream">
                      {member.name}
                    </h3>
                    {member.role && (
                      <p className="mt-1 font-nav text-xs uppercase tracking-[0.2em] text-byzantin-gold">
                        {member.role}
                      </p>
                    )}
                    {member.bio && (
                      <p className="mt-3 text-sm leading-relaxed text-brand-cream/45">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-byzantin-gold/10 bg-brand-dark py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <p className="font-nav text-xs uppercase tracking-[0.28em] text-byzantin-gold">
              Continuer la visite
            </p>
            <h2 className="mt-4 font-subtitle text-2xl text-brand-cream md:text-3xl">
              Voir la maison en mouvement
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-cream/55">
              Découvrez l&apos;atmosphère en images ou passez directement à la table.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/galerie"
                className="rounded-sm border border-byzantin-gold/40 px-6 py-3 text-sm font-nav uppercase tracking-[0.18em] text-byzantin-gold"
              >
                Ouvrir la galerie
              </Link>
              <Link
                href="/reservation"
                className="rounded-sm bg-byzantin-gold px-6 py-3 text-sm font-nav uppercase tracking-[0.18em] text-byzantin-chocolate"
              >
                Réserver une table
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
