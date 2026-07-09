"use client";

import { CaseStudyCarousel } from "./case-study-carousel";

/** @deprecated Use CaseStudyCarousel — scroll-visible wrapper kept for legacy callers. */
export function ProjectCarousel({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return <CaseStudyCarousel motionEnabled={false} />;
}
