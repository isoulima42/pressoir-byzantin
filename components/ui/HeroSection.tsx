"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroSectionProps {
  image: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  compact?: boolean;
}

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
});

export default function HeroSection({
  image,
  title,
  subtitle,
  children,
  compact = false,
}: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden w-full flex items-center justify-center ${
        compact ? "h-[60dvh]" : "h-[100dvh]"
      }`}
    >
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0 z-0 origin-top" style={{ y: imageY }}>
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover scale-105"
          sizes="100vw"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/40 to-brand-dark" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center"
      >
        {/* Decorative line */}
        <motion.div
          {...fade(0.1)}
          className="mb-6 h-px w-16 bg-byzantin-gold"
        />

        <motion.h1
          {...fade(0.3)}
          className="font-heading text-5xl font-bold text-brand-cream md:text-7xl lg:text-8xl drop-shadow-lg"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            {...fade(0.5)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-brand-cream/80 md:text-xl font-accent italic tracking-wide"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div {...fade(0.7)} className="mt-10">
            {children}
          </motion.div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      {!compact && (
        <motion.div {...fade(1.2)} className="absolute bottom-10 z-20">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="20"
              height="30"
              viewBox="0 0 20 30"
              fill="none"
              className="text-byzantin-gold/60"
            >
              <rect
                x="1"
                y="1"
                width="18"
                height="28"
                rx="9"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="10" cy="10" r="2" fill="currentColor" />
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark to-transparent z-10 pointer-events-none" />
    </div>
  );
}
