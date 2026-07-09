import { ASSETS } from "../constants";
import { FigmaImage } from "../figma-image";

/** notes-molecule/base-paper — Figma 104:18949 (large torn paper bleed) */
export function NotesBasePaper({ className }: { className?: string }) {
  return (
    <div
      className={className ?? "relative aspect-[628/1024] w-full"}
      data-name="notes-molecule/base-paper"
      data-node-id="104:18949"
    >
      <FigmaImage asset={ASSETS.noteLargeTear} alt="" fill className="object-contain object-top" />
    </div>
  );
}
