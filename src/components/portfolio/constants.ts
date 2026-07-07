export const ASSETS = {
  statue: "https://www.figma.com/api/mcp/asset/fdbdbce1-6596-4716-a18f-39b65251b50b",
  statueGlobe:
    "https://www.figma.com/api/mcp/asset/1e2002b0-5c69-4177-80ba-ed0d49e8861b",
  workExIcon:
    "https://www.figma.com/api/mcp/asset/0403e7d9-21ba-4347-b750-bd1ae6f84a79",
  workExGif:
    "https://www.figma.com/api/mcp/asset/10bf0354-d310-4456-a60c-7958ba7ad64b",
  workExImage:
    "https://www.figma.com/api/mcp/asset/ca41bbd2-2e22-47de-ab97-ec98081b16f5",
  locationIcon:
    "https://www.figma.com/api/mcp/asset/22ffb4bb-c145-427e-a324-6665637ff587",
  cursor:
    "https://www.figma.com/api/mcp/asset/15440370-0d1f-4079-98d1-ea0123fabae5",
  projectIot:
    "https://www.figma.com/api/mcp/asset/b17dd6e7-c06f-408a-bd63-627ea262cde9",
  projectInsurance:
    "https://www.figma.com/api/mcp/asset/c09366d1-35ac-4393-ad6b-b718e1f9abe7",
  projectMaternity:
    "https://www.figma.com/api/mcp/asset/ffd3f71c-a935-4014-a596-25d69e05e8d6",
  projectErp:
    "https://www.figma.com/api/mcp/asset/a96ee0e8-cd68-45e1-8b65-3b76bb24ae58",
  noteDiscourseTape:
    "https://www.figma.com/api/mcp/asset/bbe4222f-3b06-4230-a9f5-1c58d67add6a",
  noteBotanical:
    "https://www.figma.com/api/mcp/asset/2887ad42-0ae3-4ab2-994e-1b9e177f979b",
  noteTornPaper:
    "https://www.figma.com/api/mcp/asset/e465ada0-de4e-49aa-b457-99d948b44de9",
  notePolaroidBase:
    "https://www.figma.com/api/mcp/asset/c424eea8-33c5-46c8-b7ec-025bdad171af",
  notePolaroidPhoto:
    "https://www.figma.com/api/mcp/asset/8ea13e9d-1a7c-4f25-b625-fe1fe9afc083",
  notePeacePaper:
    "https://www.figma.com/api/mcp/asset/7e0dc161-a587-414f-b0bb-2438332712f1",
  notePaperclip:
    "https://www.figma.com/api/mcp/asset/e465ada0-de4e-49aa-b457-99d948b44de9",
  notePortrait:
    "https://www.figma.com/api/mcp/asset/32669828-5b87-489c-9b14-70afaa011ff2",
  noteLargeTear:
    "https://www.figma.com/api/mcp/asset/2806467f-3ba1-40d9-927d-e849d3b0eacf",
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
    image: ASSETS.projectIot,
  },
  {
    id: "insurance",
    title: "INSURANCE",
    tags: ["TRAVEL", "MOBILE"],
    image: ASSETS.projectInsurance,
  },
  {
    id: "maternity",
    title: "MATERNITY",
    tags: ["WELLNESS", "MOBILE"],
    image: ASSETS.projectMaternity,
  },
  {
    id: "erp",
    title: "ERP",
    tags: ["ADMIN", "WEB APP"],
    image: ASSETS.projectErp,
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
