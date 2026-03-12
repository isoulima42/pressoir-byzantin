import Link from "next/link";

interface GoldButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
  type?: "button" | "submit";
}

export default function GoldButton({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
  type = "button",
}: GoldButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-sm px-6 py-3 font-nav text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]";

  const variants = {
    primary:
      "bg-byzantin-gold text-byzantin-chocolate hover:bg-byzantin-gold-dark shadow-[0_0_15px_rgba(200,164,86,0.2)] hover:shadow-[0_0_25px_rgba(200,164,86,0.4)]",
    outline:
      "border border-byzantin-gold/50 text-byzantin-gold hover:bg-byzantin-gold/10 hover:border-byzantin-gold",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
