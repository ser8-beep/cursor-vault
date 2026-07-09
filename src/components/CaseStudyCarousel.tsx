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
  { title: "Insurance", tags: ["Responsive", "BFSI"], asset: "csInsurance", href: "/case-studies/insurance" },
  { title: "Maternity", tags: ["Mobile", "Wellness"], asset: "csMaternity", href: "/case-studies/maternity" },
  { title: "Smart Home", tags: ["Mobile", "IOT"], asset: "csSmartHome", href: "/case-studies/smart-home" },
  { title: "ERP", tags: ["SaaS", "Admin"], asset: "csErp", href: "/case-studies/erp" },
];

type CaseStudyCarouselProps = {
  motionEnabled: boolean;
  entranceActive?: boolean;
  /** Omit on duplicate mobile instance; laptop anchor keeps default. */
  anchorId?: string | false;
};

/** carousel-1440 — cs-carousel-enter scroll reveal (104:18648 / 13:32074). */
export function CaseStudyCarousel({
  motionEnabled,
  anchorId = "case-studies",
}: CaseStudyCarouselProps) {
  return (
    <motion.section
      id={anchorId === false ? undefined : anchorId}
      aria-label="Case studies"
      data-node-id="104:19033"
      data-name="carousel-1440"
      className="flex w-full flex-col gap-2xl pb-[var(--space-48)] scroll-mt-[var(--space-48)] mt-0 tablet:-mt-[var(--space-48)] laptop:-mt-[302px] relative z-[var(--z-40)]"
      initial={motionEnabled ? "hidden" : false}
      whileInView={motionEnabled ? "visible" : undefined}
      viewport={SCROLL_TRIGGER}
      variants={carouselRevealVariants}
    >
      <p className="hidden laptop:block font-display uppercase text-label-s leading-normal tracking-caption text-text-muted whitespace-pre-wrap">
        <span className="text-main">PRODUCT_DESIGN</span>
        {" //  01_SYSTEMS_FOR_USERS\n"}
        {"                               02_SYSTEMS FOR_TEAMS"}
      </p>
      <motion.ul
        className="grid w-full grid-cols-1 gap-[var(--space-12)] tablet:grid-cols-2 tablet:gap-x-[var(--gap-cs-grid-x,10px)] tablet:gap-y-[var(--space-12)] laptop:grid-cols-4 laptop:gap-[var(--gap-cs-grid-x,var(--space-20))] list-none"
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
