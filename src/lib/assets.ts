export type AssetTier = "standard" | "art-directed";

export interface StandardAsset {
  tier: "standard";
  /** Primary path — Next Image optimizer uses this as the master. */
  src: string;
  width: number;
  height: number;
  sizes: string;
  /** Generated variant directory, e.g. /figma/cs-smart-home */
  outputDir?: string;
}

export interface ArtDirectedSources {
  mobile: { avif: string; webp: string };
  tablet: { avif: string; webp: string };
  desktop: { avif: string; webp: string };
}

export interface ArtDirectedAsset {
  tier: "art-directed";
  /** Fallback when variants are missing. */
  src: string;
  width: number;
  height: number;
  sizes: string;
  sources: ArtDirectedSources;
  outputDir: string;
}

export type AssetDefinition = StandardAsset | ArtDirectedAsset;

function variantDir(slug: string) {
  return `/figma/${slug}`;
}

function artDirectedSources(slug: string, base: string): ArtDirectedSources {
  const dir = variantDir(slug);
  return {
    mobile: {
      avif: `${dir}/${base}-mobile.avif`,
      webp: `${dir}/${base}-mobile.webp`,
    },
    tablet: {
      avif: `${dir}/${base}-tablet.avif`,
      webp: `${dir}/${base}-tablet.webp`,
    },
    desktop: {
      avif: `${dir}/${base}-desktop.avif`,
      webp: `${dir}/${base}-desktop.webp`,
    },
  };
}

/** Central registry for Figma raster assets. SVGs stay inline in components. */
export const ASSETS = {
  sculpture: {
    tier: "art-directed",
    src: "/figma/sculpture.png",
    width: 832,
    height: 1114,
    sizes: "(min-width: 1280px) 662px, 55vw",
    outputDir: variantDir("sculpture"),
    sources: artDirectedSources("sculpture", "sculpture"),
  },
  navMediaPoster: {
    tier: "standard",
    src: "/figma/nav-media-poster.png",
    width: 205,
    height: 37,
    sizes: "200px",
    outputDir: variantDir("nav-media-poster"),
  },
  workExPhoto: {
    tier: "standard",
    src: "/figma/work-ex-photo.png",
    width: 270,
    height: 672,
    sizes: "135px",
    outputDir: variantDir("work-ex-photo"),
  },
  csSmartHome: {
    tier: "standard",
    src: "/figma/cs-smart-home.png",
    width: 1097,
    height: 976,
    sizes: "(min-width: 768px) 355px, 80vw",
    outputDir: variantDir("cs-smart-home"),
  },
  csSmartHomeHero: {
    tier: "standard",
    src: "/figma/case-study/smart-home-hero.png",
    width: 938,
    height: 960,
    sizes: "100vw",
    outputDir: variantDir("case-study/smart-home-hero"),
  },
  csInsurance: {
    tier: "standard",
    src: "/figma/cs-insurance.png",
    width: 1056,
    height: 1024,
    sizes: "(min-width: 768px) 355px, 80vw",
    outputDir: variantDir("cs-insurance"),
  },
  csMaternity: {
    tier: "standard",
    src: "/figma/cs-maternity.png",
    width: 765,
    height: 1024,
    sizes: "(min-width: 768px) 355px, 80vw",
    outputDir: variantDir("cs-maternity"),
  },
  csErp: {
    tier: "standard",
    src: "/figma/cs-erp.png",
    width: 832,
    height: 1114,
    sizes: "(min-width: 768px) 355px, 80vw",
    outputDir: variantDir("cs-erp"),
  },
  notesBotanical: {
    tier: "standard",
    src: "/figma/notes/botanical.png",
    width: 737,
    height: 558,
    sizes: "(min-width: 1280px) 179px, 17vw",
    outputDir: variantDir("notes/botanical"),
  },
  notesDiscourseTape: {
    tier: "standard",
    src: "/figma/notes/discourse-tape.png",
    width: 1015,
    height: 346,
    sizes: "120px",
    outputDir: variantDir("notes/discourse-tape"),
  },
  notesPaperclip: {
    tier: "standard",
    src: "/figma/notes/paperclip.png",
    width: 240,
    height: 758,
    sizes: "80px",
    outputDir: variantDir("notes/paperclip"),
  },
  notesPeacePaper: {
    tier: "standard",
    src: "/figma/notes/peace-paper.png",
    width: 1414,
    height: 2000,
    sizes: "(min-width: 1280px) 460px, 44vw",
    outputDir: variantDir("notes/peace-paper"),
  },
  notesPolaroidBase: {
    tier: "standard",
    src: "/figma/notes/polaroid-base.png",
    width: 820,
    height: 1024,
    sizes: "(min-width: 1280px) 351px, 34vw",
    outputDir: variantDir("notes/polaroid-base"),
  },
  notesPolaroidPhoto: {
    tier: "standard",
    src: "/figma/notes/polaroid-photo.png",
    width: 1752,
    height: 1752,
    sizes: "(min-width: 1280px) 324px, 31vw",
    outputDir: variantDir("notes/polaroid-photo"),
  },
  notesPortraitFrame: {
    tier: "standard",
    src: "/figma/notes/portrait-frame.png",
    width: 938,
    height: 960,
    sizes: "(min-width: 1280px) 203px, 20vw",
    outputDir: variantDir("notes/portrait-frame"),
  },
  notesSculptureFigure: {
    tier: "standard",
    src: "/figma/notes/sculpture-figure.png",
    width: 628,
    height: 1024,
    sizes: "(min-width: 1280px) 682px, 52vw",
    outputDir: variantDir("notes/sculpture-figure"),
  },
} as const satisfies Record<string, AssetDefinition>;

export type AssetKey = keyof typeof ASSETS;

export function isArtDirectedAsset(asset: AssetDefinition): asset is ArtDirectedAsset {
  return asset.tier === "art-directed";
}

/** Flat manifest for automate/handoff pages — primary src + generated output dirs. */
export const ASSET_PATHS = [
  ...Object.values(ASSETS).map((asset) => asset.src),
  ...Object.values(ASSETS)
    .map((asset) => asset.outputDir)
    .filter((dir): dir is string => Boolean(dir)),
] as const;

export const RESPONSIVE_WIDTHS = [640, 768, 1280, 1440] as const;
