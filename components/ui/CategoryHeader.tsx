import SectionDivider from "./SectionDivider";

interface CategoryHeaderProps {
  icon?: string;
  title: string;
  className?: string;
}

export default function CategoryHeader({
  title,
  className = "",
}: CategoryHeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="font-subtitle text-3xl text-brand-cream">{title}</h2>
      <div className="mt-4">
        <SectionDivider variant="simple" className="max-w-[400px] !mx-0" />
      </div>
    </div>
  );
}
