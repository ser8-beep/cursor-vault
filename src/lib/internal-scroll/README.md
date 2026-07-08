# Internal scroll

Inertial scroll handoff for the first-fold → second-fold transition.

When the user reaches the end of the hero (`100svh` first fold), a **single trackpad flick** triggers an eased animation (`0 → 1`) that scrubs the motion video and feeds scroll-linked choreography — not 1:1 finger tracking.

## API

```ts
import {
  useInternalScroll,
  useChoreographyProgress,
  INTERNAL_SCROLL_VIDEO_SRC,
} from "@/lib/internal-scroll";
```

### `useInternalScroll(options)`

| Option | Description |
|--------|-------------|
| `handoffRef` | Ref on the first-fold container (handoff when its bottom reaches the viewport top) |
| `enabled` | Master switch (`false` when `prefers-reduced-motion`) |
| `choreographyEnd` | Document scroll progress at internal `1` (default `0.36`) |
| `onForwardComplete` | Called after forward inertial animation + unlock |
| `onBackwardComplete` | Called after backward inertial animation + unlock |

Returns `{ progress, choreographyProgress, isActive, phase, enter, exit }`.

### `useChoreographyProgress({ documentProgress, internalScroll })`

Merges `useScroll` output with internal progress into one `MotionValue` for hero, sculpture, and notes choreography.

## Behaviour

1. **Idle** — normal page scroll; video hidden.
2. **Handoff** — first-fold bottom at viewport top; one wheel flick locks page and runs inertial animation (~750–1100ms ease-out).
3. **Active** — `FirstFoldMotionVideo` scrubs with animated progress.
4. **Exit forward** — unlock scroll; snap to case studies (`onForwardComplete`).
5. **Exit backward** — scroll up near handoff; one flick animates `1 → 0`; unlock and return to hero top.

## Files

| File | Role |
|------|------|
| `useInternalScroll.ts` | Handoff detection, lock/unlock, inertial wheel + touch |
| `inertialProgress.ts` | Eased progress animation (not 1:1 trackpad) |
| `useChoreographyProgress.ts` | Merged choreography stream |
| `scrollLock.ts` | Body `position: fixed` pin (no layout jump) |
| `scrubVideo.ts` | RAF-batched video scrubbing |
| `mapProgress.ts` | Internal ↔ choreography mapping |

## Integration

Wired in `HomeScrollExperience.tsx`:

- First fold: `h-[100svh]` with `ref={firstFoldRef}`
- Scroll track is content-sized (case studies → data stories → footer)
- `FirstFoldMotionVideo` — visible while `isActive` or `0 < progress < 1`

Motion asset: `public/motion/internal-scroll.mov`.
