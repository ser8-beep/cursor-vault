import { CaseStudyCard, type CaseStudy } from "./CaseStudyCard";

const CASE_STUDIES: CaseStudy[] = [
  { title: "Smart Home", tags: ["IOT", "Mobile"], image: "/figma/cs-smart-home.png", href: "#smart-home" },
  { title: "Insurance", tags: ["Travel", "Mobile"], image: "/figma/cs-insurance.png", href: "#insurance" },
  { title: "Maternity", tags: ["Wellness", "Mobile"], image: "/figma/cs-maternity.png", href: "#maternity" },
  { title: "ERP", tags: ["Admin", "Web app"], image: "/figma/cs-erp.png", href: "#erp" },
];

/**
 * carousel-1440 — section label + case-study cards.
 * Grid: 12-col desktop (4-up) → 8-col tablet (2-up) → 4-col mobile (1-up),
 * per the Layout collection's grid/columns modes.
 */
export function CaseStudyCarousel() {
  return (
    <section
      id="case-studies"
      aria-label="Case studies"
      className="flex w-full flex-col gap-2xl pb-[var(--space-48)] scroll-mt-[var(--space-48)]"
    >
      <p className="font-display uppercase text-label-s leading-normal tracking-[var(--tracking-caption)] text-text-muted whitespace-pre-wrap">
        <span className="text-main">PRODUCT_DESIGN</span>
        {" //  01_SYSTEMS_FOR_USERS\n"}
        {"                               02_SYSTEMS FOR_TEAMS"}
      </p>
      <ul className="grid w-full grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-gap-md laptop:gap-[var(--space-20)] list-none">
        {CASE_STUDIES.map((study) => (
          <li key={study.title} className="contents">
            <CaseStudyCard study={study} />
          </li>
        ))}
      </ul>
    </section>
  );
}
