<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Design system

Before changing UI, colours, spacing, or Figma parity:

1. Read `design-system/README.md` — entry point for tokens + Figma handoff
2. Use `design-system/tokens/tokens.json` and `css/tokens.css` — do not hardcode hex values
3. Map Figma components via `design-system/figma/component-map.json`
4. Figma file key: `VibdutrclLgS5EpFWgbJhH` (Portfolio | AI Handoff)
5. Regenerate CSS after token changes: `npm run tokens:generate`
