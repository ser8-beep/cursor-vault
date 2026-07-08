"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ENTRANCE, EASE_STANDARD } from "@/lib/motion/homePrototype";

const CONTACTS = [
  { label: "+91 7977071976", href: "tel:+917977071976" },
  { label: "shivanimkher@gmail.com", href: "mailto:shivanimkher@gmail.com" },
  { label: "LinkedIn @shivani kher", href: "https://linkedin.com/in/shivani-kher", external: true },
];

type ContactBarProps = {
  motionEnabled: boolean;
  entranceActive: boolean;
};

/** psuedo-footer-1440 — Figma 13:367. Motion: footer-enter (13:32063). */
export function ContactBar({ motionEnabled, entranceActive }: ContactBarProps) {
  const motionProps = motionEnabled
    ? {
        initial: { opacity: 0, y: 16 },
        animate: entranceActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
        transition: {
          delay: ENTRANCE.contact.delay,
          duration: ENTRANCE.contact.duration,
          ease: EASE_STANDARD,
        },
      }
    : {};

  return (
    <motion.div
      className="relative z-[var(--z-50)] flex w-full shrink-0 flex-row items-center justify-between gap-gap-md"
      data-node-id="13:367"
      data-name="psuedo-footer-1440"
      {...motionProps}
    >
      <div className="relative flex min-w-0 flex-1 items-center justify-start gap-gap-lg bg-surface border border-border-default rounded-3 p-sm">
        <ul className="flex min-w-0 flex-1 flex-nowrap items-center justify-between gap-x-gap-lg overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {CONTACTS.map((c) => (
            <li key={c.href} className="shrink-0">
              <Link
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center whitespace-nowrap py-sm font-display uppercase text-label-s tracking-caption text-text-primary transition-colors duration-[var(--duration-base)] ease-standard hover:text-text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
        <span className="hidden tablet:block font-helvetica uppercase text-label-s leading-tight text-text-muted whitespace-nowrap">
          Let&apos;s connect
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2xs" data-name="location-time">
        <p className="font-display uppercase text-label-s tracking-caption leading-normal text-text-primary text-right">
          LOC: Mumbai, IN
          <br />
          UTC+5:30
        </p>
        <Image
          src="/figma/location-icon.svg"
          alt=""
          width={32}
          height={32}
          className="size-xl shrink-0"
        />
      </div>
    </motion.div>
  );
}
