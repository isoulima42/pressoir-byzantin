"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { RESTAURANT } from "@/lib/constants";

const SUBJECTS = [
  { value: "", label: "Choisir un sujet" },
  { value: "reservation", label: "Réserver une table" },
  { value: "information", label: "Demande d'information" },
  { value: "evenement", label: "Événement ou traiteur" },
  { value: "autre", label: "Autre demande" },
];

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const initialSubject = searchParams.get("subject") ?? "";
  const initialMessage = searchParams.get("message") ?? "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState(initialMessage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setState("error");
        setErrorMsg(data.error ?? "Une erreur est survenue.");
        return;
      }

      setState("success");
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch {
      setState("error");
      setErrorMsg("Nous n'avons pas pu joindre le serveur. Merci de réessayer dans un instant.");
    }
  };

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-sm border border-green-800/50 bg-green-900/20 p-8 text-center"
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="mx-auto text-green-500"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <p className="mt-4 font-heading text-lg uppercase tracking-wider text-brand-cream">
          Votre message est bien arrivé
        </p>
        <p className="mt-2 text-sm text-brand-cream/50">
          Nous revenons vers vous très vite. En général, {RESTAURANT.responseSla.toLowerCase()}.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-6 text-sm text-byzantin-gold transition-colors hover:text-brand-cream"
        >
          Envoyer un nouveau message
        </button>
      </motion.div>
    );
  }

  const inputCls =
    "w-full rounded-sm border border-neutral-700 bg-brand-dark/50 px-4 py-3 text-sm text-brand-cream placeholder-brand-cream/25 transition-colors focus:border-byzantin-gold focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-sm border border-byzantin-gold/20 bg-brand-dark/35 p-4 text-sm text-brand-cream/60">
        <p className="font-nav text-xs uppercase tracking-[0.22em] text-byzantin-gold">
          Réponse claire et rapide
        </p>
        <p className="mt-2 leading-relaxed">
          Plus votre demande est précise, plus notre retour sera utile. Pour une
          demande urgente, l&apos;appel reste le canal le plus direct.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block font-nav text-xs font-medium uppercase tracking-wider text-brand-cream/50">
            Comment devons-nous vous appeler ? *
          </label>
          <input
            id="name"
            type="text"
            required
            minLength={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre prénom et nom"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block font-nav text-xs font-medium uppercase tracking-wider text-brand-cream/50">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.ch"
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block font-nav text-xs font-medium uppercase tracking-wider text-brand-cream/50">
            Téléphone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+41 79 000 00 00"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="subject" className="mb-1.5 block font-nav text-xs font-medium uppercase tracking-wider text-brand-cream/50">
            Quel est l&apos;objet de votre message ? *
          </label>
          <select
            id="subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={`${inputCls} appearance-none`}
          >
            {SUBJECTS.map((s) => (
              <option key={s.value} value={s.value} disabled={!s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block font-nav text-xs font-medium uppercase tracking-wider text-brand-cream/50">
          Message *
        </label>
        <textarea
          id="message"
          required
          minLength={10}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Décrivez-nous votre envie, votre date ou votre projet..."
          className={`${inputCls} resize-none`}
        />
      </div>

      {state === "error" && (
        <p aria-live="polite" className="text-sm text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full rounded-sm bg-byzantin-gold px-8 py-3.5 font-nav text-sm uppercase tracking-[0.2em] text-byzantin-chocolate transition-all hover:bg-byzantin-gold-dark disabled:opacity-50"
      >
        {state === "sending" ? "Envoi en cours..." : "Envoyer votre message"}
      </button>
    </form>
  );
}
