import {
  VegetarianIcon,
  VeganIcon,
  SpicyIcon,
  GlutenFreeIcon,
} from "./MenuItemCard";

const LEGEND = [
  { icon: <VegetarianIcon />, label: "Végétarien" },
  { icon: <VeganIcon />, label: "Vegan" },
  { icon: <SpicyIcon />, label: "Épicé" },
  { icon: <GlutenFreeIcon />, label: "Sans gluten" },
];

export default function MenuLegend() {
  return (
    <div className="border-t border-neutral-800 bg-brand-dark px-6 py-8">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 text-xs text-brand-cream/40">
        <span className="font-nav uppercase tracking-wider">Légende :</span>
        {LEGEND.map((entry) => (
          <span key={entry.label} className="flex items-center gap-1.5">
            {entry.icon}
            {entry.label}
          </span>
        ))}
      </div>
    </div>
  );
}
