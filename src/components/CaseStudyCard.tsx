import Link from "next/link";
import type { AssetKey } from "@/lib/assets";
import { FigmaImage } from "./FigmaImage";

export interface CaseStudy {
  title: string;
  tags: string[];
  asset: AssetKey;
  href: string;
}

/**
 * case-study-card atomic component — Figma 99:2367
 * Bordered card, color-burn stone wash, title + tags bottom-left,
 * artwork bleeding off the right edge. Metrics via tokens.css per breakpoint.
 */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={study.href}
      className="cs-card group relative flex h-[var(--height-cs-card)] touch-manipulation items-end justify-between overflow-hidden border-2 border-card-border pt-[var(--padding-cs-top)] [-webkit-tap-highlight-color:transparent] transition-[border-color,background-color,box-shadow] duration-[var(--duration-base)] ease-standard laptop:hover:border-[1.5px] laptop:hover:border-blue-700 laptop:hover:bg-zinc-50 laptop:hover:shadow-[var(--shadow-cs-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link"
    >
      {/* stone wash overlay (color-burn, backdrop blur) */}
      <span
        aria-hidden="true"
        className="cs-card__wash pointer-events-none absolute inset-0 z-0 bg-stone-100 mix-blend-color-burn backdrop-blur-[var(--radius-sm)] transition-opacity duration-[var(--duration-base)] laptop:group-hover:opacity-0"
      />
      {/* artwork — full-width flex child; bleeds off right under overflow-clip */}
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
      <span className="cs-card__content relative z-[var(--z-10)] flex shrink-0 flex-col gap-xs pt-[var(--padding-cs-content-top)] pb-[var(--padding-cs-block-end)] pl-[var(--padding-cs-inline)] pr-[var(--padding-cs-content-end)] transition-[padding,color] duration-[var(--duration-base)] laptop:group-hover:pt-sm laptop:group-hover:text-zinc-950">
        <span className="cs-card__title font-display [font-stretch:expanded] uppercase text-[length:var(--size-cs-title)] leading-normal text-zinc-700 transition-colors duration-[var(--duration-base)] laptop:group-hover:text-zinc-950">
          {study.title}
        </span>
        <span className="cs-card__tags flex gap-[var(--space-12)] font-display uppercase text-[length:var(--size-cs-tag)] tracking-[length:var(--tracking-cs-tag)] text-zinc-600 transition-colors duration-[var(--duration-base)] laptop:group-hover:text-zinc-950">
          {study.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
      </span>
    </Link>
  );
}
