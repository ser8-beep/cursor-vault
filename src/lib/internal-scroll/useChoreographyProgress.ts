"use client";

import {
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import { useEffect, useRef } from "react";
import { clamp01, mapRange } from "@/lib/motion/homePrototype";
import { DEFAULT_CHOREOGRAPHY_END, PROGRESS_EPSILON } from "./constants";
import type { InternalScrollController } from "./types";

type UseChoreographyProgressOptions = {
  documentProgress: MotionValue<number>;
  internalScroll: InternalScrollController;
  choreographyEnd?: number;
};

/**
 * Merges document scroll progress with internal-scroll progress into one
 * choreography stream for hero → second-fold motion.
 */
export function useChoreographyProgress({
  documentProgress,
  internalScroll,
  choreographyEnd = DEFAULT_CHOREOGRAPHY_END,
}: UseChoreographyProgressOptions): MotionValue<number> {
  const effectiveProgress = useMotionValue(0);
  const handoffDocumentProgressRef = useRef(0);
  const choreographyEndRef = useRef(choreographyEnd);

  useEffect(() => {
    choreographyEndRef.current = choreographyEnd;
  }, [choreographyEnd]);

  const applyDocumentProgress = (doc: number) => {
    const end = choreographyEndRef.current;
    const phase = internalScroll.phaseRef.current;
    const internal = internalScroll.progress.get();

    if (internalScroll.isActiveRef.current || (internal > 0 && internal < 1)) {
      effectiveProgress.set(
        mapRange(clamp01(internal), 0, 1, 0, end),
      );
      return;
    }

    if (phase === "completed") {
      const handoffDoc = handoffDocumentProgressRef.current;
      if (doc <= handoffDoc) {
        effectiveProgress.set(end);
        return;
      }
      effectiveProgress.set(mapRange(doc, handoffDoc, 1, end, 1));
      return;
    }

    if (phase === "idle" && internal <= PROGRESS_EPSILON) {
      effectiveProgress.set(Math.min(doc, end));
    }
  };

  useMotionValueEvent(documentProgress, "change", applyDocumentProgress);

  useMotionValueEvent(internalScroll.choreographyProgress, "change", (value) => {
    if (
      internalScroll.isActiveRef.current ||
      internalScroll.progress.get() > PROGRESS_EPSILON
    ) {
      effectiveProgress.set(value);
    }
  });

  useMotionValueEvent(internalScroll.progress, "change", (value) => {
    if (value >= 1 - PROGRESS_EPSILON && internalScroll.phaseRef.current === "completed") {
      handoffDocumentProgressRef.current = documentProgress.get();
      applyDocumentProgress(documentProgress.get());
      return;
    }
    if (value <= PROGRESS_EPSILON && internalScroll.phaseRef.current === "idle") {
      handoffDocumentProgressRef.current = 0;
      applyDocumentProgress(documentProgress.get());
    }
  });

  useEffect(() => {
    applyDocumentProgress(documentProgress.get());
  }, [documentProgress, internalScroll.phase]);

  return effectiveProgress;
}

/** Read-only helper for mapping without subscribing. */
export function mergeScrollProgress(
  documentProgress: number,
  internalProgress: number,
  phase: InternalScrollController["phase"],
  handoffDocumentProgress: number,
  choreographyEnd = DEFAULT_CHOREOGRAPHY_END,
): number {
  if (phase === "active" || (internalProgress > 0 && internalProgress < 1)) {
    return mapRange(clamp01(internalProgress), 0, 1, 0, choreographyEnd);
  }

  if (phase === "completed") {
    if (documentProgress <= handoffDocumentProgress) return choreographyEnd;
    return mapRange(
      documentProgress,
      handoffDocumentProgress,
      1,
      choreographyEnd,
      1,
    );
  }

  return Math.min(documentProgress, choreographyEnd);
}
