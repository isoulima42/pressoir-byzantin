"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RESTAURANT } from "@/lib/constants";

export default function MobileStickyActions() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/reservation")) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 px-4 lg:hidden">
      <div className="pointer-events-auto mx-auto flex max-w-sm items-center gap-3 rounded-full border border-brand-cream/10 bg-brand-dark/90 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <a
          href={RESTAURANT.phoneHref}
          className="flex-1 rounded-full border border-brand-cream/15 px-4 py-3 text-center text-xs font-nav uppercase tracking-[0.2em] text-brand-cream"
        >
          Appeler
        </a>
        <Link
          href="/reservation"
          className="flex-1 rounded-sm bg-byzantin-gold px-4 py-3 text-center text-xs font-nav uppercase tracking-[0.2em] text-byzantin-chocolate"
        >
          Réserver
        </Link>
      </div>
    </div>
  );
}
