// url=https://www.figma.com/design/VibdutrclLgS5EpFWgbJhH/Portfolio-%7C-AI-Handoff?node-id=99-2367
// source=src/components/portfolio/case-study-card.tsx
// component=CaseStudyCard
import figma from "figma";
const instance = figma.selectedInstance;

const title = instance.getString("Title");
const tag1 = instance.getString("Tag 1");
const tag2 = instance.getString("Tag 2");

export default {
  example: figma.code`
    <CaseStudyCard
      study={{
        title: "${title.toUpperCase()}",
        tags: ["${tag1.toUpperCase()}", "${tag2.toUpperCase()}"],
        asset: "csSmartHome",
        href: "#work",
      }}
    />
  `,
  imports: ['import { CaseStudyCard } from "@/components/portfolio/case-study-card"'],
  id: "case-study-card",
  metadata: { nestable: true },
};
