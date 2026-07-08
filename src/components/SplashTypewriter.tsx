"use client";

import { motion } from "motion/react";
import { EASE_STANDARD } from "@/lib/motion/homePrototype";

type SplashTypewriterProps = {
  motionEnabled: boolean;
  visible: boolean;
};

/**
 * text-animation-molecule @ splash — Figma 13:521 / 54:1128.
 * Left atom V1-01 (54:1037): .....(pipe) + PR label.
 * Right atom V1-01 (54:826): blue dash + pipe.
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
      className="flex w-full items-center justify-between"
      data-node-id="13:521"
      data-name="text-animation-molecule"
      aria-hidden={!visible}
      {...motionProps}
    >
      <div
        className="flex flex-col gap-[var(--space-12)] h-[var(--space-80)] w-full max-w-[476px]"
        data-name="text=lead ui/ux, modes=V1-01"
      >
        <p className="font-display [font-stretch:expanded] uppercase text-hero leading-hero tracking-normal text-text-primary whitespace-nowrap">
          .....|
        </p>
        <p className="font-display uppercase text-base leading-3 tracking-wider text-text-secondary">
          PR
        </p>
      </div>

      <div
        className="flex h-[var(--space-80)] items-start justify-end w-full max-w-[600px]"
        data-name="text=ai native, modes=V1-01"
      >
        <p className="font-display [font-stretch:expanded] uppercase text-hero leading-hero tracking-normal text-text-link text-right whitespace-nowrap">
          -|
        </p>
      </div>
    </motion.div>
  );
}
