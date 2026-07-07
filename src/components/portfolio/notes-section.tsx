"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ASSETS } from "./constants";

export function NotesSection() {
  return (
    <section
      id="experiments"
      className="relative min-h-[850px] overflow-hidden px-5 pb-20 pt-10"
    >
      <motion.div
        className="relative mx-auto h-[850px] max-w-[1440px]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Botanical frame — top left */}
        <div className="absolute left-1.5 top-[110px] h-[135px] w-[179px]">
          <Image
            src={ASSETS.noteBotanical}
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Discourse paper — left */}
        <div className="absolute left-[50px] top-[326px] flex h-[305px] w-[276px] items-center justify-center">
          <div className="-rotate-[8.27deg]">
            <div className="relative h-[274px] w-[239px]">
              <div className="absolute inset-x-0 bottom-[6.3%] top-[6.57%] bg-[#fafafa] shadow-[-13px_0_12px_-6px_rgba(0,0,0,0.25)]" />
              <p className="absolute left-[29%] right-[39%] top-[calc(50%-65px)] text-right font-mono text-[13px] font-extralight uppercase tracking-[1.15px] text-[#1d4ed8]">
                DISCOURSE
              </p>
              <div className="absolute inset-x-[18%] -top-[2%] bottom-[82%]">
                <Image
                  src={ASSETS.noteDiscourseTape}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Polaroid — positioned on notes canvas (Figma coords) */}
        <div className="absolute left-[calc(50%-197.62px)] top-[calc(50%+177.91px)] h-[492px] w-[351px] -translate-x-1/2 -translate-y-1/2">
          <Image
            src={ASSETS.notePolaroidBase}
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="absolute left-[358px] top-[381px] size-[325px]">
          <Image
            src={ASSETS.notePolaroidPhoto}
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <p className="absolute left-[calc(50%-36px)] top-[calc(50%+318px)] w-[338px] -translate-x-full text-right font-mono text-[17px] font-extralight lowercase tracking-[1.5px] text-[#1d4ed8]">
          Aging like a fine meme.
          <br />
          Happy birthday, Tyler!
        </p>

        {/* Peace of mind note — right */}
        <div className="absolute left-[calc(50%+272px)] top-[382px] h-[337px] w-[460px] -translate-x-1/2 max-lg:left-[calc(50%+120px)] max-md:hidden">
          <p className="absolute -top-[42px] right-0 w-[122px] -rotate-[29deg] text-right font-mono text-[13px] font-extralight lowercase tracking-[1.17px] text-[#71717a] line-through">
            press the frame you
          </p>
          <div className="absolute inset-0 aspect-[560/412] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.notePeacePaper}
              alt=""
              className="absolute max-w-none object-cover"
              style={{
                height: "485%",
                width: "252%",
                left: "-13%",
                top: "-16%",
              }}
            />
          </div>
          <div className="absolute left-[22px] top-[34px] flex h-[263px] w-[83px] items-center justify-center">
            <div className="rotate-180 -scale-y-100">
              <Image
                src={ASSETS.notePaperclip}
                alt=""
                width={83}
                height={263}
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
          <p className="absolute left-[23%] right-[45%] top-[14%] text-right font-mono text-[17px] font-extralight uppercase tracking-[1.5px] text-[#1d4ed8]">
            Peace of mind
          </p>
        </div>

        {/* Large torn paper — behind statue area */}
        <div className="absolute bottom-[-360px] left-[685px] h-[1114px] w-[682px] max-lg:hidden">
          <Image
            src={ASSETS.noteLargeTear}
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Portrait — bottom right */}
        <div className="absolute bottom-0 left-[calc(50%+280px)] h-[141px] w-[203px] -translate-x-1/2 border-[2.6px] border-[#fafafa] shadow-[0_3px_13px_rgba(0,0,0,0.15)] max-md:hidden">
          <Image
            src={ASSETS.notePortrait}
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Repeated text watermark */}
        <div className="absolute bottom-[8%] left-[11%] right-[76%] rotate-[-15deg] opacity-40 max-md:hidden">
          <p className="text-right font-mono text-[11px] font-extralight lowercase tracking-[0.97px] text-[#3f3f46]">
            Aging like a fine meme.
            <br />
            Happy birthday, Tyler!
          </p>
        </div>

        {/* Second discourse paper — bottom right */}
        <div className="absolute right-[131px] top-[523px] flex h-[305px] w-[276px] items-center justify-center max-md:hidden">
          <div className="rotate-[-172deg] -scale-y-100">
            <div className="relative h-[274px] w-[239px]">
              <div className="absolute inset-x-0 bottom-[6.3%] top-[6.57%] bg-[#e7e5e4] shadow-[-13px_0_12px_-6px_rgba(0,0,0,0.25)]" />
              <p className="absolute left-[29%] right-[39%] top-[calc(50%-66px)] text-right font-mono text-[13px] font-extralight uppercase tracking-[1.15px] text-[#1d4ed8]">
                DISCOURSE
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
