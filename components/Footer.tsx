"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { NAV_LINKS, RESTAURANT, isActivePath } from "@/lib/constants";
import SectionDivider from "./ui/SectionDivider";

interface SocialLink {
  platform: string;
  url: string;
}

interface HourSlot {
  days: string;
  openTime: string;
  closeTime: string;
}

interface FooterProps {
  name: string;
  hours: HourSlot[];
  socialLinks: SocialLink[];
  legalEntity: string;
  copyrightNotice: string;
}

const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  tiktok: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.16V11.7a4.85 4.85 0 01-3.77-1.78V6.69h3.77z" />
    </svg>
  ),
  facebook: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
};

export default function Footer({
  name,
  hours,
  socialLinks,
  legalEntity,
  copyrightNotice,
}: FooterProps) {
  const pathname = usePathname();
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <footer className="border-t border-byzantin-gold/10 bg-brand-dark">
      <div className="mx-auto max-w-7xl px-6 pb-28 pt-16 lg:px-10 lg:pb-16">
        <div ref={gridRef} className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link href="/" className="inline-flex items-center gap-4">
              <Image
                src="/images/logo/Artboard-1-400x400.png"
                alt={name}
                width={72}
                height={72}
                className="transition-transform duration-300 hover:scale-[1.03]"
              />
              <div>
                <p className="font-subtitle text-xl text-brand-cream">
                  {name}
                </p>
                <p className="mt-1 text-sm text-brand-cream/55">
                  Saveurs orientales et méditerranéennes
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-brand-cream/55">
              Une maison de caractère pour déjeuner, dîner, privatiser, célébrer
              et retrouver le goût d&apos;une hospitalité généreuse.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/reservation"
                className="rounded-sm bg-byzantin-gold px-5 py-3 font-nav text-sm uppercase tracking-[0.15em] text-byzantin-chocolate transition-all duration-300 hover:bg-byzantin-gold-dark shadow-[0_0_15px_rgba(200,164,86,0.2)]"
              >
                Réserver
              </Link>
              <a
                href={RESTAURANT.phoneHref}
                className="rounded-sm border border-byzantin-gold/40 px-5 py-3 font-nav text-sm uppercase tracking-[0.15em] text-byzantin-gold transition-all duration-300 hover:bg-byzantin-gold/10"
              >
                Appeler
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3 className="mb-6 font-nav text-xs uppercase tracking-[0.2em] text-byzantin-gold">
              Explorer
            </h3>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => {
                const active = isActivePath(pathname, link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`w-fit font-nav text-sm tracking-wide transition-colors ${
                      active
                        ? "text-byzantin-gold"
                        : "text-brand-cream/60 hover:text-brand-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3 className="mb-6 font-nav text-xs uppercase tracking-[0.2em] text-byzantin-gold">
              Informations
            </h3>
            <div className="space-y-4 text-sm text-brand-cream/60">
              {hours.map((slot) => (
                <div key={slot.days}>
                  <span className="block text-brand-cream/45">{slot.days}</span>
                  <span className="font-price text-brand-cream/85">
                    {slot.openTime} – {slot.closeTime}
                  </span>
                </div>
              ))}
              <p>{RESTAURANT.responseSla}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3 className="mb-6 font-nav text-xs uppercase tracking-[0.2em] text-byzantin-gold">
              Suivre la maison
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-cream/20 text-brand-cream/60 transition-all hover:border-byzantin-gold hover:text-byzantin-gold hover:-translate-y-0.5"
                  aria-label={social.platform}
                >
                  {socialIcons[social.platform] ?? (
                    <span className="text-xs uppercase">
                      {social.platform.substring(0, 2)}
                    </span>
                  )}
                </a>
              ))}
            </div>

            <div className="mt-6 space-y-3 text-sm text-brand-cream/60">
              <p>{RESTAURANT.address}</p>
              <a
                href={RESTAURANT.emailHref}
                className="block transition-colors hover:text-brand-cream"
              >
                {RESTAURANT.email}
              </a>
              <a
                href={RESTAURANT.phoneHref}
                className="block transition-colors hover:text-brand-cream"
              >
                {RESTAURANT.phone}
              </a>
            </div>
          </motion.div>
        </div>

        <SectionDivider variant="ornate" className="mt-14 mb-8" />
        <div className="flex flex-col items-start justify-between gap-3 border-t border-brand-cream/10 pt-8 text-xs text-brand-cream/40 md:flex-row md:items-center">
          <p>
            &copy; {new Date().getFullYear()} {name}. {copyrightNotice}
          </p>
          <p className="uppercase tracking-[0.22em]">{legalEntity}</p>
        </div>
      </div>
    </footer>
  );
}
