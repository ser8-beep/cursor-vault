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

function formatCSSValue(type, value) {
  if (value === null || value === undefined) return null;
  if (type === 'COLOR') return value;
  if (type === 'FLOAT') {
    if (typeof value === 'number') {
      // line-height/tracking stored as percentages in Figma
      if (value > 10 && value <= 200) return `${value}%`;
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
    const formatted = formatCSSValue(token.type, val);
    if (formatted === null) continue;
    lines.push(`  ${token.cssVar}: ${formatted};`);
  }
  return `${selector} {\n${lines.join('\n')}\n}`;
}

function writeCSS(filename, content) {
  writeFileSync(join(ROOT, 'css', filename), content + '\n', 'utf8');
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
  const mobile = token.modes.Mobile;
  if (mobile === null || mobile === undefined) continue;
  const formatted = formatCSSValue(token.type, mobile);
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
    const val = token.modes[bp.name];
    if (val === null || val === undefined) continue;
    const formatted = formatCSSValue(token.type, val);
    if (formatted) typoLines.push(`    ${token.cssVar}: ${formatted};`);
  }
  typoLines.push('  }', '}');
}
writeCSS('typography.css', typoLines.join('\n'));

// --- Responsive Layout ---
const layoutLines = ['/* Layout — responsive grid & spacing */', ':root {'];
for (const token of tokens.Layout.tokens) {
  const mobile = token.modes.Mobile;
  if (mobile === null || mobile === undefined) continue;
  const formatted = formatCSSValue(token.type, mobile);
  if (formatted) layoutLines.push(`  ${token.cssVar}: ${formatted};`);
}
layoutLines.push('}');
for (const bp of breakpoints) {
  layoutLines.push(`\n@media (min-width: ${bp.query}) {`, '  :root {');
  for (const token of tokens.Layout.tokens) {
    const val = token.modes[bp.name];
    if (val === null || val === undefined) continue;
    const formatted = formatCSSValue(token.type, val);
    if (formatted) layoutLines.push(`    ${token.cssVar}: ${formatted};`);
  }
  layoutLines.push('  }', '}');
}
writeCSS('layout.css', layoutLines.join('\n'));

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
console.log('  css/typography.css, layout.css, tokens.css');
console.log('  tailwind/theme.ts');
