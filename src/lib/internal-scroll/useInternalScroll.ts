"use client";

import { useMotionValue, useMotionValueEvent } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEFAULT_CHOREOGRAPHY_END,
  PROGRESS_EPSILON,
} from "./constants";
import { animateProgress, durationFromWheelDelta } from "./inertialProgress";
import { internalToChoreography } from "./mapProgress";
import {
  isPageScrollLocked,
  lockPageScroll,
  unlockPageScroll,
} from "./scrollLock";
import type {
  InternalScrollController,
  InternalScrollExitDirection,
  InternalScrollPhase,
  UseInternalScrollOptions,
} from "./types";

/** First-fold bottom within this px of viewport top → forward handoff. */
const HANDOFF_BUFFER_PX = 48;
/** Reverse handoff only when first-fold bottom re-enters near viewport top. */
const REVERSE_TOP_MAX_PX = 120;

/**
 * Scroll handoff — one trackpad flick triggers an inertial internal sequence (0→1
 * or 1→0), not 1:1 finger tracking. Page scroll locks during the animation.
 */
export function useInternalScroll({
  handoffRef,
  enabled,
  choreographyEnd = DEFAULT_CHOREOGRAPHY_END,
  onForwardComplete,
  onBackwardComplete,
}: UseInternalScrollOptions): InternalScrollController {
  const progress = useMotionValue(0);
  const choreographyProgress = useMotionValue(0);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<InternalScrollPhase>("idle");

  const isActiveRef = useRef(false);
  const phaseRef = useRef<InternalScrollPhase>("idle");
  const isAnimatingRef = useRef(false);
  const cancelAnimationRef = useRef<(() => void) | null>(null);
  const choreographyEndRef = useRef(choreographyEnd);
  const enabledRef = useRef(enabled);
  const onForwardCompleteRef = useRef(onForwardComplete);
  const onBackwardCompleteRef = useRef(onBackwardComplete);

  useEffect(() => {
    choreographyEndRef.current = choreographyEnd;
  }, [choreographyEnd]);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    onForwardCompleteRef.current = onForwardComplete;
  }, [onForwardComplete]);

  useEffect(() => {
    onBackwardCompleteRef.current = onBackwardComplete;
  }, [onBackwardComplete]);

  const getHandoffRect = useCallback(() => {
    const el = handoffRef.current;
    if (!el) return null;
    return el.getBoundingClientRect();
  }, [handoffRef]);

  const syncChoreography = useCallback(
    (internal: number) => {
      choreographyProgress.set(
        internalToChoreography(internal, choreographyEndRef.current),
      );
    },
    [choreographyProgress],
  );

  const setProgress = useCallback(
    (value: number) => {
      progress.set(value);
      syncChoreography(value);
    },
    [progress, syncChoreography],
  );

  useMotionValueEvent(progress, "change", (value) => {
    if (
      isActiveRef.current ||
      isAnimatingRef.current ||
      (value > PROGRESS_EPSILON && value < 1 - PROGRESS_EPSILON)
    ) {
      syncChoreography(value);
    }
  });

  const cancelAnimation = useCallback(() => {
    cancelAnimationRef.current?.();
    cancelAnimationRef.current = null;
    isAnimatingRef.current = false;
  }, []);

  const enter = useCallback(() => {
    if (!enabledRef.current || isActiveRef.current) return;
    lockPageScroll();
    isActiveRef.current = true;
    setIsActive(true);
    setPhase("active");
    phaseRef.current = "active";
  }, []);

  const exit = useCallback(
    (direction: InternalScrollExitDirection = "forward") => {
      cancelAnimation();
      if (!isActiveRef.current && !isAnimatingRef.current) {
        if (direction === "forward") {
          setProgress(1);
          setPhase("completed");
          phaseRef.current = "completed";
          onForwardCompleteRef.current?.();
        } else {
          setProgress(0);
          setPhase("idle");
          phaseRef.current = "idle";
          onBackwardCompleteRef.current?.();
        }
        return;
      }

      unlockPageScroll();
      isActiveRef.current = false;
      setIsActive(false);

      if (direction === "forward") {
        setProgress(1);
        setPhase("completed");
        phaseRef.current = "completed";
        onForwardCompleteRef.current?.();
        return;
      }

      setProgress(0);
      setPhase("idle");
      phaseRef.current = "idle";
      onBackwardCompleteRef.current?.();
    },
    [cancelAnimation, setProgress],
  );

  const runInertialScroll = useCallback(
    (direction: "forward" | "backward", deltaY: number) => {
      cancelAnimation();

      const target = direction === "forward" ? 1 : 0;
      const from = progress.get();

      if (
        (direction === "forward" && from >= 1 - PROGRESS_EPSILON) ||
        (direction === "backward" && from <= PROGRESS_EPSILON)
      ) {
        exit(direction === "forward" ? "forward" : "backward");
        return;
      }

      if (!isActiveRef.current) {
        if (direction === "backward" && phaseRef.current === "completed") {
          setProgress(1);
        }
        enter();
      }

      isAnimatingRef.current = true;
      const durationMs = durationFromWheelDelta(deltaY);

      cancelAnimationRef.current = animateProgress(from, target, setProgress, {
        durationMs,
        onUpdate: setProgress,
        onComplete: () => {
          if (!isAnimatingRef.current) return;
          isAnimatingRef.current = false;
          cancelAnimationRef.current = null;
          exit(direction === "forward" ? "forward" : "backward");
        },
      });
    },
    [cancelAnimation, enter, exit, progress, setProgress],
  );

  const shouldCaptureForward = useCallback(() => {
    const rect = getHandoffRect();
    if (!rect) return false;
    if (phaseRef.current === "completed") return false;
    /* First fold consumed — one flick plays the full inertial sequence. */
    return rect.bottom <= HANDOFF_BUFFER_PX;
  }, [getHandoffRect]);

  const shouldCaptureReverse = useCallback(() => {
    const rect = getHandoffRect();
    if (!rect) return false;
    if (phaseRef.current !== "completed") return false;
    return rect.bottom <= REVERSE_TOP_MAX_PX && rect.bottom >= -HANDOFF_BUFFER_PX;
  }, [getHandoffRect]);

  useEffect(() => {
    if (!enabled) {
      cancelAnimation();
      if (isPageScrollLocked()) unlockPageScroll();
      isActiveRef.current = false;
      setIsActive(false);
      progress.set(0);
      choreographyProgress.set(0);
      setPhase("idle");
      phaseRef.current = "idle";
      return;
    }

    const onWheel = (event: WheelEvent) => {
      if (!enabledRef.current || isAnimatingRef.current) return;

      const delta = event.deltaY;
      if (Math.abs(delta) < 1) return;

      const forward = delta > 0 && shouldCaptureForward();
      const reverse = delta < 0 && shouldCaptureReverse();

      if (!forward && !reverse) return;

      event.preventDefault();
      runInertialScroll(forward ? "forward" : "backward", delta);
    };

    let touchStartY = 0;

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!enabledRef.current || isAnimatingRef.current) return;
      const touch = event.changedTouches[0];
      if (!touch) return;

      const delta = touchStartY - touch.clientY;
      if (Math.abs(delta) < 24) return;

      const forward = delta > 0 && shouldCaptureForward();
      const reverse = delta < 0 && shouldCaptureReverse();
      if (!forward && !reverse) return;

      runInertialScroll(forward ? "forward" : "backward", delta * 2);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimation();
      if (isPageScrollLocked()) unlockPageScroll();
    };
  }, [
    enabled,
    cancelAnimation,
    progress,
    choreographyProgress,
    runInertialScroll,
    shouldCaptureForward,
    shouldCaptureReverse,
  ]);

  return {
    progress,
    choreographyProgress,
    isActive,
    phase,
    isActiveRef,
    phaseRef,
    enter,
    exit,
  };
}
