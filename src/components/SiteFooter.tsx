"use client";

import Link from "next/link";
import type { ReactNode } from "react";

const EXPERTISE = [
  "UX Strategy",
  "Product Design",
  "Interaction Design",
  "Design Systems",
  "UX Research",
  "Information Architecture",
  "Accessibility",
  "Responsive Design",
];

const CTA_LINKS = [
  { label: "Email", href: "mailto:shivanimkher@gmail.com" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/shivani-kher",
    external: true,
  },
  { label: "Resume", href: "/resume" },
];

function FooterCard({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`flex flex-col gap-gap-sm bg-surface border border-border-default rounded-3 p-[var(--space-12)] tablet:p-card ${className}`}
    >
      <h3 className="font-display uppercase text-label-s tracking-caption text-text-muted">
        {label}
      </h3>
      {children}
    </article>
  );
}

/** about-footer — third fold / page close with bio, experience, and contact CTA. */
export function SiteFooter() {
  return (
    <footer
      id="about"
      aria-label="About me"
      data-name="about-footer"
      className="relative z-[var(--z-20)] w-full scroll-mt-[var(--space-48)] pb-[var(--space-48)] tablet:pb-[var(--space-64)]"
    >
      <p className="mb-gap-md font-display uppercase text-label-m leading-normal tracking-caption text-text-muted whitespace-pre-wrap">
        <span className="text-main">ABOUT_ME</span>
        {" //  OOO\n"}
        {"                               01_BIO\n"}
        {"                               02_EXPERIENCE\n"}
        {"                               03_CONNECT"}
      </p>

      <div className="flex flex-col gap-gap-md">
        <FooterCard label="About Me">
          <p className="font-notes text-body-m font-extralight leading-relaxed tracking-notes-body text-text-primary">
            A UX/UI Designer with 3+ years of experience crafting intuitive digital
            products for BFSI, SaaS, and consumer platforms. I combine research,
            systems thinking, and visual design to create experiences that solve
            real business and user problems.
          </p>
        </FooterCard>

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-gap-md">
          <FooterCard label="Experience">
            <p className="font-display uppercase text-label-l tracking-caption text-text-primary">
              3+ Years
            </p>
            <p className="font-notes text-body-s font-extralight leading-relaxed tracking-notes-body text-text-muted">
              Senior UX/UI Designer specializing in product design, design systems,
              UX research, and responsive interfaces for enterprise and consumer
              products.
            </p>
          </FooterCard>

          <FooterCard label="Location">
            <p className="font-display uppercase text-label-l tracking-caption text-text-primary">
              Mumbai, India
            </p>
            <p className="font-notes text-body-s font-extralight leading-relaxed tracking-notes-body text-text-muted">
              Open to remote opportunities and relocation.
            </p>
          </FooterCard>
        </div>

        <FooterCard label="Areas of Expertise">
          <ul className="flex flex-wrap gap-x-gap-lg gap-y-gap-sm font-display uppercase text-label-m tracking-tag text-zinc-600">
            {EXPERTISE.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </FooterCard>

        <FooterCard label="Let's Work Together">
          <p className="font-notes text-body-m font-extralight leading-relaxed tracking-notes-body text-text-primary">
            Building thoughtful digital experiences starts with a conversation.
            Whether it&apos;s a product redesign, a new idea, or a design challenge,
            I&apos;d love to hear about it.
          </p>
          <Link
            href="mailto:shivanimkher@gmail.com"
            className="inline-flex items-center gap-gap-sm font-display uppercase text-label-m tracking-caption text-text-link underline [text-underline-position:from-font] transition-colors duration-[var(--duration-base)] ease-standard hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link"
          >
            Get in Touch →
          </Link>
          <ul className="flex flex-wrap items-center gap-x-gap-lg gap-y-gap-sm pt-gap-sm border-t border-border-default">
            {CTA_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center py-sm font-display uppercase text-label-s tracking-caption text-text-primary transition-colors duration-[var(--duration-base)] ease-standard hover:text-text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterCard>
      </div>
    </footer>
  );
}
