"use client";

// ─── useAnimationCycle ───────────────────────────────────────────────────────
// Drives the sprite state machine:
//   idle → (random interval) blink → idle
//   idle → (on mount, once)  wave  → idle
//   idle → (forceAnim)       walk  → loops until forceAnim("idle")
//   any  → (forceAnim)       any   → bypasses all locks
//
// Returns the current animation name, frame index, and forceAnim().
// Fully respects prefers-reduced-motion.

import { useCallback, useEffect, useRef, useState } from "react";
import type { AnimName, SpriteConfig } from "@/data/spriteConfig";

export interface AnimState {
  animName:   AnimName;
  frameIndex: number;
}

export function useAnimationCycle(
  config: SpriteConfig,
  reducedMotion: boolean,
): AnimState & { forceAnim: (name: AnimName) => void } {
  const [anim, setAnim]   = useState<AnimName>("idle");
  const [frame, setFrame] = useState(0);

  // locked: prevents a second non-looping anim from interrupting one in progress.
  const locked = useRef(false);
  // manualLoop: set when the user explicitly forces a looping anim (e.g. walk).
  // Prevents the auto-blink scheduler from cutting in.
  const manualLoop = useRef(false);

  // ── Frame ticker ──────────────────────────────────────────────────────────
  // Uses a LOCAL mutable counter (localFrame) so no side-effects ever appear
  // inside a React state-updater function.  Recreates the interval whenever
  // the active animation changes.
  useEffect(() => {
    if (reducedMotion) return;

    const animCfg    = config.animations[anim];
    const intervalMs = 1000 / animCfg.fps;
    let   localFrame = 0;

    const id = setInterval(() => {
      localFrame += 1;

      if (localFrame >= animCfg.frameCount) {
        if (animCfg.loop) {
          localFrame = 0;
          setFrame(0);
        } else {
          // Non-looping finished: release all locks and transition.
          clearInterval(id);
          locked.current     = false;
          manualLoop.current = false;
          setAnim(animCfg.nextAnim);
          setFrame(0);
        }
      } else {
        setFrame(localFrame);
      }
    }, intervalMs);

    return () => clearInterval(id);
    // `config` omitted intentionally – it is a stable module singleton.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anim, reducedMotion]);

  // ── forceAnim (external — for buttons) ───────────────────────────────────
  // Bypasses both `locked` and `manualLoop`.
  const forceAnim = useCallback(
    (name: AnimName) => {
      if (reducedMotion) return;
      // Clear existing locks so we can always respond to explicit user action.
      locked.current     = false;
      manualLoop.current = false;

      const cfg = config.animations[name];
      if (!cfg.loop) {
        locked.current = true;
      } else if (name !== "idle") {
        // A user-initiated looping anim (walk) sets manualLoop to block auto-blink.
        manualLoop.current = true;
      }

      setAnim(name);
      setFrame(0);
    },
    [config, reducedMotion],
  );

  // ── triggerAnim (internal — for auto-blink / wave-on-mount) ──────────────
  // Respects locked AND manualLoop.
  const triggerAnim = useCallback(
    (name: AnimName) => {
      if (reducedMotion) return;
      if (locked.current)     return;
      if (manualLoop.current) return; // don't interrupt user-initiated walk
      const cfg = config.animations[name];
      if (!cfg.loop) locked.current = true;
      setAnim(name);
      setFrame(0);
    },
    [config, reducedMotion],
  );

  // ── Blink scheduler ───────────────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;
    if (config.blinkIntervalMs <= 0) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleBlink = () => {
      const jitter = (Math.random() * 0.6 - 0.3) * config.blinkIntervalMs;
      const delay  = config.blinkIntervalMs + jitter;
      timeoutId = setTimeout(() => {
        triggerAnim("blink");
        scheduleBlink();
      }, delay);
    };

    scheduleBlink();
    return () => clearTimeout(timeoutId);
  }, [config.blinkIntervalMs, triggerAnim, reducedMotion]);

  // ── Wave on mount (fires once, after the hero entrance settles) ───────────
  useEffect(() => {
    if (reducedMotion) return;
    if (!config.waveOnMount) return;

    const id = setTimeout(() => triggerAnim("wave"), config.waveOnMountDelayMs);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reducedMotion) {
    return { animName: "idle", frameIndex: 0, forceAnim: () => {} };
  }

  return { animName: anim, frameIndex: frame, forceAnim };
}
