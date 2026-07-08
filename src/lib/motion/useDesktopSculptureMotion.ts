"use client";

import { useEffect, useState } from "react";

/** Desktop sculpture sticky parallax — laptop+ (1280px), independent of mobile scroll motion. */
export function useDesktopSculptureMotion(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return enabled;
}
