import type { AssetKey } from "./assets";

export type CaseStudySlug = "smart-home" | "insurance" | "maternity" | "erp";

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudySection {
  label: string;
  body: string;
}

export interface CaseStudyHighlight {
  label: string;
  headline: string;
  variant?: "display" | "helvetica";
}

export interface CaseStudyContent {
  slug: CaseStudySlug;
  title: string;
  tags: string[];
  asset: AssetKey;
  heroAsset?: AssetKey;
  eyebrow: string;
  role: string;
  skills: string;
  challenge: CaseStudyHighlight;
  challengeSecondary?: CaseStudyHighlight;
  projectName: string;
  sections: CaseStudySection[];
  stats: CaseStudyStat[];
  bodyParagraphs: string[];
  conclusion: {
    label: string;
    body: string;
  };
}

const PLACEHOLDER_SECTION =
  "Over the first month, research and stakeholder interviews mapped how users experienced the product today — and where the experience broke down. What emerged was consistent: a product far more capable than it was perceived to be.";

const PLACEHOLDER_CHALLENGE =
  "The product faced a fundamental experience disconnect. Despite years of iteration, a growing feature set, and loyal power users, new customers struggled to understand core value within their first session.";

export const CASE_STUDY_CONTENT: Record<CaseStudySlug, CaseStudyContent> = {
  "smart-home": {
    slug: "smart-home",
    title: "Smart Home",
    tags: ["IOT", "Mobile"],
    asset: "csSmartHome",
    heroAsset: "csSmartHomeHero",
    eyebrow: "PRODUCT DESIGN CASE STUDIES//",
    role: "4 YEARS | LEAD UX DESIGNER",
    skills: "AI NATIVE | LEAN UX | DESIGN SYSTEMS | PROJECT MANAGEMENT",
    challenge: {
      label: "Challenge",
      headline: PLACEHOLDER_CHALLENGE,
    },
    challengeSecondary: {
      label: "Challenge",
      headline: PLACEHOLDER_CHALLENGE,
      variant: "helvetica",
    },
    projectName: "Smart Home",
    sections: [
      {
        label: "Research",
        body: PLACEHOLDER_SECTION,
      },
      {
        label: "Strategy",
        body: PLACEHOLDER_SECTION,
      },
      {
        label: "Experience",
        body: PLACEHOLDER_SECTION,
      },
    ],
    stats: [
      { value: "12", label: "Devices" },
      { value: "4", label: "Hub states" },
      { value: "38%", label: "Task success" },
      { value: "2.1×", label: "Setup speed" },
    ],
    bodyParagraphs: [
      PLACEHOLDER_SECTION,
      `${PLACEHOLDER_SECTION} The team aligned on a single onboarding spine, reduced configuration steps, and introduced progressive disclosure for advanced automations.`,
      PLACEHOLDER_SECTION,
    ],
    conclusion: {
      label: "Challenge",
      body: `${PLACEHOLDER_CHALLENGE} In a crowded IoT market, the app needed to feel proactive — not just a remote control. We reframed setup as guided discovery and made routine automations visible from day one.`,
    },
  },
  insurance: {
    slug: "insurance",
    title: "Insurance",
    tags: ["Travel", "Mobile"],
    asset: "csInsurance",
    eyebrow: "PRODUCT DESIGN CASE STUDIES//",
    role: "4 YEARS | LEAD UX DESIGNER",
    skills: "AI NATIVE | LEAN UX | DESIGN SYSTEMS | PROJECT MANAGEMENT",
    challenge: {
      label: "Challenge",
      headline:
        "Travel insurance onboarding asked users to understand coverage tiers before they understood the trip context — creating drop-off at the first meaningful decision.",
    },
    projectName: "Insurance",
    sections: [
      { label: "Research", body: PLACEHOLDER_SECTION },
      { label: "Flows", body: PLACEHOLDER_SECTION },
      { label: "Outcomes", body: PLACEHOLDER_SECTION },
    ],
    stats: [
      { value: "18%", label: "Completion lift" },
      { value: "3", label: "Core journeys" },
      { value: "9", label: "Policy states" },
      { value: "41%", label: "Support reduction" },
    ],
    bodyParagraphs: [PLACEHOLDER_SECTION, PLACEHOLDER_SECTION],
    conclusion: {
      label: "Results",
      body: "Reordering the funnel around trip intent — not policy jargon — improved completion and reduced support tickets across the three highest-volume journeys.",
    },
  },
  maternity: {
    slug: "maternity",
    title: "Maternity",
    tags: ["Wellness", "Mobile"],
    asset: "csMaternity",
    eyebrow: "PRODUCT DESIGN CASE STUDIES//",
    role: "4 YEARS | LEAD UX DESIGNER",
    skills: "AI NATIVE | LEAN UX | DESIGN SYSTEMS | PROJECT MANAGEMENT",
    challenge: {
      label: "Challenge",
      headline:
        "Expectant users needed calm, stage-aware guidance — but the product surfaced the same dense dashboard regardless of trimester or care pathway.",
    },
    projectName: "Maternity",
    sections: [
      { label: "Research", body: PLACEHOLDER_SECTION },
      { label: "Content", body: PLACEHOLDER_SECTION },
      { label: "Experience", body: PLACEHOLDER_SECTION },
    ],
    stats: [
      { value: "5", label: "Care stages" },
      { value: "24", label: "Guided tasks" },
      { value: "67%", label: "Weekly return" },
      { value: "4.6", label: "App rating" },
    ],
    bodyParagraphs: [PLACEHOLDER_SECTION, PLACEHOLDER_SECTION],
    conclusion: {
      label: "Results",
      body: "Trimester-based home surfaces and quieter notification defaults made the product feel supportive instead of overwhelming — especially for first-time users.",
    },
  },
  erp: {
    slug: "erp",
    title: "ERP",
    tags: ["Admin", "Web app"],
    asset: "csErp",
    eyebrow: "PRODUCT DESIGN CASE STUDIES//",
    role: "4 YEARS | LEAD UX DESIGNER",
    skills: "AI NATIVE | LEAN UX | DESIGN SYSTEMS | PROJECT MANAGEMENT",
    challenge: {
      label: "Challenge",
      headline:
        "Operations teams lived in spreadsheets because the ERP surface buried high-frequency actions under admin-first information architecture.",
    },
    projectName: "ERP",
    sections: [
      { label: "Research", body: PLACEHOLDER_SECTION },
      { label: "Systems", body: PLACEHOLDER_SECTION },
      { label: "Delivery", body: PLACEHOLDER_SECTION },
    ],
    stats: [
      { value: "6", label: "Core modules" },
      { value: "47%", label: "Faster audits" },
      { value: "12", label: "Role views" },
      { value: "3", label: "Pilot teams" },
    ],
    bodyParagraphs: [PLACEHOLDER_SECTION, PLACEHOLDER_SECTION],
    conclusion: {
      label: "Results",
      body: "Role-based dashboards and a shared component library brought daily workflows back into the product — without sacrificing the depth power users relied on.",
    },
  },
};

export const CASE_STUDY_SLUGS = Object.keys(CASE_STUDY_CONTENT) as CaseStudySlug[];

export function getCaseStudy(slug: string): CaseStudyContent | undefined {
  return CASE_STUDY_CONTENT[slug as CaseStudySlug];
}

export function getRelatedCaseStudies(currentSlug: CaseStudySlug, limit = 3) {
  return CASE_STUDY_SLUGS.filter((slug) => slug !== currentSlug)
    .slice(0, limit)
    .map((slug) => CASE_STUDY_CONTENT[slug]);
}
