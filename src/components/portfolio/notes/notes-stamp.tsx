import { ASSETS } from "../constants";
import { FigmaImage } from "../figma-image";

/** notes-molecule/stamp — Figma 104:18948 */
export function NotesStamp({ className }: { className?: string }) {
  return (
    <div
      className={className ?? "relative aspect-[737/558] w-full"}
      data-name="notes-molecule/stamp"
      data-node-id="104:18948"
    >
      <FigmaImage asset={ASSETS.noteBotanical} alt="" fill className="object-contain" />
    </div>
  );
}
