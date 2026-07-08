"use client";

import { useMotionValue, useMotionValueEvent } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEFAULT_CHOREOGRAPHY_END,
  DEFAULT_TRAVEL_PX,
  PROGRESS_EPSILON,
} from "./constants";
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
const HANDOFF_BUFFER_PX = 8;
/** Reverse handoff zone extends this far above the viewport top. */
const REVERSE_BUFFER_PX = 48;
/** Reverse handoff when first-fold bottom is in the upper viewport band. */
const REVERSE_ZONE_MAX_PX = 160;

/**
 * Scroll handoff controller — locks page scroll at the first-fold boundary and
 * maps wheel/touch deltas to normalized progress (0 → 1).
 */
export function useInternalScroll({
  handoffRef,
  enabled,
  travelPx = DEFAULT_TRAVEL_PX,
  choreographyEnd = DEFAULT_CHOREOGRAPHY_END,
}: UseInternalScrollOptions): InternalScrollController {
  const progress = useMotionValue(0);
  const choreographyProgress = useMotionValue(0);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<InternalScrollPhase>("idle");

  const isActiveRef = useRef(false);
  const phaseRef = useRef<InternalScrollPhase>("idle");
  const travelPxRef = useRef(travelPx);
  const choreographyEndRef = useRef(choreographyEnd);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    travelPxRef.current = travelPx;
  }, [travelPx]);

  useEffect(() => {
    choreographyEndRef.current = choreographyEnd;
  }, [choreographyEnd]);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

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

  useMotionValueEvent(progress, "change", (value) => {
    if (
      isActiveRef.current ||
      (value > PROGRESS_EPSILON && value < 1 - PROGRESS_EPSILON)
    ) {
      syncChoreography(value);
    }
  });

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
      if (!isActiveRef.current) return;
      unlockPageScroll();
      isActiveRef.current = false;
      setIsActive(false);

      if (direction === "forward") {
        progress.set(1);
        syncChoreography(1);
        setPhase("completed");
        phaseRef.current = "completed";
        return;
      }

      progress.set(0);
      syncChoreography(0);
      setPhase("idle");
      phaseRef.current = "idle";
    },
    [progress, syncChoreography],
  );

  const applyDelta = useCallback(
    (deltaPx: number) => {
      const current = progress.get();
      const next = Math.min(
        1,
        Math.max(0, current + deltaPx / travelPxRef.current),
      );
      progress.set(next);

      if (next >= 1 - PROGRESS_EPSILON && deltaPx > 0) {
        exit("forward");
        return;
      }
      if (next <= PROGRESS_EPSILON && deltaPx < 0) {
        exit("backward");
      }
    },
    [progress, exit],
  );

  const shouldCaptureWheel = useCallback(
    (delta: number) => {
      const rect = getHandoffRect();
      if (!rect) return false;

      if (isActiveRef.current) return true;

      const current = progress.get();

      if (
        delta > 0 &&
        rect.bottom <= HANDOFF_BUFFER_PX &&
        (phaseRef.current !== "completed" || current < 1 - PROGRESS_EPSILON)
      ) {
        return true;
      }

      if (
        delta < 0 &&
        rect.bottom <= REVERSE_ZONE_MAX_PX &&
        rect.bottom >= -REVERSE_BUFFER_PX &&
        (phaseRef.current === "completed" || current > PROGRESS_EPSILON)
      ) {
        return true;
      }

      return false;
    },
    [progress, getHandoffRect],
  );

  useEffect(() => {
    if (!enabled) {
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
      if (!enabledRef.current) return;

      const delta = event.deltaY;
      if (!shouldCaptureWheel(delta)) return;

      event.preventDefault();

      if (!isActiveRef.current) {
        if (delta < 0 && phaseRef.current === "completed") {
          progress.set(1);
        }
        enter();
      }

      applyDelta(delta);
    };

    let touchLastY = 0;

    const onTouchStart = (event: TouchEvent) => {
      touchLastY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!enabledRef.current) return;

      const touchY = event.touches[0]?.clientY ?? touchLastY;
      const delta = (touchLastY - touchY) * 1.5;
      touchLastY = touchY;
      if (Math.abs(delta) < 0.5) return;

      if (!shouldCaptureWheel(delta)) return;

      event.preventDefault();

      if (!isActiveRef.current) {
        if (delta < 0 && phaseRef.current === "completed") {
          progress.set(1);
        }
        enter();
      }

      applyDelta(delta);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      if (isPageScrollLocked()) unlockPageScroll();
    };
  }, [
    enabled,
    enter,
    applyDelta,
    progress,
    choreographyProgress,
    shouldCaptureWheel,
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
