"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ASSETS, CYCLING_PHRASES } from "./constants";

function StatueVisual({
  scrollProgress,
  showGlobe,
}: {
  scrollProgress: number;
  showGlobe: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const blur = showGlobe ? 0 : Math.min(27, scrollProgress * 40);
  const y = reduceMotion ? 0 : scrollProgress * -60;

  return (
    <motion.div
      className="pointer-events-none relative mx-auto aspect-[366/782] w-[min(42vw,366px)] lg:absolute lg:left-1/2 lg:top-[clamp(2rem,8vh,6rem)] lg:-translate-x-1/2"
      style={{ y: reduceMotion ? 0 : y }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative h-full w-full overflow-hidden transition-[filter] duration-700"
        style={{ filter: blur > 0 ? `blur(${blur}px)` : undefined }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={showGlobe ? "globe" : "statue"}
            className="absolute inset-0"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={showGlobe ? ASSETS.statueGlobe : ASSETS.statue}
              alt=""
              fill
              priority
              unoptimized
              className="object-contain object-bottom"
              style={{
                objectPosition: "bottom center",
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function HeroSection({
  phraseIndex,
  scrollProgress,
  settled,
  showGlobe,
}: {
  phraseIndex: number;
  scrollProgress: number;
  settled: boolean;
  showGlobe: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const opacity = Math.max(0.3, 1 - scrollProgress * 1.5);

  return (
    <section
      className="relative min-h-[min(100svh,768px)] px-5"
      style={{ opacity: showGlobe ? 1 : opacity }}
    >
      <StatueVisual scrollProgress={scrollProgress} showGlobe={showGlobe} />

      <div className="relative z-10 grid gap-8 pt-[clamp(2rem,10vh,5rem)] lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:gap-6">
        <div className="space-y-3 lg:pb-16">
          <AnimatePresence mode="wait">
            {settled ? (
              <motion.div
                key="settled-left"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-display text-[clamp(1.75rem,5vw,2.25rem)] uppercase leading-[1.1] text-[#09090b]">
                  BUILDING{" "}
                  <span className="text-[#1d4ed8]">SYSTEMS</span>
                </h2>
                <p className="mt-3 max-w-md font-mono text-base tracking-[0.8px] text-[#71717a]">
                  PRODUCT_DESIGNER //AI NATIVE_LEAN UX_SYSTEMS_WORKFLOWS
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="cycling-left"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
              >
                <p className="font-display text-[clamp(1.75rem,5vw,2.25rem)] uppercase leading-none text-[#09090b]">
                  .....|
                </p>
                <p className="mt-3 font-mono text-base tracking-[0.8px] text-[#71717a]">
                  PR
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden lg:block" aria-hidden />

        <div className="space-y-3 text-left lg:pb-16 lg:text-right">
          <AnimatePresence mode="wait">
            {settled ? (
              <motion.h2
                key="settled-right"
                className="font-display text-[clamp(1.75rem,5vw,2.25rem)] uppercase leading-[1.1] text-[#09090b] lg:text-right"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                THAT MAKE SENSE
              </motion.h2>
            ) : (
              <motion.div
                key={`cycle-${phraseIndex}`}
                className="relative min-h-[clamp(2.5rem,8vw,3rem)] overflow-hidden lg:text-right"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-display text-[clamp(1.75rem,5vw,2.25rem)] uppercase leading-none text-[#1d4ed8]">
                  {phraseIndex === 0 ? "-|" : CYCLING_PHRASES[phraseIndex]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
