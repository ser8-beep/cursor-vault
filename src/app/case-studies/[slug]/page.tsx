import { notFound } from "next/navigation";
import { CaseStudyDetailShell } from "@/components/CaseStudyDetailShell";
import { CaseStudyPageTemplate } from "@/components/CaseStudyPageTemplate";
import { CASE_STUDY_SLUGS, getCaseStudy } from "@/lib/case-studies";

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return { title: `${study.title} — Shivani K.` };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <CaseStudyDetailShell>
      <CaseStudyPageTemplate study={study} />
    </CaseStudyDetailShell>
  );
}
