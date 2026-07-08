"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, type MotionValue, useTransform } from "motion/react";
import { mapRange } from "@/lib/motion/homePrototype";
import { FigmaImage } from "./FigmaImage";
import { PaperLift } from "./PaperLift";

/**
 * Figma notes frame 2034:15700 @ 1440×850 (1210px bleed height for sculpture).
 * Stage width caps at 1440px and shrinks with viewport — %-positions scale proportionally.
 */
const STAGE =
  "notes-stage relative mx-auto w-full max-w-[var(--width-notes-stage)] overflow-visible min-h-[var(--height-notes-stage-mobile)] tablet:min-h-[calc(min(100vw,var(--width-notes-stage))*1210/1440)]";

type DataStoriesSectionProps = {
  /** Act 3 — local progress as #data-stories scrolls through the viewport (0→1). */
  sectionProgress: MotionValue<number>;
  scrollChoreographyEnabled: boolean;
  desktopSculptureMotion: boolean;
};

type CollageItemProps = {
  children: ReactNode;
  className: string;
  sectionProgress: MotionValue<number>;
  start: number;
  end: number;
  scrollChoreographyEnabled: boolean;
  y?: number;
};

function CollageItem({
  children,
  className,
  sectionProgress,
  start,
  end,
  scrollChoreographyEnabled,
  y = 24,
}: CollageItemProps) {
  const opacity = useTransform(sectionProgress, (p) => {
    if (!scrollChoreographyEnabled) return 1;
    return mapRange(p, start, end);
  });
  const translateY = useTransform(sectionProgress, (p) => {
    if (!scrollChoreographyEnabled) return 0;
    return (1 - mapRange(p, start, end)) * y;
  });

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{
        opacity: scrollChoreographyEnabled ? opacity : 1,
        y: scrollChoreographyEnabled ? translateY : 0,
      }}
    >
      {children}
    </motion.div>
  );
}

function DiscoursePaper({
  variant,
}: {
  variant: "left" | "right";
}) {
  const rotate =
    variant === "left" ? "-rotate-[8.27deg]" : "-scale-y-100 rotate-[-171.73deg]";
  const paperBg = variant === "left" ? "bg-zinc-50" : "bg-stone-200";

  return (
    <PaperLift className={`relative size-full ${rotate}`}>
      <span className={`absolute inset-x-0 top-[6.57%] bottom-[6.3%] ${paperBg} shadow-[-13px_0_12px_-6px_rgba(0,0,0,0.25)]`} />
      <span className="relative block aspect-[1015/346] w-[65.5%] mx-auto -mt-[8%]">
        <FigmaImage asset="notesDiscourseTape" alt="" fill className="object-contain" />
      </span>
      <p className="mt-[8%] text-center font-notes text-label-m font-extralight uppercase tracking-notes-label text-text-link">
        Discourse
      </p>
    </PaperLift>
  );
}

/** notes — Figma 2034:15700. Act 3 entrance driven by sectionProgress. */
export const DataStoriesSection = forwardRef<HTMLElement, DataStoriesSectionProps>(
  function DataStoriesSection(
    { sectionProgress, scrollChoreographyEnabled, desktopSculptureMotion },
    ref,
  ) {
    const sectionOpacity = useTransform(sectionProgress, (p) => {
      if (!scrollChoreographyEnabled) return 1;
      return mapRange(p, 0, 0.12, 0, 1);
    });

    const showCollageSculpture = !desktopSculptureMotion;

    return (
      <motion.section
        ref={ref}
        id="data-stories"
        aria-label="Data stories"
        data-name="notes"
        className="relative w-full scroll-mt-[var(--space-48)] overflow-visible pb-[var(--space-32)] tablet:pb-[var(--space-48)] z-[var(--z-20)]"
        style={{ opacity: scrollChoreographyEnabled ? sectionOpacity : 1 }}
      >
        <p className="mb-gap-md font-display uppercase text-label-m leading-normal tracking-caption text-text-muted whitespace-pre-wrap">
          <span className="text-main">DATA_STORIES</span>
          {" //  OOO\n"}
          {"                               01_EXPLORATIONS\n"}
          {"                               02_NOTES\n"}
          {"                               03_EXPERIMENTS"}
        </p>

        <div className={STAGE}>
          {/* botanical — top-left (Figma 2034:14170) */}
          <CollageItem
            className="left-0 top-[5%] z-[1] w-[17%] aspect-[737/558] tablet:left-[0.42%] tablet:top-[12.94%] tablet:w-[12.43%]"
            sectionProgress={sectionProgress}
            start={0.02}
            end={0.14}
            scrollChoreographyEnabled={scrollChoreographyEnabled}
          >
            <FigmaImage asset="notesBotanical" alt="" fill className="object-contain" />
          </CollageItem>

          {/* discourse — left (Figma 2034:14160) */}
          <CollageItem
            className="left-[2%] top-[26%] z-[3] w-[27%] aspect-[239/274] tablet:left-[3.51%] tablet:top-[38.35%] tablet:w-[19.16%]"
            sectionProgress={sectionProgress}
            start={0}
            end={0.12}
            scrollChoreographyEnabled={scrollChoreographyEnabled}
          >
            <DiscoursePaper variant="left" />
          </CollageItem>

          {/* polaroid — center-left (Figma 2034:14171) */}
          <CollageItem
            className="left-[16%] top-[28%] z-[4] w-[34%] aspect-[820/1024] tablet:left-[24.08%] tablet:top-[42%] tablet:w-[24.39%]"
            sectionProgress={sectionProgress}
            start={0.1}
            end={0.24}
            scrollChoreographyEnabled={scrollChoreographyEnabled}
          >
            <PaperLift className="relative size-full">
              <FigmaImage asset="notesPolaroidBase" alt="" fill className="object-contain" />
              <div className="absolute left-[3.1%] top-[6.8%] w-[92.2%] aspect-square">
                <FigmaImage asset="notesPolaroidPhoto" alt="" fill className="object-contain" />
              </div>
              <p className="absolute bottom-[0.5%] left-[10%] right-[4%] text-right font-notes text-body-s font-extralight lowercase tracking-notes-body text-text-link">
                Aging like a fine meme.
                <br />
                Happy birthday, Tyler!
              </p>
            </PaperLift>
          </CollageItem>

          {/* peace of mind — center-right (Figma 2034:14175) */}
          <CollageItem
            className="left-[48%] top-[30%] z-[5] w-[44%] aspect-[560/412] tablet:left-[52.92%] tablet:top-[44.94%] tablet:w-[31.94%]"
            sectionProgress={sectionProgress}
            start={0.14}
            end={0.3}
            scrollChoreographyEnabled={scrollChoreographyEnabled}
          >
            <div className="relative size-full overflow-hidden">
              <div className="relative mx-auto h-full w-[85%] aspect-[1414/2000]">
                <FigmaImage
                  asset="notesPeacePaper"
                  alt=""
                  fill
                  className="object-contain object-left-top"
                />
              </div>
              <div className="absolute left-[4.73%] top-[10%] w-[18.08%] aspect-[240/758] -scale-y-100 rotate-180">
                <FigmaImage asset="notesPaperclip" alt="" fill className="object-contain" />
              </div>
              <p className="absolute left-[22.76%] right-[44.85%] top-[13.67%] text-right font-notes text-body-s font-extralight uppercase tracking-notes-body text-text-link whitespace-nowrap">
                Peace of mind
              </p>
              <p className="absolute right-[-4.5%] top-[-12.4%] w-[26.6%] -rotate-[29.42deg] text-right font-notes text-label-s font-extralight lowercase tracking-notes-caption text-zinc-500 line-through">
                press the frame you
              </p>
            </div>
          </CollageItem>

          {/* sculpture bleed — mobile/tablet only; desktop uses sticky parallax layer */}
          {showCollageSculpture ? (
            <CollageItem
              className="left-[42%] top-[1%] z-[8] w-[52%] aspect-[628/1024] tablet:left-[47.55%] tablet:top-[11.29%] tablet:w-[47.39%]"
              sectionProgress={sectionProgress}
              start={0.05}
              end={0.2}
              scrollChoreographyEnabled={scrollChoreographyEnabled}
            >
              <FigmaImage
                asset="notesSculptureFigure"
                alt=""
                fill
                className="object-contain object-top"
                data-node-id="2034:14169"
              />
            </CollageItem>
          ) : null}

          {/* birthday scraps — bottom-left (Figma 2034:14181) */}
          <CollageItem
            className="left-[8%] top-[56%] z-[2] w-[20%] -rotate-[15.42deg] tablet:left-[10.9%] tablet:top-[74.82%] tablet:w-[13.25%]"
            sectionProgress={sectionProgress}
            start={0.22}
            end={0.72}
            scrollChoreographyEnabled={scrollChoreographyEnabled}
          >
            <p className="text-right font-notes text-overline font-extralight lowercase tracking-notes-overline text-zinc-700 opacity-40">
              Aging like a fine meme.
              <br />
              Happy birthday, Tyler!
            </p>
          </CollageItem>

          {/* portrait — bottom-right (Figma 2034:14182) */}
          <CollageItem
            className="bottom-0 left-[66%] z-[6] w-[20%] -translate-x-1/2 aspect-[938/960] border-2 border-zinc-50 shadow-[0_3px_13px_rgba(0,0,0,0.15)] tablet:left-[69.48%] tablet:w-[14.09%]"
            sectionProgress={sectionProgress}
            start={0.26}
            end={0.76}
            scrollChoreographyEnabled={scrollChoreographyEnabled}
          >
            <FigmaImage asset="notesPortraitFrame" alt="" fill className="object-contain" />
          </CollageItem>

          {/* discourse — right (Figma 2034:15588) */}
          <CollageItem
            className="right-[5%] top-[44%] z-[7] w-[27%] aspect-[239/274] tablet:right-[9.11%] tablet:top-[61.53%] tablet:w-[19.16%]"
            sectionProgress={sectionProgress}
            start={0.18}
            end={0.34}
            scrollChoreographyEnabled={scrollChoreographyEnabled}
          >
            <DiscoursePaper variant="right" />
          </CollageItem>
        </div>
      </motion.section>
    );
  },
);

DataStoriesSection.displayName = "DataStoriesSection";
