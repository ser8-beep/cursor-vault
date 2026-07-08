"use client";

import Link from "next/link";
import { SiteHeader } from "./SiteHeader";

/** Case study detail shell — header chrome without home-page motion. */
export function CaseStudyDetailShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="canvas-pattern min-h-screen bg-canvas">
      <div className="mx-auto flex w-full max-w-[calc(var(--layout-content-width)+var(--padding-canvas)*2)] flex-col gap-gap-lg p-canvas pb-[var(--space-64)]">
        <SiteHeader motionEnabled={false} entranceActive brandOnly={false} />
        <nav>
          <Link
            href="/#case-studies"
            className="font-display uppercase text-label-s tracking-caption text-text-link underline [text-underline-position:from-font]"
          >
            ← Back to case studies
          </Link>
        </nav>
        {children}
      </div>
    </div>
  );
}
