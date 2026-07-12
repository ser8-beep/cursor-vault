# Case study card — local handoff

Figma: [organism-case-study-card](https://www.figma.com/design/VibdutrclLgS5EpFWgbJhH/Portfolio-%7C-AI-Handoff?node-id=99-2367) (`99:2367`)

Local-only mapping (Code Connect publish blocked on Pro). Source of truth for agents implementing or updating this component.

## Code

| Layer | Path |
|-------|------|
| Card | `src/components/portfolio/case-study-card.tsx` |
| Carousel | `src/components/portfolio/case-study-carousel.tsx` |
| Data | `src/components/portfolio/constants.ts` → `CASE_STUDIES` |
| Tokens | `design-system/tokens/css/case-study-card.css` |
| Code Connect (local) | `src/figma/CaseStudyCard.figma.ts`, `CaseStudyCarousel.figma.ts` |
| Assets | `public/figma/cs-*.png` + responsive variants via `src/lib/assets.ts` |

## Content (Figma order)

| Title | Tags | Asset key |
|-------|------|-----------|
| INSURANCE | RESPONSIVE · BFSI | `csInsurance` |
| MATERNITY | MOBILE · WELLNESS | `csMaternity` |
| SMART HOME | MOBILE · IOT | `csSmartHome` |
| ERP | SAAS · ADMIN | `csErp` |

## Responsive metrics

| Breakpoint | Card height | Grid |
|------------|-------------|------|
| 360 | 120px | 1 column |
| 768 | 152px | 2 columns |
| 1280 | 180px | 4 columns |
| 1600 | 220px | 4 columns |
| 1920 | 240px | 4 columns |

## States

- **Default** — stone wash (`mix-blend-color-burn`), border `rgba(135,135,135,0.4)`, title zinc-700
- **Hover (laptop+)** — blue-700 border 1.5px, `--card-background-hover`, `--shadow-cs-hover`, wash fades out

## Do not

- Hardcode card heights or tag sizes — use `--height-cs-card`, `--size-cs-title`, `--size-cs-tag`
- Point Figma MCP asset URLs at production — use `FigmaImage` + registry keys
- Treat `project-carousel.tsx` as the card implementation (legacy wrapper only)
