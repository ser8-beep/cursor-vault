// url=https://www.figma.com/design/VibdutrclLgS5EpFWgbJhH/Portfolio-%7C-AI-Handoff?node-id=13-16849
// source=src/components/CaseStudyPageTemplate.tsx
// component=CaseStudyPageTemplate
import figma from "figma";
const instance = figma.selectedInstance;

const title = instance.getString("Title");

export default {
  example: figma.code`
    <CaseStudyPageTemplate
      study={{
        slug: "smart-home",
        title: "${title}",
        tags: ["IOT", "Mobile"],
        asset: "csSmartHome",
        heroAsset: "csSmartHomeHero",
        eyebrow: "PRODUCT DESIGN CASE STUDIES//",
        role: "4 YEARS | LEAD UX DESIGNER",
        skills: "AI NATIVE | LEAN UX | DESIGN SYSTEMS | PROJECT MANAGEMENT",
        challenge: {
          label: "Challenge",
          headline: "Case study challenge headline.",
        },
        projectName: "${title}",
        sections: [
          {
            label: "Research",
            body: "Research summary paragraph.",
          },
        ],
        stats: [{ value: "12", label: "Metric" }],
        bodyParagraphs: ["Supporting narrative paragraph."],
        conclusion: {
          label: "Results",
          body: "Final outcome summary.",
        },
      }}
    />
  `,
  imports: ['import { CaseStudyPageTemplate } from "@/components/CaseStudyPageTemplate"'],
  id: "case-study-page",
  metadata: { nestable: false },
};
