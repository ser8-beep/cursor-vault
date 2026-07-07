# Design System — cursor-vault

Single entry point for Figma source + code tokens. **Start here** when working on design, tokens, or component parity.

## Structure

```
design-system/
├── README.md                 ← you are here
├── figma/
│   ├── file.json             Figma file metadata + collections
│   ├── pages.json            Page architecture (00–13)
│   ├── component-map.json    Figma component → React file mapping
│   └── handoff.md            Agent workflow (export, bind, implement)
└── tokens/
    ├── tokens.json           Source of truth for code (176 tokens)
    ├── css/tokens.css        Import into globals.css
    ├── tailwind/theme.ts     Tailwind theme extension
    └── scripts/generate.mjs  Regenerate CSS after token changes
```

## Figma source

| | |
|---|---|
| **File** | Portfolio \| AI Handoff |
| **Key** | `VibdutrclLgS5EpFWgbJhH` |
| **URL** | https://www.figma.com/design/VibdutrclLgS5EpFWgbJhH |
| **Access** | View-only on web (no team library publish on Pro) |

Token hierarchy in Figma: **Primitive → Semantic → Component → Theme**

## Use in this repo

### CSS (Next.js / Tailwind v4)

```css
/* src/app/globals.css */
@import "../../design-system/tokens/css/tokens.css";
```

### Regenerate tokens after Figma changes

```bash
npm run tokens:generate
```

Requires `tokens.json` to be updated first (via Figma MCP export).

## Rules for AI agents

1. **Figma is visual source of truth** — `03 Tokens` page for names/values
2. **Code consumes `design-system/tokens/`** — not hardcoded hex in components
3. **Use Semantic or Component tokens in UI** — never Primitive directly
4. **Match Figma components via `figma/component-map.json`** before creating new ones
5. **Portfolio components live in** `src/components/portfolio/`

## Status (last export: 2026-07-07)

| Area | Figma | Code |
|------|-------|------|
| Token collections (4-tier) | ✅ | ✅ exported |
| 03 Tokens documentation | ✅ | ✅ tokens.json |
| 02 Foundations swatches | ✅ | ✅ css/ |
| 05 Components token binding | ✅ partial | ⏳ wire globals.css |
| Code Connect | ⏳ needs Org plan | — |
