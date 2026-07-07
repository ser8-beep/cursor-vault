"use client";

import type { ReactNode } from "react";

type PaperLiftProps = {
  children: ReactNode;
  className?: string;
};

/** Pure-CSS paper lift/peel shadow (CodePen GRaWPy). Hover lift disabled via CSS when prefers-reduced-motion. */
export function PaperLift({ children, className = "" }: PaperLiftProps) {
  return <div className={`paper-lift ${className}`.trim()}>{children}</div>;
}
