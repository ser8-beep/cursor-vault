/** @typedef {"standard" | "art-directed"} AssetTier */

/**
 * Assets to process with `npm run assets:generate`.
 * Drop Figma exports into public/figma/_sources/{slug}.{png|jpg|webp} first.
 *
 * @type {Array<{
 *   slug: string;
 *   tier: AssetTier;
 *   input?: string;
 *   artDirection?: { mobile: "north" | "center"; tablet?: "center"; desktop?: "center" };
 * }>}
 */
export const ASSET_CONFIG = [
  { slug: "sculpture", tier: "art-directed", artDirection: { mobile: "north", tablet: "center", desktop: "center" } },
  { slug: "nav-media-poster", tier: "standard" },
  { slug: "work-ex-photo", tier: "standard" },
  { slug: "cs-smart-home", tier: "standard" },
  { slug: "cs-insurance", tier: "standard" },
  { slug: "cs-maternity", tier: "standard" },
  { slug: "cs-erp", tier: "standard" },
  { slug: "notes/botanical", tier: "standard" },
  { slug: "notes/discourse-tape", tier: "standard" },
  { slug: "notes/paperclip", tier: "standard" },
  { slug: "notes/peace-paper", tier: "standard" },
  { slug: "notes/polaroid-base", tier: "standard" },
  { slug: "notes/polaroid-photo", tier: "standard" },
  { slug: "notes/portrait-frame", tier: "standard" },
  { slug: "notes/sculpture-figure", tier: "standard" },
];

export const VARIANT_WIDTHS = [640, 768, 1280, 1440];

export const ART_DIRECTED_BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1280,
};
