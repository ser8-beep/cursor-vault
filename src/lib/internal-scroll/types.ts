import type { MotionValue } from "motion/react";
import type { MutableRefObject, RefObject } from "react";

/** Lifecycle of the scroll handoff controller. */
export type InternalScrollPhase = "idle" | "active" | "completed";

export type InternalScrollExitDirection = "forward" | "backward";

export interface UseInternalScrollOptions {
  /** Sentinel marking the end of the first fold (handoff trigger). */
  handoffRef: RefObject<HTMLElement | null>;
  /** Master switch — false skips internal scroll (e.g. reduced motion). */
  enabled: boolean;
  /**
   * Wheel/touch travel in px required to traverse progress 0 → 1.
   * Tuned to feel like natural page scroll.
   */
  travelPx?: number;
  /**
   * Scroll progress (0–1) mapped to internal progress 1.
   * Should align with where document scroll would resume after handoff.
   */
  choreographyEnd?: number;
  /** Called after inertial forward animation completes and page scroll unlocks. */
  onForwardComplete?: () => void;
  /** Called after inertial backward animation completes and page scroll unlocks. */
  onBackwardComplete?: () => void;
}

export interface InternalScrollController {
  /** Normalized handoff progress — 0 at hero rest, 1 at sequence end. */
  progress: MotionValue<number>;
  /** Internal progress mapped to scroll-choreography range (0 → choreographyEnd). */
  choreographyProgress: MotionValue<number>;
  /** True while page scroll is locked and wheel drives internal progress. */
  isActive: boolean;
  phase: InternalScrollPhase;
  /** Stable ref mirror of `isActive` for motion subscribers (avoids stale closures). */
  isActiveRef: MutableRefObject<boolean>;
  /** Stable ref mirror of `phase` for motion subscribers (avoids stale closures). */
  phaseRef: MutableRefObject<InternalScrollPhase>;
  /** Manually enter internal scroll (e.g. for testing). */
  enter: () => void;
  /** Manually exit and restore page scroll. */
  exit: (direction?: InternalScrollExitDirection) => void;
}

export interface ScrollLockSnapshot {
  scrollY: number;
}
