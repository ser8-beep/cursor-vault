# Internal scroll

Scroll handoff controller for the first-fold → second-fold transition.

When the user finishes scrolling through the hero (`100svh` first fold), page scroll locks and wheel/touch input drives a normalized **progress** value (`0 → 1`) instead of moving the document. That progress scrubs the motion video and feeds scroll-linked choreography.

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
| `handoffRef` | Ref on the first-fold container (handoff fires when its bottom reaches the viewport top) |
| `enabled` | Master switch (`false` when `prefers-reduced-motion`) |
| `travelPx` | Wheel travel for full `0 → 1` sequence (default `2400`) |
| `choreographyEnd` | Document scroll progress at internal `1` (default `0.36`) |

Returns `{ progress, choreographyProgress, isActive, phase, enter, exit }`.

### `useChoreographyProgress({ documentProgress, internalScroll })`

Merges `useScroll` output with internal progress into one `MotionValue` for hero, sculpture, and notes choreography.

## Behaviour

1. **Idle** — normal page scroll; video hidden.
2. **Handoff** — at first-fold boundary, `lockPageScroll()` pins the document; wheel drives `progress`.
3. **Active** — `FirstFoldMotionVideo` mounts and scrubs via `requestAnimationFrame`.
4. **Exit forward** (`progress → 1`) — unlock scroll; document scroll resumes into case studies.
5. **Exit backward** (`progress → 0`) — unlock scroll; hero scrolls normally again.

Both directions use the same wheel capture path for seamless reverse scrubbing.

## Files

| File | Role |
|------|------|
| `useInternalScroll.ts` | Handoff detection, lock/unlock, wheel + touch |
| `useChoreographyProgress.ts` | Merged choreography stream |
| `scrollLock.ts` | Body `position: fixed` pin (no layout jump) |
| `scrubVideo.ts` | RAF-batched `HTMLVideoElement.currentTime` updates |
| `mapProgress.ts` | Internal ↔ choreography mapping |
| `constants.ts` | Travel distance, video path, thresholds |

## Integration

Wired in `HomeScrollExperience.tsx`:

- First fold: `h-[100svh]` with `ref={firstFoldRef}`
- `FirstFoldMotionVideo` — visible while `isActive` or `0 < progress < 1`
- `choreographyProgress` passed to `Hero`, `DataStoriesSection`, `SculptureStickyParallax`

Motion asset: `public/motion/internal-scroll.mov` (source: `cursor-vault/src/lib/internal-scroll.mov`).
