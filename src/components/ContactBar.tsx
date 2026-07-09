"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ENTRANCE, EASE_STANDARD } from "@/lib/motion/homePrototype";

type ContactLink = {
  label: string;
  href: string;
  external?: boolean;
};

/** Tablet+ order — Figma psuedo-footer-768+ */
const CONTACTS_TABLET: ContactLink[] = [
  { label: "+91 7977371976", href: "tel:+917977371976" },
  { label: "shivanimkher@gmail.com", href: "mailto:shivanimkher@gmail.com" },
  {
    label: "linkedin @shivani kher",
    href: "https://linkedin.com/in/shivani-kher",
    external: true,
  },
];

/** Mobile — Figma psuedo-footer-360 (104:18494): full email + phone only */
const CONTACTS_MOBILE: ContactLink[] = [
  { label: "shivanimkher@gmail.com", href: "mailto:shivanimkher@gmail.com" },
  { label: "+91 7977371976", href: "tel:+917977371976" },
];

const CONTACT_LINK_CLASS =
  "inline-flex items-center whitespace-nowrap font-display uppercase text-overline tracking-overline text-text-primary transition-colors duration-[var(--duration-base)] ease-standard hover:text-text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link";

type ContactBarProps = {
  motionEnabled: boolean;
  entranceActive: boolean;
};

function ContactLinks({ contacts }: { contacts: ContactLink[] }) {
  return (
    <ul className="flex items-center gap-gap-md">
      {contacts.map((c) => (
        <li key={c.href} className="shrink-0">
          <Link
            href={c.href}
            target={c.external ? "_blank" : undefined}
            rel={c.external ? "noopener noreferrer" : undefined}
            className={CONTACT_LINK_CLASS}
          >
            {c.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function LocationTime({ iconFirst = false }: { iconFirst?: boolean }) {
  const text = (
    <p className="font-display uppercase text-contact-loc tracking-caption leading-normal text-text-primary text-right">
      LOC: MUMBAI, IN
      <br />
      UTC+5:30
    </p>
  );

  const icon = (
    <Image
      src="/figma/location-icon.svg"
      alt=""
      width={32}
      height={32}
      className="size-lg shrink-0 tablet:size-xl"
    />
  );

  return (
    <div className="flex shrink-0 items-center gap-2xs" data-name="location-time">
      {iconFirst ? (
        <>
          {icon}
          {text}
        </>
      ) : (
        <>
          {text}
          {icon}
        </>
      )}
    </div>
  );
}

/** contact-strip-sticky — Figma 104:19033 / 101:1714 (360 / 768 / 1366+). */
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
      className="relative z-[var(--z-50)] flex w-full shrink-0 flex-col items-end gap-gap-sm tablet:flex-row tablet:items-end tablet:justify-between tablet:pb-[var(--space-20)]"
      data-node-id="104:19033"
      data-name="contact-strip-sticky"
      {...motionProps}
    >
      <div className="tablet:hidden">
        <LocationTime iconFirst />
      </div>

      <div
        className="relative flex h-[var(--space-40)] w-full shrink-0 items-center justify-start overflow-clip bg-surface border border-border-default rounded-3 p-sm tablet:h-auto tablet:w-auto tablet:justify-start tablet:gap-gap-xl tablet:px-[var(--padding-button-md-x)] tablet:py-[var(--padding-button-md-y)]"
        data-name="get-in-touch"
      >
        <div className="tablet:hidden">
          <ContactLinks contacts={CONTACTS_MOBILE} />
        </div>
        <div className="hidden tablet:block">
          <ContactLinks contacts={CONTACTS_TABLET} />
        </div>

        <span className="hidden tablet:block font-helvetica uppercase text-overline tracking-overline leading-normal text-text-muted whitespace-nowrap">
          Let&apos;s connect
        </span>
      </div>

      <div className="hidden tablet:block">
        <LocationTime />
      </div>
    </motion.div>
  );
}
