import Image from "next/image";

const NOTES = "/figma/notes";

/**
 * notes — Figma node 2034:15700 (Shivani UI/UX Portfolio)
 * Collage second-fold: polaroids, discourse papers, peace-of-mind frame,
 * botanical print, sculpture bleed. Positions are % of the 1440×850 stage.
 */
export function DataStoriesSection() {
  return (
    <section
      id="data-stories"
      aria-label="Data stories"
      className="relative w-full scroll-mt-[var(--space-48)] pb-[var(--space-48)]"
    >
      <p className="mb-gap-md font-display uppercase text-label-m leading-normal tracking-[var(--tracking-caption)] text-text-muted whitespace-pre-wrap">
        <span className="text-main">DATA_STORIES</span>
        {" //  OOO\n"}
        {"                               01_EXPLORATIONS\n"}
        {"                               02_NOTES\n"}
        {"                               03_EXPERIMENTS"}
      </p>

      <div className="relative mx-auto w-full max-w-[var(--width-notes-stage)] overflow-visible min-h-[calc(100vw*1210/1440)] laptop:min-h-[calc(var(--width-notes-stage)*1210/1440)]">
        {/* botanical print — top left */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[0.4%] top-[9%] w-[12.4%] aspect-[179/135]"
        >
          <Image
            src={`${NOTES}/botanical.png`}
            alt=""
            fill
            sizes="(min-width: 1440px) 179px, 12vw"
            className="object-cover"
          />
        </div>

        {/* discourse paper — left, rotated */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[3.5%] top-[38%] flex h-[36%] w-[19%] items-center justify-center"
        >
          <div className="relative h-[88%] w-[87%] -rotate-[8.27deg]">
            <div className="relative h-full w-full">
              <span className="absolute inset-x-0 top-[6.5%] bottom-[6.3%] bg-zinc-50 shadow-[-13px_0_12px_-6px_rgba(0,0,0,0.25)]" />
              <span className="absolute left-[17.8%] right-[16.6%] top-[-2%] bottom-[82%]">
                <Image
                  src={`${NOTES}/discourse-tape.png`}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </span>
              <p className="absolute left-[29%] right-[39%] top-[calc(50%-65px)] text-right font-[family-name:var(--font-notes)] text-[length:var(--size-label-m)] font-extralight uppercase tracking-[1.15px] text-text-link whitespace-nowrap">
                Discourse
              </p>
            </div>
          </div>
        </div>

        {/* polaroid cluster — center-left */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[24%] top-[42%] h-[58%] w-[28%]"
        >
          <div className="absolute left-[4%] top-[4%] h-[72%] w-[68%]">
            <Image
              src={`${NOTES}/polaroid-base.png`}
              alt=""
              fill
              sizes="(min-width: 1440px) 351px, 28vw"
              className="object-contain"
            />
          </div>
          <div className="absolute left-[8%] top-[8%] h-[56%] w-[56%]">
            <Image
              src={`${NOTES}/polaroid-photo.png`}
              alt=""
              fill
              sizes="(min-width: 1440px) 324px, 24vw"
              className="object-cover"
            />
          </div>
          <p className="absolute bottom-[2%] left-[10%] right-0 text-right font-[family-name:var(--font-notes)] text-[length:var(--size-body-s)] font-extralight lowercase tracking-[1.5px] text-text-link">
            Aging like a fine meme.
            <br />
            Happy birthday, Tyler!
          </p>
        </div>

        {/* peace of mind — paper + clip, right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[55%] top-[45%] h-[40%] w-[32%]"
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={`${NOTES}/peace-paper.png`}
              alt=""
              fill
              sizes="(min-width: 1440px) 460px, 32vw"
              className="object-cover object-left-top scale-[2.5] -translate-x-[12%] -translate-y-[16%]"
            />
          </div>
          <div className="absolute left-[5%] top-[10%] h-[78%] w-[18%] -scale-y-100 rotate-180">
            <Image
              src={`${NOTES}/paperclip.png`}
              alt=""
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>
          <p className="absolute left-[23%] right-[45%] top-[14%] text-right font-[family-name:var(--font-notes)] text-[length:var(--size-body-s)] font-extralight uppercase tracking-[1.5px] text-text-link whitespace-nowrap">
            Peace of mind
          </p>
          <p className="absolute -right-[4%] -top-[12%] w-[26%] -rotate-[29deg] text-right font-[family-name:var(--font-notes)] text-[length:var(--size-label-s)] font-extralight lowercase tracking-[1.17px] text-zinc-500 line-through">
            press the frame you
          </p>
        </div>

        {/* sculpture figure — bleeds off bottom-right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[47.5%] top-[30%] h-[131%] w-[47%]"
        >
          <Image
            src={`${NOTES}/sculpture-figure.png`}
            alt=""
            fill
            sizes="(min-width: 1440px) 682px, 47vw"
            className="object-cover object-top"
          />
        </div>

        {/* discourse paper — right, flipped */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[9%] top-[61%] flex h-[36%] w-[19%] items-center justify-center"
        >
          <div className="relative h-[88%] w-[87%] -scale-y-100 rotate-[-172deg]">
            <div className="relative h-full w-full">
              <span className="absolute inset-x-0 top-[6.5%] bottom-[6.3%] bg-stone-200 shadow-[-13px_0_12px_-6px_rgba(0,0,0,0.25)]" />
              <span className="absolute left-[17.8%] right-[16.6%] top-[-2%] bottom-[82%]">
                <Image
                  src={`${NOTES}/discourse-tape.png`}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </span>
              <p className="absolute left-[29%] right-[39%] top-[calc(50%-65px)] text-right font-[family-name:var(--font-notes)] text-[length:var(--size-label-m)] font-extralight uppercase tracking-[1.15px] text-text-link whitespace-nowrap">
                Discourse
              </p>
            </div>
          </div>
        </div>

        {/* framed portrait — bottom right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-[69%] h-[17%] w-[14%] border-2 border-zinc-50 shadow-[0_3px_13px_rgba(0,0,0,0.15)]"
        >
          <Image
            src={`${NOTES}/portrait-frame.png`}
            alt=""
            fill
            sizes="(min-width: 1440px) 203px, 14vw"
            className="object-cover"
          />
        </div>

        {/* faded birthday scraps — bottom left */}
        <p
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[8%] left-[11%] w-[14%] -rotate-[15deg] text-right font-[family-name:var(--font-notes)] text-[length:var(--size-overline)] font-extralight lowercase tracking-[0.97px] text-zinc-700 opacity-40"
        >
          Aging like a fine meme.
          <br />
          Happy birthday, Tyler!
        </p>
      </div>
    </section>
  );
}
