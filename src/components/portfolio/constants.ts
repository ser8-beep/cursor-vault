import type { AssetKey } from "@/lib/assets";

/** Semantic names used in portfolio components → responsive asset registry keys. */
export const ASSETS = {
  statue: "sculpture",
  statueGlobe: "notesSculptureFigure",
  workExGif: "navMediaPoster",
  workExImage: "workExPhoto",
  noteDiscourseTape: "notesDiscourseTape",
  noteBotanical: "notesBotanical",
  notePolaroidBase: "notesPolaroidBase",
  notePolaroidPhoto: "notesPolaroidPhoto",
  notePeacePaper: "notesPeacePaper",
  notePaperclip: "notesPaperclip",
  notePortrait: "notesPortraitFrame",
  noteLargeTear: "notesSculptureFigure",
  noteTornPaper: "notesPaperclip",
  projectIot: "csSmartHome",
  projectInsurance: "csInsurance",
  projectMaternity: "csMaternity",
  projectErp: "csErp",
} as const satisfies Record<string, AssetKey>;

/** SVG icons — not part of the raster generation pipeline. */
export const SVG_ASSETS = {
  workExIcon: "/figma/work-ex-icon.svg",
  locationIcon: "/figma/location-icon.svg",
} as const;

export const CYCLING_PHRASES = [
  "AI NATIVE",
  "LEAN UX & UI",
  "TEAM-AWARE PROCESSES",
  "MAINTAINABLE SYSTEMS",
] as const;

export const NAV_ITEMS = [
  { label: "CASE STUDIES_PRO", suffix: "04", href: "#work" },
  { label: "DATA Stories_OOO", suffix: "03", href: "#experiments" },
  { label: "work_experience", suffix: "04 yrs", href: "#experience" },
] as const;

export const PROJECTS = [
  {
    id: "smart-home",
    title: "SMART HOME",
    tags: ["IOT", "MOBILE"],
    asset: ASSETS.projectIot,
  },
  {
    id: "insurance",
    title: "INSURANCE",
    tags: ["TRAVEL", "MOBILE"],
    asset: ASSETS.projectInsurance,
  },
  {
    id: "maternity",
    title: "MATERNITY",
    tags: ["WELLNESS", "MOBILE"],
    asset: ASSETS.projectMaternity,
  },
  {
    id: "erp",
    title: "ERP",
    tags: ["ADMIN", "WEB APP"],
    asset: ASSETS.projectErp,
  },
] as const;

export const CONTACT = {
  phone: "+91 7977071976",
  email: "shivanimkher@gmail.com",
  linkedin: "linkedin @shivani kher",
  location: "LOC: MUMBAI, IN",
  timezone: "UTC+5:30",
} as const;

export const CAROUSEL_LABEL = {
  line1: "PRODUCT_DESIGN //  01_SYSTEMS_FOR_USERS",
  line2: "                               02_SYSTEMS FOR_TEAMS",
} as const;
