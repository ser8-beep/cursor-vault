import Image from "next/image";

/**
 * splash-organism — hero display line split around a blurred marble
 * sculpture.
 *
 * Desktop/Laptop: single row — "BUILDING SYSTEMS" left, "THAT MAKE SENSE"
 * right, sculpture centered behind, subtitle under the left segment.
 * Tablet/Mobile: the two display segments stack (left-aligned, then
 * right-aligned) so the line keeps its reading order and asymmetry
 * instead of shrinking; sculpture sits behind at reduced scale.
 */
export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative flex flex-1 w-full min-h-[calc(var(--section-hero)*3)] items-center overflow-visible"
    >
      {/* sculpture-position — crop geometry mirrors the Figma frame
          (366×782 window, image at 180.67%/113.3%, offset -70.44%/-13.25%).
          The 27px "sculpture-blur" effect belongs to the splash-enter
          animation keyframe, so the resting state renders sharp. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 laptop:left-[52%] top-1/2 z-0 laptop:z-20 -translate-x-1/2 -translate-y-[46%] h-[calc(100svh-var(--section-hero)*2.2)] laptop:h-[calc(100svh-var(--section-hero)*1.15)] max-h-[calc(var(--space-160)*4.9)] aspect-[366/782] overflow-hidden"
      >
        <Image
          src="/figma/sculpture.png"
          alt=""
          width={832}
          height={1114}
          priority
          sizes="(min-width: 1280px) 662px, 55vw"
          className="absolute max-w-none w-[180.67%] h-[113.3%] left-[-70.44%] top-[-13.25%] object-cover"
        />
      </div>

      {/* text-animation-molecule */}
      <div className="relative z-10 laptop:z-0 flex w-full flex-col gap-gap-xl tablet:gap-gap-lg laptop:flex-row laptop:items-center laptop:justify-between">
        <div className="flex flex-col gap-gap-sm laptop:gap-[var(--space-12)]">
          <h1 className="font-display [font-stretch:expanded] uppercase text-hero leading-[var(--leading-hero)] tracking-normal text-text-primary laptop:whitespace-nowrap">
            Building <span className="text-text-link">systems</span>
          </h1>
          <p className="font-display uppercase text-base leading-[var(--leading-3)] tracking-wider text-text-secondary max-w-[var(--width-nav-card)]">
            Product_designer //AI native_lean UX_systems_workflows
          </p>
        </div>
        <p
          className="self-end laptop:self-auto text-right font-display [font-stretch:expanded] uppercase text-hero leading-[var(--leading-hero)] tracking-normal text-text-primary laptop:whitespace-nowrap"
          aria-hidden="true"
        >
          That make sense
        </p>
        {/* Full sentence for assistive tech; visual line is split above */}
        <span className="sr-only">Building systems that make sense</span>
      </div>
    </section>
  );
}
