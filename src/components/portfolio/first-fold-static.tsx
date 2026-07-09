"use client";

import Image from "next/image";
import { ASSETS, CONTACT, SVG_ASSETS } from "./constants";
import { FigmaImage } from "./figma-image";

export function FirstFoldStatic() {
  return (
    <section className="relative h-[760px] w-full overflow-hidden min-[1280px]:h-[790px] min-[1366px]:h-[820px] min-[1440px]:h-[850px]">
      <div className="box-border flex h-full w-full flex-col items-start justify-between px-3 pt-3 min-[1280px]:px-4 min-[1280px]:pt-4 min-[1366px]:px-[18px] min-[1366px]:pt-[18px] min-[1440px]:px-5 min-[1440px]:pt-5">
        <div className="inline-flex w-full items-start justify-between">
          <div className="inline-flex w-[360px] flex-col items-start justify-start shadow-[2px_3px_22px_0px_rgba(0,0,0,0.02)] outline outline-1 outline-zinc-400 min-[1280px]:w-[420px] min-[1366px]:w-[450px] min-[1440px]:w-[470px]">
            <div className="inline-flex h-[42px] w-full items-start justify-between overflow-hidden rounded-tl-[3px] rounded-tr-[3px] border-b border-zinc-400 px-2 py-[5px] min-[1280px]:h-[45px] min-[1280px]:px-[9px] min-[1280px]:py-[5.5px] min-[1366px]:h-[46px] min-[1366px]:px-2.5 min-[1366px]:py-[6px] min-[1440px]:h-12 min-[1440px]:px-2.5 min-[1440px]:py-1.5">
              <div className="inline-flex flex-col items-start justify-start pb-0.5">
                <div className="font-display text-sm font-bold uppercase leading-none text-zinc-950 min-[1366px]:text-[15px] min-[1440px]:text-base">
                  SHIVANI K.
                </div>
                <div className="font-mono text-[6px] font-semibold uppercase leading-[8px] tracking-wide text-zinc-700">
                  v2026.vault
                </div>
              </div>
              <div className="relative h-full w-[154px] self-stretch overflow-hidden rounded-[1px] opacity-0 mix-blend-luminosity min-[1280px]:w-[180px] min-[1366px]:w-[194px] min-[1440px]:w-52">
                <FigmaImage asset={ASSETS.workExGif} alt="" fill className="object-cover opacity-20" />
              </div>
            </div>
          </div>

          <div className="flex w-[250px] min-w-[250px] items-center justify-between p-[5px] opacity-0 outline outline-1 outline-zinc-400 min-[1280px]:w-[284px] min-[1280px]:min-w-[284px] min-[1366px]:w-[302px] min-[1366px]:min-w-[302px] min-[1440px]:w-80 min-[1440px]:min-w-80">
            <div className="flex items-center justify-start gap-[6px] self-stretch pb-1.5 pt-2 min-[1366px]:gap-[7px] min-[1440px]:gap-2">
              <div className="relative size-6 overflow-hidden min-[1280px]:size-7 min-[1440px]:size-8">
                <Image src={SVG_ASSETS.workExIcon} alt="" fill className="object-contain" />
              </div>
              <div className="inline-flex flex-col items-start justify-center gap-0.5">
                <div className="font-mono text-[7px] font-semibold tracking-tight text-zinc-950 min-[1366px]:text-[7.5px] min-[1440px]:text-[8px]">
                  PRODUCT EX: 4 YRS+
                </div>
                <div className="font-mono text-[7px] font-semibold tracking-tight text-blue-700 underline min-[1366px]:text-[7.5px] min-[1440px]:text-[8px]">
                  MY RESUME
                </div>
              </div>
            </div>
            <div className="relative w-[102px] self-stretch overflow-hidden rounded-[1px] mix-blend-luminosity min-[1280px]:w-[116px] min-[1366px]:w-[124px] min-[1440px]:w-32">
              <FigmaImage asset={ASSETS.workExImage} alt="" fill className="object-cover" />
            </div>
          </div>
        </div>

        <div className="flex min-h-0 w-full flex-1 flex-col items-start justify-between pb-[226px] min-[1280px]:pb-[258px] min-[1366px]:pb-[290px] min-[1440px]:pb-80">
          {/* Sculpture replaced by HeroScene (GLB morph) on home */}
          <div
            className="inline-flex h-[470px] w-[510px] items-center justify-start pl-[235px] min-[1280px]:h-[560px] min-[1280px]:w-[585px] min-[1280px]:pl-[265px] min-[1366px]:h-[640px] min-[1366px]:w-[640px] min-[1366px]:pl-[298px] min-[1440px]:h-[680px] min-[1440px]:w-[686px] min-[1440px]:pl-80"
            aria-hidden
          />

          <div className="inline-flex w-full items-center justify-between min-[1440px]:-translate-y-8">
            <div className="flex items-center justify-start">
              <div className="inline-flex h-[62px] w-[340px] flex-col items-start justify-start gap-2 min-[1280px]:h-[70px] min-[1280px]:w-[392px] min-[1366px]:h-[74px] min-[1366px]:w-[432px] min-[1440px]:h-20 min-[1440px]:w-[476px] min-[1440px]:gap-3">
                <div className="justify-center font-display text-[30px] font-bold uppercase leading-[38px] text-zinc-950 min-[1280px]:text-[32px] min-[1280px]:leading-[42px] min-[1366px]:text-[34px] min-[1366px]:leading-[45px] min-[1440px]:text-4xl min-[1440px]:leading-[48px]">
                  .....|
                </div>
                <div className="self-stretch font-mono text-sm font-semibold leading-5 tracking-wide text-zinc-500 min-[1280px]:text-[15px] min-[1280px]:leading-[22px] min-[1440px]:text-base min-[1440px]:leading-6">
                  PR
                </div>
              </div>
            </div>
            <div className="flex w-[430px] items-center justify-end min-[1280px]:w-[500px] min-[1366px]:w-[550px] min-[1440px]:w-[600px]">
              <div className="flex h-[62px] w-[620px] items-start justify-end min-[1280px]:h-[70px] min-[1280px]:w-[740px] min-[1366px]:h-[74px] min-[1366px]:w-[820px] min-[1440px]:h-20 min-[1440px]:w-[900px]">
                <div className="w-[430px] text-right font-display text-[30px] font-bold uppercase leading-[38px] text-zinc-950 min-[1280px]:w-[500px] min-[1280px]:text-[32px] min-[1280px]:leading-[42px] min-[1366px]:w-[550px] min-[1366px]:text-[34px] min-[1366px]:leading-[45px] min-[1440px]:w-[600px] min-[1440px]:text-4xl min-[1440px]:leading-[48px]">
                  <span className="text-blue-700">-|</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="inline-flex w-full items-end justify-between pb-5 pt-6 min-[1280px]:pb-6 min-[1280px]:pt-8 min-[1366px]:pb-8 min-[1366px]:pt-9 min-[1440px]:pb-10 min-[1440px]:pt-10">
          <div className="flex w-[420px] items-center justify-between overflow-hidden rounded-[3px] bg-zinc-100 p-[9px] outline outline-1 outline-zinc-400 min-[1280px]:w-[492px] min-[1280px]:p-[10px] min-[1366px]:w-[532px] min-[1366px]:p-[11px] min-[1440px]:w-[566px] min-[1440px]:p-3">
            <div className="flex items-center justify-start gap-[14px] self-stretch min-[1280px]:gap-[18px] min-[1366px]:gap-[22px] min-[1440px]:gap-6">
              <div className="font-mono text-[7px] font-semibold uppercase tracking-tight text-zinc-950 min-[1440px]:text-[8px]">
                {CONTACT.phone}
              </div>
              <div className="font-mono text-[7px] font-semibold uppercase tracking-tight text-zinc-950 min-[1440px]:text-[8px]">
                {CONTACT.email}
              </div>
              <div className="font-mono text-[7px] font-semibold uppercase tracking-tight text-zinc-950 min-[1440px]:text-[8px]">
                {CONTACT.linkedin}
              </div>
            </div>
            <div className="font-mono text-[7px] uppercase leading-[8px] text-zinc-500 min-[1440px]:text-[8px]">LET’S CONNECT</div>
          </div>

          <div className="flex items-center justify-start gap-0.5 pl-2">
            <div className="font-mono text-[7px] font-semibold tracking-tight text-zinc-950 min-[1440px]:text-[8px]">
              {CONTACT.location}
              <br />
              {CONTACT.timezone}
            </div>
            <div className="relative size-6 overflow-hidden min-[1280px]:size-7 min-[1440px]:size-8">
              <Image src={SVG_ASSETS.locationIcon} alt="" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
