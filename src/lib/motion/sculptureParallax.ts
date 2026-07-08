/**
 * Desktop sculpture sticky parallax — inferred from Figma prototype frames
 * 13:32094 (text-image-change) and 13:32102 (notes-enter), static notes 2034:15700.
 * get_motion_context returned no keyframes; values follow homePrototype scroll folds.
 */

import type { MotionValue } from "motion/react";
import { mapRange, SCROLL_FOLD } from "./homePrototype";

/** Hero resting pose — splash-organism sculpture-position-blur @ footer-enter */
export const SCULPTURE_HERO_REST = {
  leftPct: 50,
  translateXPct: -50,
  translateYPct: -46,
  scale: 1,
} as const;

/** Mid-scroll morph — second-fold-text-image-change (sculpture shifts right, blurs) */
export const SCULPTURE_MORPH_PEAK = {
  leftPct: 68,
  translateXPct: 0,
  translateYPct: -38,
  scale: 1.14,
} as const;

/** Notes collage pose — Figma 2034:14169 @ 1440×850 */
export const SCULPTURE_NOTES_REST = {
  leftPct: 47.55,
  topPct: 4,
  widthPct: 47.39,
  scale: 1.02,
} as const;

/** Subtle drift while scrolling through #data-stories (prototype sticky + parallax feel) */
export const SCULPTURE_NOTES_PARALLAX = {
  yPx: [-20, 32] as const,
  scaleDelta: [-0.03, 0.02] as const,
} as const;

export function sculptureMorphLeft(progress: number): number {
  if (progress < SCROLL_FOLD.textHideStart) return SCULPTURE_HERO_REST.leftPct;
  if (progress < SCROLL_FOLD.sculptureMorphEnd) {
    return mapRange(
      progress,
      SCROLL_FOLD.textHideStart,
      SCROLL_FOLD.sculptureMorphEnd,
      SCULPTURE_HERO_REST.leftPct,
      SCULPTURE_MORPH_PEAK.leftPct,
    );
  }
  if (progress < SCROLL_FOLD.notesStart) {
    return mapRange(
      progress,
      SCROLL_FOLD.sculptureMorphEnd,
      SCROLL_FOLD.notesStart,
      SCULPTURE_MORPH_PEAK.leftPct,
      SCULPTURE_NOTES_REST.leftPct,
    );
  }
  return SCULPTURE_NOTES_REST.leftPct;
}

export function sculptureMorphTranslateX(progress: number): number {
  if (progress < SCROLL_FOLD.textHideStart) return SCULPTURE_HERO_REST.translateXPct;
  if (progress < SCROLL_FOLD.sculptureMorphEnd) {
    return mapRange(
      progress,
      SCROLL_FOLD.textHideStart,
      SCROLL_FOLD.sculptureMorphEnd,
      SCULPTURE_HERO_REST.translateXPct,
      SCULPTURE_MORPH_PEAK.translateXPct,
    );
  }
  return 0;
}

export function sculptureMorphTranslateY(progress: number): number {
  if (progress < SCROLL_FOLD.textHideStart) return SCULPTURE_HERO_REST.translateYPct;
  if (progress < SCROLL_FOLD.sculptureMorphEnd) {
    return mapRange(
      progress,
      SCROLL_FOLD.textHideStart,
      SCROLL_FOLD.sculptureMorphEnd,
      SCULPTURE_HERO_REST.translateYPct,
      SCULPTURE_MORPH_PEAK.translateYPct,
    );
  }
  if (progress < SCROLL_FOLD.notesStart) {
    return mapRange(
      progress,
      SCROLL_FOLD.sculptureMorphEnd,
      SCROLL_FOLD.notesStart,
      SCULPTURE_MORPH_PEAK.translateYPct,
      0,
    );
  }
  return 0;
}

export function sculptureMorphScale(progress: number): number {
  if (progress < SCROLL_FOLD.textHideStart) return SCULPTURE_HERO_REST.scale;
  if (progress < SCROLL_FOLD.sculptureMorphEnd) {
    return mapRange(
      progress,
      SCROLL_FOLD.textHideStart,
      SCROLL_FOLD.sculptureMorphEnd,
      SCULPTURE_HERO_REST.scale,
      SCULPTURE_MORPH_PEAK.scale,
    );
  }
  if (progress < SCROLL_FOLD.notesStart) {
    return mapRange(
      progress,
      SCROLL_FOLD.sculptureMorphEnd,
      SCROLL_FOLD.notesStart,
      SCULPTURE_MORPH_PEAK.scale,
      SCULPTURE_NOTES_REST.scale,
    );
  }
  return SCULPTURE_NOTES_REST.scale;
}

/** 0 = hero image, 1 = notes collage image — crossfade during notes entry */
export function sculptureImageBlend(progress: number): number {
  if (progress < SCROLL_FOLD.sculptureMorphEnd) return 0;
  return mapRange(
    progress,
    SCROLL_FOLD.sculptureMorphEnd,
    SCROLL_FOLD.notesStart + 0.08,
    0,
    1,
  );
}

export function sculptureBlurPx(progress: number, entranceSharp: boolean): number {
  if (!entranceSharp) return 27;
  if (progress < SCROLL_FOLD.textHideStart) return 0;
  if (progress < SCROLL_FOLD.notesStart) return 27;
  return 0;
}

/** Fixed-layer opacity — visible throughout desktop scroll choreography */
export function sculptureLayerOpacity(_progress: number): number {
  return 1;
}

export function notesParallaxY(sectionProgress: number): number {
  return mapRange(
    sectionProgress,
    0,
    1,
    SCULPTURE_NOTES_PARALLAX.yPx[0],
    SCULPTURE_NOTES_PARALLAX.yPx[1],
  );
}

export function notesParallaxScaleDelta(sectionProgress: number): number {
  return mapRange(
    sectionProgress,
    0,
    1,
    SCULPTURE_NOTES_PARALLAX.scaleDelta[0],
    SCULPTURE_NOTES_PARALLAX.scaleDelta[1],
  );
}

export function isSculptureStickyPhase(progress: number): boolean {
  return progress >= SCROLL_FOLD.notesStart;
}

/** Combine global morph scale with section parallax delta during notes sticky phase */
export function combineSculptureScale(
  globalProgress: number,
  sectionProgress: number,
  sticky: boolean,
): number {
  const base = sculptureMorphScale(globalProgress);
  if (!sticky) return base;
  return base + notesParallaxScaleDelta(sectionProgress);
}

export type SculptureMotionInputs = {
  scrollProgress: MotionValue<number>;
  notesSectionProgress: MotionValue<number>;
  entranceSharp: boolean;
  motionEnabled: boolean;
};
