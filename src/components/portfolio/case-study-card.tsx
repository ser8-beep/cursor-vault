import Link from "next/link";
import type { AssetKey } from "@/lib/assets";
import { FigmaImage } from "./figma-image";

export interface CaseStudy {
  title: string;
  tags: readonly string[];
  asset: AssetKey;
  href: string;
}

/**
 * case-study-card — Figma 99:2367
 * Responsive metrics via design-system/tokens/css/case-study-card.css.
 */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={study.href}
      className="cs-card group relative flex h-[var(--height-cs-card)] touch-manipulation items-end justify-between overflow-hidden border-2 border-[var(--color-card-border)] bg-[var(--card-background-default)] pt-[var(--padding-cs-top)] backdrop-blur-[44px] transition-[border-color,background-color,box-shadow] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] [-webkit-tap-highlight-color:transparent] lg:hover:border-[1.5px] lg:hover:border-[#1d4ed8] lg:hover:bg-[var(--card-background-hover)] lg:hover:shadow-[var(--shadow-cs-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d4ed8]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-stone-100 mix-blend-color-burn backdrop-blur-[4px] transition-opacity duration-[250ms] lg:group-hover:opacity-0"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none relative z-0 h-full w-full shrink-0 overflow-hidden -mr-[calc(100%-var(--padding-cs-inline))]"
      >
        <FigmaImage
          asset={study.asset}
          alt=""
          fill
          className="object-cover object-bottom"
        />
      </span>
      <span className="relative z-10 flex shrink-0 flex-col gap-1 pt-[var(--padding-cs-content-top)] pb-[var(--padding-cs-block-end)] pl-[var(--padding-cs-inline)] pr-[var(--padding-cs-content-end)] transition-[padding,color] duration-[250ms] lg:group-hover:pt-[var(--padding-cs-content-top-active)] lg:group-hover:pl-[var(--padding-cs-inline-active)] lg:group-hover:text-[#09090b]">
        <span className="font-display text-[length:var(--size-cs-title)] uppercase leading-normal text-[#3f3f46] transition-colors duration-[250ms] lg:group-hover:text-[#09090b]">
          {study.title}
        </span>
        <span className="flex gap-3 font-mono text-[length:var(--size-cs-tag)] uppercase tracking-[length:var(--tracking-cs-tag)] text-[#52525b] transition-colors duration-[250ms] lg:group-hover:text-[#09090b]">
          {study.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
      </span>
    </Link>
  );
}
