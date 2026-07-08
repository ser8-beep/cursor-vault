/**
 * Three-act home scroll timeline — maps internal scroll, document bridge,
 * and section-local Data Stories progress onto one global 0→1 choreography axis.
 *
 * Act 1: internal scroll handoff (0 → handoffEnd)
 * Act 2: document scroll bridge — case studies + sculpture morph (handoffEnd → bridgeEnd)
 * Act 3: Data Stories section-local progress (notesSectionProgress 0→1)
 */

import { SCROLL_FOLD } from "./homePrototype";

/** Internal scroll completes — end of text-image-change / motion video. */
export const HANDOFF_END = SCROLL_FOLD.sculptureMorphEnd;

/** Sculpture fully in notes collage pose. */
export const BRIDGE_END = SCROLL_FOLD.notesStart;

/** Notes collage entrance settled on global axis (legacy reference). */
export const FOLD_END = SCROLL_FOLD.notesEnd;

/** Section progress at which sticky sculpture + notes parallax engage. */
export const NOTES_STICKY_ENTER = 0.05;

/** Re-export for internal-scroll module (keeps single source of truth). */
export const DEFAULT_CHOREOGRAPHY_HANDOFF_END = HANDOFF_END;
