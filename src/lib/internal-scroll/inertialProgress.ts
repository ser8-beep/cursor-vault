/**
 * Eased animation for internal scroll progress (inertial handoff — not 1:1 trackpad).
 */

export type ProgressAnimationOptions = {
  durationMs?: number;
  onUpdate?: (value: number) => void;
  onComplete?: () => void;
};

const DEFAULT_DURATION_MS = 950;

/** ease-out cubic — decelerates like native scroll momentum settling. */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Animate a normalized value from `from` → `to` via rAF.
 * Returns cancel function.
 */
export function animateProgress(
  from: number,
  to: number,
  setValue: (value: number) => void,
  options: ProgressAnimationOptions = {},
): () => void {
  const durationMs = options.durationMs ?? DEFAULT_DURATION_MS;
  const startTime = performance.now();
  let rafId = 0;
  let cancelled = false;

  const tick = (now: number) => {
    if (cancelled) return;
    const t = Math.min(1, (now - startTime) / durationMs);
    const value = from + (to - from) * easeOutCubic(t);
    setValue(value);
    options.onUpdate?.(value);
    if (t < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      options.onComplete?.();
    }
  };

  rafId = requestAnimationFrame(tick);

  return () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
  };
}

/** Map wheel delta magnitude to animation duration (small flick = full travel). */
export function durationFromWheelDelta(deltaY: number): number {
  const magnitude = Math.min(Math.abs(deltaY), 120);
  return 750 + (1 - magnitude / 120) * 350;
}
