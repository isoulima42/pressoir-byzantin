"use client";

import { motion, useInView, useReducedMotion, Variants } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  stagger?: boolean;
  staggerChildren?: number;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  stagger = false,
  staggerChildren = 0.1,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.15, margin: "0px 0px -50px 0px" });

  const getVariants = (): Variants => {
    if (stagger) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerChildren,
            delayChildren: delay,
          },
        },
      };
    }

    const directionMap = {
      up: { y: 40, x: 0 },
      down: { y: -40, x: 0 },
      left: { x: 40, y: 0 },
      right: { x: -40, y: 0 },
      none: { x: 0, y: 0 },
    };

    const transform = directionMap[direction];
    const hiddenTransform = prefersReducedMotion ? { x: 0, y: 0 } : transform;

    return {
      hidden: {
        opacity: 0,
        ...hiddenTransform,
        filter: prefersReducedMotion ? "blur(0px)" : "blur(10px)",
      },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        x: 0,
        y: 0,
        transition: {
          duration: prefersReducedMotion ? 0.2 : 0.8,
          delay: delay,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    };
  };

  return (
    <motion.div
      ref={ref}
      variants={getVariants()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  );
}
