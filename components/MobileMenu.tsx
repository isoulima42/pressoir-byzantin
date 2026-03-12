"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NAV_LINKS,
  RESTAURANT,
  isActivePath,
} from "@/lib/constants";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  triggerRef?: RefObject<HTMLButtonElement | null>;
}

const overlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panel = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      type: "tween" as const,
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "tween" as const,
      duration: 0.24,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function MobileMenu({
  open,
  onClose,
  triggerRef,
}: MobileMenuProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLElement>(null);

  const links = useMemo(() => NAV_LINKS, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef?.current;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerElement?.focus();
    };
  }, [open, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.nav
            id="mobile-menu"
            ref={panelRef}
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-label="Navigation mobile"
            aria-modal="true"
            role="dialog"
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col border-l border-brand-cream/10 bg-brand-dark px-8 pb-8 pt-6"
          >
            <div className="flex items-center justify-between border-b border-brand-cream/10 pb-5">
              <div>
                <p className="font-nav text-xs uppercase tracking-[0.28em] text-byzantin-gold">
                  Le Pressoir Byzantin
                </p>
                <p className="mt-2 text-sm text-brand-cream/55">Villeneuve</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-cream/15 text-brand-cream/80 transition-colors hover:text-brand-cream"
                aria-label="Fermer le menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-8 flex flex-1 flex-col">
              <p className="text-xs uppercase tracking-[0.28em] text-brand-cream/35">
                Explorer
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {links.map((link, index) => {
                  const active = isActivePath(pathname, link.href);
                  const itemNumber = String(index + 1).padStart(2, "0");

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 24 }}
                      transition={{ delay: 0.05 * index, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between rounded-2xl px-4 py-4 transition-colors ${
                          active
                            ? "bg-byzantin-gold/12 text-brand-cream"
                            : "text-brand-cream/78 hover:bg-brand-cream/5 hover:text-brand-cream"
                        }`}
                      >
                        <span className="font-nav text-[clamp(1.1rem,4vw,1.4rem)] uppercase tracking-[0.16em]">
                          {link.label}
                        </span>
                        <span className="text-byzantin-gold/70">{itemNumber}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-2xl border border-brand-cream/10 bg-brand-navy/40 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-byzantin-gold">
                  Accès rapide
                </p>
                <div className="mt-4 grid gap-3">
                  <a
                    href={RESTAURANT.phoneHref}
                    className="inline-flex items-center justify-center rounded-full border border-brand-cream/15 px-4 py-3 text-sm font-nav uppercase tracking-[0.18em] text-brand-cream"
                  >
                    Appeler
                  </a>
                  <Link
                    href="/reservation"
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded-sm bg-byzantin-gold px-4 py-3 text-sm font-nav uppercase tracking-[0.15em] text-byzantin-chocolate"
                  >
                    Réserver une table
                  </Link>
                  <a
                    href={RESTAURANT.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-brand-cream/15 px-4 py-3 text-sm font-nav uppercase tracking-[0.18em] text-brand-cream/80"
                  >
                    Itinéraire
                  </a>
                </div>
              </div>

              {/* Byzantin accent */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-auto flex origin-center items-center gap-3 px-4 pb-6"
                aria-hidden="true"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-byzantin-gold/30" />
                <div className="h-1.5 w-1.5 rotate-45 rounded-[1px] bg-byzantin-gold/40" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-byzantin-gold/30" />
              </motion.div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
