/**
 * Sculpture GLB URLs for hero → data-stories scroll morph.
 *
 * Canonical source files: src/lib/internal-scroll/3d-assets-update/
 *   - geometry-patina.glb (Model A — hero / geometry tools)
 *   - globe-patina.glb    (Model B — globe reveal)
 *
 * Served at runtime from public/internal-scroll/3d-assets-update/ (symlink).
 * Do NOT ES-import .glb — Turbopack has no loader for src imports.
 *
 * `?v=` busts browser / useGLTF cache when binaries are replaced in place.
 */
export const SCULPTURE_MODEL_A_URL =
  "/internal-scroll/3d-assets-update/geometry-patina.glb?v=1783886557";
export const SCULPTURE_MODEL_B_URL =
  "/internal-scroll/3d-assets-update/globe-patina.glb?v=1783883659";
