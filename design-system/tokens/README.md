# Portfolio Design Tokens

Exported from Figma file **Portfolio | AI Handoff** (`VibdutrclLgS5EpFWgbJhH`).

Source of truth lives in Figma (`03 Tokens` page). This folder is the **code implementation layer** — no team library publishing required.

## Hierarchy

```
Primitive  →  Semantic  →  Component  →  Theme
(raw values)   (meaning)    (UI parts)    (presentation)
```

| Tier | Tokens | Modes |
|------|--------|-------|
| Primitive | 71 | Default |
| Semantic | 34 | Light, Dark |
| Component | 25 | Default |
| Theme | 6 | Light, Dark |
| Typography (legacy) | 24 | Mobile → Desktop |
| Layout (legacy) | 16 | Mobile → Desktop |

## Quick start

### CSS (any framework)

```css
@import '../../design-system/tokens/css/tokens.css';
```

Then use variables directly:

```css
.card {
  background: var(--card-background-default);
  border-radius: var(--radius-card);
  color: var(--color-text-primary);
}
```

### Dark mode

Add `data-theme="dark"` or `class="dark"` on `<html>`:

```html
<html data-theme="dark">
```

### Tailwind CSS

```ts
// tailwind.config.ts (or reference from design-system)
import { portfolioTheme } from './design-system/tokens/tailwind/theme';

export default {
  theme: { extend: portfolioTheme },
};
```

Then:

```html
<div class="bg-background text-foreground p-4 rounded-md">
  <button class="bg-primary text-primary-foreground">Submit</button>
</div>
```

### React / Next.js

```tsx
// src/app/globals.css
@import '../../design-system/tokens/css/tokens.css';
```

## File structure

```
cursor-vault/design-system/tokens/
├── tokens.json          # Full export (source for regeneration)
├── css/
│   ├── tokens.css       # Master import — use this
│   ├── primitive.css    # Raw palette (reference only)
│   ├── semantic.css     # Light + Dark semantic tokens
│   ├── component.css    # Button, card, nav, footer tokens
│   ├── theme.css        # Brand/surface presentation
│   ├── typography.css   # Responsive font sizes
│   └── layout.css       # Responsive grid/spacing
├── tailwind/
│   └── theme.ts         # Tailwind theme extension
└── scripts/
    └── generate.mjs     # Regenerate CSS/Tailwind from tokens.json

Figma metadata: ../figma/file.json
```

## Regenerating after Figma changes

1. Update variables in Figma (`03 Tokens` page)
2. Re-export `tokens.json` (via Figma MCP or manual)
3. Run: `npm run tokens:generate` (from repo root)

## Key component tokens (from real portfolio components)

These were extracted from actual component colors on `05 Components`:

| Token | Value | Used by |
|-------|-------|---------|
| `--card-background-default` | `#f5f5f4` | `cs-card-1440-v2` Default state |
| `--card-background-hover` | `#fafafa` | `cs-card-1440-v2` Hover state |
| `--nav-background-default` | `#f4f4f5` | `header-1440` Default nav |
| `--nav-background-splash` | `#ededed` | `header-1440` Splash nav |
| `--footer-background` | `#f4f4f5` | `psuedo-footer-1440` |
| `--footer-text` | `#09090b` | `psuedo-footer-1440` contact text |

## AI development notes

When implementing UI in Cursor/Claude Code:

- **Always use Semantic or Component tokens**, never Primitive directly
- Reference `tokens.json` for exact hex values and alias chains
- Typography scales are responsive — use CSS vars, they update at breakpoints automatically
- Layout breakpoints: Mobile (390) → Tablet (768) → Laptop (1280) → Desktop (1440)
