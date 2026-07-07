/**
 * Timing derived from Portfolio AI Handoff prototype frames (node 13:32063 →
 * 13:32102). get_motion_context returned no keyframes — these are approximate
 * Smart Animate transition timings for scroll/on-load choreography.
 *
 * Figma nodes:
 *   13:32063 footer-enter
 *   13:32068 header-enter
 *   13:32074 cs-carousel-enter
 *   13:32087 cursor-enter
 *   13:32094 second-fold-text-image-change (scroll)
 *   13:32102 second-fold-notes-enter (scroll)
 */

export const EASE_STANDARD = [0.4, 0, 0.2, 1] as const;

export const ENTRANCE = {
  contact: { delay: 0, duration: 0.4 },
  headerShell: { delay: 0.12, duration: 0.45 },
  headerNav: { delay: 0.28, duration: 0.35 },
  resume: { delay: 0.22, duration: 0.4 },
  sculptureBlur: { delay: 0.35, duration: 0.7 },
  carousel: { delay: 0.55, duration: 0.5 },
  cursor: { delay: 0.75, duration: 0.4 },
} as const;

/** Scroll progress breakpoints for second-fold (0 = carousel in view, 1 = notes settled). */
export const SCROLL_FOLD = {
  textHideStart: 0.08,
  textHideEnd: 0.28,
  sculptureMorphEnd: 0.42,
  notesStart: 0.32,
  notesEnd: 0.72,
  textReturnStart: 0.55,
  textReturnEnd: 0.78,
  cursorMoveEnd: 0.85,
} as const;

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin = 0,
  outMax = 1,
): number {
  if (inMax === inMin) return outMin;
  const t = clamp01((value - inMin) / (inMax - inMin));
  return outMin + t * (outMax - outMin);
}
