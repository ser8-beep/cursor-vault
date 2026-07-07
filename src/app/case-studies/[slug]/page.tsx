import Link from "next/link";
import { notFound } from "next/navigation";

const CASE_STUDIES: Record<
  string,
  { title: string; tags: string[]; heroImage?: string; status: "stub" | "implemented" }
> = {
  "smart-home": {
    title: "Smart Home",
    tags: ["IOT", "Mobile"],
    status: "stub",
  },
  insurance: {
    title: "Insurance",
    tags: ["Travel", "Mobile"],
    status: "stub",
  },
  maternity: {
    title: "Maternity",
    tags: ["Wellness", "Mobile"],
    status: "stub",
  },
  erp: {
    title: "ERP",
    tags: ["Admin", "Web app"],
    status: "stub",
  },
};

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];
  if (!study) return {};
  return { title: `${study.title} — Shivani K.` };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];
  if (!study) notFound();

  return (
    <div className="canvas-pattern min-h-screen p-canvas">
      <div className="mx-auto flex w-full max-w-[var(--layout-content-width)] flex-col gap-gap-lg">
        <nav>
          <Link
            href="/#case-studies"
            className="font-display uppercase text-label-s tracking-caption text-text-link underline [text-underline-position:from-font]"
          >
            ← Back to case studies
          </Link>
        </nav>

        <header className="flex flex-col gap-gap-sm border border-border-default bg-surface p-card rounded-3">
          <p className="font-display uppercase text-label-s tracking-caption text-text-muted">
            Product design case study
          </p>
          <h1 className="font-display [font-stretch:expanded] uppercase text-heading-xl text-text-primary">
            {study.title}
          </h1>
          <p className="flex gap-[var(--space-12)] font-display uppercase text-label-m tracking-tag text-zinc-600">
            {study.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </p>
        </header>

        <section className="border border-border-default bg-surface p-card rounded-3">
          <p className="font-body text-body-m text-text-secondary">
            Full case study content from the Figma <code className="text-text-primary">smart-home</code> frame
            is scaffolded here. The home page carousel and handoff registry at{" "}
            <Link href="/automate" className="text-text-link underline [text-underline-position:from-font]">
              /automate
            </Link>{" "}
            track implementation progress.
          </p>
        </section>
      </div>
    </div>
  );
}
