#!/usr/bin/env node
/**
 * Generates CSS + Tailwind exports from Figma token data.
 * Re-run after updating tokens.json (exported from Figma).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const tokens = JSON.parse(readFileSync(join(ROOT, 'tokens.json'), 'utf8'));

mkdirSync(join(ROOT, 'css'), { recursive: true });
mkdirSync(join(ROOT, 'tailwind'), { recursive: true });

function formatCSSValue(type, value, tokenName = '') {
  if (value === null || value === undefined) return null;
  if (type === 'COLOR') return value;
  if (type === 'FLOAT') {
    if (typeof value === 'number') {
      if (tokenName.startsWith('line-height/')) return `${value}%`;
      if (tokenName.startsWith('tracking/')) return value === 0 ? '0' : `${value}px`;
      return `${value}px`;
    }
  }
  if (type === 'STRING') return `"${value}"`;
  return String(value);
}

function cssBlock(selector, collection, mode) {
  const lines = [];
  for (const token of collection.tokens) {
    const modeData = token.modes[mode];
    if (!modeData) continue;
    const val = modeData.value ?? modeData;
    const formatted = formatCSSValue(token.type, val, token.name);
    if (formatted === null) continue;
    lines.push(`  ${token.cssVar}: ${formatted};`);
  }
  return `${selector} {\n${lines.join('\n')}\n}`;
}

function writeCSS(filename, content) {
  writeFileSync(join(ROOT, 'css', filename), content + '\n', 'utf8');
}

function modeValue(token, mode) {
  const data = token.modes[mode];
  if (data === null || data === undefined) return null;
  return data.value ?? data;
}

function fluidClamp(minVar, maxVar, vminVar, vmaxVar) {
  return `clamp(var(${minVar}), calc(var(${minVar}) + (var(${maxVar}) - var(${minVar})) * ((100vw - var(${vminVar})) / (var(${vmaxVar}) - var(${vminVar})))), var(${maxVar}))`;
}

function buildFluidCSS({ prefix, excludePrefix, includeNames = [], viewportMinName, viewportMaxName, mediaMin, mediaMax, label }) {
  const fluid = tokens.Fluid.tokens;
  const vmin = fluid.find((t) => t.name === viewportMinName);
  const vmax = fluid.find((t) => t.name === viewportMaxName);
  const vminVar = vmin?.cssVar ?? '--fluid-viewport-min';
  const vmaxVar = vmax?.cssVar ?? '--fluid-viewport-max';

  const rootLines = [`/* Fluid ${label} — raw min/max tokens */`, ':root {'];
  const clampLines = [];

  const pairs = new Map();
  for (const token of fluid) {
    const isIncluded = includeNames.includes(token.name);
    if (!isIncluded) {
      if (!token.name.startsWith(prefix)) continue;
      if (excludePrefix && token.name.startsWith(excludePrefix)) continue;
    }

    if (token.name.endsWith('/min')) {
      const base = token.name.slice(0, -4);
      pairs.set(base, { ...(pairs.get(base) ?? {}), min: token });
    } else if (token.name.endsWith('/max')) {
      const base = token.name.slice(0, -4);
      pairs.set(base, { ...(pairs.get(base) ?? {}), max: token });
    } else if (isIncluded) {
      const val = modeValue(token, 'Value');
      const formatted = formatCSSValue(token.type, val, token.name);
      if (formatted) rootLines.push(`  ${token.cssVar}: ${formatted};`);
    }
  }

  for (const [base, { min, max }] of [...pairs.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    if (!min || !max) continue;
    if (base.endsWith('/viewport') || base.includes('/breakpoint/')) continue;
    const minVal = modeValue(min, 'Value');
    const maxVal = modeValue(max, 'Value');
    const minFormatted = formatCSSValue(min.type, minVal, min.name);
    const maxFormatted = formatCSSValue(max.type, maxVal, max.name);
    if (!minFormatted || !maxFormatted) continue;

    rootLines.push(`  ${min.cssVar}: ${minFormatted};`);
    rootLines.push(`  ${max.cssVar}: ${maxFormatted};`);

    const outputVar = '--' + base.replace(/^fluid\/mobile\//, '').replace(/^fluid\//, '').replace(/\//g, '-');
    clampLines.push(
      `  ${outputVar}: ${fluidClamp(min.cssVar, max.cssVar, vminVar, vmaxVar)};`
    );
  }

  rootLines.push('}');

  const mediaBlock = [
    `\n/* Fluid ${label} — clamp() overrides (${mediaMin}px–${mediaMax}px) */`,
    `@media (min-width: ${mediaMin}px) and (max-width: ${mediaMax}px) {`,
    '  :root {',
    ...clampLines,
    '  }',
    '}',
  ];

  return [...rootLines, ...mediaBlock].join('\n');
}

// --- Primitive (single mode) ---
writeCSS('primitive.css', `/* Primitive tokens — raw values, do not use directly in UI */\n${cssBlock(':root', tokens.Primitive, 'Default')}`);

// --- Semantic (Light + Dark) ---
writeCSS(
  'semantic.css',
  `/* Semantic tokens — use these in UI */\n${cssBlock(':root', tokens.Semantic, 'Light')}\n\n${cssBlock('[data-theme="dark"], .dark', tokens.Semantic, 'Dark')}`
);

// --- Component (single mode, resolved) ---
writeCSS('component.css', `/* Component tokens */\n${cssBlock(':root', tokens.Component, 'Default')}`);

// --- Theme (Light + Dark) ---
writeCSS(
  'theme.css',
  `/* Theme presentation tokens */\n${cssBlock(':root', tokens.Theme, 'Light')}\n\n${cssBlock('[data-theme="dark"], .dark', tokens.Theme, 'Dark')}`
);

// --- Responsive Typography ---
const typoLines = ['/* Typography — responsive font sizes */', ':root {'];
for (const token of tokens.Typography.tokens) {
  const val = modeValue(token, 'Mobile');
  if (val === null || val === undefined) continue;
  const formatted = formatCSSValue(token.type, val, token.name);
  if (formatted) typoLines.push(`  ${token.cssVar}: ${formatted};`);
}
typoLines.push('}');

const breakpoints = [
  { name: 'Tablet', query: '768px' },
  { name: 'Laptop', query: '1280px' },
  { name: 'Desktop', query: '1440px' },
];
for (const bp of breakpoints) {
  typoLines.push(`\n@media (min-width: ${bp.query}) {`, '  :root {');
  for (const token of tokens.Typography.tokens) {
    const val = modeValue(token, bp.name);
    if (val === null || val === undefined) continue;
    const formatted = formatCSSValue(token.type, val, token.name);
    if (formatted) typoLines.push(`    ${token.cssVar}: ${formatted};`);
  }
  typoLines.push('  }', '}');
}
writeCSS('typography.css', typoLines.join('\n'));

// --- Responsive Layout ---
const layoutLines = ['/* Layout — responsive grid & spacing */', ':root {'];
for (const token of tokens.Layout.tokens) {
  const val = modeValue(token, 'Mobile');
  if (val === null || val === undefined) continue;
  const formatted = formatCSSValue(token.type, val, token.name);
  if (formatted) layoutLines.push(`  ${token.cssVar}: ${formatted};`);
}
layoutLines.push('}');
for (const bp of breakpoints) {
  layoutLines.push(`\n@media (min-width: ${bp.query}) {`, '  :root {');
  for (const token of tokens.Layout.tokens) {
    const val = modeValue(token, bp.name);
    if (val === null || val === undefined) continue;
    const formatted = formatCSSValue(token.type, val, token.name);
    if (formatted) layoutLines.push(`    ${token.cssVar}: ${formatted};`);
  }
  layoutLines.push('  }', '}');
}
writeCSS('layout.css', layoutLines.join('\n'));

// --- Fluid tokens (mobile 360–768, desktop 1366–1920) ---
if (tokens.Fluid) {
  const mobileMin = modeValue(tokens.Fluid.tokens.find((t) => t.name === 'fluid/breakpoint/mobile'), 'Value') ?? 360;
  const mobileMax = modeValue(tokens.Fluid.tokens.find((t) => t.name === 'fluid/breakpoint/tablet'), 'Value') ?? 768;
  const desktopMin = modeValue(tokens.Fluid.tokens.find((t) => t.name === 'fluid/breakpoint/laptop-lg'), 'Value') ?? 1366;
  const desktopMax = modeValue(tokens.Fluid.tokens.find((t) => t.name === 'fluid/breakpoint/desktop-xl'), 'Value') ?? 1920;

  writeCSS(
    'fluid-mobile.css',
    buildFluidCSS({
      prefix: 'fluid/mobile/',
      includeNames: [
        'fluid/viewport/mobile-min',
        'fluid/viewport/tablet-max',
        'fluid/breakpoint/mobile',
        'fluid/breakpoint/tablet',
      ],
      viewportMinName: 'fluid/viewport/mobile-min',
      viewportMaxName: 'fluid/viewport/tablet-max',
      mediaMin: mobileMin,
      mediaMax: mobileMax,
      label: 'mobile (360–768)',
    })
  );

  writeCSS(
    'fluid-desktop.css',
    buildFluidCSS({
      prefix: 'fluid/',
      excludePrefix: 'fluid/mobile/',
      includeNames: [
        'fluid/viewport/min',
        'fluid/viewport/max',
        'fluid/breakpoint/laptop-lg',
        'fluid/breakpoint/desktop-lg',
        'fluid/breakpoint/desktop-xl',
      ],
      viewportMinName: 'fluid/viewport/min',
      viewportMaxName: 'fluid/viewport/max',
      mediaMin: desktopMin,
      mediaMax: desktopMax,
      label: 'desktop (1366–1920)',
    })
  );
}

// --- Master import ---
writeCSS(
  'tokens.css',
  `/**
 * Portfolio Design Tokens
 * Source: Figma file VibdutrclLgS5EpFWgbJhH
 * Generated: ${tokens.meta.exportedAt}
 *
 * Usage:
 *   @import './design-tokens/css/tokens.css';
 *
 * Dark mode: add data-theme="dark" or class="dark" on <html>
 */
@import './primitive.css';
@import './semantic.css';
@import './component.css';
@import './theme.css';
@import './typography.css';
@import './layout.css';
@import './fluid-mobile.css';
@import './fluid-desktop.css';
`
);

// --- Tailwind theme extension ---
function buildTailwindColors(collection, mode) {
  const colors = {};
  for (const token of collection.tokens) {
    if (token.type !== 'COLOR') continue;
    const val = token.modes[mode]?.value ?? token.modes[mode];
    if (!val) continue;
    // Map --color-neutral-500 → neutral.500, --button-primary-background → button.primary.background
    const key = token.cssVar.replace(/^--/, '').replace(/-/g, '.');
    colors[key] = `var(${token.cssVar})`;
  }
  return colors;
}

function buildTailwindSpacing(collection) {
  const spacing = {};
  for (const token of collection.tokens) {
    if (token.type !== 'FLOAT' || !token.name.startsWith('space/')) continue;
    const val = token.modes.Default?.value ?? token.modes.Default;
    if (val === null || val === undefined) continue;
    const key = token.name.replace('space/', '');
    spacing[key] = `var(${token.cssVar})`;
  }
  return spacing;
}

function buildTailwindRadius(collection) {
  const radius = {};
  for (const token of collection.tokens) {
    if (token.type !== 'FLOAT' || !token.name.startsWith('radius/')) continue;
    const val = token.modes.Default?.value ?? token.modes.Default;
    if (val === null || val === undefined) continue;
    const key = token.name.replace('radius/', '');
    radius[key] = `var(${token.cssVar})`;
  }
  return radius;
}

const tailwindTheme = `/**
 * Tailwind CSS theme extension
 * Usage (tailwind.config.ts):
 *   import { portfolioTheme } from './design-tokens/tailwind/theme';
 *   export default { theme: { extend: portfolioTheme } };
 *
 * Or Tailwind v4 (@theme in CSS):
 *   @import '../design-tokens/css/tokens.css';
 */
export const portfolioTheme = {
  colors: {
    ...${JSON.stringify(buildTailwindColors(tokens.Semantic, 'Light'), null, 4).replace(/"var\((--[^)]+)\)"/g, "'var($1)'")},
    ...${JSON.stringify(buildTailwindColors(tokens.Component, 'Default'), null, 4).replace(/"var\((--[^)]+)\)"/g, "'var($1)'")},
    background: 'var(--color-background-default)',
    foreground: 'var(--color-text-primary)',
    primary: {
      DEFAULT: 'var(--color-action-primary)',
      foreground: 'var(--color-text-on-primary)',
    },
    secondary: {
      DEFAULT: 'var(--color-action-secondary)',
      foreground: 'var(--color-text-primary)',
    },
    muted: {
      DEFAULT: 'var(--color-background-muted)',
      foreground: 'var(--color-text-secondary)',
    },
    accent: {
      DEFAULT: 'var(--color-background-emphasis)',
      foreground: 'var(--color-text-inverse)',
    },
    destructive: {
      DEFAULT: 'var(--color-status-error-text)',
      foreground: 'var(--color-status-error-bg)',
    },
    border: 'var(--color-border-default)',
    input: 'var(--input-border)',
    ring: 'var(--theme-interactive-focus-ring)',
    card: {
      DEFAULT: 'var(--card-background)',
      foreground: 'var(--color-text-primary)',
    },
    popover: {
      DEFAULT: 'var(--tooltip-background)',
      foreground: 'var(--tooltip-text)',
    },
  },
  spacing: ${JSON.stringify(buildTailwindSpacing(tokens.Primitive), null, 4).replace(/"var\((--[^)]+)\)"/g, "'var($1)'")},
  borderRadius: ${JSON.stringify(buildTailwindRadius(tokens.Primitive), null, 4).replace(/"var\((--[^)]+)\)"/g, "'var($1)'")},
  fontSize: {
${tokens.Typography.tokens.filter(t => t.name.startsWith('font/size/')).map(t => {
  const key = t.name.replace('font/size/', '');
  return `    '${key}': ['var(${t.cssVar})', { lineHeight: 'var(--line-height-normal)' }],`;
}).join('\n')}
  },
} as const;

export type PortfolioTheme = typeof portfolioTheme;
`;

writeFileSync(join(ROOT, 'tailwind', 'theme.ts'), tailwindTheme, 'utf8');

console.log('Generated:');
console.log('  css/primitive.css, semantic.css, component.css, theme.css');
console.log('  css/typography.css, layout.css, fluid-mobile.css, fluid-desktop.css, tokens.css');
console.log('  tailwind/theme.ts');
