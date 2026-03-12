"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  reservationSchema,
  type ReservationFormData,
  type ReservationSettings,
  generateTimeSlots,
  DEFAULT_SETTINGS,
} from "@/lib/reservation-schema";
import { RESTAURANT } from "@/lib/constants";

interface ReservationFormProps {
  settings?: ReservationSettings | null;
}

const STEPS = ["Le moment", "Les convives", "Vos coordonnées", "Un dernier regard"];
const EVENT_GROUP_THRESHOLD = 8;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function ReservationForm({ settings }: ReservationFormProps) {
  const router = useRouter();
  const config = settings ?? DEFAULT_SETTINGS;

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema) as Resolver<ReservationFormData>,
    defaultValues: {
      date: "",
      time: "",
      guests: 2,
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
  });

  const watchDate = useWatch({ control, name: "date" });
  const watchTime = useWatch({ control, name: "time" });
  const watchGuests = useWatch({ control, name: "guests" });
  const watchName = useWatch({ control, name: "name" });
  const watchEmail = useWatch({ control, name: "email" });
  const watchPhone = useWatch({ control, name: "phone" });
  const watchSpecialRequests = useWatch({ control, name: "specialRequests" });
  const isLargeGroup = (watchGuests ?? 2) >= EVENT_GROUP_THRESHOLD;

  const eventRedirectHref = useMemo(() => {
    const params = new URLSearchParams({
      subject: "evenement",
      message: `Bonjour,\n\nJe souhaite organiser un accueil pour ${watchGuests ?? 2} personnes${watchDate ? ` le ${watchDate}` : ""}${watchTime ? ` vers ${watchTime}` : ""}.\nMerci de me recontacter pour étudier la meilleure formule.`,
    });

    return `/contact?${params.toString()}`;
  }, [watchDate, watchGuests, watchTime]);

  // Generate available dates (today + advanceBookingDays)
  const availableDates = useMemo(() => {
    const dates: { value: string; label: string; dayOfWeek: number }[] = [];
    const today = new Date();
    // Start from tomorrow or today depending on minAdvanceHours
    const startOffset = config.minAdvanceHours >= 12 ? 1 : 0;

    for (let i = startOffset; i <= config.advanceBookingDays; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const dayOfWeek = d.getDay();

      if (config.closedDays.includes(dayOfWeek)) continue;

      const value = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString("fr-CH", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      dates.push({ value, label, dayOfWeek });
    }
    return dates;
  }, [config.advanceBookingDays, config.closedDays, config.minAdvanceHours]);

  // Time slots
  const timeSlots = useMemo(
    () => generateTimeSlots(config.serviceHours, config.slotDuration),
    [config.serviceHours, config.slotDuration]
  );

  // Group time slots by service
  const groupedSlots = useMemo(() => {
    const groups: { service: string; slots: typeof timeSlots }[] = [];
    for (const slot of timeSlots) {
      const existing = groups.find((g) => g.service === slot.service);
      if (existing) {
        existing.slots.push(slot);
      } else {
        groups.push({ service: slot.service, slots: [slot] });
      }
    }
    return groups;
  }, [timeSlots]);

  // Navigate steps
  const goNext = async () => {
    let valid = false;
    if (step === 0) valid = await trigger(["date", "time"]);
    else if (step === 1) valid = await trigger(["guests"]);
    else if (step === 2) valid = await trigger(["name", "email", "phone"]);
    else valid = true;

    if (valid) {
      setDirection(1);
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  // Submit
  const onSubmit = async (data: ReservationFormData) => {
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setSubmitError(result.error ?? "Une erreur est survenue.");
        setSubmitting(false);
        return;
      }

      // Redirect to confirmation
      const params = new URLSearchParams({
        id: result.confirmationId,
        name: data.name,
        date: data.date,
        time: data.time,
        guests: data.guests.toString(),
      });
      router.push(`/reservation/confirmation?${params.toString()}`);
    } catch {
      setSubmitError("Nous n'avons pas pu joindre le serveur.");
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full rounded-sm border border-neutral-700 bg-brand-dark/50 px-4 py-3 text-sm text-brand-cream placeholder-brand-cream/25 transition-colors focus:border-byzantin-gold focus:outline-none";

  // Format date for display
  const formatSelectedDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("fr-CH", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div>
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-sm border border-brand-cream/10 bg-brand-dark/35 p-4 text-sm text-brand-cream/60">
          <p className="font-nav text-xs uppercase tracking-[0.22em] text-byzantin-gold">
            Parcours rapide
          </p>
          <p className="mt-2 leading-relaxed">
            Votre demande se remplit en moins d&apos;une minute.
          </p>
        </div>
        <div className="rounded-sm border border-brand-cream/10 bg-brand-dark/35 p-4 text-sm text-brand-cream/60">
          <p className="font-nav text-xs uppercase tracking-[0.22em] text-byzantin-gold">
            Confirmation
          </p>
          <p className="mt-2 leading-relaxed">
            Un email récapitulatif part immédiatement après l&apos;envoi.
          </p>
        </div>
        <div className="rounded-sm border border-brand-cream/10 bg-brand-dark/35 p-4 text-sm text-brand-cream/60">
          <p className="font-nav text-xs uppercase tracking-[0.22em] text-byzantin-gold">
            Groupes
          </p>
          <p className="mt-2 leading-relaxed">
            À partir de {EVENT_GROUP_THRESHOLD} convives, nous recommandons un échange direct.
          </p>
        </div>
      </div>

      {/* Step indicators */}
      <div className="mb-10 flex items-center justify-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                i < step
                  ? "bg-byzantin-gold text-byzantin-chocolate"
                  : i === step
                    ? "border-2 border-byzantin-gold text-byzantin-gold"
                    : "border border-neutral-700 text-brand-cream/30"
              }`}
            >
              {i < step ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-px w-8 transition-colors sm:w-12 ${
                  i < step ? "bg-byzantin-gold" : "bg-neutral-700"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step label */}
      <p className="mb-8 text-center font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
        {STEPS[step]}
      </p>

      {/* Step content */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative min-h-[320px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* ── Step 0: Date & Time ─────────────────── */}
              {step === 0 && (
                <div className="space-y-8">
                  {/* Date selection */}
                  <div>
                    <label className="mb-3 block font-nav text-xs font-medium uppercase tracking-wider text-brand-cream/50">
                      Choisissez votre date
                    </label>
                    <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
                      {availableDates.slice(0, 14).map((d) => (
                        <button
                          key={d.value}
                          type="button"
                          onClick={() => setValue("date", d.value, { shouldValidate: true })}
                          data-testid={`date-option-${d.value}`}
                          className={`shrink-0 rounded-sm border px-4 py-3 text-center transition-all ${
                            watchDate === d.value
                              ? "border-byzantin-gold bg-byzantin-gold/15 text-brand-cream"
                              : "border-neutral-700 text-brand-cream/40 hover:border-neutral-500 hover:text-brand-cream/70"
                          }`}
                        >
                          <span className="block text-xs">{d.label.split(" ")[0]}</span>
                          <span className="block font-heading text-lg">{d.label.split(" ")[1]}</span>
                          <span className="block text-xs">{d.label.split(" ")[2]}</span>
                        </button>
                      ))}
                    </div>
                    {errors.date && (
                      <p className="mt-2 text-xs text-red-400">{errors.date.message}</p>
                    )}
                  </div>

                  {/* Time selection */}
                  {watchDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="mb-3 block font-nav text-xs font-medium uppercase tracking-wider text-brand-cream/50">
                        Choisissez votre créneau
                      </label>
                      {groupedSlots.map((group) => (
                        <div key={group.service} className="mb-4">
                          <p className="mb-2 text-xs text-brand-cream/30">{group.service}</p>
                          <div className="flex flex-wrap gap-2">
                            {group.slots.map((slot) => (
                              <button
                                key={slot.value}
                                type="button"
                                onClick={() => setValue("time", slot.value, { shouldValidate: true })}
                                data-testid={`time-option-${slot.value}`}
                                className={`rounded-sm border px-4 py-2 font-heading text-sm tracking-wider transition-all ${
                                  watchTime === slot.value
                                    ? "border-byzantin-gold bg-byzantin-gold/15 text-brand-cream"
                                    : "border-neutral-700 text-brand-cream/40 hover:border-neutral-500 hover:text-brand-cream/70"
                                }`}
                              >
                                {slot.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                      {errors.time && (
                        <p className="mt-2 text-xs text-red-400">{errors.time.message}</p>
                      )}
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── Step 1: Guests ──────────────────────── */}
              {step === 1 && (
                <div className="flex flex-col items-center justify-center py-8">
                  <label className="mb-6 block font-nav text-xs font-medium uppercase tracking-wider text-brand-cream/50">
                    Combien serez-vous ?
                  </label>
                  <div className="flex items-center gap-6">
                    <button
                      type="button"
                      onClick={() => {
                        const v = Math.max(1, (watchGuests ?? 2) - 1);
                        setValue("guests", v, { shouldValidate: true });
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-600 text-brand-cream/60 transition-colors hover:border-byzantin-gold hover:text-brand-cream"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14" />
                      </svg>
                    </button>

                    <span className="font-heading text-5xl text-brand-cream">
                      {watchGuests ?? 2}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        const v = Math.min(20, (watchGuests ?? 2) + 1);
                        setValue("guests", v, { shouldValidate: true });
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-600 text-brand-cream/60 transition-colors hover:border-byzantin-gold hover:text-brand-cream"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>

                  {isLargeGroup ? (
                    <div className="mt-6 w-full max-w-xl rounded-sm border border-byzantin-gold/25 bg-brand-dark/35 p-5 text-left">
                      <p className="font-nav text-xs uppercase tracking-[0.22em] text-byzantin-gold">
                        Groupe ou réception
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-brand-cream/65">
                        Pour {watchGuests} personnes, nous pouvons souvent vous
                        accueillir, mais un échange direct permet d&apos;adapter
                        la salle, le rythme de service et les besoins
                        particuliers sans approximation.
                      </p>
                      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <Link
                          href={eventRedirectHref}
                          className="inline-flex items-center justify-center rounded-sm bg-byzantin-gold px-5 py-3 text-xs font-nav uppercase tracking-[0.2em] text-byzantin-chocolate"
                        >
                          Préparer un événement
                        </Link>
                        <a
                          href={RESTAURANT.phoneHref}
                          className="inline-flex items-center justify-center rounded-full border border-brand-cream/15 px-5 py-3 text-xs uppercase tracking-[0.2em] text-brand-cream/80"
                        >
                          Appeler le restaurant
                        </a>
                      </div>
                      <p className="mt-3 text-xs text-brand-cream/40">
                        Si vous souhaitez simplement tenter une réservation de
                        table standard, vous pouvez continuer.
                      </p>
                    </div>
                  ) : (
                    <p className="mt-4 text-xs text-brand-cream/30">
                      Un doute sur la meilleure formule ? Nous sommes joignables
                      au {RESTAURANT.phone}.
                    </p>
                  )}

                  {errors.guests && (
                    <p className="mt-4 text-xs text-red-400">{errors.guests.message}</p>
                  )}
                </div>
              )}

              {/* ── Step 2: Contact info ────────────────── */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="r-name" className="mb-1.5 block font-nav text-xs font-medium uppercase tracking-wider text-brand-cream/50">
                      Comment devons-nous vous appeler ? *
                    </label>
                    <input
                      id="r-name"
                      type="text"
                      {...register("name")}
                      placeholder="Jean Dupont"
                      className={inputCls}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="r-email" className="mb-1.5 block font-nav text-xs font-medium uppercase tracking-wider text-brand-cream/50">
                        Email *
                      </label>
                      <input
                        id="r-email"
                        type="email"
                        {...register("email")}
                        placeholder="jean@exemple.ch"
                        className={inputCls}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="r-phone" className="mb-1.5 block font-nav text-xs font-medium uppercase tracking-wider text-brand-cream/50">
                        Téléphone *
                      </label>
                      <input
                        id="r-phone"
                        type="tel"
                        {...register("phone")}
                        placeholder="+41 79 000 00 00"
                        className={inputCls}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="r-special" className="mb-1.5 block font-nav text-xs font-medium uppercase tracking-wider text-brand-cream/50">
                      Souhaits particuliers
                    </label>
                    <textarea
                      id="r-special"
                      rows={3}
                      {...register("specialRequests")}
                      placeholder="Allergies, anniversaire, chaise haute, placement souhaité..."
                      className={`${inputCls} resize-none`}
                    />
                    {errors.specialRequests && <p className="mt-1 text-xs text-red-400">{errors.specialRequests.message}</p>}
                  </div>
                </div>
              )}

              {/* ── Step 3: Review ──────────────────────── */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="rounded-sm border border-neutral-700 bg-brand-navy/30 p-6">
                    <h3 className="mb-4 font-nav text-sm uppercase tracking-wider text-byzantin-gold">
                      Votre demande
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-brand-cream/50">Date</span>
                        <span className="text-brand-cream">{formatSelectedDate(watchDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-cream/50">Heure</span>
                        <span className="text-brand-cream">{watchTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-cream/50">Personnes</span>
                        <span className="text-brand-cream">{watchGuests}</span>
                      </div>
                      <div className="border-t border-neutral-700 pt-3" />
                      <div className="flex justify-between">
                        <span className="text-brand-cream/50">Nom</span>
                        <span className="text-brand-cream">{watchName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-cream/50">Email</span>
                        <span className="text-brand-cream">{watchEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-cream/50">Téléphone</span>
                        <span className="text-brand-cream">{watchPhone}</span>
                      </div>
                      {watchSpecialRequests && (
                        <>
                          <div className="border-t border-neutral-700 pt-3" />
                          <div>
                            <span className="text-brand-cream/50">Souhaits</span>
                            <p className="mt-1 text-brand-cream/70">{watchSpecialRequests}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {submitError && (
                    <div className="rounded-sm border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                      <p>{submitError}</p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        <a
                          href={RESTAURANT.phoneHref}
                          className="rounded-full border border-red-300/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-red-100"
                        >
                          Appeler
                        </a>
                        <Link
                          href={eventRedirectHref}
                          className="rounded-full border border-red-300/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-red-100"
                        >
                          Nous écrire
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-between gap-4">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="rounded-sm border border-neutral-600 px-6 py-3 font-nav text-xs uppercase tracking-[0.2em] text-brand-cream/60 transition-all hover:border-brand-cream hover:text-brand-cream"
            >
              Revenir
            </button>
          ) : (
            <div />
          )}

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="rounded-sm bg-byzantin-gold px-8 py-3 font-nav text-xs uppercase tracking-[0.2em] text-byzantin-chocolate transition-all hover:bg-byzantin-gold-dark"
            >
              {step === 1 && isLargeGroup ? "Continuer avec une table" : "Continuer"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="rounded-sm bg-byzantin-gold px-8 py-3 font-nav text-xs uppercase tracking-[0.2em] text-byzantin-chocolate transition-all hover:bg-byzantin-gold-dark disabled:opacity-50"
            >
              {submitting ? "Envoi en cours..." : "Envoyer ma demande"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
