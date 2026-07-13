# Developer Handoff — Agent Workflow

## When implementing UI from Figma

1. Read `design-system/figma/component-map.json` — find the React file first
2. Read `design-system/tokens/tokens.json` — use token names, not hardcoded values
3. Check `design-system/figma/file.json` for collection hierarchy
4. Prefer **Component** tokens → **Semantic** tokens → never **Primitive** in UI code

## Token export pipeline (no team library required)

```
Figma variables (03 Tokens page)
        ↓  Figma MCP export
design-system/tokens/tokens.json
        ↓  npm run tokens:generate
design-system/tokens/css/*.css
design-system/tokens/tailwind/theme.ts
        ↓  import in app
src/app/globals.css
```

## Wiring tokens into Next.js (not yet done)

Add to `src/app/globals.css`:

```css
@import "../../design-system/tokens/css/tokens.css";
```

Then migrate existing `:root` vars in globals.css to use design-system tokens where they overlap:

| Current (globals.css) | Design token |
|-----------------------|--------------|
| `--background` | `--color-background-default` or keep custom |
| `--foreground` | `--footer-text` / `--color-text-primary` |
| `--surface` | `--nav-background-default` / `--footer-background` |
| `--accent` | `--color-brand-700` |

## Figma MCP file key

```
VibdutrclLgS5EpFWgbJhH
```

## Breakpoints (from Layout collection + live `src/styles/tokens.css`)

| Breakpoint | Canvas | Columns | Margin / canvas pad | Gutter |
|------------|--------|---------|---------------------|--------|
| Mobile | 390 typography / 360 art frames | 4 | 8px canvas pad (`--padding-canvas`) | 16px |
| Tablet | 768px | 8 | 32px (`--grid-margin`) | 16px |
| Laptop+ | 1280px+ uses 1440 desktop tokens | 12 | **80px** (`--grid-margin` / `--padding-canvas`) | 24px |
| Desktop | 1440px | 12 | 80px | 24px |

Leaf mobile/tablet frames (AI Handoff): settled hero optical `104:18648` / splash-organism `104:18650` (DESIGNING SYSTEMS); phase splash `104:18253`; header-enter `104:18273`; contact `104:18494`. See `src/lib/figma-handoff.ts`.

**Code Connect:** cloud publish needs Org/Enterprise. Local templates under `src/figma/*.figma.ts` stay the source of truth for agents.

## Known gaps

- Team library publish blocked on Pro plan — use code export instead
- Code Connect requires Org/Enterprise — local templates live under `src/figma/`; map via `design-system/figma/component-map.json`
- Case study card local handoff: `design-system/figma/case-study-card.md` (Figma `99:2367`)
- `nav/background/default` and `footer/background` share same hex (#f4f4f5) — dedup candidate
- Legacy collections (Spacing, Primitives) overlap new Primitive collection
