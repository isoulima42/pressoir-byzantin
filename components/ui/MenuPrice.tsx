interface MenuPriceProps {
  name: string;
  price: number;
  compact?: boolean;
  children?: React.ReactNode;
}

export default function MenuPrice({
  name,
  price,
  compact = false,
  children,
}: MenuPriceProps) {
  return (
    <div className="flex items-baseline gap-2">
      <span
        className={`shrink-0 font-sans text-brand-cream ${
          compact ? "text-base" : "text-lg"
        }`}
      >
        {name}
      </span>

      {children}

      {/* Dot leaders */}
      <span
        className="flex-1 translate-y-[-3px] border-b border-dotted border-brand-cream/15"
        aria-hidden="true"
      />

      {/* Price in JetBrains Mono */}
      <span
        className={`shrink-0 font-price tracking-wider text-byzantin-gold ${
          compact ? "text-sm" : "text-base"
        }`}
      >
        {price} CHF
      </span>
    </div>
  );
}
