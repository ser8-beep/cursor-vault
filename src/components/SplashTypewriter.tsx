"use client";

import { motion } from "motion/react";
import { EASE_STANDARD } from "@/lib/motion/homePrototype";

const HERO_SPLASH_DYNAMIC = "AI Native, Lean UX";
const HERO_SPLASH_ANCHOR = "Lead UI/UX - L1";
const HERO_SUBTEXT =
  "PRODUCT_DESIGNER //AI NATIVE_LEAN UX_SYSTEMS_WORKFLOWS";

type SplashTypewriterProps = {
  motionEnabled: boolean;
  visible: boolean;
};

/**
 * text-animation-molecule inner content @ splash — Figma 104:18257.
 * Parent Hero provides pt-20 + 593px stack; this renders dynamic + anchor rows only.
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
      className="flex w-full flex-col gap-gap-sm"
      data-node-id="104:18257"
      data-name="text-animation-molecule-inner"
      aria-hidden={!visible}
      {...motionProps}
    >
      <div className="flex w-full items-center" data-name="dynamic">
        <div
          className="flex h-[var(--height-hero-dynamic)] flex-1 items-start"
          data-name="text-animation-right-atoms"
        >
          <p className="font-display [font-stretch:expanded] uppercase text-hero-compact leading-hero-dynamic tracking-normal text-text-link whitespace-nowrap">
            {HERO_SPLASH_DYNAMIC}
          </p>
        </div>
      </div>

      <div className="flex w-full items-center" data-name="anchor">
        <div
          className="flex flex-1 flex-col items-start gap-xs"
          data-name="text-animation-left-atoms"
        >
          <p className="font-display [font-stretch:expanded] uppercase text-hero-compact leading-hero-compact tracking-normal text-text-primary whitespace-nowrap">
            {HERO_SPLASH_ANCHOR}
          </p>
          <p className="font-display text-caption leading-3 tracking-wider text-text-secondary">
            {HERO_SUBTEXT}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
