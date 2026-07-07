import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "CASE STUDIES_PRO", count: "04", href: "#case-studies" },
  { label: "DATA STORIES_OOO", count: "03", href: "#data-stories" },
  { label: "WORK_EXPERIENCE", count: "04 yrs", href: "#work-experience" },
];

function ResumeText() {
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
        <span className="text-text-primary">Product EX: 4 yrs+</span>
        <span className="text-text-link underline [text-underline-position:from-font] group-hover:text-blue-900 transition-colors duration-[var(--duration-base)] ease-standard">
          My resume
        </span>
      </span>
    </span>
  );
}

/**
 * header-1440 — brand nav card (left) + resume card (right).
 * Tablet: resume photo strip hides. Mobile: the resume link folds into the
 * brand card's top row, next to "SHIVANI K.".
 */
export function SiteHeader() {
  return (
    <header className="flex flex-col gap-gap-sm tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-gap-md w-full">
      {/* nav card */}
      <nav
        aria-label="Primary"
        className="flex flex-col w-full tablet:w-auto tablet:flex-1 tablet:max-w-[var(--width-nav-card)] laptop:min-w-[var(--width-nav-card)] bg-surface border border-border-default rounded-3"
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
          {/* mobile: resume link lives inside the brand card */}
          <Link
            href="/resume"
            className="group flex tablet:hidden items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link"
            aria-label="Product experience 4+ years — view my resume"
          >
            <ResumeText />
          </Link>
          {/* nav-gif media slot */}
          <div className="hidden laptop:block relative w-[var(--width-nav-media)] overflow-hidden rounded-3 mix-blend-luminosity">
            <Image
              src="/figma/nav-media-poster.png"
              alt=""
              fill
              sizes="200px"
              className="object-cover opacity-60"
            />
          </div>
        </div>
        <ul className="flex flex-wrap items-center gap-x-gap-lg gap-y-0 px-sm py-sm uppercase">
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
        </ul>
      </nav>

      {/* tablet+: standalone resume card on the right */}
      <Link
        href="/resume"
        className="group hidden tablet:flex items-center justify-between gap-gap-md tablet:w-auto tablet:shrink-0 tablet:min-w-[var(--width-resume-card)] border border-border-default rounded-3 p-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link"
        aria-label="Product experience 4+ years — view my resume"
      >
        <ResumeText />
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
