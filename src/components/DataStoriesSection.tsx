"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, type MotionValue, useTransform } from "motion/react";
import { mapRange, SCROLL_FOLD } from "@/lib/motion/homePrototype";
import { FigmaImage } from "./FigmaImage";
import { PaperLift } from "./PaperLift";

/**
 * Figma notes frame 2034:15700 @ 1440×850 (1210px bleed height for sculpture).
 * Mobile: tighter bleed-ratio stage + larger %-sized pieces (tablet: restores Figma).
 */
const STAGE =
  "relative mx-auto w-full max-w-[var(--width-notes-stage)] overflow-visible min-h-[var(--height-notes-stage-mobile)] laptop:min-h-[calc(var(--width-notes-stage)*1210/1440)]";

type DataStoriesSectionProps = {
  scrollProgress: MotionValue<number>;
  motionEnabled: boolean;
  desktopSculptureMotion: boolean;
};

type CollageItemProps = {
  children: ReactNode;
  className: string;
  scrollProgress: MotionValue<number>;
  start: number;
  end: number;
  motionEnabled: boolean;
  y?: number;
};

function CollageItem({
  children,
  className,
  scrollProgress,
  start,
  end,
  motionEnabled,
  y = 24,
}: CollageItemProps) {
  const opacity = useTransform(scrollProgress, (p) => {
    if (!motionEnabled) return 1;
    return mapRange(p, start, end);
  });
  const translateY = useTransform(scrollProgress, (p) => {
    if (!motionEnabled) return 0;
    return (1 - mapRange(p, start, end)) * y;
  });

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute relative ${className}`}
      style={{ opacity: motionEnabled ? opacity : 1, y: motionEnabled ? translateY : 0 }}
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

/** notes — Figma 2034:15700. Motion: second-fold-notes-enter (13:32102). */
export const DataStoriesSection = forwardRef<HTMLElement, DataStoriesSectionProps>(
  function DataStoriesSection(
    { scrollProgress, motionEnabled, desktopSculptureMotion },
    ref,
  ) {
    const sectionOpacity = useTransform(scrollProgress, (p) => {
      if (!motionEnabled) return 1;
      return mapRange(p, SCROLL_FOLD.notesStart, SCROLL_FOLD.notesEnd, 0, 1);
    });

    const showCollageSculpture = !desktopSculptureMotion;

    return (
      <motion.section
        ref={ref}
        id="data-stories"
        aria-label="Data stories"
        data-name="notes"
        className="relative w-full scroll-mt-[var(--space-48)] pb-[var(--space-32)] tablet:pb-[var(--space-48)] z-[var(--z-20)]"
        style={{ opacity: motionEnabled ? sectionOpacity : 1 }}
      >
        <p className="mb-gap-md font-display uppercase text-label-m leading-normal tracking-caption text-text-muted whitespace-pre-wrap">
          <span className="text-main">DATA_STORIES</span>
          {" //  OOO\n"}
          {"                               01_EXPLORATIONS\n"}
          {"                               02_NOTES\n"}
          {"                               03_EXPERIMENTS"}
        </p>

        {/* Ungrouped stage — no aspect-ratio wrapper; each piece owns its aspect + position */}
        <div className={STAGE}>
          {/* botanical — top-left */}
          <CollageItem
            className="left-0 top-[5%] w-[17%] aspect-[737/558] tablet:left-[0.42%] tablet:top-[9%] tablet:w-[12.43%]"
            scrollProgress={scrollProgress}
            start={SCROLL_FOLD.notesStart + 0.02}
            end={SCROLL_FOLD.notesStart + 0.14}
            motionEnabled={motionEnabled}
          >
            <FigmaImage
              asset="notesBotanical"
              alt=""
              fill
              className="object-contain"
            />
          </CollageItem>

          {/* discourse — left */}
          <CollageItem
            className="left-[2%] top-[26%] w-[27%] aspect-[239/274] tablet:left-[3.51%] tablet:top-[32%] tablet:w-[19.16%]"
            scrollProgress={scrollProgress}
            start={SCROLL_FOLD.notesStart}
            end={SCROLL_FOLD.notesStart + 0.12}
            motionEnabled={motionEnabled}
          >
            <DiscoursePaper variant="left" />
          </CollageItem>

          {/* polaroid — center-left */}
          <CollageItem
            className="left-[16%] top-[28%] w-[34%] aspect-[820/1024] tablet:left-[24.08%] tablet:top-[36%] tablet:w-[24.39%]"
            scrollProgress={scrollProgress}
            start={SCROLL_FOLD.notesStart + 0.1}
            end={SCROLL_FOLD.notesStart + 0.24}
            motionEnabled={motionEnabled}
          >
            <PaperLift className="relative size-full">
              <FigmaImage
                asset="notesPolaroidBase"
                alt=""
                fill
                className="object-contain"
              />
              <div className="absolute left-[3.1%] top-[6.8%] w-[92.2%] aspect-square">
                <FigmaImage
                  asset="notesPolaroidPhoto"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <p className="absolute bottom-[0.5%] left-[10%] right-[4%] text-right font-notes text-body-s font-extralight lowercase tracking-notes-body text-text-link">
                Aging like a fine meme.
                <br />
                Happy birthday, Tyler!
              </p>
            </PaperLift>
          </CollageItem>

          {/* peace of mind — center-right */}
          <CollageItem
            className="left-[48%] top-[30%] w-[44%] aspect-[560/412] tablet:left-[52.92%] tablet:top-[38%] tablet:w-[31.94%]"
            scrollProgress={scrollProgress}
            start={SCROLL_FOLD.notesStart + 0.14}
            end={SCROLL_FOLD.notesStart + 0.3}
            motionEnabled={motionEnabled}
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

          {/* sculpture bleed — sticky parallax layer replaces this on desktop */}
          {showCollageSculpture ? (
            <CollageItem
              className="left-[42%] top-[1%] w-[52%] aspect-[628/1024] tablet:left-[47.55%] tablet:top-[4%] tablet:w-[47.39%]"
              scrollProgress={scrollProgress}
              start={SCROLL_FOLD.notesStart + 0.05}
              end={SCROLL_FOLD.notesStart + 0.2}
              motionEnabled={motionEnabled}
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

          {/* birthday scraps — bottom-left */}
          <CollageItem
            className="left-[8%] top-[56%] w-[20%] -rotate-[15.42deg] tablet:left-[10.9%] tablet:top-[68%] tablet:w-[14%]"
            scrollProgress={scrollProgress}
            start={SCROLL_FOLD.notesStart + 0.22}
            end={SCROLL_FOLD.notesEnd}
            motionEnabled={motionEnabled}
          >
            <p className="text-right font-notes text-overline font-extralight lowercase tracking-notes-overline text-zinc-700 opacity-40">
              Aging like a fine meme.
              <br />
              Happy birthday, Tyler!
            </p>
          </CollageItem>

          {/* portrait — bottom-right */}
          <CollageItem
            className="bottom-[1%] left-[66%] w-[20%] -translate-x-1/2 aspect-[938/960] border-2 border-zinc-50 shadow-[0_3px_13px_rgba(0,0,0,0.15)] tablet:bottom-[2%] tablet:left-[69.48%] tablet:w-[14.09%]"
            scrollProgress={scrollProgress}
            start={SCROLL_FOLD.notesStart + 0.26}
            end={SCROLL_FOLD.notesEnd}
            motionEnabled={motionEnabled}
          >
            <FigmaImage
              asset="notesPortraitFrame"
              alt=""
              fill
              className="object-contain"
            />
          </CollageItem>

          {/* discourse — right */}
          <CollageItem
            className="right-[5%] top-[44%] w-[27%] aspect-[239/274] tablet:right-[9.11%] tablet:top-[52%] tablet:w-[19.16%]"
            scrollProgress={scrollProgress}
            start={SCROLL_FOLD.notesStart + 0.18}
            end={SCROLL_FOLD.notesStart + 0.34}
            motionEnabled={motionEnabled}
          >
            <DiscoursePaper variant="right" />
          </CollageItem>
        </div>
      </motion.section>
    );
  },
);

DataStoriesSection.displayName = "DataStoriesSection";
