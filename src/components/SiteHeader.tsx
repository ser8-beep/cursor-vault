"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ENTRANCE, EASE_STANDARD } from "@/lib/motion/homePrototype";
import { FigmaImage } from "./FigmaImage";
import { MontageEmbed, NavMontage } from "./NavMontage";

const NAV_ITEMS = [
  { label: "CASE_STUDIES", count: "04", href: "#case-studies" },
  { label: "DATA_STORIES", count: "03", href: "#data-stories" },
  { label: "ABOUT_ME", count: "3+ yrs", href: "#about" },
];

function ResumeIcon({ size }: { size: "sm" | "lg" }) {
  const dimension = size === "sm" ? "size-[var(--space-24)]" : "size-xl";
  return (
    <span
      aria-hidden="true"
      className={`flex ${dimension} shrink-0 items-center justify-center`}
    >
      <Image
        src="/figma/work-ex-icon.svg"
        alt=""
        width={size === "sm" ? 24 : 32}
        height={size === "sm" ? 24 : 32}
        className="size-full object-contain"
      />
    </span>
  );
}

function ResumeText({ variant }: { variant: "mobile" | "tablet" | "desktop" }) {
  if (variant === "mobile") {
    return (
      <span className="inline-flex flex-col items-end justify-center gap-xs font-display text-overline tracking-caption uppercase whitespace-nowrap">
        <span className="text-text-primary">Work ex: 4 yrs+</span>
        <span className="text-text-link underline [text-underline-position:from-font] group-hover:text-blue-900 transition-colors duration-[var(--duration-base)] ease-standard">
          My resume
        </span>
      </span>
    );
  }

  if (variant === "tablet") {
    return (
      <span className="flex w-full min-w-0 items-center justify-between gap-xs">
        <span className="inline-flex min-w-0 items-center gap-xs">
          <ResumeIcon size="sm" />
          <span className="font-display text-overline tracking-caption uppercase text-text-primary whitespace-nowrap">
            Work ex: 4 yrs+
          </span>
        </span>
        <span className="shrink-0 font-display text-overline tracking-caption uppercase text-text-link underline [text-underline-position:from-font] group-hover:text-blue-900 transition-colors duration-[var(--duration-base)] ease-standard">
          My resume
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex w-max max-w-max shrink-0 items-center gap-gap-sm self-start py-sm">
      <ResumeIcon size="lg" />
      <span className="flex w-max max-w-max shrink-0 flex-col gap-2xs uppercase font-display text-label-s tracking-caption whitespace-nowrap min-[1600px]:flex-col-reverse min-[1920px]:flex-col">
        <span className="text-text-primary">Product ex: 4 yrs+</span>
        <span className="text-text-link underline [text-underline-position:from-font] group-hover:text-blue-900 transition-colors duration-[var(--duration-base)] ease-standard">
          My resume
        </span>
      </span>
    </span>
  );
}

function ResumeMontage({
  reducedMotion,
  layout,
}: {
  reducedMotion: boolean;
  layout: "mobile-inline" | "tablet-stack" | "desktop-inline";
}) {
  const frameClass =
    layout === "mobile-inline"
      ? "h-full w-[var(--width-resume-media-mobile)]"
      : layout === "tablet-stack"
        ? "min-h-0 flex-1 w-full laptop:flex-none laptop:h-[var(--height-resume-media)] laptop:w-[var(--width-resume-media)]"
        : "h-[var(--height-resume-media)] w-[var(--width-resume-media)]";

  return (
    <span
      className={`relative shrink-0 self-center overflow-hidden rounded-3 mix-blend-luminosity ${frameClass}`}
    >
      {reducedMotion ? (
        <FigmaImage
          asset="workExPhoto"
          alt=""
          fill
          className="object-cover object-top"
        />
      ) : (
        <MontageEmbed />
      )}
    </span>
  );
}

type SiteHeaderProps = {
  motionEnabled: boolean;
  entranceActive: boolean;
  /** Splash/header-enter: brand row only until full chrome (Figma 54:1126). */
  brandOnly?: boolean;
  /** Show static nav poster instead of animated montage. */
  reducedMotion?: boolean;
};

/**
 * Responsive header default states — Figma 90:1771 (header_default_states_responsive).
 * Motion: header-enter (13:32068).
 */
export function SiteHeader({
  motionEnabled,
  entranceActive,
  brandOnly = false,
  reducedMotion = false,
}: SiteHeaderProps) {
  const shellProps =
    motionEnabled && !brandOnly
      ? {
          initial: { opacity: 0, y: -8 },
          animate: entranceActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 },
          transition: {
            delay: ENTRANCE.headerShell.delay,
            duration: ENTRANCE.headerShell.duration,
            ease: EASE_STANDARD,
          },
        }
      : {};

  const navProps =
    motionEnabled && !brandOnly
      ? {
          initial: { opacity: 0, height: 0 },
          animate: entranceActive ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 },
          transition: {
            delay: ENTRANCE.headerNav.delay,
            duration: ENTRANCE.headerNav.duration,
            ease: EASE_STANDARD,
          },
        }
      : {};

  return (
    <header
      data-node-id="90:1771"
      data-name="header_default_states_responsive"
      className="flex w-full min-w-0 flex-col gap-gap-sm tablet:flex-row tablet:items-start tablet:gap-md"
    >
      <motion.nav
        aria-label="Primary"
        data-name="nav"
        className="grid w-full min-w-0 flex-1 bg-surface border border-border-default rounded-3"
        {...shellProps}
      >
        <div className="flex w-full min-w-0 items-stretch justify-between border-b border-border-default p-xs tablet:p-sm laptop:py-2xs laptop:pl-sm laptop:pr-xs">
          <Link
            href="/"
            className="flex flex-col justify-center gap-xs uppercase py-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link laptop:gap-xs desktop:gap-sm"
            aria-label="Shivani K. — home"
          >
            <span className="font-display font-bold [font-stretch:expanded] text-code leading-tight text-text-primary tablet:text-heading-s laptop:text-body-l desktop:text-body-xl">
              Shivani K.
            </span>
            <span className="font-display text-[6px] leading-[var(--space-8)] tracking-micro text-zinc-700 tablet:text-label-m tablet:leading-tight tablet:tracking-normal laptop:text-overline">
              v2026.vault
            </span>
          </Link>
          <Link
            href="/resume"
            className={`group flex h-full tablet:hidden items-center gap-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link ${
              brandOnly ? "hidden" : ""
            }`}
            aria-label="Product experience 4+ years — view my resume"
          >
            <ResumeText variant="mobile" />
            <ResumeMontage reducedMotion={reducedMotion} layout="mobile-inline" />
          </Link>
          {!brandOnly ? (
            <motion.div
              className="hidden laptop:block relative h-[var(--height-resume-media)] w-[var(--width-nav-media)] min-[1600px]:h-[var(--space-56)] min-[1920px]:h-[52px] overflow-hidden rounded-3 mix-blend-luminosity"
              initial={motionEnabled ? { opacity: 0 } : false}
              animate={entranceActive ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                delay: ENTRANCE.headerNav.delay,
                duration: ENTRANCE.headerNav.duration,
                ease: EASE_STANDARD,
              }}
              data-name="nav-gif"
            >
              {reducedMotion ? (
                <FigmaImage
                  asset="navMediaPoster"
                  alt=""
                  fill
                  className="object-cover opacity-60"
                />
              ) : (
                <NavMontage />
              )}
            </motion.div>
          ) : null}
        </div>
        {!brandOnly ? (
          <motion.ul
            className="flex w-full min-w-0 flex-nowrap items-center justify-start gap-x-md tablet:gap-x-[var(--space-20)] gap-y-0 px-xs pr-sm py-xs tablet:px-sm tablet:py-[var(--space-12)] laptop:py-sm desktop:py-md uppercase overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            {...navProps}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="shrink-0">
                <Link
                  href={item.href}
                  className="inline-flex shrink-0 items-center gap-2xs py-2xs font-display text-overline tracking-caption text-text-primary whitespace-nowrap transition-colors duration-[var(--duration-base)] ease-standard hover:text-text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link tablet:text-button tablet:py-sm laptop:text-label-s desktop:text-label-l"
                >
                  {item.label}
                  <span className="font-helvetica text-text-muted" aria-hidden="true">
                    {item.count}
                  </span>
                </Link>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </motion.nav>

      {/* tablet+: resume card — hidden during splash brand-only (54:1126) */}
      <Link
        href="/resume"
        className={`group hidden tablet:flex tablet:w-[var(--width-resume-card-tablet)] tablet:flex-col tablet:gap-xs tablet:self-stretch bg-surface laptop:inline-flex laptop:h-fit laptop:w-max laptop:max-w-max laptop:flex-none laptop:flex-row laptop:items-center laptop:self-auto border border-border-default rounded-3 p-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link laptop:gap-gap-md laptop:pl-sm laptop:pr-xs laptop:py-sm ${
          brandOnly ? "!hidden" : ""
        }`}
        aria-label="Product experience 4+ years — view my resume"
        data-name="resume"
      >
        <span className="tablet:block laptop:hidden">
          <ResumeText variant="tablet" />
        </span>
        <span className="hidden laptop:block">
          <ResumeText variant="desktop" />
        </span>
        <ResumeMontage reducedMotion={reducedMotion} layout="tablet-stack" />
      </Link>
    </header>
  );
}
