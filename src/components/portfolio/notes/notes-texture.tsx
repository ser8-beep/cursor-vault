import { ASSET_REGISTRY } from "@/lib/assets";
import { ASSETS } from "../constants";
import { FigmaImage } from "../figma-image";

/** notes-molecule/texture — Figma 104:18944 (Peace of mind) */
export function NotesTexture({ className }: { className?: string }) {
  const peacePaperSrc = ASSET_REGISTRY[ASSETS.notePeacePaper].src;

  return (
    <div
      className={className ?? "relative aspect-[560/412] w-full overflow-hidden"}
      data-name="notes-molecule/texture"
      data-node-id="104:18944"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={peacePaperSrc}
        alt=""
        className="absolute max-w-none object-cover"
        style={{
          height: "485%",
          width: "252%",
          left: "-13%",
          top: "-16%",
        }}
      />
      <div className="absolute left-[4.73%] top-[10%] w-[18.08%] aspect-[240/758] -scale-y-100 rotate-180">
        <FigmaImage asset={ASSETS.notePaperclip} alt="" fill className="object-contain" />
      </div>
      <p className="absolute left-[22.76%] right-[44.85%] top-[13.67%] text-right font-mono text-[17px] font-extralight uppercase tracking-[1.5px] text-[#1d4ed8] whitespace-nowrap">
        Peace of mind
      </p>
    </div>
  );
}
