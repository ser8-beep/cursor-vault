#!/usr/bin/env node
/**
 * One-time builder: reads .export-collections/*.json and writes figma-export-data.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, '.export-collections');
const COLLECTIONS = ['Primitive', 'Semantic', 'Component', 'Theme', 'Typography', 'Layout', 'Fluid'];

const data = {};
for (const name of COLLECTIONS) {
  const file = join(dir, `${name}.json`);
  const raw = JSON.parse(readFileSync(file, 'utf8'));
  data[name] = { modes: raw.modes, tokens: raw.tokens };
}

const lines = [
  '/**',
  ' * Figma variable collection export data',
  ' * Source: VibdutrclLgS5EpFWgbJhH (Portfolio | AI Handoff)',
  ' * Exported via Figma MCP use_figma with recursive alias resolution',
  ' */',
  '',
];

for (const name of COLLECTIONS) {
  lines.push(`const ${name} = ${JSON.stringify(data[name], null, 2)};`);
  lines.push('');
}

lines.push('export default { Primitive, Semantic, Component, Theme, Typography, Layout, Fluid };');
lines.push('');

writeFileSync(join(__dirname, 'figma-export-data.mjs'), lines.join('\n'), 'utf8');
console.log('Wrote figma-export-data.mjs');
for (const name of COLLECTIONS) {
  console.log(`  ${name}: ${data[name].tokens.length}`);
}
