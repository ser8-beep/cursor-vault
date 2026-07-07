"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, type MotionValue, useTransform } from "motion/react";
import { mapRange, SCROLL_FOLD } from "@/lib/motion/homePrototype";

const NOTES = "/figma/notes";

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
      className={`pointer-events-none absolute ${className}`}
      style={{ opacity: motionEnabled ? opacity : 1, y: motionEnabled ? translateY : 0 }}
    >
      {children}
    </motion.div>
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

      <div className="relative mx-auto aspect-[1440/1210] w-full max-w-[var(--width-notes-stage)] overflow-visible">
        <CollageItem
          className="left-[3.51%] top-[38.35%] flex h-[35.94%] w-[19.16%] items-center justify-center"
          scrollProgress={scrollProgress}
          start={SCROLL_FOLD.notesStart}
          end={SCROLL_FOLD.notesStart + 0.12}
          motionEnabled={motionEnabled}
        >
          <div className="relative h-[89.7%] w-[86.6%] -rotate-[8.27deg]">
            <span className="absolute inset-x-0 top-[6.57%] bottom-[6.3%] bg-zinc-50 shadow-[-13px_0_12px_-6px_rgba(0,0,0,0.25)]" />
            <span className="absolute left-[17.78%] right-[16.63%] top-[-1.94%] bottom-[82.44%] aspect-[1015/346]">
              <Image src={`${NOTES}/discourse-tape.png`} alt="" fill sizes="120px" className="object-contain" />
            </span>
            <p className="absolute left-[28.67%] right-[38.69%] top-[26.4%] text-right font-[family-name:var(--font-notes)] text-[length:var(--size-label-m)] font-extralight uppercase tracking-[1.15px] text-text-link whitespace-nowrap">
              Discourse
            </p>
          </div>
        </CollageItem>

        <CollageItem
          className="left-[47.55%] top-[7.93%] w-[47.39%] aspect-[628/1024]"
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

        <CollageItem
          className="left-[0.42%] top-[12.94%] w-[12.43%] aspect-[737/558]"
          scrollProgress={scrollProgress}
          start={SCROLL_FOLD.notesStart + 0.02}
          end={SCROLL_FOLD.notesStart + 0.14}
          motionEnabled={motionEnabled}
        >
          <Image src={`${NOTES}/botanical.png`} alt="" fill sizes="(min-width: 1440px) 179px, 12vw" className="object-contain" />
        </CollageItem>

        <CollageItem
          className="left-[24.08%] top-[42%] w-[24.39%] aspect-[820/1024]"
          scrollProgress={scrollProgress}
          start={SCROLL_FOLD.notesStart + 0.1}
          end={SCROLL_FOLD.notesStart + 0.24}
          motionEnabled={motionEnabled}
        >
          <Image src={`${NOTES}/polaroid-base.png`} alt="" fill sizes="(min-width: 1440px) 351px, 24vw" className="object-contain" />
          <div className="absolute left-[3.1%] top-[6.8%] w-[92.2%] aspect-square">
            <Image src={`${NOTES}/polaroid-photo.png`} alt="" fill sizes="(min-width: 1440px) 324px, 22vw" className="object-contain" />
          </div>
          <p className="absolute bottom-[0.5%] left-[10%] right-[4%] text-right font-[family-name:var(--font-notes)] text-[length:var(--size-body-s)] font-extralight lowercase tracking-[1.5px] text-text-link">
            Aging like a fine meme.
            <br />
            Happy birthday, Tyler!
          </p>
        </CollageItem>

        <CollageItem
          className="left-[52.92%] top-[44.94%] h-[39.66%] w-[31.94%]"
          scrollProgress={scrollProgress}
          start={SCROLL_FOLD.notesStart + 0.14}
          end={SCROLL_FOLD.notesStart + 0.3}
          motionEnabled={motionEnabled}
        >
          <div className="absolute inset-x-0 top-0 aspect-[560/412] overflow-hidden">
            <div className="relative w-full aspect-[1414/2000]">
              <Image src={`${NOTES}/peace-paper.png`} alt="" fill sizes="(min-width: 1440px) 460px, 32vw" className="object-contain object-left-top" />
            </div>
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
        </CollageItem>

        <CollageItem
          className="inset-[74.82%_75.85%_8.73%_10.9%] -rotate-[15.42deg]"
          scrollProgress={scrollProgress}
          start={SCROLL_FOLD.notesStart + 0.22}
          end={SCROLL_FOLD.notesEnd}
          motionEnabled={motionEnabled}
        >
          <p className="text-right font-[family-name:var(--font-notes)] text-[length:var(--size-overline)] font-extralight lowercase tracking-[0.97px] text-zinc-700 opacity-40">
            Aging like a fine meme.
            <br />
            Happy birthday, Tyler!
            <br />
            Happy birthday, Tyler! Aging like a fine meme.
            <br />
            Happy birthday, Tyler! ging like a
          </p>
        </CollageItem>

        <CollageItem
          className="bottom-0 left-[69.48%] w-[14.09%] -translate-x-1/2 aspect-[938/960] border-2 border-zinc-50 shadow-[0_3px_13px_rgba(0,0,0,0.15)]"
          scrollProgress={scrollProgress}
          start={SCROLL_FOLD.notesStart + 0.26}
          end={SCROLL_FOLD.notesEnd}
          motionEnabled={motionEnabled}
        >
          <Image src={`${NOTES}/portrait-frame.png`} alt="" fill sizes="(min-width: 1440px) 203px, 14vw" className="object-contain" />
        </CollageItem>

        <CollageItem
          className="right-[9.11%] top-[61.53%] flex h-[35.94%] w-[19.16%] items-center justify-center"
          scrollProgress={scrollProgress}
          start={SCROLL_FOLD.notesStart + 0.18}
          end={SCROLL_FOLD.notesStart + 0.34}
          motionEnabled={motionEnabled}
        >
          <div className="relative h-[89.7%] w-[86.6%] -scale-y-100 rotate-[-171.73deg]">
            <span className="absolute inset-x-0 top-[6.57%] bottom-[6.3%] bg-stone-200 shadow-[-13px_0_12px_-6px_rgba(0,0,0,0.25)]" />
            <span className="absolute left-[17.78%] right-[16.63%] top-[-1.94%] bottom-[82.44%] aspect-[1015/346]">
              <Image src={`${NOTES}/discourse-tape.png`} alt="" fill sizes="120px" className="object-contain" />
            </span>
            <p className="absolute left-[28.67%] right-[38.69%] top-[26.4%] text-right font-[family-name:var(--font-notes)] text-[length:var(--size-label-m)] font-extralight uppercase tracking-[1.15px] text-text-link whitespace-nowrap">
              Discourse
            </p>
          </div>
        </CollageItem>
      </div>
    </motion.section>
  );
}
