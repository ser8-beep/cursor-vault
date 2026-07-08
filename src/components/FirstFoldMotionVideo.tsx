"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";
import {
  INTERNAL_SCROLL_VIDEO_SRC,
  PROGRESS_EPSILON,
  cancelVideoScrub,
  scrubVideoToProgress,
} from "@/lib/internal-scroll";

type FirstFoldMotionVideoProps = {
  progress: MotionValue<number>;
  isActive: boolean;
  enabled: boolean;
};

/**
 * Scroll-driven motion video for the first-fold → second-fold handoff.
 * Mounts when internal scroll starts; scrubs with normalized progress (0 → 1).
 */
export function FirstFoldMotionVideo({
  progress,
  isActive,
  enabled,
}: FirstFoldMotionVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isActiveRef = useRef(isActive);
  const enabledRef = useRef(enabled);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  const updateVisible = (value: number) => {
    if (!enabledRef.current) {
      setVisible(false);
      return;
    }
    setVisible(
      isActiveRef.current ||
        (value > PROGRESS_EPSILON && value < 1 - PROGRESS_EPSILON),
    );
  };

  useMotionValueEvent(progress, "change", (value) => {
    updateVisible(value);
    if (
      enabledRef.current &&
      (isActiveRef.current ||
        (value > PROGRESS_EPSILON && value < 1 - PROGRESS_EPSILON))
    ) {
      scrubVideoToProgress(videoRef.current, value);
    }
  });

  useEffect(() => {
    if (!enabled) {
      setVisible(false);
      return;
    }
    updateVisible(progress.get());
  }, [enabled, isActive, progress]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !visible) return;

    const prime = () => {
      video.pause();
      scrubVideoToProgress(video, progress.get());
    };

    video.addEventListener("loadedmetadata", prime);
    if (video.readyState >= 1) prime();

    return () => {
      video.removeEventListener("loadedmetadata", prime);
      cancelVideoScrub();
    };
  }, [progress, visible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || visible) return;
    video.pause();
    video.currentTime = 0;
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[var(--z-20)] flex items-center justify-center bg-canvas"
      data-name="first-fold-motion-video"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover object-center"
        src={INTERNAL_SCROLL_VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
      />
    </div>
  );
}
