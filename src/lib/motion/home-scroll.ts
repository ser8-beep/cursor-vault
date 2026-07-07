/**
 * Home scroll choreography — inferred from Figma prototype frames on page
 * "08 Desktop" (file VibdutrclLgS5EpFWgbJhH). get_motion_context returned
 * no Smart Animate snippets (scroll states are prototype transitions), so
 * timing/easing uses design tokens and frame deltas.
 *
 * Frame → scroll trigger mapping:
 *  13:32063 footer-enter        — mount resting state (sculpture blur, minimal header)
 *  13:32068 header-enter        — first scroll: nav/resume fade-in
 *  13:32074 cs-carousel-enter   — carousel slides up into second fold
 *  13:32087 cursor-enter        — ghost-cursor bubble appears
 *  13:32094 text-image-change   — hero text exits, sculpture repositions
 *  13:32102 notes-enter         — data-stories collage entrance
 */

import type { Transition, Variants } from "motion/react";

/** Shared transition — Primitive.duration + easing-standard */
export const MOTION_TRANSITION: Transition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1],
};

export const MOTION_TRANSITION_SLOW: Transition = {
  duration: 0.55,
  ease: [0.4, 0, 0.2, 1],
};

export const STAGGER_CHILDREN = 0.08;

/** header-1440 — nav card + resume fade (footer-enter → header-enter) */
export const headerRevealVariants: Variants = {
  hidden: { opacity: 0, y: "var(--space-sm)" },
  visible: {
    opacity: 1,
    y: 0,
    transition: MOTION_TRANSITION,
  },
};

/** Nav card shell — gains border/bg on header-enter */
export const navCardVariants: Variants = {
  hidden: {
    opacity: 0.85,
    backgroundColor: "transparent",
  },
  visible: {
    opacity: 1,
    backgroundColor: "var(--color-surface)",
    transition: MOTION_TRANSITION,
  },
};

/** splash-organism sculpture — blur-[27px] at footer-enter resting state */
export const sculptureBlurVariants: Variants = {
  enter: {
    filter: `blur(var(--blur-sculpture))`,
    transition: MOTION_TRANSITION_SLOW,
  },
  focus: {
    filter: "blur(0px)",
    transition: MOTION_TRANSITION_SLOW,
  },
  exit: {
    opacity: 0,
    scale: 1.08,
    x: "15%",
    transition: MOTION_TRANSITION_SLOW,
  },
};

/** text-animation-molecule — split reveal (header-enter) + exit (text-image-change) */
export const heroTextLeftVariants: Variants = {
  hidden: { opacity: 0, x: "-8%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...MOTION_TRANSITION, delay: 0.05 },
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: MOTION_TRANSITION,
  },
};

/** text-animation-molecule — right segment */
export const heroTextRightVariants: Variants = {
  hidden: { opacity: 0, x: "8%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...MOTION_TRANSITION, delay: 0.12 },
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: MOTION_TRANSITION,
  },
};

/** carousel-1440 — cs-carousel-enter reveal */
export const carouselRevealVariants: Variants = {
  hidden: { opacity: 0, y: "var(--space-2xl)" },
  visible: {
    opacity: 1,
    y: 0,
    transition: MOTION_TRANSITION_SLOW,
  },
};

/** cs-card stagger container */
export const carouselCardsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER_CHILDREN, delayChildren: 0.1 },
  },
};

export const carouselCardVariants: Variants = {
  hidden: { opacity: 0, y: "var(--space-xl)" },
  visible: {
    opacity: 1,
    y: 0,
    transition: MOTION_TRANSITION,
  },
};

/** ghost-cursor — cursor-enter bubble */
export const ghostCursorVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: "var(--space-sm)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { ...MOTION_TRANSITION, delay: 0.15 },
  },
};

/** notes collage — notes-enter stagger */
export const notesContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER_CHILDREN, delayChildren: 0.05 },
  },
};

export const notesItemVariants: Variants = {
  hidden: { opacity: 0, y: "var(--space-2xl)", scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: MOTION_TRANSITION,
  },
};

/** whileInView options shared across mobile scroll triggers */
export const SCROLL_TRIGGER = {
  once: true,
  amount: 0.25 as const,
};

export const SCROLL_TRIGGER_EARLY = {
  once: true,
  amount: 0.12 as const,
};
