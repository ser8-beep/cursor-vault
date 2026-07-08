"use client";

import {
  motion,
  type MotionValue,
  useMotionTemplate,
  useTransform,
} from "motion/react";
import {
  isSculptureStickyPhase,
  notesParallaxY,
  SCULPTURE_NOTES_REST,
  sculptureBlurPx,
  sculptureImageBlend,
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
}: SculptureStickyParallaxProps) {
  const layerOpacity = useTransform(scrollProgress, (p) =>
    motionEnabled ? sculptureLayerOpacity(p) : 0,
  );

  const left = useTransform(scrollProgress, (p) =>
    motionEnabled ? `${sculptureMorphLeft(p)}%` : `${SCULPTURE_NOTES_REST.leftPct}%`,
  );

  const top = useTransform(scrollProgress, (p) => {
    if (!motionEnabled) return `${SCULPTURE_NOTES_REST.topPct}%`;
    return isSculptureStickyPhase(p) ? `${SCULPTURE_NOTES_REST.topPct}%` : "50%";
  });

  const translateX = useTransform(scrollProgress, (p) => {
    if (!motionEnabled) return "0%";
    if (isSculptureStickyPhase(p)) return "0%";
    return `${sculptureMorphTranslateX(p)}%`;
  });

  const translateY = useTransform(scrollProgress, (p) => {
    if (!motionEnabled) return "0%";
    if (isSculptureStickyPhase(p)) return "0%";
    return `${sculptureMorphTranslateY(p)}%`;
  });

  const parallaxY = useTransform([scrollProgress, notesSectionProgress], ([p, sectionP]) => {
    if (!motionEnabled || !isSculptureStickyPhase(p as number)) return 0;
    return notesParallaxY(sectionP as number);
  });

  const scale = useTransform([scrollProgress, notesSectionProgress], ([p, sectionP]) => {
    if (!motionEnabled) return SCULPTURE_NOTES_REST.scale;
    if (!isSculptureStickyPhase(p as number)) {
      return sculptureMorphScale(p as number);
    }
    const base = sculptureMorphScale(p as number);
    return base + notesParallaxY(sectionP as number) * 0.0004;
  });

  const blurPx = useTransform(scrollProgress, (p) =>
    motionEnabled ? sculptureBlurPx(p, entranceSharp) : 0,
  );
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  const heroImageOpacity = useTransform(scrollProgress, (p) =>
    motionEnabled ? 1 - sculptureImageBlend(p) : 0,
  );
  const notesImageOpacity = useTransform(scrollProgress, (p) =>
    motionEnabled ? sculptureImageBlend(p) : 1,
  );

  const width = useTransform(scrollProgress, (p) => {
    if (!motionEnabled) return "min(var(--width-notes-sculpture), 47.39vw)";
    if (isSculptureStickyPhase(p)) return "min(var(--width-notes-sculpture), 47.39vw)";
    const t = mapRange(p, SCROLL_FOLD.textHideStart, SCROLL_FOLD.notesStart, 0, 1);
    const heroHeightExpr = "calc(100svh - var(--section-hero) * 1.15)";
    const heroWidth = `calc(${heroHeightExpr} * ${HERO_ASPECT})`;
    if (p < SCROLL_FOLD.textHideStart) return heroWidth;
    const notesWidth = "min(var(--width-notes-sculpture), 47.39vw)";
    return t < 1 ? heroWidth : notesWidth;
  });

  const height = useTransform(scrollProgress, (p) => {
    if (!motionEnabled) return "auto";
    if (isSculptureStickyPhase(p)) return "auto";
    return "calc(100svh - var(--section-hero) * 1.15)";
  });

  const aspectRatio = useTransform(scrollProgress, (p) =>
    isSculptureStickyPhase(p) ? "628 / 1024" : `${366} / ${782}`,
  );

  if (!motionEnabled) return null;

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
