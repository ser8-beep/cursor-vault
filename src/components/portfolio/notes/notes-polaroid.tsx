import { ASSETS } from "../constants";
import { FigmaImage } from "../figma-image";

/** notes-molecule/Polaroid — Figma 104:18947 */
export function NotesPolaroid({ className }: { className?: string }) {
  return (
    <div
      className={className ?? "relative aspect-[820/1024] w-full"}
      data-name="notes-molecule/Polaroid"
      data-node-id="104:18947"
    >
      <FigmaImage asset={ASSETS.notePolaroidBase} alt="" fill className="object-contain" />
      <div className="absolute left-[3.1%] top-[6.8%] w-[92.2%] aspect-square">
        <FigmaImage asset={ASSETS.notePolaroidPhoto} alt="" fill className="object-contain" />
      </div>
      <p className="absolute bottom-[0.5%] left-[10%] right-[4%] text-right font-mono text-[17px] font-extralight lowercase tracking-[1.5px] text-[#1d4ed8]">
        Aging like a fine meme.
        <br />
        Happy birthday, Tyler!
      </p>
    </div>
  );
}
