import Image from "next/image";

interface FoodTagProps {
  icon: string;
  label: string;
  className?: string;
}

const TAG_ICON_MAP: Record<string, string> = {
  vegetarien: "/images/generated/icons/tags/tag_vegetarien.png",
  vegan: "/images/generated/icons/tags/tag_vegan.png",
  epice: "/images/generated/icons/tags/tag_epice.png",
  "sans-gluten": "/images/generated/icons/tags/tag_sans_gluten.png",
  "fait-maison": "/images/generated/icons/tags/tag_maison.png",
  halal: "/images/generated/icons/tags/tag_halal.png",
};

export default function FoodTag({ icon, label, className = "" }: FoodTagProps) {
  const iconSrc = TAG_ICON_MAP[icon];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-byzantin-gold/30 px-2.5 py-1 ${className}`}
    >
      {iconSrc && (
        <Image
          src={iconSrc}
          alt=""
          width={16}
          height={16}
          className="h-4 w-4"
          aria-hidden="true"
        />
      )}
      <span className="font-nav text-[10px] uppercase tracking-[0.12em] text-byzantin-gold">
        {label}
      </span>
    </span>
  );
}
