"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ENTRANCE, EASE_STANDARD } from "@/lib/motion/homePrototype";

const NAV_ITEMS = [
  { label: "CASE STUDIES_PRO", count: "04", href: "#case-studies" },
  { label: "DATA STORIES_OOO", count: "03", href: "#data-stories" },
  { label: "WORK_EXPERIENCE", count: "04 yrs", href: "#work-experience" },
];

function ResumeText({ variant }: { variant: "mobile" | "desktop" }) {
  return (
    <span className="flex items-center gap-gap-sm py-sm">
      <Image
        src="/figma/work-ex-icon.svg"
        alt=""
        width={32}
        height={32}
        className="size-xl shrink-0"
      />
      <span className="flex flex-col gap-2xs uppercase font-display text-label-s tracking-caption whitespace-nowrap">
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
};

/**
 * header-1440 — Figma 13:450. Motion: header-enter (13:32068).
 */
export function SiteHeader({ motionEnabled, entranceActive, brandOnly = false }: SiteHeaderProps) {
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
      className="flex flex-col gap-gap-sm tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-gap-md w-full"
    >
      <motion.nav
        aria-label="Primary"
        data-name="nav"
        className="flex flex-col w-full tablet:w-auto tablet:flex-1 tablet:max-w-[var(--width-nav-card)] laptop:min-w-[var(--width-nav-card)] bg-surface border border-border-default rounded-3 overflow-hidden"
        {...shellProps}
      >
        <div className="flex items-stretch justify-between border-b border-border-default py-2xs pl-sm pr-xs">
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
              <Image
                src="/figma/nav-media-poster.png"
                alt=""
                fill
                sizes="200px"
                className="object-cover opacity-60"
              />
            </motion.div>
          ) : null}
        </div>
        {!brandOnly ? (
          <motion.ul
            className="flex flex-wrap items-center gap-x-gap-lg gap-y-0 px-sm py-sm uppercase overflow-hidden"
            {...navProps}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-gap-sm py-sm font-display text-label-s tracking-caption text-text-primary transition-colors duration-[var(--duration-base)] ease-standard hover:text-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link"
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
        className={`group hidden tablet:flex items-center justify-between gap-gap-md tablet:w-auto tablet:shrink-0 tablet:min-w-[var(--width-resume-card)] border border-border-default rounded-3 p-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link ${
          brandOnly ? "!hidden" : ""
        }`}
        aria-label="Product experience 4+ years — view my resume"
        data-name="resume"
      >
        <ResumeText variant="desktop" />
        <span className="hidden laptop:block relative self-stretch w-[var(--width-resume-media)] overflow-hidden rounded-3 mix-blend-luminosity">
          <Image
            src="/figma/work-ex-photo.png"
            alt=""
            fill
            sizes="135px"
            className="object-cover object-top"
          />
        </span>
      </Link>
    </header>
  );
}
