import { HomeScrollExperience } from "@/components";

/**
 * home-template — first fold entrance + scroll-linked second fold
 * (Figma frames 13:32063 → 13:32102).
 */
export default function Home() {
  return (
    <div className="canvas-pattern min-h-screen overflow-x-clip">
      <HomeScrollExperience />
    </div>
  );
}
