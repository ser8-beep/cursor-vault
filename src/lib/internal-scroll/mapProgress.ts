import { clamp01, mapRange } from "@/lib/motion/homePrototype";
import { DEFAULT_CHOREOGRAPHY_END } from "./constants";

/** Map internal handoff progress (0–1) to scroll choreography progress. */
export function internalToChoreography(
  internalProgress: number,
  choreographyEnd: number = DEFAULT_CHOREOGRAPHY_END,
): number {
  return mapRange(clamp01(internalProgress), 0, 1, 0, choreographyEnd);
}

/**
 * Map document scroll choreography back into internal progress when re-entering
 * from above the handoff threshold.
 */
export function choreographyToInternal(
  choreographyProgress: number,
  choreographyEnd: number = DEFAULT_CHOREOGRAPHY_END,
): number {
  if (choreographyEnd <= 0) return 0;
  return clamp01(choreographyProgress / choreographyEnd);
}
