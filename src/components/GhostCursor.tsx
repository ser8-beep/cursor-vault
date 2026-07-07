"use client";

import { motion, type MotionValue, useTransform } from "motion/react";
import { EASE_STANDARD, mapRange, SCROLL_FOLD } from "@/lib/motion/homePrototype";

/** Figma ghost-cursor display scale (13:355). */
const CURSOR_SCALE = 0.25;
const CURSOR_SCALE_ENTER = CURSOR_SCALE * 0.92;

type GhostCursorProps = {
  scrollProgress: MotionValue<number>;
  motionEnabled: boolean;
  entranceVisible: boolean;
};

/**
 * ghost-cursor — Figma 13:355. Motion: cursor-enter (13:32087),
 * repositions at 13:32094 and 13:32102.
 */
export function GhostCursor({
  scrollProgress,
  motionEnabled,
  entranceVisible,
}: GhostCursorProps) {
  const opacity = useTransform(scrollProgress, (p) => {
    if (!motionEnabled) return entranceVisible ? 1 : 0;
    if (!entranceVisible) return 0;
    return p > 0.92 ? Math.max(0, 1 - (p - 0.92) / 0.08) : 1;
  });

  const left = useTransform(scrollProgress, (p) => {
    const enterLeft = 18.06;
    const notesLeft = 2.08;
    if (!motionEnabled || p < SCROLL_FOLD.textHideStart) return "9.03%";
    return `${mapRange(p, SCROLL_FOLD.textHideStart, SCROLL_FOLD.cursorMoveEnd, enterLeft, notesLeft)}%`;
  });

  const top = useTransform(scrollProgress, (p) => {
    const enterTop = 50;
    const midTop = 49.3;
    const notesTop = 82;
    if (!motionEnabled || p < SCROLL_FOLD.textHideStart) return `${enterTop}%`;
    if (p < SCROLL_FOLD.notesEnd) {
      return `${mapRange(p, SCROLL_FOLD.textHideStart, SCROLL_FOLD.cursorMoveEnd, enterTop, midTop)}%`;
    }
    return `${mapRange(p, SCROLL_FOLD.notesEnd, SCROLL_FOLD.cursorMoveEnd, midTop, notesTop)}%`;
  });

  if (!motionEnabled && !entranceVisible) return null;

  return (
    <motion.div
      aria-hidden="true"
      data-node-id="13:355"
      data-name="ghost-cursor"
      className="pointer-events-none absolute z-[var(--z-40)] flex origin-top-right flex-col items-end gap-gap-sm"
      style={{ opacity: motionEnabled ? opacity : entranceVisible ? 1 : 0, left, top, translateY: "-50%" }}
      initial={motionEnabled ? { opacity: 0, scale: CURSOR_SCALE_ENTER } : false}
      animate={
        entranceVisible
          ? { opacity: 1, scale: CURSOR_SCALE }
          : { opacity: 0, scale: CURSOR_SCALE_ENTER }
      }
      transition={{ duration: 0.4, ease: EASE_STANDARD }}
    >
      <div className="flex size-[var(--space-20)] items-center justify-center">
        <svg
          viewBox="0 0 14 15"
          className="h-[14.788px] w-[13.849px] -scale-y-100 -rotate-[144.3deg] -skew-x-[0.6deg]"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 1L1 12.5L5.2 9.1L7.5 13.5L9.5 12.5L7.2 8.1L12.5 7.5L1 1Z"
            fill="var(--color-zinc-950)"
            stroke="var(--color-zinc-50)"
            strokeWidth="1.2"
          />
        </svg>
      </div>
      <div className="flex flex-col items-end pr-[var(--space-32)]">
        <div className="flex max-w-[300px] items-center justify-end rounded-bl-[var(--space-24)] rounded-br-[var(--space-24)] rounded-tl-[var(--space-24)] border-[3px] border-blue-700 bg-blue-700 px-[var(--space-16)] py-[var(--space-12)] backdrop-blur-[2px] shadow-[0_4px_12px_rgba(0,51,218,0.3)]">
          <p className="font-display text-label-s uppercase tracking-[0.56px] text-zinc-50">
            Scroll to see my OOO experiments
          </p>
        </div>
      </div>
    </motion.div>
  );
}
