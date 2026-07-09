"use client";

import Image from "next/image";
import { ASSETS, CONTACT, SVG_ASSETS } from "./constants";
import { FigmaImage } from "./figma-image";

function NotesOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-[50.5px] top-[360.37px] h-72 w-60 rotate-[-8.27deg]">
        <div className="absolute left-[2.59px] top-[17.81px] size-64 bg-zinc-50 shadow-[-13px_0px_11px_-6px_rgba(0,0,0,0.25)]" />
        <div className="absolute left-[78.17px] top-[84.76px] text-right font-mono text-xs font-extralight uppercase tracking-wide text-blue-700">
          DISCOURSE
        </div>
        <div className="absolute left-[41.28px] top-[0.46px] h-20 w-40">
          <FigmaImage asset={ASSETS.noteDiscourseTape} alt="" fill className="object-cover" />
        </div>
      </div>

      <div className="absolute left-[684.77px] top-[96px] h-[1114px] w-[682.43px]">
        <FigmaImage asset={ASSETS.noteLargeTear} alt="" fill className="object-cover" />
      </div>
      <div className="absolute left-[6px] top-[110px] h-32 w-44">
        <FigmaImage asset={ASSETS.noteBotanical} alt="" fill className="object-cover" />
      </div>
      <div className="absolute left-[346.77px] top-[357px] h-[491.81px] w-80">
        <FigmaImage asset={ASSETS.notePolaroidBase} alt="" fill className="object-cover" />
      </div>
      <div className="absolute left-[357.71px] top-[380.89px] size-80">
        <FigmaImage asset={ASSETS.notePolaroidPhoto} alt="" fill className="object-cover" />
      </div>
      <div className="absolute left-[346.83px] top-[742.65px] h-12 w-80 text-right font-mono text-base font-extralight lowercase tracking-wider text-blue-700">
        Aging like a fine meme.
        <br />
        Happy birthday, Tyler!
      </div>

      <div className="absolute left-[762px] top-[382px] h-80 w-[460px]">
        <div className="absolute left-[386.05px] top-[18.29px] w-32 rotate-[-29.42deg] text-right font-mono text-sm font-extralight lowercase tracking-wide text-zinc-500 line-through">
          press the frame you
        </div>
        <div className="absolute inset-0">
          <FigmaImage asset={ASSETS.notePeacePaper} alt="" fill className="object-cover" />
        </div>
        <div className="absolute left-[104.94px] top-[296.4px] h-64 w-20 rotate-180">
          <FigmaImage asset={ASSETS.notePaperclip} alt="" fill className="object-cover" />
        </div>
        <div className="absolute left-[104.7px] top-[46.07px] text-right font-mono text-base font-extralight uppercase tracking-wider text-blue-700">
          Peace of mind
        </div>
      </div>

      <div className="absolute left-[762px] top-[382px] h-80 w-[460px]">
        <div className="absolute left-[386.05px] top-[18.29px] w-32 rotate-[-29.42deg] text-right font-mono text-sm font-extralight lowercase tracking-wide text-zinc-500 line-through">
          press the frame you
        </div>
        <div className="absolute inset-0">
          <FigmaImage asset={ASSETS.notePeacePaper} alt="" fill className="object-cover" />
        </div>
        <div className="absolute left-[104.94px] top-[296.4px] h-64 w-20 rotate-180">
          <FigmaImage asset={ASSETS.notePaperclip} alt="" fill className="object-cover" />
        </div>
        <div className="absolute left-[104.7px] top-[46.07px] text-right font-mono text-base font-extralight uppercase tracking-wider text-blue-700">
          Peace of mind
        </div>
      </div>

      <div className="absolute left-[157px] top-[681.42px] w-44 rotate-[-15.42deg] text-right font-mono text-xs font-extralight lowercase tracking-wide text-zinc-700 opacity-40">
        Aging like a fine meme.
        <br />
        Happy birthday, Tyler! ging like a fine meme.
        <br />
        Happy birthday, Tyler!Aging like a fine meme.
        <br />
        Happy birthday, Tyler! ging like a
      </div>

      <div className="absolute left-[898.99px] top-[709px] h-36 w-52 border-[2.61px] border-zinc-50 shadow-[0px_3.49px_13.09px_0px_rgba(0,0,0,0.15)]">
        <FigmaImage asset={ASSETS.notePortrait} alt="" fill className="object-cover" />
      </div>

      <div className="absolute left-[1269.47px] top-[828.52px] h-72 w-60 rotate-[-171.73deg]">
        <div className="absolute left-[2.48px] top-[17.81px] size-64 bg-stone-200 shadow-[-13px_0px_11px_-6px_rgba(0,0,0,0.25)]" />
        <div className="absolute left-[197.01px] top-[110.81px] rotate-[-178.46deg] text-right font-mono text-xs font-extralight uppercase tracking-wide text-blue-700">
          DISCOURSE
        </div>
        <div className="absolute left-[71.83px] top-[0.46px] h-20 w-40">
          <FigmaImage asset={ASSETS.noteDiscourseTape} alt="" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}

export function SecondFoldStateOne() {
  return (
    <section className="relative flex h-[850px] w-full flex-col items-start gap-5 overflow-hidden p-5">
      <div className="flex h-[810px] w-full flex-col items-start justify-between">
        <div className="inline-flex w-full items-start justify-between">
          <div className="inline-flex w-[470px] flex-col items-start justify-start bg-zinc-100 shadow-[2px_3px_22px_0px_rgba(0,0,0,0.02)] outline outline-1 outline-zinc-400">
            <div className="inline-flex h-12 w-full items-start justify-between overflow-hidden rounded-tl-[3px] rounded-tr-[3px] border-b border-zinc-400 bg-zinc-100 px-2.5 py-1.5">
              <div className="inline-flex flex-col items-start justify-start pb-0.5">
                <div className="font-display text-base font-bold uppercase text-zinc-950">SHIVANI K.</div>
                <div className="font-mono text-[6px] font-semibold uppercase leading-[8px] tracking-wide text-zinc-700">
                  v2026.vault
                </div>
              </div>
              <div className="relative w-52 self-stretch overflow-hidden rounded-[1px] mix-blend-luminosity">
                <FigmaImage asset={ASSETS.workExGif} alt="" fill className="object-cover opacity-20" />
              </div>
            </div>

            <div className="inline-flex h-7 w-full items-center justify-start gap-5 overflow-hidden rounded-bl-[3px] rounded-br-[3px] bg-zinc-100 px-2.5 pb-2 pt-2.5">
              <div className="flex h-2 items-center justify-start gap-2">
                <div className="font-mono text-[8px] font-semibold uppercase tracking-tight text-zinc-950">CASE STUDIES_PRO</div>
                <div className="font-mono text-[8px] uppercase leading-[8px] text-zinc-500">04</div>
              </div>
              <div className="flex h-2 items-start justify-start gap-2">
                <div className="font-mono text-[8px] font-semibold uppercase tracking-tight text-zinc-950">DATA Stories_OOO</div>
                <div className="font-mono text-[8px] uppercase leading-[8px] text-zinc-500">03</div>
              </div>
              <div className="flex h-2 items-start justify-start gap-2">
                <div className="font-mono text-[8px] font-semibold uppercase tracking-tight text-zinc-950">work_experience</div>
                <div className="font-mono text-[8px] uppercase leading-[8px] text-zinc-500">04 yrs</div>
              </div>
            </div>
          </div>

          <div className="flex w-80 min-w-80 items-center justify-between p-[5px] outline outline-1 outline-zinc-400">
            <div className="flex items-center justify-start gap-2 self-stretch pb-1.5 pt-2">
              <div className="relative size-8 overflow-hidden">
                <Image src={SVG_ASSETS.workExIcon} alt="" fill className="object-contain" />
              </div>
              <div className="inline-flex flex-col items-start justify-center gap-0.5">
                <div className="font-mono text-[8px] font-semibold tracking-tight text-zinc-950">PRODUCT EX: 4 YRS+</div>
                <div className="font-mono text-[8px] font-semibold tracking-tight text-blue-700 underline">MY RESUME</div>
              </div>
            </div>
            <div className="relative w-32 self-stretch overflow-hidden rounded-[1px] mix-blend-luminosity">
              <FigmaImage asset={ASSETS.workExImage} alt="" fill className="object-cover" />
            </div>
          </div>
        </div>

        <div className="flex min-h-[642px] flex-1 w-full flex-col items-start justify-between pb-96">
          {/* Sculpture replaced by HeroScene (GLB morph) on home */}
          <div className="inline-flex h-[782px] items-start justify-end gap-2.5 overflow-hidden pl-[530px] pt-28" aria-hidden />
          <div className="inline-flex w-[1400px] items-center justify-between">
            <div className="flex items-center justify-start">
              <div className="inline-flex h-20 w-[476px] flex-col items-start justify-start gap-3">
                <div className="justify-center font-display text-4xl font-bold uppercase leading-[48px] text-zinc-950">
                  BUILDING <span className="text-blue-700">SYSTEMS</span>
                </div>
                <div className="self-stretch font-mono text-base font-semibold leading-6 tracking-wide text-zinc-500">
                  PRODUCT_DESIGNER //AI NATIVE_LEAN UX_SYSTEMS_WORKFLOWS
                </div>
              </div>
            </div>
            <div className="flex w-[600px] items-center justify-end">
              <div className="flex h-20 w-[900px] items-start justify-end">
                <div className="w-[600px] text-right font-display text-4xl font-bold uppercase leading-[48px] text-zinc-950">
                  THAT MAKE SENSE
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="inline-flex w-full items-end justify-between">
          <div className="flex w-[566px] items-center justify-between overflow-hidden rounded-[3px] bg-zinc-100 p-3 outline outline-1 outline-zinc-400">
            <div className="flex items-center justify-start gap-6 self-stretch">
              <div className="font-mono text-[8px] font-semibold uppercase tracking-tight text-zinc-950">{CONTACT.phone}</div>
              <div className="font-mono text-[8px] font-semibold uppercase tracking-tight text-zinc-950">{CONTACT.email}</div>
              <div className="font-mono text-[8px] font-semibold uppercase tracking-tight text-zinc-950">{CONTACT.linkedin}</div>
            </div>
            <div className="font-mono text-[8px] uppercase leading-[8px] text-zinc-500">LET’S CONNECT</div>
          </div>
          <div className="flex items-center justify-start gap-0.5">
            <div className="font-mono text-[8px] font-semibold tracking-tight text-zinc-950">
              {CONTACT.location}
              <br />
              {CONTACT.timezone}
            </div>
            <div className="relative size-8 overflow-hidden">
              <Image src={SVG_ASSETS.locationIcon} alt="" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-[30px] top-[654px] flex flex-col items-end justify-start gap-2">
        <div className="origin-top-left rotate-[-144.30deg]">
          <svg
            viewBox="0 0 14 15"
            width={14}
            height={14}
            className="object-contain"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1L1 12.5L5.2 9.1L7.5 13.5L9.5 12.5L7.2 8.1L12.5 7.5L1 1Z"
              fill="#09090b"
              stroke="#fafafa"
              strokeWidth="1.2"
            />
          </svg>
        </div>
        <div className="flex flex-col items-end justify-start gap-2.5 pr-8">
          <div className="inline-flex max-w-72 items-center justify-end gap-2.5 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl bg-blue-700 px-4 py-3 shadow-[0px_4px_24px_0px_rgba(0,51,218,0.30)] outline outline-[3px] outline-blue-700 backdrop-blur-[2px]">
            <div className="flex-1 font-mono text-[8px] font-semibold uppercase tracking-wide text-zinc-50">
              Scroll to see my OOO experiments
            </div>
          </div>
        </div>
      </div>

      <NotesOverlay />
    </section>
  );
}
