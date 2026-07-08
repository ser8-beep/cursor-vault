"use client";

import { type MotionValue, useMotionValue, useMotionValueEvent } from "motion/react";
import { useEffect } from "react";

const DEFAULT_LERP = 0.14;

/**
 * Exponential lerp toward a source MotionValue — smooths stepped scroll reads
 * for parallax without adding spring overshoot.
 */
export function useSmoothedMotionValue(
  source: MotionValue<number>,
  lerp = DEFAULT_LERP,
): MotionValue<number> {
  const smoothed = useMotionValue(source.get());

  useMotionValueEvent(source, "change", (target) => {
    const current = smoothed.get();
    if (Math.abs(current - target) < 0.0005) {
      smoothed.set(target);
      return;
    }
    smoothed.set(current + (target - current) * lerp);
  });

  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      const target = source.get();
      const current = smoothed.get();
      if (Math.abs(current - target) >= 0.0005) {
        smoothed.set(current + (target - current) * lerp);
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [source, smoothed, lerp]);

  return smoothed;
}
