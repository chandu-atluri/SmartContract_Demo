"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SMART_CONTRACT_STEPS, TRADITIONAL_STEPS } from "./steps";
import type { ProcessMode } from "./types";

export function useDemoPlayer() {
  const [mode, setMode] = useState<ProcessMode>("traditional");
  const [stepIndex, setStepIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const steps = useMemo(
    () => (mode === "traditional" ? TRADITIONAL_STEPS : SMART_CONTRACT_STEPS),
    [mode],
  );
  const step = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;
  // Autoplay naturally idles once it reaches the last step; derive the
  // display/interaction state instead of flipping it off inside the effect.
  const isPlaying = autoplay && !isLastStep;

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  useEffect(() => {
    if (!isPlaying) return;
    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setStepIndex((i) => Math.min(i + 1, steps.length - 1));
    }, step.durationMs);
    return clearTimer;
  }, [isPlaying, step.durationMs, steps.length, clearTimer]);

  const play = useCallback(() => {
    setStepIndex((i) => (i === steps.length - 1 ? 0 : i));
    setAutoplay(true);
  }, [steps.length]);

  const pause = useCallback(() => setAutoplay(false), []);

  const reset = useCallback(() => {
    clearTimer();
    setAutoplay(false);
    setStepIndex(0);
  }, [clearTimer]);

  const goToStep = useCallback(
    (index: number) => {
      clearTimer();
      setAutoplay(false);
      setStepIndex(Math.max(0, Math.min(index, steps.length - 1)));
    },
    [clearTimer, steps.length],
  );

  const switchMode = useCallback(
    (next: ProcessMode) => {
      clearTimer();
      setAutoplay(false);
      setMode(next);
      setStepIndex(0);
    },
    [clearTimer],
  );

  return {
    mode,
    switchMode,
    steps,
    step,
    stepIndex,
    isPlaying,
    isLastStep,
    play,
    pause,
    reset,
    goToStep,
  };
}
