import { ASSETS } from "../constants";
import { FigmaImage } from "../figma-image";

/** notes-molecule/photo — Figma 104:18950 */
export function NotesPhoto({ className }: { className?: string }) {
  return (
    <div
      className={className ?? "relative aspect-[938/960] w-full border-2 border-zinc-50 shadow-[0_3px_13px_rgba(0,0,0,0.15)]"}
      data-name="notes-molecule/photo"
      data-node-id="104:18950"
    >
      <FigmaImage asset={ASSETS.notePortrait} alt="" fill className="object-contain" />
    </div>
  );
}
