import type { AssetKey } from "@/lib/assets";
import type {
  CaseStudyContent,
  CaseStudyHighlight,
  CaseStudySection,
  CaseStudyStat,
} from "@/lib/case-studies";
import { FigmaImage } from "./FigmaImage";
import { CaseStudyCard } from "./CaseStudyCard";
import { getRelatedCaseStudies } from "@/lib/case-studies";

const IMAGE_SHADOW =
  "shadow-[0px_8px_30px_0px_color-mix(in_srgb,var(--color-zinc-950)_15%,transparent)]";

function CaseStudyHero({ study }: { study: CaseStudyContent }) {
  const heroAsset = study.heroAsset ?? study.asset;

  return (
    <header
      className="flex w-full flex-col gap-gap-lg pt-[var(--space-40)]"
      data-node-id="13:16856"
    >
      <div
        className="flex w-full flex-col gap-gap-lg tablet:flex-row tablet:items-end tablet:justify-between"
        data-node-id="13:16857"
      >
        <h1
          className="font-display [font-stretch:expanded] uppercase text-heading-xl text-zinc-700"
          data-node-id="13:16858"
        >
          {study.title}
        </h1>
        <div className="flex flex-col items-start gap-gap-md py-md tablet:items-end tablet:text-right">
          <p className="font-notes text-body-l font-semibold italic tracking-[0.14px] text-blue-900 max-w-[9rem]">
            {study.eyebrow}
          </p>
          <p className="font-notes uppercase text-body-l text-text-primary whitespace-nowrap">
            {study.role}
          </p>
        </div>
      </div>

      <div
        className="relative aspect-[1400/540] w-full overflow-hidden rounded-md"
        data-node-id="13:16862"
      >
        <FigmaImage
          asset={heroAsset}
          alt={`${study.title} case study hero`}
          fill
          priority
          className={`object-cover ${IMAGE_SHADOW}`}
        />
      </div>

      <div className="flex w-full flex-col gap-gap-sm font-notes uppercase text-body-l text-text-primary tablet:flex-row tablet:items-center tablet:justify-between">
        <p>{study.role}</p>
        <p className="tablet:text-right">{study.skills}</p>
      </div>
    </header>
  );
}

function CaseStudyHighlightBlock({ highlight }: { highlight: CaseStudyHighlight }) {
  const isHelvetica = highlight.variant === "helvetica";

  return (
    <section className="flex w-full flex-col items-center gap-[var(--space-32)] px-card py-[var(--space-80)] tablet:px-[var(--space-64)] laptop:px-[var(--space-120)]">
      <p className="w-full text-center font-display uppercase text-body-l tracking-[0.2em] text-zinc-700">
        {highlight.label}
      </p>
      <p
        className={`w-full text-center leading-normal ${
          isHelvetica
            ? "font-helvetica text-heading-l font-bold capitalize text-zinc-700"
            : "font-body text-heading-l text-text-primary"
        }`}
      >
        {highlight.headline}
      </p>
    </section>
  );
}

function CaseStudyMedia({
  asset,
  alt,
  aspect = "1400/600",
}: {
  asset: AssetKey;
  alt: string;
  aspect?: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-md bg-surface"
      style={{ aspectRatio: aspect }}
    >
      <FigmaImage asset={asset} alt={alt} fill className={`object-cover ${IMAGE_SHADOW}`} />
    </div>
  );
}

function CaseStudyContentBlock({
  title,
  sections,
  variant = "display",
}: {
  title: string;
  sections: CaseStudySection[];
  variant?: "display" | "archivo" | "body";
}) {
  const titleClass =
    variant === "archivo"
      ? "font-body text-display-l font-bold leading-tight tracking-tight text-text-primary"
      : "font-display [font-stretch:expanded] uppercase text-heading-xl text-zinc-700";

  return (
    <section className="flex w-full flex-col gap-[var(--space-40)] rounded-md bg-zinc-50 px-card py-[var(--space-80)] tablet:px-[var(--space-64)] laptop:px-[var(--space-120)]">
      <h2 className={titleClass}>{title}</h2>
      {sections.map((section) => (
        <div key={`${section.label}-${section.body.slice(0, 24)}`} className="flex flex-col gap-[var(--space-24)] pr-0 laptop:pr-[var(--space-40)]">
          <p className="font-notes font-medium uppercase text-body-l tracking-[0.08em] text-blue-900">
            {section.label}
          </p>
          <p className="font-body text-body-l leading-normal text-text-primary">{section.body}</p>
        </div>
      ))}
    </section>
  );
}

function CaseStudyStats({ stats }: { stats: CaseStudyStat[] }) {
  return (
    <section className="flex w-full flex-col gap-[var(--space-64)] px-card py-[var(--space-40)] tablet:px-[var(--space-64)] laptop:px-[var(--space-120)]">
      <p className="text-center font-notes font-medium uppercase text-body-l tracking-[0.08em] text-blue-900">
        Research
      </p>
      <div className="grid grid-cols-2 gap-gap-lg laptop:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-xs text-center">
            <p className="font-body text-display-l font-bold leading-tight tracking-tight text-text-primary">
              {stat.value}
            </p>
            <p className="font-body text-body-l tracking-[0.032em] text-text-primary">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CaseStudyImageGrid({ asset, alt }: { asset: AssetKey; alt: string }) {
  return (
    <div className="grid w-full grid-cols-1 gap-gap-sm tablet:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="relative aspect-[696/440] overflow-hidden rounded-md">
          <FigmaImage asset={asset} alt={alt} fill className={`object-cover ${IMAGE_SHADOW}`} />
        </div>
      ))}
    </div>
  );
}

function CaseStudyImageRow({ asset, alt }: { asset: AssetKey; alt: string }) {
  return (
    <div className="grid w-full grid-cols-1 gap-gap-sm tablet:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="relative aspect-[461/440] overflow-hidden rounded-md">
          <FigmaImage asset={asset} alt={alt} fill className={`object-cover ${IMAGE_SHADOW}`} />
        </div>
      ))}
    </div>
  );
}

function CaseStudyBodyBlock({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <section className="flex w-full flex-col gap-[var(--space-40)] rounded-md bg-zinc-50 px-card py-[var(--space-80)] tablet:px-[var(--space-64)] laptop:px-[var(--space-120)]">
      <h2 className="font-body text-display-l font-bold leading-tight tracking-tight text-text-primary">
        {title}
      </h2>
      <div className="flex flex-col gap-[var(--space-24)]">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="font-body text-body-l leading-normal text-text-primary">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

function CaseStudyConclusion({
  label,
  body,
}: {
  label: string;
  body: string;
}) {
  return (
    <section className="flex w-full flex-col items-center gap-[var(--space-40)] rounded-md bg-zinc-50 px-card py-[var(--space-80)] text-center tablet:px-[var(--space-64)] laptop:px-[var(--space-120)]">
      <p className="w-full font-notes font-medium uppercase text-body-l tracking-[0.08em] text-blue-900">
        {label}
      </p>
      <p className="w-full font-body text-body-l leading-normal text-text-primary whitespace-pre-wrap">
        {body}
      </p>
    </section>
  );
}

function CaseStudyMoreStudies({ currentSlug }: { currentSlug: CaseStudyContent["slug"] }) {
  const related = getRelatedCaseStudies(currentSlug);

  return (
    <section
      className="flex w-full flex-col gap-[var(--space-48)] pb-[var(--space-48)]"
      data-node-id="13:16934"
      data-name="carousel-1440"
    >
      <p className="font-display uppercase text-label-s leading-normal tracking-caption text-text-muted whitespace-pre-wrap">
        <span className="text-main">PRODUCT_DESIGN</span>
        {" //  01_SYSTEMS_FOR_USERS\n"}
        {"                               02_SYSTEMS FOR_TEAMS"}
      </p>
      <ul className="grid w-full grid-cols-1 gap-[var(--space-20)] list-none tablet:grid-cols-2 laptop:grid-cols-3">
        {related.map((study) => (
          <li key={study.slug}>
            <CaseStudyCard
              study={{
                title: study.title,
                tags: study.tags,
                asset: study.asset,
                href: `/case-studies/${study.slug}`,
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * smart-home — Figma 13:16849 case study detail template.
 * CMS-rich-text sections, hero, stats, image grids, and related studies.
 */
export function CaseStudyPageTemplate({ study }: { study: CaseStudyContent }) {
  const mediaAlt = `${study.title} case study visual`;

  return (
    <article
      className="flex w-full flex-col gap-[var(--space-20)] rounded-md"
      data-node-id="13:16849"
      data-name="smart-home"
    >
      <CaseStudyHero study={study} />
      <CaseStudyHighlightBlock highlight={study.challenge} />
      <CaseStudyMedia asset={study.asset} alt={mediaAlt} />
      <CaseStudyContentBlock title={study.projectName} sections={study.sections} />
      <CaseStudyMedia asset={study.asset} alt={mediaAlt} aspect="1400/860" />
      {study.challengeSecondary ? (
        <CaseStudyHighlightBlock highlight={study.challengeSecondary} />
      ) : null}
      <CaseStudyContentBlock
        title={study.projectName}
        sections={study.sections}
        variant="archivo"
      />
      <CaseStudyStats stats={study.stats} />
      <CaseStudyImageGrid asset={study.asset} alt={mediaAlt} />
      <CaseStudyBodyBlock title={study.projectName} paragraphs={study.bodyParagraphs} />
      <CaseStudyImageRow asset={study.asset} alt={mediaAlt} />
      <CaseStudyConclusion label={study.conclusion.label} body={study.conclusion.body} />
      <CaseStudyMoreStudies currentSlug={study.slug} />
    </article>
  );
}
