import type { ScrollLockSnapshot } from "./types";

let snapshot: ScrollLockSnapshot | null = null;

/** Pin the document at the current scroll offset (no layout jump). */
export function lockPageScroll(): ScrollLockSnapshot {
  if (typeof window === "undefined") return { scrollY: 0 };
  if (snapshot) return snapshot;

  const scrollY = window.scrollY;
  snapshot = { scrollY };

  const { style } = document.body;
  style.position = "fixed";
  style.top = `-${scrollY}px`;
  style.left = "0";
  style.right = "0";
  style.width = "100%";
  style.overflow = "hidden";

  return snapshot;
}

/** Restore page scroll to the pinned offset. */
export function unlockPageScroll(): number {
  if (typeof window === "undefined") return 0;

  const scrollY = snapshot?.scrollY ?? 0;
  snapshot = null;

  const { style } = document.body;
  style.position = "";
  style.top = "";
  style.left = "";
  style.right = "";
  style.width = "";
  style.overflow = "";

  window.scrollTo(0, scrollY);

  return scrollY;
}

export function isPageScrollLocked(): boolean {
  return snapshot !== null;
}

export function getLockedScrollY(): number {
  return snapshot?.scrollY ?? (typeof window !== "undefined" ? window.scrollY : 0);
}
