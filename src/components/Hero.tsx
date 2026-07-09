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

const HERO_TAGLINE = "That make sense";
const HERO_SUBTEXT =
  "PRODUCT_DESIGNER // AI NATIVE LEAN UX SYSTEMS WORKFLOWS";

const SCULPTURE_BLUR_PX = 27; /* --blur-sculpture token; Figma sculpture-blur effect */

/**
 * splash-organism — Figma 104:19033 (mobile/tablet) / 13:509 (laptop+).
 * Splash: stacked typewriter molecule (104:18518). Footer-enter: 2-line headline + subtext.
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
    if (!motionEnabled || p < SCROLL_FOLD.sculptureMorphStart) return "-46%";
    return `${mapRange(p, SCROLL_FOLD.sculptureMorphStart, SCROLL_FOLD.sculptureMorphEnd, -46, -38)}%`;
  });

  const sculptureScale = useTransform(scrollProgress, (p) => {
    if (!motionEnabled || p < SCROLL_FOLD.sculptureMorphStart) return 1;
    return mapRange(p, SCROLL_FOLD.sculptureMorphStart, SCROLL_FOLD.sculptureMorphEnd, 1, 1.14);
  });

  const restingBlur = entranceSculptureSharp ? "blur(0px)" : `blur(${SCULPTURE_BLUR_PX}px)`;
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

  return (
    <section
      aria-label="Introduction"
      data-node-id="104:19033"
      data-name="splash-organism"
      className="relative flex min-h-0 flex-1 w-full items-center overflow-visible"
    >
      {showInlineSculpture ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 z-[var(--z-20)] aspect-[366/782] overflow-hidden h-[calc(100svh-var(--section-hero)*2.2)] laptop:h-[calc(100svh-var(--section-hero)*1.15)] max-h-[calc(var(--space-160)*4.9)]"
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
          <FigmaPicture
            asset="sculpture"
            fill
            priority
            className="absolute inset-0 size-full"
            imgClassName="absolute max-w-none w-[180.67%] h-[113.3%] left-[-70.44%] top-[-13.25%] object-cover"
            data-name="marble-designing-systems"
          />
        </motion.div>
      ) : null}

      <div className="relative w-full" data-name="text-animation-molecule">
        {showTypewriter ? (
          <SplashTypewriter motionEnabled={motionEnabled} visible />
        ) : (
          <motion.div
            className="flex w-full flex-col gap-gap-sm pt-[var(--space-20)] laptop:grid laptop:grid-cols-[1fr_auto] laptop:grid-rows-[auto_auto] laptop:justify-between laptop:gap-x-gap-lg laptop:gap-y-[var(--space-12)] laptop:pt-0"
            style={{ opacity: motionEnabled ? textOpacity : 1 }}
            {...headlineMotionProps}
          >
            {/* Mobile & tablet — Figma 104:18518 stacked 2-line layout */}
            <div className="relative z-[var(--z-30)] flex w-full flex-col gap-gap-sm laptop:hidden">
              <p className="text-right font-display [font-stretch:expanded] uppercase text-hero-compact leading-hero-compact tracking-normal text-text-primary whitespace-nowrap">
                Building <span className="text-text-link">systems</span>
              </p>
              <div className="flex flex-col items-start gap-xs">
                <p className="font-display [font-stretch:expanded] uppercase text-hero-compact leading-hero-compact tracking-normal text-text-primary whitespace-nowrap">
                  {HERO_TAGLINE}
                </p>
                <p className="font-display text-caption leading-3 tracking-wider text-text-secondary">
                  {HERO_SUBTEXT}
                </p>
              </div>
            </div>

            {/* Laptop+ — unchanged 2-column grid @ 36px */}
            <div className="relative z-[var(--z-30)] hidden flex-col gap-gap-sm laptop:contents">
              <h1 className="text-center font-display [font-stretch:expanded] uppercase text-hero leading-hero tracking-normal text-text-primary laptop:col-start-1 laptop:row-start-1 laptop:text-left laptop:whitespace-nowrap">
                Building <span className="text-text-link">systems</span>
              </h1>
            </div>
            <p className="relative z-[var(--z-10)] hidden w-full self-end text-right font-display [font-stretch:expanded] uppercase text-hero leading-hero tracking-normal text-text-primary laptop:col-start-2 laptop:row-start-1 laptop:block laptop:w-auto laptop:justify-self-end laptop:self-auto laptop:whitespace-nowrap">
              {HERO_TAGLINE}
            </p>
            <span className="sr-only">Building systems that make sense</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
