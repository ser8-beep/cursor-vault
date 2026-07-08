import { clamp01 } from "@/lib/motion/homePrototype";

let rafId = 0;
let pendingVideo: HTMLVideoElement | null = null;
let pendingProgress = 0;

/**
 * Schedule a video scrub on the next animation frame.
 * Batches rapid wheel events into one decode per frame.
 */
export function scrubVideoToProgress(video: HTMLVideoElement | null, progress: number): void {
  if (!video) return;

  pendingVideo = video;
  pendingProgress = clamp01(progress);

  if (rafId) return;

  rafId = window.requestAnimationFrame(() => {
    rafId = 0;
    const target = pendingVideo;
    if (!target || !Number.isFinite(target.duration) || target.duration <= 0) return;

    const time = pendingProgress * target.duration;
    if (Math.abs(target.currentTime - time) > 0.02) {
      target.currentTime = time;
    }
  });
}

export function cancelVideoScrub(): void {
  if (rafId) {
    window.cancelAnimationFrame(rafId);
    rafId = 0;
  }
  pendingVideo = null;
}
