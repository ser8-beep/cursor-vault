"use client";

import { useEffect, useRef, useState } from "react";
import { HeroScene } from "./HeroScene";
import { CaseStudyCarousel } from "../case-study-carousel";
import { NotesSection } from "../notes-section";
import { MORPH_BRIDGE_VH } from "./constants";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

function HeroFold({ heroRef }: { heroRef: React.RefObject<HTMLElement | null> }) {
  return (
    <section
      ref={heroRef}
      aria-label="Hero"
      data-name="hero-fold"
      className="relative flex min-h-[min(100svh,850px)] flex-col justify-end px-5 pb-10 pt-24"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
        <div className="space-y-3 lg:pb-16">
          <h2 className="font-display text-[clamp(1.75rem,5vw,2.25rem)] uppercase leading-[1.1] text-[#09090b]">
            BUILDING <span className="text-[#1d4ed8]">SYSTEMS</span>
          </h2>
          <p className="max-w-md font-mono text-base tracking-[0.8px] text-[#71717a]">
            PRODUCT_DESIGNER //AI NATIVE_LEAN UX_SYSTEMS_WORKFLOWS
          </p>
        </div>
        <div className="hidden lg:block" aria-hidden />
        <h2 className="font-display text-[clamp(1.75rem,5vw,2.25rem)] uppercase leading-[1.1] text-[#09090b] lg:pb-16 lg:text-right">
          THAT MAKE SENSE
        </h2>
      </div>
    </section>
  );
}

/**
 * Dev lab — simulates home section layout (hero + carousel + morph bridge + notes)
 * for tuning ScrollTrigger scrub and dock position.
 */
export function SculptureLab() {
  const reducedMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const morphStartRef = useRef<HTMLDivElement>(null);
  const dockTargetRef = useRef<HTMLDivElement>(null);
  const notesSectionRef = useRef<HTMLElement>(null);

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[#e5e3df]">
      <div className="relative flex flex-col">
        <HeroFold heroRef={heroRef} />

        <HeroScene
          enabled={!reducedMotion}
          heroRef={heroRef}
          morphStartRef={morphStartRef}
          dockTargetRef={dockTargetRef}
          notesSectionRef={notesSectionRef}
          className="pointer-events-none fixed inset-0"
        />

        <CaseStudyCarousel motionEnabled={!reducedMotion} />

        <div
          ref={morphStartRef}
          aria-hidden="true"
          data-name="sculpture-morph-bridge"
          style={{ height: `${MORPH_BRIDGE_VH}vh` }}
          className="pointer-events-none shrink-0"
        />

        <NotesSection ref={notesSectionRef} dockTargetRef={dockTargetRef} />
      </div>

      <div
        className="pointer-events-none fixed inset-x-0 bottom-8 z-[60] flex justify-center"
        aria-hidden={reducedMotion}
      >
        <p
          className={`font-mono text-[11px] uppercase tracking-[0.2em] text-[#71717a]/80 transition-opacity duration-500 ${
            reducedMotion ? "opacity-0" : "opacity-100"
          }`}
        >
          Scroll past case studies to morph
        </p>
      </div>
    </div>
  );
}
