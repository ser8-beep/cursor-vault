/**
 * Home scroll timeline — document scroll and section-local Data Stories
 * progress on one global 0→1 choreography axis.
 *
 * Act 1: hero text + sculpture morph (0 → handoffEnd)
 * Act 2: case studies bridge (handoffEnd → bridgeEnd)
 * Act 3: Data Stories section-local progress (notesSectionProgress 0→1)
 */

import { SCROLL_FOLD } from "./homePrototype";

/** Hero morph completes — end of text-image-change. */
export const HANDOFF_END = SCROLL_FOLD.sculptureMorphEnd;

/** Sculpture fully in notes collage pose. */
export const BRIDGE_END = SCROLL_FOLD.notesStart;

/** Notes collage entrance settled on global axis (legacy reference). */
export const FOLD_END = SCROLL_FOLD.notesEnd;

/** Section progress at which sticky sculpture + notes parallax engage. */
export const NOTES_STICKY_ENTER = 0.05;
