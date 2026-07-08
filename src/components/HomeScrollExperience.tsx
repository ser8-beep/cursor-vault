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
import { FirstFoldMotionVideo } from "./FirstFoldMotionVideo";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useDesktopSculptureMotion } from "@/lib/motion/useDesktopSculptureMotion";
import { useMobileMotion } from "@/lib/motion/useMobileMotion";
import { ENTRANCE } from "@/lib/motion/homePrototype";
import { SPLASH_PHASE_MS, type SplashPhase } from "@/lib/motion/splashPhase";
import {
  useChoreographyProgress,
  useInternalScroll,
} from "@/lib/internal-scroll";

/** Scroll distance for header-enter on mobile (13:32068). */
const HEADER_ENTER_SCROLL_PX = 48;

/**
 * Orchestrates splash → footer-enter → header-enter, first-fold internal scroll
 * handoff (motion video), then scroll-linked second fold (Figma 13:32063 → 13:32102).
 */
export function HomeScrollExperience() {
  const reducedMotion = usePrefersReducedMotion();
  const mobileMotion = useMobileMotion();
  const desktopSculptureMotion = useDesktopSculptureMotion();
  const motionEnabled = mobileMotion && !reducedMotion;
  const sculptureMotionEnabled = desktopSculptureMotion && !reducedMotion;
  /** Act 2+ scroll choreography — all viewports except reduced motion. */
  const scrollChoreographyEnabled = !reducedMotion;
  const internalScrollEnabled = scrollChoreographyEnabled;

  const firstFoldRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const dataStoriesRef = useRef<HTMLElement>(null);
  const [splashPhase, setSplashPhase] = useState<SplashPhase>(
    motionEnabled ? "splash" : "header",
  );
  const [entranceActive, setEntranceActive] = useState(!motionEnabled);
  const [sculptureSharp, setSculptureSharp] = useState(!motionEnabled);

  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: notesSectionProgress } = useScroll({
    target: dataStoriesRef,
    offset: ["start end", "end start"],
  });

  const internalScroll = useInternalScroll({
    handoffRef: firstFoldRef,
    enabled: internalScrollEnabled,
    onForwardComplete: () => {
      const handoff = firstFoldRef.current;
      if (!handoff) return;
      const targetY = handoff.offsetTop + handoff.offsetHeight;
      requestAnimationFrame(() => {
        window.scrollTo({ top: targetY, behavior: "auto" });
      });
    },
    onBackwardComplete: () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });

  const choreographyProgress = useChoreographyProgress({
    documentProgress: scrollYProgress,
    internalScroll,
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
    <div className="canvas-pattern flex min-h-screen flex-col gap-gap-md p-canvas overflow-x-clip">
      {/* First fold — exactly one viewport; handoff sentinel for internal scroll */}
      <div
        ref={firstFoldRef}
        className="relative flex h-[100svh] shrink-0 flex-col justify-between gap-gap-lg"
        data-name="first-fold"
      >
        <SiteHeader
          motionEnabled={motionEnabled}
          entranceActive={showFullHeader}
          brandOnly={!showFullHeader}
          reducedMotion={reducedMotion}
        />
        <Hero
          scrollProgress={choreographyProgress}
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

      <FirstFoldMotionVideo
        progress={internalScroll.progress}
        isActive={internalScroll.isActive}
        enabled={internalScrollEnabled}
      />

      {/* Act 2+ — natural document scroll (case studies → data stories → footer) */}
      <div ref={scrollTrackRef} className="flex flex-col gap-gap-md">
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
        scrollProgress={choreographyProgress}
        notesSectionProgress={notesSectionProgress}
        entranceSharp={sculptureSharp}
        motionEnabled={sculptureMotionEnabled}
        suppressDuringHandoff={internalScroll.isActive}
      />
    </div>
  );
}
