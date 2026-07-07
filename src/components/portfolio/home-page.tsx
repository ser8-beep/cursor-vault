"use client";

import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BackgroundLayers } from "./background-layers";
import { GhostCursor } from "./ghost-cursor";
import { Header } from "./header";
import { HeroSection } from "./hero-section";
import { NotesSection } from "./notes-section";
import { PseudoFooter } from "./pseudo-footer";
import { ProjectCarousel } from "./project-carousel";
import { CYCLING_PHRASES } from "./constants";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstFoldRef = useRef<HTMLDivElement>(null);

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [headerExpanded, setHeaderExpanded] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [heroSettled, setHeroSettled] = useState(false);
  const [carouselVisible, setCarouselVisible] = useState(false);
  const [ghostCursorVisible, setGhostCursorVisible] = useState(false);
  const [showGlobe, setShowGlobe] = useState(false);
  const [heroScroll, setHeroScroll] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroProgress = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  useEffect(() => {
    const unsubscribe = heroProgress.on("change", setHeroScroll);
    return unsubscribe;
  }, [heroProgress]);

  useEffect(() => {
    const timer = window.setTimeout(() => setFooterVisible(true), 800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setHeroSettled(true), 2400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (heroSettled) return;
    const interval = window.setInterval(() => {
      setPhraseIndex((current) => (current + 1) % CYCLING_PHRASES.length);
    }, 2400);
    return () => window.clearInterval(interval);
  }, [heroSettled]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHeaderExpanded(y > 80);
      setCarouselVisible(y > 200);
      setGhostCursorVisible(y > 350 && y < 900);
      setShowGlobe(y > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-x-clip bg-[#e5e3df]"
    >
      <BackgroundLayers />

      <div className="relative z-10 mx-auto w-full max-w-[1440px]">
        <div ref={firstFoldRef} className="relative flex min-h-[810px] flex-col">
          <Header expanded={headerExpanded} />

          <div className="relative flex flex-1 flex-col justify-between pb-10 pt-2">
            <HeroSection
              phraseIndex={phraseIndex}
              scrollProgress={heroScroll}
              settled={heroSettled}
              showGlobe={showGlobe}
            />

            <div className="mt-auto px-5 pb-5 pt-8">
              <PseudoFooter visible={footerVisible} />
            </div>
          </div>

          <div className="-mt-[302px]">
            <ProjectCarousel visible={carouselVisible} />
          </div>
        </div>

        <NotesSection />

        <footer id="experience" className="px-5 pb-10 pt-6">
          <div className="border border-[#a1a1aa] bg-[#f4f4f5] px-3 py-2.5">
            <p className="font-mono text-[8px] uppercase tracking-[0.4px] text-[#09090b]">
              work_experience{" "}
              <span className="text-[#666]">04 yrs</span>
            </p>
          </div>
        </footer>
      </div>

      <GhostCursor visible={ghostCursorVisible} />
    </div>
  );
}
