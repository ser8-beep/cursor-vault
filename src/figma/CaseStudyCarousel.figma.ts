// url=https://www.figma.com/design/VibdutrclLgS5EpFWgbJhH/Portfolio-%7C-AI-Handoff?node-id=104-18648
// source=src/components/CaseStudyCarousel.tsx
// component=CaseStudyCarousel
// note=104:18648 is full home-template-splash; case studies live in template-section child
// responsive=mobile/tablet list gap-12; no PRODUCT_DESIGN label; Insurance→Maternity→Smart Home→ERP
import figma from "figma";

export default {
  example: figma.code`<CaseStudyCarousel />`,
  imports: ['import { CaseStudyCarousel } from "@/components"'],
  id: "case-study-carousel",
  metadata: { nestable: true },
};
