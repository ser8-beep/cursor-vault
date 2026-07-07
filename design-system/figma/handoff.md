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

## Breakpoints (from Layout collection, Desktop mode)

| Breakpoint | Canvas | Columns | Margin | Gutter |
|------------|--------|---------|--------|--------|
| Mobile | 390px | 4 | 16px | 16px |
| Tablet | 768px | 8 | 32px | 16px |
| Laptop | 1280px | 12 | 32px | 24px |
| Desktop | 1440px | 12 | 80px | 24px |

## Known gaps

- Team library publish blocked on Pro plan — use code export instead
- Code Connect requires Org/Enterprise
- `nav/background/default` and `footer/background` share same hex (#f4f4f5) — dedup candidate
- Legacy collections (Spacing, Primitives) overlap new Primitive collection
