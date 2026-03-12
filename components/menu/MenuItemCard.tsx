"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import MenuLightbox from "./MenuLightbox";

/* ── Tag icon SVGs ─────────────────────────────────────── */

function VegetarianIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-green-500/70"
      aria-label="Végétarien"
    >
      <path d="M12 22c-4-4-8-8-8-13a8 8 0 0 1 16 0c0 5-4 9-8 13Z" />
      <path d="M12 10v6" />
    </svg>
  );
}

function VeganIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-emerald-500/70"
      aria-label="Vegan"
    >
      <path d="M7 20.5c3-5 6-10 13-14.5" />
      <path d="M4 20c0-8 4-14 14-16-2 6-6 12-14 16Z" />
    </svg>
  );
}

function SpicyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-red-500/70"
      aria-label="Epicé"
    >
      <path d="M12 2c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10Z" />
      <path d="M12 18v4" />
    </svg>
  );
}

function GlutenFreeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-amber-500/60"
      aria-label="Sans gluten"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6M9 9h6" />
      <path d="m4 4 16 16" />
    </svg>
  );
}

const TAG_ICONS: Record<string, React.ReactNode> = {
  vegetarien: <VegetarianIcon />,
  vegan: <VeganIcon />,
  epice: <SpicyIcon />,
  "sans-gluten": <GlutenFreeIcon />,
};

const TAG_LABELS: Record<string, string> = {
  "fait-maison": "Fait maison",
  nouveau: "Nouveau",
  populaire: "Populaire",
};

/* ── MenuItem Card ─────────────────────────────────────── */

interface MenuItem {
  name: string;
  description?: string;
  price: number;
  image?: string;
  allergens?: string[];
  tags?: string[];
  extras?: { name: string; price: number }[];
}

interface MenuItemCardProps {
  item: MenuItem;
  compact?: boolean;
}

export default function MenuItemCard({ item, compact = false }: MenuItemCardProps) {
  const [hovered, setHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const hasImage = !!item.image;
  const iconTags = item.tags?.filter((t) => t in TAG_ICONS) ?? [];
  const labelTags = item.tags?.filter((t) => t in TAG_LABELS) ?? [];

  return (
    <>
      <div
        className={`group relative ${compact ? "py-3" : "py-5"}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Main row: name ··· price */}
        <div className="flex items-baseline gap-2">
          {/* Name + tag icons */}
          <div className="flex shrink-0 items-center gap-2">
            <span className={`font-serif text-brand-cream ${compact ? "text-base" : "text-lg"}`}>
              {item.name}
            </span>
            {iconTags.map((tag) => (
              <span key={tag} className="inline-flex">{TAG_ICONS[tag]}</span>
            ))}
            {labelTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-byzantin-gold/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-byzantin-gold"
              >
                {TAG_LABELS[tag]}
              </span>
            ))}
            {/* Camera indicator if image exists */}
            {hasImage && (
              <button
                onClick={() => setLightboxOpen(true)}
                className="inline-flex text-brand-cream/20 transition-colors hover:text-byzantin-gold"
                aria-label={`Voir l'image de ${item.name}`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </button>
            )}
          </div>

          {/* Dotted line */}
          <div className="flex-1 translate-y-[-4px] border-b border-dotted border-neutral-700" />

          {/* Price */}
            <span className={`shrink-0 font-price tracking-wider text-byzantin-gold ${compact ? "text-sm" : "text-base"}`}>
              {item.price} CHF
            </span>
        </div>

        {/* Description */}
        {!compact && item.description && (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-brand-cream/40">
            {item.description}
          </p>
        )}

        {/* Allergens */}
        {item.allergens && item.allergens.length > 0 && (
          <p className="mt-1 text-xs text-brand-cream/25">
            Allergènes : {item.allergens.join(", ")}
          </p>
        )}

        {/* Extras */}
        {!compact && item.extras && item.extras.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {item.extras.map((extra) => (
              <span
                key={extra.name}
                className="text-xs text-brand-cream/35"
              >
                + {extra.name}{" "}
                <span className="text-byzantin-gold/60">
                  +{extra.price} CHF
                </span>
              </span>
            ))}
          </div>
        )}

        {/* Image hover preview (desktop) */}
        {hasImage && (
          <motion.div
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              scale: hovered ? 1 : 0.92,
            }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-[110%] lg:block"
          >
            <div className="h-44 w-44 overflow-hidden rounded-sm shadow-2xl shadow-black/50">
              <Image
                src={item.image!}
                alt={item.name}
                width={176}
                height={176}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      {hasImage && (
        <MenuLightbox
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          imageSrc={item.image!}
          name={item.name}
          description={item.description}
        />
      )}
    </>
  );
}

/* ── Export tag icons for legend ─────────────────────────── */
export { VegetarianIcon, VeganIcon, SpicyIcon, GlutenFreeIcon };
