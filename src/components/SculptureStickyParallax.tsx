"use client";

import {
  motion,
  type MotionValue,
  useMotionTemplate,
  useTransform,
} from "motion/react";
import { useSmoothedMotionValue } from "@/hooks/useSmoothedMotionValue";
import {
  isSculptureNotesStickyPhase,
  isSculptureStickyPhase,
  notesParallaxScaleDelta,
  notesParallaxY,
  SCULPTURE_NOTES_REST,
  sculptureBlurPx,
  sculptureImageBlend,
  sculptureImageBlendFromSection,
  sculptureLayerOpacity,
  sculptureMorphLeft,
  sculptureMorphScale,
  sculptureMorphTranslateX,
  sculptureMorphTranslateY,
} from "@/lib/motion/sculptureParallax";
import { mapRange, SCROLL_FOLD } from "@/lib/motion/homePrototype";
import { FigmaImage } from "./FigmaImage";
import { FigmaPicture } from "./FigmaPicture";

const HERO_ASPECT = 366 / 782;

type SculptureStickyParallaxProps = {
  scrollProgress: MotionValue<number>;
  notesSectionProgress: MotionValue<number>;
  entranceSharp: boolean;
  motionEnabled: boolean;
  /** Hide only while motion video scrubs (act 1), not act 2 bridge. */
  suppressDuringHandoff?: boolean;
};

/**
 * Desktop sticky marble sculpture — Figma 13:32094 → 13:32102.
 * Morphs from hero pose into notes collage, crossfades image, parallaxes through #data-stories.
 */
export function SculptureStickyParallax({
  scrollProgress,
  notesSectionProgress,
  entranceSharp,
  motionEnabled,
  suppressDuringHandoff = false,
}: SculptureStickyParallaxProps) {
  const smoothedSectionProgress = useSmoothedMotionValue(notesSectionProgress, 0.12);

  const layerOpacity = useTransform(scrollProgress, (p) =>
    motionEnabled ? sculptureLayerOpacity(p) : 0,
  );

  const left = useTransform(scrollProgress, (p) =>
    motionEnabled ? `${sculptureMorphLeft(p)}%` : `${SCULPTURE_NOTES_REST.leftPct}%`,
  );

  const top = useTransform(
    [scrollProgress, smoothedSectionProgress],
    ([p, sectionP]) => {
      if (!motionEnabled) return `${SCULPTURE_NOTES_REST.topPct}%`;
      if (
        isSculptureStickyPhase(p as number) ||
        isSculptureNotesStickyPhase(sectionP as number)
      ) {
        return `${SCULPTURE_NOTES_REST.topPct}%`;
      }
      return "50%";
    },
  );

  const translateX = useTransform(
    [scrollProgress, smoothedSectionProgress],
    ([p, sectionP]) => {
      if (!motionEnabled) return "0%";
      if (
        isSculptureStickyPhase(p as number) ||
        isSculptureNotesStickyPhase(sectionP as number)
      ) {
        return "0%";
      }
      return `${sculptureMorphTranslateX(p as number)}%`;
    },
  );

  const translateY = useTransform(
    [scrollProgress, smoothedSectionProgress],
    ([p, sectionP]) => {
      if (!motionEnabled) return "0%";
      if (
        isSculptureStickyPhase(p as number) ||
        isSculptureNotesStickyPhase(sectionP as number)
      ) {
        return "0%";
      }
      return `${sculptureMorphTranslateY(p as number)}%`;
    },
  );

  const parallaxY = useTransform(smoothedSectionProgress, (sectionP) => {
    if (!motionEnabled || !isSculptureNotesStickyPhase(sectionP)) return 0;
    return notesParallaxY(sectionP);
  });

  const scale = useTransform(
    [scrollProgress, smoothedSectionProgress],
    ([p, sectionP]) => {
      if (!motionEnabled) return SCULPTURE_NOTES_REST.scale;
      const sticky =
        isSculptureStickyPhase(p as number) ||
        isSculptureNotesStickyPhase(sectionP as number);
      if (!sticky) return sculptureMorphScale(p as number);
      const base = sculptureMorphScale(p as number);
      return base + notesParallaxScaleDelta(sectionP as number);
    },
  );

  const blurPx = useTransform(
    [scrollProgress, smoothedSectionProgress],
    ([p, sectionP]) => {
      if (!motionEnabled) return 0;
      if (isSculptureNotesStickyPhase(sectionP as number)) return 0;
      return sculptureBlurPx(p as number, entranceSharp);
    },
  );
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  const heroImageOpacity = useTransform(
    [scrollProgress, smoothedSectionProgress],
    ([p, sectionP]) => {
      if (!motionEnabled) return 0;
      if (isSculptureNotesStickyPhase(sectionP as number)) {
        return 1 - sculptureImageBlendFromSection(sectionP as number);
      }
      return 1 - sculptureImageBlend(p as number);
    },
  );
  const notesImageOpacity = useTransform(
    [scrollProgress, smoothedSectionProgress],
    ([p, sectionP]) => {
      if (!motionEnabled) return 1;
      if (isSculptureNotesStickyPhase(sectionP as number)) {
        return sculptureImageBlendFromSection(sectionP as number);
      }
      return sculptureImageBlend(p as number);
    },
  );

  const width = useTransform(
    [scrollProgress, smoothedSectionProgress],
    ([p, sectionP]) => {
      if (!motionEnabled) return "min(var(--width-notes-sculpture), 47.39vw)";
      const sticky =
        isSculptureStickyPhase(p as number) ||
        isSculptureNotesStickyPhase(sectionP as number);
      if (sticky) return "min(var(--width-notes-sculpture), 47.39vw)";
      const t = mapRange(p as number, SCROLL_FOLD.sculptureMorphEnd, SCROLL_FOLD.notesStart, 0, 1);
      const heroHeightExpr = "calc(100svh - var(--section-hero) * 1.15)";
      const heroWidth = `calc(${heroHeightExpr} * ${HERO_ASPECT})`;
      if ((p as number) < SCROLL_FOLD.sculptureMorphEnd) return heroWidth;
      const notesWidth = "min(var(--width-notes-sculpture), 47.39vw)";
      return t < 1 ? heroWidth : notesWidth;
    },
  );

  const height = useTransform(
    [scrollProgress, smoothedSectionProgress],
    ([p, sectionP]) => {
      if (!motionEnabled) return "auto";
      const sticky =
        isSculptureStickyPhase(p as number) ||
        isSculptureNotesStickyPhase(sectionP as number);
      if (sticky) return "auto";
      return "calc(100svh - var(--section-hero) * 1.15)";
    },
  );

  const aspectRatio = useTransform(
    [scrollProgress, smoothedSectionProgress],
    ([p, sectionP]) => {
      const sticky =
        isSculptureStickyPhase(p as number) ||
        isSculptureNotesStickyPhase(sectionP as number);
      return sticky ? "628 / 1024" : `${366} / ${782}`;
    },
  );

  if (!motionEnabled || suppressDuringHandoff) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[var(--z-30)] max-h-[calc(var(--space-160)*4.9)] overflow-hidden"
      style={{
        opacity: layerOpacity,
        left,
        top,
        x: translateX,
        y: parallaxY,
        translateY,
        scale,
        filter,
        width,
        height,
        aspectRatio,
      }}
      data-name="sculpture-sticky-parallax"
      data-node-id="2034:14169"
    >
      <motion.div className="absolute inset-0" style={{ opacity: heroImageOpacity }}>
        <FigmaPicture
          asset="sculpture"
          fill
          priority
          className="absolute inset-0 size-full"
          imgClassName="absolute max-w-none w-[180.67%] h-[113.3%] left-[-70.44%] top-[-13.25%] object-cover"
          data-name="marble-designing-systems"
        />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ opacity: notesImageOpacity }}>
        <FigmaImage
          asset="notesSculptureFigure"
          alt=""
          fill
          className="object-contain object-top"
          data-name="29"
        />
      </motion.div>
    </motion.div>
  );
}
