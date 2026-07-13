import { ASSET_PATHS } from "./assets";

/** Primary AI Handoff file — mobile/tablet leaf frames + desktop references. */
export const FIGMA_FILE = {
  key: "VibdutrclLgS5EpFWgbJhH",
  name: "Portfolio | AI Handoff",
  url: "https://www.figma.com/design/VibdutrclLgS5EpFWgbJhH/Portfolio-%7C-AI-Handoff",
  /** Parent board for responsive home templates (not a leaf component). */
  mobileTabletBoardNodeId: "104:19033",
} as const;

/** Legacy desktop portfolio file — retained for historical desktop node refs. */
export const FIGMA_FILE_DESKTOP_LEGACY = {
  key: "IQl6MQ8tghphWHPfZpwiNE",
  name: "Shivani UI/UX Portfolio",
  url: "https://www.figma.com/design/IQl6MQ8tghphWHPfZpwiNE/Shivani-UI-UX-Portfolio",
  desktopPageNodeId: "2034:15701",
} as const;

export type HandoffStatus = "implemented" | "stub" | "pending";

export type HandoffMode = "mobile" | "tablet" | "desktop";

export interface ComponentHandoff {
  figmaName: string;
  figmaNodeId: string;
  codePath: string;
  codeConnectPath?: string;
  status: HandoffStatus;
  localhostPath?: string;
  /** Viewport mode this leaf frame documents. */
  mode?: HandoffMode;
}

export const COMPONENT_HANDOFFS: ComponentHandoff[] = [
  /* —— Mobile / tablet leaf frames (AI Handoff) —— */
  {
    figmaName: "home-template-splash (hero 360)",
    figmaNodeId: "104:18253",
    codePath: "src/components/Hero.tsx",
    codeConnectPath: "src/figma/Hero.figma.ts",
    status: "implemented",
    localhostPath: "/",
    mode: "mobile",
  },
  {
    figmaName: "text-animation-molecule",
    figmaNodeId: "104:18257",
    codePath: "src/components/SplashTypewriter.tsx",
    status: "implemented",
    localhostPath: "/",
    mode: "mobile",
  },
  {
    figmaName: "home-template-splash (footer-enter hero)",
    figmaNodeId: "104:18518",
    codePath: "src/components/Hero.tsx",
    codeConnectPath: "src/figma/Hero.figma.ts",
    status: "implemented",
    localhostPath: "/",
    mode: "mobile",
  },
  {
    figmaName: "header-360 / home-template header-enter",
    figmaNodeId: "104:18273",
    codePath: "src/components/SiteHeader.tsx",
    codeConnectPath: "src/figma/SiteHeader.figma.ts",
    status: "implemented",
    localhostPath: "/",
    mode: "mobile",
  },
  {
    figmaName: "psuedo-footer-360",
    figmaNodeId: "104:18494",
    codePath: "src/components/ContactBar.tsx",
    codeConnectPath: "src/figma/ContactBar.figma.ts",
    status: "implemented",
    localhostPath: "/",
    mode: "mobile",
  },
  {
    figmaName: "home-template case studies list",
    figmaNodeId: "104:18648",
    codePath: "src/components/CaseStudyCarousel.tsx",
    codeConnectPath: "src/figma/CaseStudyCarousel.figma.ts",
    status: "implemented",
    localhostPath: "/#case-studies",
    mode: "mobile",
  },
  {
    figmaName: "case-study-card-360",
    figmaNodeId: "99:2367",
    codePath: "src/components/CaseStudyCard.tsx",
    codeConnectPath: "src/figma/CaseStudyCard.figma.ts",
    status: "implemented",
    localhostPath: "/#case-studies",
    mode: "mobile",
  },

  /* —— Desktop / laptop references (same AI Handoff file + legacy IDs) —— */
  {
    figmaName: "header-1440",
    figmaNodeId: "13:450",
    codePath: "src/components/SiteHeader.tsx",
    codeConnectPath: "src/figma/SiteHeader.figma.ts",
    status: "implemented",
    localhostPath: "/",
    mode: "desktop",
  },
  {
    figmaName: "splash-organism",
    figmaNodeId: "13:509",
    codePath: "src/components/Hero.tsx",
    codeConnectPath: "src/figma/Hero.figma.ts",
    status: "implemented",
    localhostPath: "/",
    mode: "desktop",
  },
  {
    figmaName: "psuedo-footer-1440",
    figmaNodeId: "13:367",
    codePath: "src/components/ContactBar.tsx",
    codeConnectPath: "src/figma/ContactBar.figma.ts",
    status: "implemented",
    localhostPath: "/",
    mode: "desktop",
  },
  {
    figmaName: "carousel-1440",
    figmaNodeId: "13:360",
    codePath: "src/components/CaseStudyCarousel.tsx",
    codeConnectPath: "src/figma/CaseStudyCarousel.figma.ts",
    status: "implemented",
    localhostPath: "/#case-studies",
    mode: "desktop",
  },
  {
    figmaName: "cs-card-1440-v2",
    figmaNodeId: "13:420",
    codePath: "src/components/CaseStudyCard.tsx",
    codeConnectPath: "src/figma/CaseStudyCard.figma.ts",
    status: "implemented",
    localhostPath: "/#case-studies",
    mode: "desktop",
  },
  {
    figmaName: "notes (data stories)",
    figmaNodeId: "2034:15700",
    codePath: "src/components/DataStoriesSection.tsx",
    status: "implemented",
    localhostPath: "/#data-stories",
    mode: "desktop",
  },
  {
    figmaName: "about-footer",
    figmaNodeId: "pending",
    codePath: "src/components/SiteFooter.tsx",
    status: "implemented",
    localhostPath: "/#about",
    mode: "desktop",
  },
  {
    figmaName: "smart-home",
    figmaNodeId: "13:16849",
    codePath: "src/app/case-studies/[slug]/page.tsx",
    codeConnectPath: "src/figma/CaseStudyPage.figma.ts",
    status: "implemented",
    localhostPath: "/case-studies/smart-home",
    mode: "desktop",
  },
];

export const TOKEN_SOURCE = "src/styles/tokens.css";

/** SVG icons are referenced directly in components, not in the responsive pipeline. */
export const SVG_ASSETS = [
  "/figma/work-ex-icon.svg",
  "/figma/location-icon.svg",
  "/figma/get-in-touch-icon.svg",
] as const;

export const ASSET_MANIFEST = [...ASSET_PATHS, ...SVG_ASSETS] as const;
