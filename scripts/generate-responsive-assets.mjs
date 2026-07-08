#!/usr/bin/env node
/**
 * Generate responsive AVIF/WebP variants from Figma source exports.
 *
 * Usage:
 *   node scripts/generate-responsive-assets.mjs --slug sculpture
 *   node scripts/generate-responsive-assets.mjs --input public/figma/_sources/sculpture.png --slug sculpture --art-directed
 *   npm run assets:generate
 *   npm run assets:generate -- --slug cs-smart-home
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import {
  ART_DIRECTED_BREAKPOINTS,
  ASSET_CONFIG,
  VARIANT_WIDTHS,
} from "./assets.config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC_FIGMA = path.join(ROOT, "public", "figma");
const SOURCES = path.join(PUBLIC_FIGMA, "_sources");

const FORMATS = [
  { ext: "avif", options: { quality: 50 } },
  { ext: "webp", options: { quality: 80 } },
];

function parseArgs(argv) {
  const args = { all: false, slug: null, input: null, artDirected: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--all") args.all = true;
    else if (arg === "--art-directed") args.artDirected = true;
    else if (arg === "--slug") args.slug = argv[++i];
    else if (arg === "--input") args.input = argv[++i];
  }
  return args;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveInput(slug, explicitInput) {
  if (explicitInput) return path.join(ROOT, explicitInput);

  const base = slug.includes("/") ? slug : slug;
  const sourceDir = path.join(SOURCES, path.dirname(base));
  const fileBase = path.basename(base);

  for (const ext of [".png", ".jpg", ".jpeg", ".webp"]) {
    const candidate = path.join(sourceDir, `${fileBase}${ext}`);
    if (await fileExists(candidate)) return candidate;
  }

  for (const ext of [".png", ".jpg", ".jpeg", ".webp"]) {
    const candidate = path.join(PUBLIC_FIGMA, `${fileBase}${ext}`);
    if (await fileExists(candidate)) return candidate;
  }

  const nested = path.join(PUBLIC_FIGMA, base);
  for (const ext of [".png", ".jpg", ".jpeg", ".webp"]) {
    const candidate = `${nested}${ext}`;
    if (await fileExists(candidate)) return candidate;
  }

  throw new Error(`No source image found for slug "${slug}". Add public/figma/_sources/${fileBase}.png or pass --input.`);
}

function gravityFor(position = "center") {
  if (position === "north") return "north";
  return "center";
}

async function writeVariant(pipeline, outPath, format) {
  await pipeline.clone()[format.ext](format.options).toFile(outPath);
}

async function generateStandardVariants(inputPath, outDir, slugBase) {
  const image = sharp(inputPath);
  const meta = await image.metadata();
  const results = [];

  for (const width of VARIANT_WIDTHS) {
    if (meta.width && meta.width < width * 0.5) continue;

    const resized = image.clone().resize({
      width,
      withoutEnlargement: true,
      fit: "inside",
    });

    for (const format of FORMATS) {
      const filename = `${slugBase}-${width}w.${format.ext}`;
      const outPath = path.join(outDir, filename);
      await writeVariant(resized, outPath, format);
      results.push(outPath);
    }
  }

  return results;
}

async function generateArtDirectedVariants(inputPath, outDir, slugBase, artDirection = {}) {
  const image = sharp(inputPath);
  const meta = await image.metadata();
  const results = [];

  const targets = [
    ["mobile", ART_DIRECTED_BREAKPOINTS.mobile, artDirection.mobile ?? "north"],
    ["tablet", ART_DIRECTED_BREAKPOINTS.tablet, artDirection.tablet ?? "center"],
    ["desktop", ART_DIRECTED_BREAKPOINTS.desktop, artDirection.desktop ?? "center"],
  ];

  for (const [breakpoint, width, position] of targets) {
    if (meta.width && meta.width < width * 0.25) continue;

    const aspect = (meta.height ?? width) / (meta.width ?? width);
    const targetHeight = Math.round(width * aspect);

    const cropped = image.clone().resize({
      width,
      height: targetHeight,
      fit: "cover",
      position: gravityFor(position),
      withoutEnlargement: false,
    });

    for (const format of FORMATS) {
      const filename = `${slugBase}-${breakpoint}.${format.ext}`;
      const outPath = path.join(outDir, filename);
      await writeVariant(cropped, outPath, format);
      results.push(outPath);
    }
  }

  return results;
}

async function generateAsset(config, options = {}) {
  const { slug, tier, artDirection } = config;
  const slugBase = path.basename(slug);
  const inputPath = await resolveInput(slug, options.input);
  const outDir = path.join(PUBLIC_FIGMA, slug);
  const useArtDirected = options.artDirected || tier === "art-directed";

  await fs.mkdir(outDir, { recursive: true });
  await fs.mkdir(SOURCES, { recursive: true });

  console.log(`\n→ ${slug}`);
  console.log(`  source: ${path.relative(ROOT, inputPath)}`);
  console.log(`  output: ${path.relative(ROOT, outDir)}/`);

  const written = useArtDirected
    ? await generateArtDirectedVariants(inputPath, outDir, slugBase, artDirection)
    : await generateStandardVariants(inputPath, outDir, slugBase);

  for (const file of written) {
    const { size } = await fs.stat(file);
    console.log(`  ✓ ${path.basename(file)} (${(size / 1024).toFixed(1)} KB)`);
  }

  return written.length;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  let configs = ASSET_CONFIG;
  if (args.slug) {
    configs = ASSET_CONFIG.filter((c) => c.slug === args.slug);
    if (configs.length === 0) {
      configs = [{ slug: args.slug, tier: args.artDirected ? "art-directed" : "standard" }];
    }
  } else if (!args.all && !args.input) {
    console.log("Generating all configured assets…");
  }

  let total = 0;
  for (const config of configs) {
    total += await generateAsset(config, {
      input: args.slug === config.slug ? args.input : undefined,
      artDirected: args.artDirected,
    });
  }

  console.log(`\nDone. Wrote ${total} variant file(s).`);
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
