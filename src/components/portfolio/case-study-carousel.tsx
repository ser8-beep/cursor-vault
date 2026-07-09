"use client";

import { motion } from "framer-motion";
import { CAROUSEL_LABEL, CASE_STUDIES } from "./constants";
import { CaseStudyCard } from "./case-study-card";
import {
  carouselCardVariants,
  carouselCardsContainerVariants,
  carouselRevealVariants,
  SCROLL_TRIGGER,
} from "@/lib/motion/home-scroll";

type CaseStudyCarouselProps = {
  motionEnabled?: boolean;
  anchorId?: string | false;
};

/** carousel-1440 — cs-carousel-enter (Figma 104:19033 / 13:32074). */
export function CaseStudyCarousel({
  motionEnabled = true,
  anchorId = "work",
}: CaseStudyCarouselProps) {
  return (
    <motion.section
      id={anchorId === false ? undefined : anchorId}
      aria-label="Case studies"
      data-node-id="104:19033"
      data-name="carousel-1440"
      className="relative z-40 mt-0 flex w-full scroll-mt-12 flex-col gap-12 px-5 pb-12 md:-mt-12 lg:-mt-[302px]"
      initial={motionEnabled ? "hidden" : false}
      whileInView={motionEnabled ? "visible" : undefined}
      viewport={SCROLL_TRIGGER}
      variants={carouselRevealVariants}
    >
      <p className="hidden font-mono text-[11px] leading-normal tracking-[0.4px] text-[#666] lg:block">
        <span className="text-[#0a0a0a]">{CAROUSEL_LABEL.line1.split(" //")[0]}</span>
        {" //  01_SYSTEMS_FOR_USERS"}
        <br />
        <span className="whitespace-pre">{CAROUSEL_LABEL.line2.trimStart()}</span>
      </p>

      <motion.ul
        className="grid w-full list-none grid-cols-1 gap-[var(--gap-cs-grid-x)] md:grid-cols-2 md:gap-x-[var(--gap-cs-grid-x)] md:gap-y-3 lg:grid-cols-4 lg:gap-[var(--gap-cs-grid-x)]"
        initial={motionEnabled ? "hidden" : false}
        whileInView={motionEnabled ? "visible" : undefined}
        viewport={SCROLL_TRIGGER}
        variants={carouselCardsContainerVariants}
      >
        {CASE_STUDIES.map((study) => (
          <li key={study.id}>
            <motion.div
              className="h-full"
              variants={motionEnabled ? carouselCardVariants : undefined}
            >
              <CaseStudyCard study={study} />
            </motion.div>
          </li>
        ))}
      </motion.ul>
    </motion.section>
  );
}
