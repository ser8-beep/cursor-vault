"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import {
  NotesBasePaper,
  NotesPhoto,
  NotesPolaroid,
  NotesStamp,
  NotesStickyDiscourse,
  NotesTexture,
  NotesWatermark,
} from "./notes";
import { Z_INDEX, DOCK } from "./hero-scene/constants";

type NotesSectionProps = {
  dockTargetRef?: React.RefObject<HTMLDivElement | null>;
};

/** notes collage — Figma 104:18983 / data-stories frame on home */
export const NotesSection = forwardRef<HTMLElement, NotesSectionProps>(
  function NotesSection({ dockTargetRef }, ref) {
    return (
      <section
        ref={ref}
        id="data-stories"
        aria-label="Data stories"
        data-name="notes"
        className="relative min-h-[850px] overflow-visible px-5 pb-20 pt-10"
        style={{ zIndex: Z_INDEX.notes }}
      >
        <motion.div
          className="relative mx-auto h-[850px] max-w-[1440px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <NotesStamp className="absolute left-1.5 top-[110px] w-[17%] max-w-[179px] min-[1440px]:w-[179px]" />

          <div className="absolute left-[50px] top-[326px] flex h-[305px] w-[276px] items-center justify-center">
            <NotesStickyDiscourse variant="white" className="h-[274px] w-[239px]" />
          </div>

          <NotesPolaroid className="absolute left-[calc(50%-197.62px)] top-[calc(50%+177.91px)] h-[492px] w-[351px] -translate-x-1/2 -translate-y-1/2" />

          <div className="absolute left-[calc(50%+272px)] top-[382px] h-[337px] w-[460px] -translate-x-1/2 max-lg:left-[calc(50%+120px)] max-md:hidden">
            <p className="absolute -top-[42px] right-0 w-[122px] -rotate-[29deg] text-right font-mono text-[13px] font-extralight lowercase tracking-[1.17px] text-[#71717a] line-through">
              press the frame you
            </p>
            <NotesTexture className="size-full" />
          </div>

          <NotesBasePaper className="absolute bottom-[-360px] left-[685px] h-[1114px] w-[682px] max-lg:hidden" />

          <NotesPhoto className="absolute bottom-0 left-[calc(50%+280px)] h-[141px] w-[203px] -translate-x-1/2 max-md:hidden" />

          <NotesWatermark className="absolute bottom-[8%] left-[11%] right-[76%] max-md:hidden" />

          <div className="absolute right-[9%] top-[52%] hidden w-[19%] max-w-[276px] min-[1440px]:block">
            <NotesStickyDiscourse variant="grey" />
          </div>

          {/* Globe dock anchor — horizontal lock; vertical clip via DOCK.clipTopPct */}
          <div
            ref={dockTargetRef}
            aria-hidden="true"
            data-name="sculpture-dock-target"
            className="pointer-events-none absolute bottom-0 left-0 h-px w-px"
            style={{ left: `${DOCK.centerXPct}%`, transform: "translateX(-50%)" }}
          />
        </motion.div>
      </section>
    );
  },
);
