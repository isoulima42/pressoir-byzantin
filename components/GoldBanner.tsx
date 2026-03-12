"use client";

import ScrollReveal from "./ScrollReveal";
import GoldButton from "./ui/GoldButton";

export default function GoldBanner() {
  return (
    <section className="bg-byzantin-gold py-16 md:py-20">
      <ScrollReveal>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-subtitle text-3xl font-semibold text-byzantin-chocolate md:text-4xl">
            Votre table vous attend
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-byzantin-chocolate/70">
            Réservez en ligne en quelques clics et laissez-nous préparer une
            expérience à la hauteur de vos attentes.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <GoldButton
              href="/reservation"
              className="bg-byzantin-chocolate text-byzantin-gold hover:bg-byzantin-espresso shadow-none hover:shadow-none"
            >
              Réserver maintenant
            </GoldButton>
            <GoldButton
              href="/carte-des-mets"
              variant="outline"
              className="border-byzantin-chocolate/40 text-byzantin-chocolate hover:bg-byzantin-chocolate/10 hover:border-byzantin-chocolate"
            >
              Consulter la carte
            </GoldButton>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
