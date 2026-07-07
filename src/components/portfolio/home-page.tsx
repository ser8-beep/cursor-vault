"use client";

import { useRef } from "react";
import { BackgroundLayers } from "./background-layers";
import { SecondFoldStateOne } from "./second-fold-state-one";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-x-clip bg-[#e5e3df]"
    >
      <BackgroundLayers />

      <div className="relative z-10 mx-auto w-full max-w-[1440px]">
        <SecondFoldStateOne />
      </div>

    </div>
  );
}
