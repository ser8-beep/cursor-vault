// url=https://www.figma.com/design/VibdutrclLgS5EpFWgbJhH/Portfolio-%7C-AI-Handoff?node-id=104-19033
// source=src/components/ContactBar.tsx
// component=ContactBar
// responsive=mobile: full email+phone, 40px strip, no icon; tablet+: linkedin + let's connect
import figma from "figma";

export default {
  example: figma.code`<ContactBar motionEnabled={true} entranceActive={true} />`,
  imports: ['import { ContactBar } from "@/components"'],
  id: "contact-bar",
  metadata: { nestable: true },
};
