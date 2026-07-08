// url=https://www.figma.com/design/VibdutrclLgS5EpFWgbJhH/Portfolio-%7C-AI-Handoff?node-id=99-2367
// source=src/components/CaseStudyCard.tsx
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
        title: "${title}",
        tags: ["${tag1}", "${tag2}"],
        asset: "csSmartHome",
        href: "/case-studies/smart-home",
      }}
    />
  `,
  imports: ['import { CaseStudyCard } from "@/components"'],
  id: "case-study-card",
  metadata: { nestable: true },
};
