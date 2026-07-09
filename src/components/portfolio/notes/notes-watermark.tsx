/** notes-molecule/note — Figma 104:18951 (repeated birthday watermark) */
export function NotesWatermark({ className }: { className?: string }) {
  return (
    <div
      className={className ?? "relative w-full -rotate-[15.42deg] opacity-40"}
      data-name="notes-molecule/note"
      data-node-id="104:18951"
    >
      <p className="text-right font-mono text-[11px] font-extralight lowercase tracking-[0.97px] text-[#3f3f46]">
        Aging like a fine meme.
        <br />
        Happy birthday, Tyler!
      </p>
    </div>
  );
}
