import Image from "next/image";
import Link from "next/link";

const CONTACTS = [
  { label: "+91 7977071976", href: "tel:+917977071976" },
  { label: "shivanimkher@gmail.com", href: "mailto:shivanimkher@gmail.com" },
  { label: "LinkedIn @shivani kher", href: "https://linkedin.com/in/shivani-kher", external: true },
];

/**
 * psuedo-footer-1440 — get-in-touch card (left) + location-time (right).
 * Tablet/Mobile: contact links wrap; location block stays right-aligned
 * below the card.
 */
export function ContactBar() {
  return (
    <div className="relative z-10 flex w-full flex-col gap-gap-md tablet:flex-row tablet:items-end tablet:justify-between">
      {/* get-in-touch */}
      <div className="flex w-full tablet:w-auto laptop:min-w-[var(--width-contact-card)] items-center justify-between gap-gap-lg bg-surface border border-border-default rounded-3 p-[var(--space-12)]">
        <ul className="flex flex-wrap items-center gap-x-gap-lg gap-y-gap-sm">
          {CONTACTS.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center py-sm font-display uppercase text-label-s tracking-caption text-text-primary transition-colors duration-[var(--duration-base)] ease-standard hover:text-text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
        <span className="hidden tablet:block font-helvetica uppercase text-label-s leading-tight text-text-muted whitespace-nowrap">
          Let’s connect
        </span>
      </div>

      {/* location-time */}
      <div className="flex items-center gap-2xs self-end">
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
    </div>
  );
}
