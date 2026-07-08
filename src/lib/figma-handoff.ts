import { ASSET_PATHS } from "./assets";

export const FIGMA_FILE = {
  key: "IQl6MQ8tghphWHPfZpwiNE",
  name: "Shivani UI/UX Portfolio",
  url: "https://www.figma.com/design/IQl6MQ8tghphWHPfZpwiNE/Shivani-UI-UX-Portfolio",
  desktopPageNodeId: "2034:15701",
} as const;

export type HandoffStatus = "implemented" | "stub" | "pending";

export interface ComponentHandoff {
  figmaName: string;
  figmaNodeId: string;
  codePath: string;
  codeConnectPath?: string;
  status: HandoffStatus;
  localhostPath?: string;
}

export const COMPONENT_HANDOFFS: ComponentHandoff[] = [
  {
    figmaName: "header-1440",
    figmaNodeId: "13:450",
    codePath: "src/components/SiteHeader.tsx",
    codeConnectPath: "src/figma/SiteHeader.figma.ts",
    status: "implemented",
    localhostPath: "/",
  },
  {
    figmaName: "splash-organism",
    figmaNodeId: "13:509",
    codePath: "src/components/Hero.tsx",
    codeConnectPath: "src/figma/Hero.figma.ts",
    status: "implemented",
    localhostPath: "/",
  },
  {
    figmaName: "psuedo-footer-1440",
    figmaNodeId: "13:367",
    codePath: "src/components/ContactBar.tsx",
    codeConnectPath: "src/figma/ContactBar.figma.ts",
    status: "implemented",
    localhostPath: "/",
  },
  {
    figmaName: "carousel-1440",
    figmaNodeId: "13:360",
    codePath: "src/components/CaseStudyCarousel.tsx",
    codeConnectPath: "src/figma/CaseStudyCarousel.figma.ts",
    status: "implemented",
    localhostPath: "/#case-studies",
  },
  {
    figmaName: "cs-card-1440-v2",
    figmaNodeId: "13:420",
    codePath: "src/components/CaseStudyCard.tsx",
    codeConnectPath: "src/figma/CaseStudyCard.figma.ts",
    status: "implemented",
    localhostPath: "/#case-studies",
  },
  {
    figmaName: "notes (data stories)",
    figmaNodeId: "2034:15700",
    codePath: "src/components/DataStoriesSection.tsx",
    status: "implemented",
    localhostPath: "/#data-stories",
  },
  {
    figmaName: "ghost-cursor",
    figmaNodeId: "13:355",
    codePath: "src/components/GhostCursor.tsx",
    status: "implemented",
    localhostPath: "/",
  },
  {
    figmaName: "smart-home",
    figmaNodeId: "13:16849",
    codePath: "src/app/case-studies/[slug]/page.tsx",
    status: "stub",
    localhostPath: "/case-studies/smart-home",
  },
];

export const TOKEN_SOURCE = "src/styles/tokens.css";

/** SVG icons are referenced directly in components, not in the responsive pipeline. */
export const SVG_ASSETS = [
  "/figma/work-ex-icon.svg",
  "/figma/location-icon.svg",
] as const;

export const ASSET_MANIFEST = [...ASSET_PATHS, ...SVG_ASSETS] as const;
