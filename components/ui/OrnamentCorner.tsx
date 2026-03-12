interface OrnamentCornerProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  className?: string;
}

export default function OrnamentCorner({
  position,
  size = 40,
  className = "",
}: OrnamentCornerProps) {
  const styles: Record<string, { outer: string; borders: string }> = {
    "top-left": {
      outer: "top-0 left-0",
      borders: "border-t border-l",
    },
    "top-right": {
      outer: "top-0 right-0",
      borders: "border-t border-r",
    },
    "bottom-left": {
      outer: "bottom-0 left-0",
      borders: "border-b border-l",
    },
    "bottom-right": {
      outer: "bottom-0 right-0",
      borders: "border-b border-r",
    },
  };

  const { outer, borders } = styles[position];

  return (
    <div
      className={`pointer-events-none absolute hidden md:block ${outer} ${className}`}
      aria-hidden="true"
    >
      <div
        className={`${borders} border-byzantin-gold/25`}
        style={{ width: size, height: size }}
      />
    </div>
  );
}
