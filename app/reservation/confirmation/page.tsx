"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/Header";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
});

function ConfirmationContent() {
  const params = useSearchParams();
  const confirmationId = params.get("id") ?? "";
  const name = params.get("name") ?? "";
  const date = params.get("date") ?? "";
  const time = params.get("time") ?? "";
  const guests = params.get("guests") ?? "";

  const dateFormatted = date
    ? new Date(date + "T00:00:00").toLocaleDateString("fr-CH", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-brand-dark px-6">
      <div className="w-full max-w-lg text-center">
        {/* Success icon */}
        <motion.div
          {...fade(0)}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-green-500/50 bg-green-500/10"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-green-500"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </motion.div>

        <motion.h1
          {...fade(0.15)}
          className="font-heading text-3xl font-bold uppercase tracking-wider text-brand-cream md:text-4xl"
        >
          Demande bien reçue
        </motion.h1>

        <motion.p
          {...fade(0.25)}
          className="mt-3 text-brand-cream/50"
        >
          Merci {name ? name.split(" ")[0] : ""}. Votre demande a bien été enregistrée et récapitulée par email.
        </motion.p>

        {/* Details card */}
        <motion.div
          {...fade(0.35)}
          className="mt-8 rounded-sm border border-neutral-700 bg-brand-navy/30 p-6 text-left"
        >
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-cream/50">Référence</span>
              <span className="font-heading tracking-wider text-brand-orange">
                {confirmationId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-cream/50">Date</span>
              <span className="text-brand-cream">{dateFormatted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-cream/50">Heure</span>
              <span className="text-brand-cream">{time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-cream/50">Personnes</span>
              <span className="text-brand-cream">{guests}</span>
            </div>
          </div>
        </motion.div>

        <motion.p
          {...fade(0.45)}
          className="mt-6 text-xs text-brand-cream/30"
        >
          Pour toute modification,
          contactez-nous au{" "}
          <a
            href="tel:+41796594152"
            className="text-brand-orange transition-colors hover:text-brand-cream"
          >
            079 659 41 52
          </a>{" "}
          en nous indiquant votre référence.
        </motion.p>

        {/* Actions */}
        <motion.div
          {...fade(0.55)}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <Link
            href="/"
            className="rounded-sm bg-brand-orange px-8 py-3.5 font-heading text-sm uppercase tracking-[0.2em] text-brand-dark transition-all hover:bg-brand-cream"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/carte-des-mets"
            className="rounded-sm border border-brand-cream/20 px-8 py-3.5 font-heading text-sm uppercase tracking-[0.2em] text-brand-cream transition-all hover:border-brand-cream hover:bg-brand-cream/10"
          >
            Voir le menu
          </Link>
          <Link
            href="/contact?subject=reservation"
            className="rounded-sm border border-brand-cream/20 px-8 py-3.5 font-heading text-sm uppercase tracking-[0.2em] text-brand-cream transition-all hover:border-brand-cream hover:bg-brand-cream/10"
          >
            Nous écrire
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <main className="flex min-h-screen items-center justify-center bg-brand-dark">
            <p className="text-brand-cream/40">Chargement...</p>
          </main>
        }
      >
        <ConfirmationContent />
      </Suspense>
    </>
  );
}
