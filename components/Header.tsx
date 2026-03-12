"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PRIMARY_NAV_LINKS,
  RESTAURANT,
  SECONDARY_NAV_LINKS,
  isActivePath,
} from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const reservationActive = isActivePath(pathname, "/reservation");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled || mobileOpen
            ? "border-b border-brand-cream/10 bg-brand-dark/90 shadow-lg shadow-black/15 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-10">
          <div className="flex items-center gap-6">
            <Link href="/" className="relative shrink-0" aria-label="Accueil">
              <Image
                src="/images/logo/Artboard-1-400x400.png"
                alt="Le Pressoir Byzantin"
                width={52}
                height={52}
                priority
                className={`transition-transform duration-300 hover:scale-[1.03] ${scrolled ? "scale-[0.85]" : "scale-100"}`}
              />
            </Link>

            <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
              {PRIMARY_NAV_LINKS.map((link) => {
                const active = isActivePath(pathname, link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative py-2 font-nav text-sm tracking-[0.15em] uppercase transition-colors ${
                      active
                        ? "text-brand-cream"
                        : "text-brand-cream/70 hover:text-brand-cream"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-byzantin-gold transition-transform duration-300 ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={RESTAURANT.phoneHref}
              className="rounded-full border border-brand-cream/15 px-4 py-2 font-nav text-xs tracking-[0.15em] uppercase text-brand-cream/80 transition-colors hover:border-byzantin-gold/50 hover:text-brand-cream"
            >
              Appeler
            </a>

            <Link
              href={SECONDARY_NAV_LINKS[1].href}
              aria-current={reservationActive ? "page" : undefined}
              className={`group relative overflow-hidden rounded-sm px-5 py-2.5 font-nav text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-[0_0_18px_rgba(200,164,86,0.35)] ${
                reservationActive
                  ? "bg-brand-cream text-brand-dark"
                  : "bg-byzantin-gold text-byzantin-chocolate"
              }`}
            >
              <span className="absolute inset-0 -translate-y-full bg-byzantin-gold-light transition-transform duration-300 group-hover:translate-y-0" />
              <span className="absolute inset-0 animate-shimmer rounded-sm" />
              <span className="relative z-10">Réserver</span>
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-cream/15 text-brand-cream lg:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 8h18M3 16h18" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        triggerRef={menuButtonRef}
      />
    </>
  );
}
