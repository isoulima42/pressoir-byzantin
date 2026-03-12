import { RESTAURANT } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

interface HourSlot {
  days: string;
  openTime: string;
  closeTime: string;
}

interface HoursLocationProps {
  address: string;
  phone: string;
  email: string;
  hours: HourSlot[];
  mapsEmbed: string;
}

export default function HoursLocation({
  address,
  phone,
  email,
  hours,
  mapsEmbed,
}: HoursLocationProps) {
  return (
    <section className="bg-brand-navy py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Info */}
          <ScrollReveal>
            <span className="font-nav text-xs uppercase tracking-[0.3em] text-byzantin-gold">
              Nous trouver
            </span>
            <h2 className="mt-4 font-subtitle text-3xl font-semibold text-brand-cream md:text-4xl">
              Horaires & Accès
            </h2>
            <div className="mt-2 h-px w-12 bg-byzantin-gold" />

            {/* Hours */}
            <div className="mt-8 space-y-4">
              {hours.map((slot) => (
                <div
                  key={slot.days}
                  className="flex items-center justify-between border-b border-neutral-800 pb-4"
                >
                  <span className="text-brand-cream/80">{slot.days}</span>
                  <span className="font-price tracking-wider text-brand-cream">
                    {slot.openTime} – {slot.closeTime}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact details */}
            <div className="mt-10 space-y-3 text-brand-cream/60">
              <p className="flex items-center gap-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="shrink-0 text-byzantin-gold"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {address}
              </p>
              <p className="flex items-center gap-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="shrink-0 text-byzantin-gold"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-brand-cream"
                >
                  {phone}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="shrink-0 text-byzantin-gold"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a
                  href={`mailto:${email}`}
                  className="transition-colors hover:text-brand-cream"
                >
                  {email}
                </a>
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="rounded-sm bg-byzantin-gold px-5 py-3 font-nav text-sm uppercase tracking-[0.15em] text-byzantin-chocolate transition-all duration-300 hover:bg-byzantin-gold-dark shadow-[0_0_15px_rgba(200,164,86,0.2)]"
              >
                Appeler
              </a>
              <a
                href={RESTAURANT.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm border border-byzantin-gold/40 px-5 py-3 font-nav text-sm uppercase tracking-[0.15em] text-byzantin-gold transition-all duration-300 hover:bg-byzantin-gold/10"
              >
                Itinéraire
              </a>
              <a
                href={`mailto:${email}`}
                className="rounded-sm border border-byzantin-gold/40 px-5 py-3 font-nav text-sm uppercase tracking-[0.15em] text-byzantin-gold transition-all duration-300 hover:bg-byzantin-gold/10"
              >
                Écrire
              </a>
            </div>

            <div className="mt-6 rounded-sm border border-byzantin-gold/20 bg-brand-dark/35 p-5 text-sm text-brand-cream/60">
              <p className="font-nav uppercase tracking-[0.18em] text-byzantin-gold">
                Service attentif
              </p>
              <p className="mt-2 leading-relaxed">
                {RESTAURANT.responseSla}. Pour une réservation rapide, l&apos;appel
                reste le chemin le plus direct.
              </p>
            </div>
          </ScrollReveal>

          {/* Map */}
          <ScrollReveal delay={0.2}>
            <div className="aspect-video overflow-hidden rounded-sm lg:aspect-square">
              <iframe
                src={mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Emplacement du restaurant"
                className="grayscale transition-all duration-500 hover:grayscale-0"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
