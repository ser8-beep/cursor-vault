import { SiteHeader, Hero, ContactBar, CaseStudyCarousel, DataStoriesSection } from "@/components";

/**
 * home-template — first fold (header / splash / pseudo-footer fills the
 * viewport) followed by the case-study carousel.
 */
export default function Home() {
  return (
    <div className="canvas-pattern flex min-h-screen flex-col gap-gap-md p-canvas overflow-x-clip">
      <div className="flex min-h-[calc(100svh-var(--padding-canvas)*2)] flex-col justify-between gap-gap-lg">
        <SiteHeader />
        <Hero />
        <ContactBar />
      </div>
      <CaseStudyCarousel />
      <DataStoriesSection />
    </div>
  );
}
