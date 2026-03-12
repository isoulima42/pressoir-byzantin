"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const pathname = usePathname();

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shouldEnable = finePointer.matches && !reducedMotion.matches;

    if (!shouldEnable) {
      document.body.classList.remove("custom-cursor-active");
      return;
    }

    document.body.classList.add("custom-cursor-active");

    const updatePosition = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      cursorX.set(event.clientX - 16);
      cursorY.set(event.clientY - 16);
      setIsVisible(true);
    };

    const updateHoverState = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      setIsHovering(
        Boolean(
          target.closest(
            "a, button, input, textarea, select, summary, [role='button'], .hover-trigger"
          )
        )
      );
    };

    const hideCursor = () => {
      setIsVisible(false);
      setIsHovering(false);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", updateHoverState);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", hideCursor);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", updateHoverState);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", hideCursor);
    };
  }, [cursorX, cursorY, pathname]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border border-brand-orange/80 mix-blend-exclusion"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicking ? 0.84 : isHovering ? 1.45 : 1,
          backgroundColor: isHovering ? "rgba(251, 143, 44, 0.12)" : "transparent",
        }}
        transition={{ type: "spring", mass: 0.1, stiffness: 200, damping: 15 }}
      />

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-brand-orange shadow-[0_0_10px_2px_rgba(251,143,44,0.45)] mix-blend-exclusion"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isClicking ? 0.55 : isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
    </>
  );
}
