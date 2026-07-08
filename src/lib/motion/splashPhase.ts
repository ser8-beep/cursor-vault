/**
 * First-fold prototype phases — Figma frames:
 *   13:32059 / 54:1126 splash (typewriter + brand + sculpture)
 *   13:32063 footer-enter (+ contact + headline)
 *   13:32068 header-enter (+ nav links + resume)
 */

export type SplashPhase = "splash" | "footer" | "header";

export const SPLASH_PHASE_MS = {
  /** Typewriter indicators before footer-enter */
  splash: 1200,
  /** Contact + headline before header-enter */
  footer: 900,
} as const;
