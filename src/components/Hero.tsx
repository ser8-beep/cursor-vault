"use client";

import Image from "next/image";
import { motion, type MotionValue, useMotionTemplate, useTransform } from "motion/react";
import { ENTRANCE, EASE_STANDARD, mapRange, SCROLL_FOLD } from "@/lib/motion/homePrototype";
import {
  SCULPTURE_HERO_REST,
  sculptureMorphLeft,
  sculptureMorphTranslateX,
} from "@/lib/motion/sculptureParallax";

type HeroProps = {
  scrollProgress: MotionValue<number>;
  motionEnabled: boolean;
  desktopSculptureMotion: boolean;
  entranceSculptureSharp: boolean;
};

const SCULPTURE_BLUR_PX = 27; /* --blur-sculpture token; Figma sculpture-blur effect */

/**
 * splash-organism — Figma 13:509. Motion frames 13:32063, 13:32094, 13:32102.
 * TODO: 13:32059 splash typewriter (.....| / PR / -|) — prototype starts at footer-enter; skipped.
 */
export function Hero({
  scrollProgress,
  motionEnabled,
  desktopSculptureMotion,
  entranceSculptureSharp,
}: HeroProps) {
  const textOpacity = useTransform(scrollProgress, (p) => {
    if (!motionEnabled) return 1;
    if (p < SCROLL_FOLD.textHideStart) return 1;
    if (p < SCROLL_FOLD.textHideEnd) {
      return 1 - mapRange(p, SCROLL_FOLD.textHideStart, SCROLL_FOLD.textHideEnd);
    }
    if (p < SCROLL_FOLD.textReturnStart) return 0;
    if (p < SCROLL_FOLD.textReturnEnd) {
      return mapRange(p, SCROLL_FOLD.textReturnStart, SCROLL_FOLD.textReturnEnd);
    }
    return 1;
  });

  const sculptureBlurPx = useTransform(() => {
    if (!entranceSculptureSharp) return SCULPTURE_BLUR_PX;
    const p = scrollProgress.get();
    if (!motionEnabled || p < SCROLL_FOLD.textHideStart) return 0;
    return SCULPTURE_BLUR_PX;
  });

  const sculptureFilter = useMotionTemplate`blur(${sculptureBlurPx}px)`;

  const sculptureLeft = useTransform(scrollProgress, (p) => {
    if (!motionEnabled) return `${SCULPTURE_HERO_REST.leftPct}%`;
    return `${sculptureMorphLeft(p)}%`;
  });

  const sculptureX = useTransform(scrollProgress, (p) => {
    if (!motionEnabled) return `${SCULPTURE_HERO_REST.translateXPct}%`;
    return `${sculptureMorphTranslateX(p)}%`;
  });

  const sculptureTranslateY = useTransform(scrollProgress, (p) => {
    if (!motionEnabled || p < SCROLL_FOLD.textHideStart) return "-46%";
    return `${mapRange(p, SCROLL_FOLD.textHideStart, SCROLL_FOLD.sculptureMorphEnd, -46, -38)}%`;
  });

  const sculptureScale = useTransform(scrollProgress, (p) => {
    if (!motionEnabled || p < SCROLL_FOLD.textHideStart) return 1;
    return mapRange(p, SCROLL_FOLD.textHideStart, SCROLL_FOLD.sculptureMorphEnd, 1, 1.14);
  });

  const restingBlur = entranceSculptureSharp ? "blur(0px)" : `blur(${SCULPTURE_BLUR_PX}px)`;
  const showInlineSculpture = !desktopSculptureMotion;

  return (
    <section
      aria-label="Introduction"
      data-node-id="13:509"
      data-name="splash-organism"
      className="relative flex flex-1 w-full min-h-[calc(var(--section-hero)*3)] items-center overflow-visible"
    >
      {showInlineSculpture ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 z-0 laptop:z-20 aspect-[366/782] overflow-hidden h-[calc(100svh-var(--section-hero)*2.2)] laptop:h-[calc(100svh-var(--section-hero)*1.15)] max-h-[calc(var(--space-160)*4.9)]"
          style={
            motionEnabled
              ? {
                  filter: sculptureFilter,
                  left: sculptureLeft,
                  x: sculptureX,
                  translateY: sculptureTranslateY,
                  scale: sculptureScale,
                }
              : {
                  filter: restingBlur,
                  left: `${SCULPTURE_HERO_REST.leftPct}%`,
                  x: `${SCULPTURE_HERO_REST.translateXPct}%`,
                  translateY: `${SCULPTURE_HERO_REST.translateYPct}%`,
                }
          }
          data-name="sculpture-position-blur"
          initial={false}
          animate={
            motionEnabled
              ? entranceSculptureSharp
                ? { filter: "blur(0px)" }
                : { filter: `blur(${SCULPTURE_BLUR_PX}px)` }
              : undefined
          }
          transition={{ duration: ENTRANCE.sculptureBlur.duration, ease: EASE_STANDARD }}
        >
          <Image
            src="/figma/sculpture.png"
            alt=""
            width={832}
            height={1114}
            priority
            sizes="(min-width: 1280px) 662px, 55vw"
            className="absolute max-w-none w-[180.67%] h-[113.3%] left-[-70.44%] top-[-13.25%] object-cover"
            data-name="marble-designing-systems"
          />
        </motion.div>
      ) : null}

      <motion.div
        className="relative z-10 laptop:z-0 flex w-full flex-col gap-gap-xl tablet:gap-gap-lg laptop:flex-row laptop:items-center laptop:justify-between"
        style={{ opacity: motionEnabled ? textOpacity : 1 }}
        data-name="text-animation-molecule"
      >
        <div className="flex flex-col gap-gap-sm laptop:gap-[var(--space-12)]">
          <h1 className="font-display [font-stretch:expanded] uppercase text-hero leading-[var(--leading-hero)] tracking-normal text-text-primary laptop:whitespace-nowrap">
            Building <span className="text-text-link">systems</span>
          </h1>
          <p className="font-display uppercase text-base leading-[var(--leading-3)] tracking-wider text-text-secondary max-w-[var(--width-nav-card)]">
            Product_designer //AI native_lean UX_systems_workflows
          </p>
        </div>
        <p
          className="self-end laptop:self-auto text-right font-display [font-stretch:expanded] uppercase text-hero leading-[var(--leading-hero)] tracking-normal text-text-primary laptop:whitespace-nowrap"
          aria-hidden="true"
        >
          That make sense
        </p>
        <span className="sr-only">Building systems that make sense</span>
      </motion.div>
    </section>
  );
}
