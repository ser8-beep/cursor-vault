"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "motion/react";
import { SiteHeader } from "./SiteHeader";
import { Hero } from "./Hero";
import { ContactBar } from "./ContactBar";
import { CaseStudyCarousel } from "./CaseStudyCarousel";
import { DataStoriesSection } from "./DataStoriesSection";
import { SiteFooter } from "./SiteFooter";
import { SculptureStickyParallax } from "./SculptureStickyParallax";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useDesktopSculptureMotion } from "@/lib/motion/useDesktopSculptureMotion";
import { useMobileMotion } from "@/lib/motion/useMobileMotion";
import { ENTRANCE } from "@/lib/motion/homePrototype";
import { useLazyScrollProgress } from "@/lib/motion/useLazyScrollProgress";
import { SPLASH_PHASE_MS, type SplashPhase } from "@/lib/motion/splashPhase";

/** Scroll distance for header-enter on mobile (13:32068). */
const HEADER_ENTER_SCROLL_PX = 48;

/**
 * Orchestrates splash → header-enter, lazy document scroll through hero +
 * second fold (Figma 13:32063 → 13:32102), then data stories.
 */
export function HomeScrollExperience() {
  const reducedMotion = usePrefersReducedMotion();
  const mobileMotion = useMobileMotion();
  const desktopSculptureMotion = useDesktopSculptureMotion();
  const motionEnabled = mobileMotion && !reducedMotion;
  const sculptureMotionEnabled = desktopSculptureMotion && !reducedMotion;
  const scrollChoreographyEnabled = !reducedMotion;

  const pageRef = useRef<HTMLDivElement>(null);
  const dataStoriesRef = useRef<HTMLElement>(null);
  const [splashPhase, setSplashPhase] = useState<SplashPhase>(
    motionEnabled ? "splash" : "header",
  );
  const [entranceActive, setEntranceActive] = useState(!motionEnabled);
  const [sculptureSharp, setSculptureSharp] = useState(!motionEnabled);

  const scrollProgress = useLazyScrollProgress({
    target: pageRef,
    smooth: scrollChoreographyEnabled ? 0.12 : 1,
  });

  const { scrollYProgress: notesSectionProgress } = useScroll({
    target: dataStoriesRef,
    offset: ["start end", "end start"],
  });

  /* splash → footer → header phase timers (54:1126 → 13:32068) */
  useEffect(() => {
    if (!motionEnabled) {
      setSplashPhase("header");
      setEntranceActive(true);
      return;
    }

    setSplashPhase("splash");
    const footerTimer = window.setTimeout(
      () => setSplashPhase("footer"),
      SPLASH_PHASE_MS.splash,
    );
    const headerTimer = window.setTimeout(
      () => setSplashPhase("header"),
      SPLASH_PHASE_MS.splash + SPLASH_PHASE_MS.footer,
    );

    return () => {
      window.clearTimeout(footerTimer);
      window.clearTimeout(headerTimer);
    };
  }, [motionEnabled]);

  /* Mobile: header-enter on first scroll (can skip ahead of timer) */
  useEffect(() => {
    if (!motionEnabled) return;

    const onScroll = () => {
      if (window.scrollY >= HEADER_ENTER_SCROLL_PX) {
        setSplashPhase("header");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [motionEnabled]);

  /* footer-enter: enable carousel/contact choreography once past splash */
  useEffect(() => {
    if (!motionEnabled) {
      setEntranceActive(true);
      return;
    }
    if (splashPhase === "splash") return;
    setEntranceActive(true);
  }, [motionEnabled, splashPhase]);

  /* sculpture blur clear timer (13:32063) */
  useEffect(() => {
    if (!motionEnabled) {
      setSculptureSharp(true);
      return;
    }

    const blurTimer = window.setTimeout(
      () => setSculptureSharp(true),
      (ENTRANCE.sculptureBlur.delay + ENTRANCE.sculptureBlur.duration) * 1000,
    );

    return () => {
      window.clearTimeout(blurTimer);
    };
  }, [motionEnabled]);

  const showFullHeader = splashPhase === "header";
  const showContact = splashPhase !== "splash";
  const showHeadline = splashPhase !== "splash";

  return (
    <div
      ref={pageRef}
      className="canvas-pattern flex min-h-screen flex-col gap-gap-md p-canvas overflow-x-clip"
    >
      <div
        className="relative flex h-[100svh] shrink-0 flex-col justify-between gap-gap-sm laptop:gap-gap-lg"
        data-name="first-fold"
      >
        <SiteHeader
          motionEnabled={motionEnabled}
          entranceActive={showFullHeader}
          brandOnly={!showFullHeader}
          reducedMotion={reducedMotion}
        />
        <Hero
          scrollProgress={scrollProgress}
          motionEnabled={scrollChoreographyEnabled}
          desktopSculptureMotion={sculptureMotionEnabled}
          entranceSculptureSharp={sculptureSharp}
          splashPhase={splashPhase}
          showHeadline={showHeadline}
        />
        {showContact ? (
          <ContactBar motionEnabled={motionEnabled} entranceActive={entranceActive} />
        ) : (
          <div className="min-h-[var(--space-80)]" aria-hidden="true" />
        )}
      </div>

      <div className="flex flex-col gap-gap-md">
        <div
          aria-hidden="true"
          className="pointer-events-none shrink-0 h-[var(--height-scroll-bridge-spacer)]"
          data-name="scroll-bridge-spacer"
        />
        <CaseStudyCarousel
          motionEnabled={scrollChoreographyEnabled}
          entranceActive={entranceActive}
        />
        <DataStoriesSection
          ref={dataStoriesRef}
          sectionProgress={notesSectionProgress}
          scrollChoreographyEnabled={scrollChoreographyEnabled}
          desktopSculptureMotion={sculptureMotionEnabled}
        />
        <SiteFooter />
      </div>

      <SculptureStickyParallax
        scrollProgress={scrollProgress}
        notesSectionProgress={notesSectionProgress}
        entranceSharp={sculptureSharp}
        motionEnabled={sculptureMotionEnabled}
      />
    </div>
  );
}
