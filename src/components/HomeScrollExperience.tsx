"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "motion/react";
import { SiteHeader } from "./SiteHeader";
import { Hero } from "./Hero";
import { ContactBar } from "./ContactBar";
import { CaseStudyCarousel } from "./CaseStudyCarousel";
import { DataStoriesSection } from "./DataStoriesSection";
import { GhostCursor } from "./GhostCursor";
import { SculptureStickyParallax } from "./SculptureStickyParallax";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useDesktopSculptureMotion } from "@/lib/motion/useDesktopSculptureMotion";
import { useMobileMotion } from "@/lib/motion/useMobileMotion";
import { ENTRANCE } from "@/lib/motion/homePrototype";

/** Scroll distance for header-enter on mobile (13:32068). */
const HEADER_ENTER_SCROLL_PX = 48;

/**
 * Orchestrates mobile scroll-linked home motion from Figma prototype frames
 * 13:32063 (footer-enter) through 13:32102 (notes-enter).
 * Desktop sculpture sticky parallax is laptop+; other mobile scroll motion stays <768px.
 */
export function HomeScrollExperience() {
  const reducedMotion = usePrefersReducedMotion();
  const mobileMotion = useMobileMotion();
  const desktopSculptureMotion = useDesktopSculptureMotion();
  const motionEnabled = mobileMotion && !reducedMotion;
  const sculptureMotionEnabled = desktopSculptureMotion && !reducedMotion;

  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const dataStoriesRef = useRef<HTMLElement>(null);
  const [headerEntered, setHeaderEntered] = useState(!motionEnabled);
  const [entranceActive, setEntranceActive] = useState(!motionEnabled);
  const [sculptureSharp, setSculptureSharp] = useState(!motionEnabled);
  const [cursorVisible, setCursorVisible] = useState(!motionEnabled);

  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: notesSectionProgress } = useScroll({
    target: dataStoriesRef,
    offset: ["start end", "end start"],
  });

  /* footer-enter: contact bar visible at start; header-enter on first scroll */
  useEffect(() => {
    if (!motionEnabled) {
      setHeaderEntered(true);
      setEntranceActive(true);
      return;
    }
    setEntranceActive(true);

    const onScroll = () => {
      if (window.scrollY >= HEADER_ENTER_SCROLL_PX) setHeaderEntered(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [motionEnabled]);

  /* sculpture blur clear + cursor-enter timers (13:32063 → 13:32087) */
  useEffect(() => {
    if (!motionEnabled) {
      setSculptureSharp(true);
      setCursorVisible(true);
      return;
    }

    const blurTimer = window.setTimeout(
      () => setSculptureSharp(true),
      (ENTRANCE.sculptureBlur.delay + ENTRANCE.sculptureBlur.duration) * 1000,
    );
    const cursorTimer = window.setTimeout(
      () => setCursorVisible(true),
      ENTRANCE.cursor.delay * 1000,
    );

    return () => {
      window.clearTimeout(blurTimer);
      window.clearTimeout(cursorTimer);
    };
  }, [motionEnabled]);

  return (
    <div className="canvas-pattern flex min-h-screen flex-col gap-gap-md p-canvas overflow-x-clip">
      <div className="relative flex min-h-[calc(100svh-var(--padding-canvas)*2)] flex-col justify-between gap-gap-lg">
        <SiteHeader
          motionEnabled={motionEnabled}
          entranceActive={headerEntered}
        />
        <Hero
          scrollProgress={scrollYProgress}
          motionEnabled={motionEnabled}
          desktopSculptureMotion={sculptureMotionEnabled}
          entranceSculptureSharp={sculptureSharp}
        />
        <ContactBar motionEnabled={motionEnabled} entranceActive={entranceActive} />
        <GhostCursor
          scrollProgress={scrollYProgress}
          motionEnabled={motionEnabled}
          entranceVisible={cursorVisible}
        />
      </div>

      <div ref={scrollTrackRef} className="flex flex-col gap-gap-md min-h-[180vh]">
        <CaseStudyCarousel
          motionEnabled={motionEnabled}
          entranceActive={entranceActive}
        />
        <DataStoriesSection
          ref={dataStoriesRef}
          scrollProgress={scrollYProgress}
          motionEnabled={motionEnabled}
          desktopSculptureMotion={sculptureMotionEnabled}
        />
      </div>

      <SculptureStickyParallax
        scrollProgress={scrollYProgress}
        notesSectionProgress={notesSectionProgress}
        entranceSharp={sculptureSharp}
        motionEnabled={sculptureMotionEnabled}
      />
    </div>
  );
}
