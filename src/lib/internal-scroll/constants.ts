/** Default wheel travel (px) for a full 0 → 1 internal scroll sequence. */
export const DEFAULT_TRAVEL_PX = 2400;

/** Progress epsilon — avoids flicker at boundaries. */
export const PROGRESS_EPSILON = 0.001;

import { HANDOFF_END } from "@/lib/motion/scrollTimeline";

/**
 * Internal progress maps to this document choreography value on completion.
 * Aligns with scroll act 1 end (sculptureMorphEnd / text-image-change).
 */
export const DEFAULT_CHOREOGRAPHY_END = HANDOFF_END;

/** Motion video served from public/. */
export const INTERNAL_SCROLL_VIDEO_SRC = "/motion/internal-scroll.mov";
