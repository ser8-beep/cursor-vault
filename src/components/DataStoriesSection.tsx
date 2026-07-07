/**
 * home-template second fold — data stories (OOO content).
 * Stub shell for scroll target; full story blocks to follow.
 */
export function DataStoriesSection() {
  return (
    <section
      id="data-stories"
      aria-label="Data stories"
      className="flex w-full flex-col gap-2xl pb-[var(--space-48)] scroll-mt-[var(--space-48)]"
    >
      <p className="font-display uppercase text-label-s leading-normal tracking-[var(--tracking-caption)] text-text-muted whitespace-pre-wrap">
        <span className="text-main">DATA_STORIES</span>
        {" //  OOO\n"}
        {"                               01_EXPLORATIONS\n"}
        {"                               02_NOTES\n"}
        {"                               03_EXPERIMENTS"}
      </p>
    </section>
  );
}
