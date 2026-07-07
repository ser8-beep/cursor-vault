"use client";

import { motion } from "motion/react";
import { CaseStudyCard, type CaseStudy } from "./CaseStudyCard";
import {
  carouselCardVariants,
  carouselCardsContainerVariants,
  carouselRevealVariants,
  SCROLL_TRIGGER,
} from "@/lib/motion/home-scroll";

const CASE_STUDIES: CaseStudy[] = [
  { title: "Smart Home", tags: ["IOT", "Mobile"], image: "/figma/cs-smart-home.png", href: "/case-studies/smart-home" },
  { title: "Insurance", tags: ["Travel", "Mobile"], image: "/figma/cs-insurance.png", href: "/case-studies/insurance" },
  { title: "Maternity", tags: ["Wellness", "Mobile"], image: "/figma/cs-maternity.png", href: "/case-studies/maternity" },
  { title: "ERP", tags: ["Admin", "Web app"], image: "/figma/cs-erp.png", href: "/case-studies/erp" },
];

type CaseStudyCarouselProps = {
  motionEnabled: boolean;
  entranceActive?: boolean;
};

/** carousel-1440 — cs-carousel-enter scroll reveal (13:32074 / 13:32080). */
export function CaseStudyCarousel({ motionEnabled }: CaseStudyCarouselProps) {
  return (
    <motion.section
      id="case-studies"
      aria-label="Case studies"
      data-node-id="13:360"
      data-name="carousel-1440"
      className="flex w-full flex-col gap-2xl pb-[var(--space-48)] scroll-mt-[var(--space-48)] -mt-[var(--space-48)] laptop:-mt-[302px] relative z-[var(--z-10)]"
      initial={motionEnabled ? "hidden" : false}
      whileInView={motionEnabled ? "visible" : undefined}
      viewport={SCROLL_TRIGGER}
      variants={carouselRevealVariants}
    >
      <p className="font-display uppercase text-label-s leading-normal tracking-[var(--tracking-caption)] text-text-muted whitespace-pre-wrap">
        <span className="text-main">PRODUCT_DESIGN</span>
        {" //  01_SYSTEMS_FOR_USERS\n"}
        {"                               02_SYSTEMS FOR_TEAMS"}
      </p>
      <motion.ul
        className="grid w-full grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-gap-md laptop:gap-[var(--space-20)] list-none"
        initial={motionEnabled ? "hidden" : false}
        whileInView={motionEnabled ? "visible" : undefined}
        viewport={SCROLL_TRIGGER}
        variants={carouselCardsContainerVariants}
      >
        {CASE_STUDIES.map((study) => (
          <li key={study.title}>
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
