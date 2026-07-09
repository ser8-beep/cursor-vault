import {
  SCULPTURE_MODEL_A_URL,
  SCULPTURE_MODEL_B_URL,
} from "@/lib/sculpture-assets";

/** Hero / data-stories sculpture GLBs — canonical: src/lib/internal-scroll/3d-assets/ */
export const MODEL_A_URL = SCULPTURE_MODEL_A_URL;
export const MODEL_B_URL = SCULPTURE_MODEL_B_URL;

/**
 * Z-layering for page-scroll sculpture choreography.
 * geometry phase: behind carousel (z-20 < z-40)
 * globe phase: above notes collage (z-50 > z-30)
 */
export const Z_INDEX = {
  sculptureBehind: 20,
  notes: 30,
  carousel: 40,
  sculptureFront: 50,
} as const;

/**
 * Target bounding height after normalize — keeps both models visually matched.
 * Tuned for 1440×900 desktop.
 */
export const MODEL_TARGET_HEIGHT = 1.45;

/** Fixed camera — never animated. */
export const CAMERA = {
  position: [0, 0.12, 4.05] as const,
  fov: 35,
  near: 0.1,
  far: 50,
};

/** Fixed lookAt target — camera never animates. */
export const CAMERA_LOOK_AT: readonly [number, number, number] = [0, 0.04, 0];

/** Hero resting pose — geometry sits in upper hero, above carousel overlap. */
export const HERO = {
  posY: 0.28,
  scale: 1,
} as const;

/** End of pre-morph travel — geometry lowered as it passes behind carousel cards. */
export const PRE_MORPH = {
  posY: 0.06,
} as const;

/** Phase boundaries as fractions of morph scroll progress (0–1). */
export const PHASE = {
  rotateEnd: 0.45,
  morphEnd: 0.55,
} as const;

/** Phase 3 reveal maxima — globe scales up, moves toward camera, docks bottom-center. */
export const REVEAL = {
  scale: 1.35,
  posZ: 0.4,
  /** Fallback Y when dock projection is inactive; useFrame overrides at phase 3. */
  posY: -0.72,
} as const;

/** Turntable micro-motion (radians). Keep nearly imperceptible. */
export const MICRO = {
  rotX: (2 * Math.PI) / 180,
  rotZ: (1 * Math.PI) / 180,
  freqX: 0.35,
  freqZ: 0.22,
} as const;

/** Scroll bridge height between carousel end and notes — morph scrub distance (~2–3 swipes). */
export const MORPH_BRIDGE_VH = 120;
