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

function ResumeText({ variant }: { variant: "mobile" | "desktop" }) {
  return (
    <span className="inline-flex w-max max-w-max shrink-0 items-center gap-gap-sm self-start py-sm">
      <span
        aria-hidden="true"
        className="flex size-xl shrink-0 items-center justify-center"
      >
        <Image
          src="/figma/work-ex-icon.svg"
          alt=""
          width={32}
          height={32}
          className="size-full object-contain"
        />
      </span>
      <span className="flex w-max max-w-max shrink-0 flex-col gap-2xs uppercase font-display text-label-s tracking-caption whitespace-nowrap">
        <span
          className={
            variant === "mobile"
              ? "text-text-primary normal-case"
              : "text-text-primary"
          }
        >
          {variant === "mobile" ? "4 yrs work ex" : "Product EX: 4 yrs+"}
        </span>
        <span className="text-text-link underline [text-underline-position:from-font] group-hover:text-blue-900 transition-colors duration-[var(--duration-base)] ease-standard">
          My resume
        </span>
      </span>
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
 * header-1440 — Figma 13:450. Motion: header-enter (13:32068).
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
      data-node-id="13:450"
      data-name="header-1440"
      className="flex w-full min-w-0 flex-col gap-gap-sm tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-gap-md"
    >
      <motion.nav
        aria-label="Primary"
        data-name="nav"
        className="grid w-full min-w-0 flex-1 bg-surface border border-border-default rounded-3"
        {...shellProps}
      >
        <div className="flex w-full min-w-0 items-stretch justify-between border-b border-border-default py-2xs pl-sm pr-xs">
          <Link
            href="/"
            className="flex flex-col justify-center uppercase py-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link"
            aria-label="Shivani K. — home"
          >
            <span className="font-display font-bold [font-stretch:expanded] text-body-l leading-tight text-text-primary pb-xs">
              Shivani K.
            </span>
            <span className="font-display text-label-s leading-tight tracking-micro text-zinc-700">
              v2026.vault
            </span>
          </Link>
          <Link
            href="/resume"
            className={`group flex tablet:hidden items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link ${
              brandOnly ? "hidden" : ""
            }`}
            aria-label="Product experience 4+ years — view my resume"
          >
            <ResumeText variant="mobile" />
          </Link>
          {!brandOnly ? (
            <motion.div
              className="hidden laptop:block relative w-[var(--width-nav-media)] overflow-hidden rounded-3 mix-blend-luminosity"
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
            className="flex w-full min-w-0 flex-nowrap items-center justify-between gap-x-gap-sm tablet:gap-x-gap-md laptop:gap-x-gap-lg gap-y-0 pl-sm pr-sm laptop:pr-xl py-sm uppercase overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            {...navProps}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="shrink-0">
                <Link
                  href={item.href}
                  className="inline-flex shrink-0 items-center gap-2xs tablet:gap-gap-sm py-2xs tablet:py-sm font-display text-label-s tracking-caption text-text-primary whitespace-nowrap transition-colors duration-[var(--duration-base)] ease-standard hover:text-text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link"
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
        className={`group hidden tablet:inline-flex h-fit w-max max-w-max flex-none shrink-0 items-center gap-0 border border-border-default rounded-3 p-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link laptop:gap-gap-md ${
          brandOnly ? "!hidden" : ""
        }`}
        aria-label="Product experience 4+ years — view my resume"
        data-name="resume"
      >
        <ResumeText variant="desktop" />
        <span className="relative hidden shrink-0 self-center overflow-hidden rounded-3 mix-blend-luminosity laptop:block laptop:h-[var(--height-resume-media)] laptop:w-[var(--width-resume-media)]">
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
      </Link>
    </header>
  );
}
