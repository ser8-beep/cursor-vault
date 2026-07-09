import { ASSETS } from "../constants";
import { FigmaImage } from "../figma-image";

type NotesStickyDiscourseProps = {
  variant?: "white" | "grey";
  className?: string;
};

/** notes-molecule/sticky-white | sticky-grey — Figma 104:18946 / 104:18945 */
export function NotesStickyDiscourse({
  variant = "white",
  className,
}: NotesStickyDiscourseProps) {
  const isGrey = variant === "grey";
  const nodeId = isGrey ? "104:18945" : "104:18946";
  const dataName = isGrey ? "notes-molecule/sticky-grey" : "notes-molecule/sticky-white";
  const paperBg = isGrey ? "bg-stone-200" : "bg-zinc-50";
  const rotate = isGrey ? "-scale-y-100 rotate-[-171.73deg]" : "-rotate-[8.27deg]";

  return (
    <div
      className={className ?? "relative aspect-[239/274] w-full"}
      data-name={dataName}
      data-node-id={nodeId}
    >
      <div className={`relative size-full ${rotate}`}>
        <span
          className={`absolute inset-x-0 top-[6.57%] bottom-[6.3%] ${paperBg} shadow-[-13px_0_12px_-6px_rgba(0,0,0,0.25)]`}
        />
        <span className="relative block aspect-[1015/346] w-[65.5%] mx-auto -mt-[8%]">
          <FigmaImage asset={ASSETS.noteDiscourseTape} alt="" fill className="object-contain" />
        </span>
        <p className="mt-[8%] text-center font-mono text-[13px] font-extralight uppercase tracking-[1.15px] text-[#1d4ed8]">
          DISCOURSE
        </p>
      </div>
    </div>
  );
}
