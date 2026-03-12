"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionDividerProps {
  variant?: "ornate" | "simple";
  className?: string;
}

export default function SectionDivider({
  variant = "ornate",
  className = "",
}: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`mx-auto flex max-w-[500px] origin-center items-center gap-4 ${className}`}
      aria-hidden="true"
    >
      {variant === "ornate" ? (
        <>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-byzantin-gold/40" />
          <svg width="12" height="12" viewBox="0 0 12 12" className="shrink-0 text-byzantin-gold/50">
            <rect x="6" y="0" width="8.49" height="8.49" rx="1" transform="rotate(45 6 0)" fill="currentColor" />
          </svg>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-byzantin-gold/40" />
        </>
      ) : (
        <div className="h-px w-full bg-gradient-to-r from-transparent via-byzantin-gold/30 to-transparent" />
      )}
    </motion.div>
  );
}
