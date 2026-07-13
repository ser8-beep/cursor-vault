"use client";

import { type MotionValue, useScroll } from "motion/react";
import type { RefObject } from "react";
import { useSmoothedMotionValue } from "@/hooks/useSmoothedMotionValue";

type UseLazyScrollProgressOptions = {
  target: RefObject<HTMLElement | null>;
  /** Lerp toward scroll position — lower = lazier follow (default 0.12). */
  smooth?: number;
};

/**
 * Document scroll progress (0→1) for the full home page, lightly smoothed
 * so hero/sculpture choreography tracks scroll without handoff or scroll lock.
 */
export function useLazyScrollProgress({
  target,
  smooth = 0.12,
}: UseLazyScrollProgressOptions): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });

  return useSmoothedMotionValue(scrollYProgress, smooth);
}
