/**
 * Sculpture GLB URLs for hero → data-stories scroll morph.
 *
 * Canonical source files: src/lib/internal-scroll/3d-assets/
 *   - geometry.glb (Model A — hero / geometry tools)
 *   - globe.glb    (Model B — globe reveal)
 *
 * Served at runtime from public/internal-scroll/3d-assets/ (static copies).
 * Do NOT ES-import .glb — Turbopack has no loader for src imports.
 */
export const SCULPTURE_MODEL_A_URL = "/internal-scroll/3d-assets/geometry.glb";
export const SCULPTURE_MODEL_B_URL = "/internal-scroll/3d-assets/globe.glb";
