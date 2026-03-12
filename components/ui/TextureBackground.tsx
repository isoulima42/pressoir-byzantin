interface TextureBackgroundProps {
  texture: "pierre" | "bois" | "parchemin" | "byzantin";
  opacity?: number;
  children: React.ReactNode;
  className?: string;
}

const TEXTURE_MAP: Record<string, string> = {
  pierre: "/images/generated/textures/texture_pierre.webp",
  bois: "/images/generated/textures/texture_bois_sombre.webp",
  parchemin: "/images/generated/textures/texture_parchemin.webp",
  byzantin: "/images/generated/textures/texture_byzantin_pattern.webp",
};

export default function TextureBackground({
  texture,
  opacity = 0.08,
  children,
  className = "",
}: TextureBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${TEXTURE_MAP[texture]})`,
          backgroundRepeat: "repeat",
          backgroundSize: "512px 512px",
          opacity,
        }}
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
