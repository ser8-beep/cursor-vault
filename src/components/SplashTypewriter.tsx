"use client";

import { motion } from "motion/react";
import { EASE_STANDARD } from "@/lib/motion/homePrototype";

const HERO_SUBTEXT =
  "PRODUCT_DESIGNER // AI NATIVE LEAN UX SYSTEMS WORKFLOWS";

type SplashTypewriterProps = {
  motionEnabled: boolean;
  visible: boolean;
};

/**
 * text-animation-molecule @ splash — Figma 104:18518 / 104:18253.
 * Stacked vertical molecule: blue dynamic line top-right, black anchor + subtext left.
 */
export function SplashTypewriter({ motionEnabled, visible }: SplashTypewriterProps) {
  const motionProps = motionEnabled
    ? {
        initial: { opacity: 0 },
        animate: visible ? { opacity: 1 } : { opacity: 0 },
        transition: { duration: 0.35, ease: EASE_STANDARD },
      }
    : { style: { opacity: visible ? 1 : 0 } };

  return (
    <motion.div
      className="flex w-full flex-col gap-gap-sm pt-[var(--space-20)]"
      data-node-id="104:18522"
      data-name="text-animation-molecule"
      aria-hidden={!visible}
      {...motionProps}
    >
      <div className="flex w-full items-start" data-name="dynamic">
        <div
          className="flex flex-1 items-start justify-end"
          data-name="text-animation-right-atoms"
        >
          <p className="font-display [font-stretch:expanded] uppercase text-hero-compact leading-hero-compact tracking-normal text-text-link text-right whitespace-nowrap">
            AI Native, Lean UX
          </p>
        </div>
      </div>

      <div className="flex w-full items-center" data-name="anchor">
        <div
          className="flex flex-1 flex-col items-start gap-xs"
          data-name="text-animation-left-atoms"
        >
          <p className="font-display [font-stretch:expanded] uppercase text-hero-compact leading-hero-compact tracking-normal text-text-primary whitespace-nowrap">
            Lead UI/UX - L1
          </p>
          <p className="font-display text-caption leading-3 tracking-wider text-text-secondary">
            {HERO_SUBTEXT}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
