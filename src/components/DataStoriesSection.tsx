"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, type MotionValue, useTransform } from "motion/react";
import { mapRange, SCROLL_FOLD } from "@/lib/motion/homePrototype";
import { PaperLift } from "./PaperLift";

const NOTES = "/figma/notes";

/**
 * Figma notes frame 2034:15700 @ 1440×850 (1210px bleed height for sculpture).
 * Positions are % of frame width/height — stage min-height decouples vertical spread
 * from the old single aspect-ratio box that crushed mobile to ~320px tall.
 */
const STAGE =
  "relative mx-auto w-full max-w-[var(--width-notes-stage)] overflow-visible min-h-[calc(100vw*1.45)] tablet:min-h-[calc(100vw*1210/1440)] laptop:min-h-[calc(var(--width-notes-stage)*1210/1440)]";

type DataStoriesSectionProps = {
  scrollProgress: MotionValue<number>;
  motionEnabled: boolean;
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
        <Image src={`${NOTES}/discourse-tape.png`} alt="" fill sizes="120px" className="object-contain" />
      </span>
      <p className="mt-[8%] text-center font-[family-name:var(--font-notes)] text-[length:var(--size-label-m)] font-extralight uppercase tracking-[1.15px] text-text-link">
        Discourse
      </p>
    </PaperLift>
  );
}

/** notes — Figma 2034:15700. Motion: second-fold-notes-enter (13:32102). */
export function DataStoriesSection({ scrollProgress, motionEnabled }: DataStoriesSectionProps) {
  const sectionOpacity = useTransform(scrollProgress, (p) => {
    if (!motionEnabled) return 1;
    return mapRange(p, SCROLL_FOLD.notesStart, SCROLL_FOLD.notesEnd, 0, 1);
  });

  return (
    <motion.section
      id="data-stories"
      aria-label="Data stories"
      data-name="notes"
      className="relative w-full scroll-mt-[var(--space-48)] pb-[var(--space-48)] z-[var(--z-20)]"
      style={{ opacity: motionEnabled ? sectionOpacity : 1 }}
    >
      <p className="mb-gap-md font-display uppercase text-label-m leading-normal tracking-[var(--tracking-caption)] text-text-muted whitespace-pre-wrap">
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
          className="left-[0.42%] top-[9%] w-[12.43%] aspect-[737/558]"
          scrollProgress={scrollProgress}
          start={SCROLL_FOLD.notesStart + 0.02}
          end={SCROLL_FOLD.notesStart + 0.14}
          motionEnabled={motionEnabled}
        >
          <Image
            src={`${NOTES}/botanical.png`}
            alt=""
            fill
            sizes="(min-width: 1440px) 179px, 12vw"
            className="object-contain"
          />
        </CollageItem>

        {/* discourse — left */}
        <CollageItem
          className="left-[3.51%] top-[32%] w-[19.16%] aspect-[239/274]"
          scrollProgress={scrollProgress}
          start={SCROLL_FOLD.notesStart}
          end={SCROLL_FOLD.notesStart + 0.12}
          motionEnabled={motionEnabled}
        >
          <DiscoursePaper variant="left" />
        </CollageItem>

        {/* polaroid — center-left */}
        <CollageItem
          className="left-[24.08%] top-[36%] w-[24.39%] aspect-[820/1024]"
          scrollProgress={scrollProgress}
          start={SCROLL_FOLD.notesStart + 0.1}
          end={SCROLL_FOLD.notesStart + 0.24}
          motionEnabled={motionEnabled}
        >
          <PaperLift className="relative size-full">
            <Image
              src={`${NOTES}/polaroid-base.png`}
              alt=""
              fill
              sizes="(min-width: 1440px) 351px, 24vw"
              className="object-contain"
            />
            <div className="absolute left-[3.1%] top-[6.8%] w-[92.2%] aspect-square">
              <Image
                src={`${NOTES}/polaroid-photo.png`}
                alt=""
                fill
                sizes="(min-width: 1440px) 324px, 22vw"
                className="object-contain"
              />
            </div>
            <p className="absolute bottom-[0.5%] left-[10%] right-[4%] text-right font-[family-name:var(--font-notes)] text-[length:var(--size-body-s)] font-extralight lowercase tracking-[1.5px] text-text-link">
              Aging like a fine meme.
              <br />
              Happy birthday, Tyler!
            </p>
          </PaperLift>
        </CollageItem>

        {/* peace of mind — center-right */}
        <CollageItem
          className="left-[52.92%] top-[38%] w-[31.94%] aspect-[560/412]"
          scrollProgress={scrollProgress}
          start={SCROLL_FOLD.notesStart + 0.14}
          end={SCROLL_FOLD.notesStart + 0.3}
          motionEnabled={motionEnabled}
        >
          <div className="relative size-full overflow-hidden">
            <div className="relative mx-auto h-full w-[85%] aspect-[1414/2000]">
              <Image
                src={`${NOTES}/peace-paper.png`}
                alt=""
                fill
                sizes="(min-width: 1440px) 460px, 32vw"
                className="object-contain object-left-top"
              />
            </div>
            <div className="absolute left-[4.73%] top-[10%] w-[18.08%] aspect-[240/758] -scale-y-100 rotate-180">
              <Image src={`${NOTES}/paperclip.png`} alt="" fill sizes="80px" className="object-contain" />
            </div>
            <p className="absolute left-[22.76%] right-[44.85%] top-[13.67%] text-right font-[family-name:var(--font-notes)] text-[length:var(--size-body-s)] font-extralight uppercase tracking-[1.5px] text-text-link whitespace-nowrap">
              Peace of mind
            </p>
            <p className="absolute right-[-4.5%] top-[-12.4%] w-[26.6%] -rotate-[29.42deg] text-right font-[family-name:var(--font-notes)] text-[length:var(--size-label-s)] font-extralight lowercase tracking-[1.17px] text-zinc-500 line-through">
              press the frame you
            </p>
          </div>
        </CollageItem>

        {/* sculpture bleed — right, extends below frame */}
        <CollageItem
          className="left-[47.55%] top-[4%] w-[47.39%] aspect-[628/1024]"
          scrollProgress={scrollProgress}
          start={SCROLL_FOLD.notesStart + 0.05}
          end={SCROLL_FOLD.notesStart + 0.2}
          motionEnabled={motionEnabled}
        >
          <Image
            src={`${NOTES}/sculpture-figure.png`}
            alt=""
            fill
            sizes="(min-width: 1440px) 682px, 47vw"
            className="object-contain object-top"
          />
        </CollageItem>

        {/* birthday scraps — bottom-left */}
        <CollageItem
          className="left-[10.9%] top-[68%] w-[14%] -rotate-[15.42deg]"
          scrollProgress={scrollProgress}
          start={SCROLL_FOLD.notesStart + 0.22}
          end={SCROLL_FOLD.notesEnd}
          motionEnabled={motionEnabled}
        >
          <p className="text-right font-[family-name:var(--font-notes)] text-[length:var(--size-overline)] font-extralight lowercase tracking-[0.97px] text-zinc-700 opacity-40">
            Aging like a fine meme.
            <br />
            Happy birthday, Tyler!
          </p>
        </CollageItem>

        {/* portrait — bottom-right */}
        <CollageItem
          className="bottom-[2%] left-[69.48%] w-[14.09%] -translate-x-1/2 aspect-[938/960] border-2 border-zinc-50 shadow-[0_3px_13px_rgba(0,0,0,0.15)]"
          scrollProgress={scrollProgress}
          start={SCROLL_FOLD.notesStart + 0.26}
          end={SCROLL_FOLD.notesEnd}
          motionEnabled={motionEnabled}
        >
          <Image
            src={`${NOTES}/portrait-frame.png`}
            alt=""
            fill
            sizes="(min-width: 1440px) 203px, 14vw"
            className="object-contain"
          />
        </CollageItem>

        {/* discourse — right */}
        <CollageItem
          className="right-[9.11%] top-[52%] w-[19.16%] aspect-[239/274]"
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
}
