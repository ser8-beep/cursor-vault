// url=https://www.figma.com/design/VibdutrclLgS5EpFWgbJhH/Portfolio-%7C-AI-Handoff?node-id=104-19033
// source=src/components/SiteHeader.tsx
// component=SiteHeader
// responsive=header-360: 13px regular brand, 8px work-ex, 82px montage, 44px/32px row heights
import figma from "figma";

export default {
  example: figma.code`<SiteHeader motionEnabled={false} entranceActive brandOnly={false} reducedMotion={false} />`,
  imports: ['import { SiteHeader } from "@/components"'],
  id: "site-header",
  metadata: { nestable: true },
};
