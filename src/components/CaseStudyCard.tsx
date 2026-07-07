import Image from "next/image";
import Link from "next/link";

export interface CaseStudy {
  title: string;
  tags: string[];
  image: string;
  href: string;
}

/**
 * cs-card-1440-v2 — bordered card, color-burn stone wash, title + tags
 * bottom-left, artwork bleeding off the right edge.
 */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={study.href}
      className="group relative flex h-[var(--height-cs-card)] items-end overflow-hidden border-2 border-card-border transition-colors duration-[var(--duration-base)] ease-standard hover:border-border-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link"
    >
      {/* stone wash overlay (color-burn, backdrop blur) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-stone-100 mix-blend-color-burn backdrop-blur-[var(--radius-sm)]"
      />
      {/* artwork — bleeds off the right edge (Figma: mr-[-355px] under overflow-clip) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[calc(var(--width-cs-media)*-0.55)] top-0 h-[calc(var(--height-cs-card)*1.75)] w-[var(--width-cs-media)]"
      >
        <Image
          src={study.image}
          alt=""
          fill
          sizes="355px"
          className="object-cover object-bottom"
        />
      </span>
      <span className="relative flex flex-col gap-xs p-card pt-0 pb-card">
        <span className="font-display font-bold [font-stretch:expanded] uppercase text-heading-m leading-tight text-zinc-700">
          {study.title}
        </span>
        <span className="flex gap-[var(--space-12)] font-display uppercase text-label-m tracking-tag text-zinc-600">
          {study.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
      </span>
    </Link>
  );
}
