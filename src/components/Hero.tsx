"use client";

import { motion, type MotionValue, useMotionTemplate, useTransform } from "motion/react";
import { ENTRANCE, EASE_STANDARD, mapRange, SCROLL_FOLD } from "@/lib/motion/homePrototype";
import type { SplashPhase } from "@/lib/motion/splashPhase";
import {
  SCULPTURE_HERO_REST,
  sculptureMorphLeft,
  sculptureMorphTranslateX,
} from "@/lib/motion/sculptureParallax";
import { FigmaPicture } from "./FigmaPicture";
import { SplashTypewriter } from "./SplashTypewriter";

type HeroProps = {
  scrollProgress: MotionValue<number>;
  motionEnabled: boolean;
  desktopSculptureMotion: boolean;
  entranceSculptureSharp: boolean;
  splashPhase: SplashPhase;
  showHeadline: boolean;
};

/** Settled mobile/tablet copy — Figma 104:18650 inside 104:18648 */
const HERO_SUBTEXT =
  "PRODUCT_DESIGNER //AI NATIVE_LEAN UX_SYSTEMS_WORKFLOWS";

const SCULPTURE_BLUR_DESKTOP_PX = 27; /* --blur-sculpture */

/**
 * splash-organism — optical truth: Figma 104:18650 (home-template 104:18648).
 * Mobile/tablet: vertical stack, text then sculpture with −59px overlap;
 * settled headline = DESIGNING + SYSTEMS (blue). Laptop+ unchanged 2-col @ 36px.
 */
export function Hero({
  scrollProgress,
  motionEnabled,
  desktopSculptureMotion,
  entranceSculptureSharp,
  splashPhase,
  showHeadline,
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
    if (!entranceSculptureSharp) return SCULPTURE_BLUR_DESKTOP_PX;
    const p = scrollProgress.get();
    if (!motionEnabled || p < SCROLL_FOLD.textHideStart) return 0;
    return SCULPTURE_BLUR_DESKTOP_PX;
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
    if (!motionEnabled || p < SCROLL_FOLD.sculptureMorphStart) return "0%";
    return `${mapRange(p, SCROLL_FOLD.sculptureMorphStart, SCROLL_FOLD.sculptureMorphEnd, 0, -8)}%`;
  });

  const sculptureScale = useTransform(scrollProgress, (p) => {
    if (!motionEnabled || p < SCROLL_FOLD.sculptureMorphStart) return 1;
    return mapRange(p, SCROLL_FOLD.sculptureMorphStart, SCROLL_FOLD.sculptureMorphEnd, 1, 1.14);
  });

  const showInlineSculpture = !desktopSculptureMotion;
  const showTypewriter = splashPhase === "splash";

  const headlineMotionProps = motionEnabled
    ? {
        initial: { opacity: 0, y: 8 },
        animate: showHeadline ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
        transition: {
          duration: ENTRANCE.headline.duration,
          ease: EASE_STANDARD,
        },
      }
    : {};

  const mobileSculpture = showInlineSculpture ? (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none relative z-[var(--z-20)] flex h-[var(--height-sculpture-hero-mobile-frame)] w-[var(--width-sculpture-hero-mobile-frame)] shrink-0 items-center justify-center overflow-visible laptop:absolute laptop:bottom-0 laptop:left-1/2 laptop:h-[var(--height-sculpture-hero-mobile)] laptop:w-[var(--width-sculpture-hero-mobile)] laptop:max-w-[76%] laptop:-translate-x-1/2 laptop:overflow-hidden"
      style={
        motionEnabled && desktopSculptureMotion
          ? {
              filter: sculptureFilter,
              left: sculptureLeft,
              x: sculptureX,
              translateY: sculptureTranslateY,
              scale: sculptureScale,
            }
          : undefined
      }
      data-name="sculpture-position-blur"
      data-node-id="104:18651"
      initial={false}
    >
      <div
        className="relative h-[var(--height-sculpture-hero-mobile)] w-[var(--width-sculpture-hero-mobile)] overflow-hidden"
        data-name="marble-designing-systems"
      >
        <FigmaPicture
          asset="sculpture"
          fill
          priority
          className="absolute inset-0 size-full"
          imgClassName="absolute max-w-none w-[180.67%] h-[113.3%] left-[-70.44%] top-[-13.25%] object-cover"
        />
      </div>
    </motion.div>
  ) : null;

  return (
    <section
      aria-label="Introduction"
      data-node-id="104:18650"
      data-name="splash-organism"
      className="relative isolate flex min-h-0 w-full flex-1 flex-col items-center overflow-visible laptop:block laptop:min-h-0"
    >
      {/* Mobile/tablet — Figma 104:18650: text stack then sculpture, −59px overlap */}
      <div
        className="relative z-[var(--z-30)] flex w-full flex-col items-center laptop:hidden"
        style={{ gap: "calc(var(--overlap-splash-sculpture) * -1)" }}
      >
        <div
          className="relative z-[var(--z-30)] flex w-full flex-col items-start gap-gap-sm pt-[var(--space-20)]"
          data-name="text-animation-molecule"
          data-node-id="104:18652"
        >
          {showTypewriter ? (
            <SplashTypewriter motionEnabled={motionEnabled} visible />
          ) : (
            <motion.div
              className="flex w-full flex-col gap-gap-sm"
              style={{ opacity: motionEnabled ? textOpacity : 1 }}
              {...headlineMotionProps}
            >
              <div className="flex h-[var(--height-hero-dynamic)] w-full items-start" data-name="dynamic">
                <div
                  className="flex min-h-[var(--height-hero-dynamic)] flex-1 items-start"
                  data-name="text-animation-right-atoms"
                  data-node-id="104:18654"
                >
                  <p className="font-display [font-stretch:expanded] uppercase text-hero-compact leading-hero-dynamic tracking-normal text-text-primary whitespace-nowrap">
                    Designing{" "}
                    <span className="text-text-link">systems</span>
                  </p>
                </div>
              </div>
              <div className="flex w-full items-center" data-name="anchor">
                <div
                  className="flex flex-1 flex-col items-start gap-xs"
                  data-name="text-animation-left-atoms"
                  data-node-id="104:18656"
                >
                  <p className="font-display [font-stretch:expanded] uppercase text-hero-compact leading-hero-compact tracking-normal text-text-primary whitespace-nowrap">
                    That make sense
                  </p>
                  <p className="font-display text-caption leading-3 tracking-wider text-text-secondary">
                    {HERO_SUBTEXT}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        {mobileSculpture}
      </div>

      {/* Laptop+ — unchanged 2-column grid @ 36px; desktop sculpture via sticky layer */}
      <div className="relative hidden w-full laptop:block" data-name="text-animation-molecule">
        {showTypewriter ? (
          <SplashTypewriter motionEnabled={motionEnabled} visible />
        ) : (
          <motion.div
            className="grid w-full grid-cols-[1fr_auto] grid-rows-[auto_auto] justify-between gap-x-gap-lg gap-y-[var(--space-12)]"
            style={{ opacity: motionEnabled ? textOpacity : 1 }}
            {...headlineMotionProps}
          >
            <h1 className="col-start-1 row-start-1 text-left font-display [font-stretch:expanded] uppercase text-hero leading-hero tracking-normal text-text-primary whitespace-nowrap">
              Building <span className="text-text-link">systems</span>
            </h1>
            <p className="col-start-2 row-start-1 justify-self-end text-right font-display [font-stretch:expanded] uppercase text-hero leading-hero tracking-normal text-text-primary whitespace-nowrap">
              That make sense
            </p>
            <span className="sr-only">Building systems that make sense</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
