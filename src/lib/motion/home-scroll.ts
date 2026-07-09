import type { Transition, Variants } from "framer-motion";

export const MOTION_TRANSITION: Transition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1],
};

export const MOTION_TRANSITION_SLOW: Transition = {
  duration: 0.55,
  ease: [0.4, 0, 0.2, 1],
};

export const STAGGER_CHILDREN = 0.08;

/** carousel-1440 — cs-carousel-enter reveal (Figma 13:32074) */
export const carouselRevealVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: MOTION_TRANSITION_SLOW,
  },
};

export const carouselCardsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER_CHILDREN, delayChildren: 0.1 },
  },
};

export const carouselCardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: MOTION_TRANSITION,
  },
};

export const SCROLL_TRIGGER = {
  once: true,
  amount: 0.25 as const,
};
