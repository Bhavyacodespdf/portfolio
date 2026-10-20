// HeroSprite.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Animated pixel-art character with speech bubble and interactive controls.
//
// SPRITE ASSETS: public/sprites/{idle,blink,wave,walk}/frame_N.png
// CONFIG:        data/spriteConfig.ts

"use client";

import { motion } from "framer-motion";
import { useEffect, useReducer, useRef, useState } from "react";
import spriteConfig from "@/data/spriteConfig";
import { useAnimationCycle } from "@/hooks/useAnimationCycle";

// ── Reduced-motion detection ──────────────────────────────────────────────────
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

// ── Per-frame error tracking ──────────────────────────────────────────────────
type FailedKey = string; // `${animName}/${frameIndex}`

// ── Control button ────────────────────────────────────────────────────────────
interface CtrlBtnProps {
  label:      string;
  onClick:    () => void;
  active?:    boolean;  // aria-pressed toggle state
  isToggle?:  boolean;
  disabled?:  boolean;
}

function ControlButton({ label, onClick, active, isToggle, disabled }: CtrlBtnProps) {
  return (
    <button
      className="sprite-ctrl-btn"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={isToggle ? active : undefined}
      style={{ flex: 1 }}
    >
      {label}
    </button>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroSprite() {
  const reducedMotion = useReducedMotion();
  const { animName, frameIndex, forceAnim } = useAnimationCycle(spriteConfig, reducedMotion);

  const [isWorking, setIsWorking] = useState(false);

  const failedFrames = useRef<Set<FailedKey>>(new Set());
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  const currentKey: FailedKey = `${animName}/${frameIndex}`;
  const frameFailed = failedFrames.current.has(currentKey);

  const frameSrc    = `${spriteConfig.basePath}/${animName}/frame_${frameIndex}.png`;
  const sourceAspect = spriteConfig.frameWidth / spriteConfig.frameHeight;

  // Derived state
  const isWalking = animName === "walk";
  const isWaving  = animName === "wave";
  const isBlinking = animName === "blink";

  let bubbleText = "hi, I'm Bhavya! \uD83D\uDC4B";
  if (isWorking)       bubbleText = "busy building something cool... \uD83D\uDCBB";
  else if (isWalking)  bubbleText = "taking a stroll... \uD83D\uDEB6";
  else if (isWaving)   bubbleText = "hey there! \uD83D\uDC4B";
  else if (isBlinking) bubbleText = "...";

  function handleImageError() {
    failedFrames.current.add(currentKey);
    forceUpdate();
  }

  function handleHi() {
    setIsWorking(false);
    forceAnim("wave");
  }

  function handleWalk() {
    setIsWorking(false);
    if (isWalking) {
      forceAnim("idle");
    } else {
      forceAnim("walk");
    }
  }

  function handleWork() {
    forceAnim("idle");
    setIsWorking(true);
  }

  function handleBlink() {
    setIsWorking(false);
    forceAnim("blink");
  }

  // When animName changes away from walk/blink/wave naturally, clear isWorking guard
  useEffect(() => {
    if (animName === "idle" && !isWalking) {
      // don't clear isWorking here — work mode deliberately stays on idle
    }
  }, [animName, isWalking]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      style={{
        width:    "100%",
        maxWidth: 380,
        margin:   "0 auto",
        display:  "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Panel ──────────────────────────────────────────────────────────── */}
      <div
        style={{
          width:        "100%",
          aspectRatio:  "3/4",
          position:     "relative",
          border:       "1px solid #272727",
          borderBottom: "none",
          borderRadius: "4px 4px 0 0",
          overflow:     "hidden",
          background:   "#0e0e0e",
        }}
      >
        {/* Pixel grid background */}
        <div
          className="pixel-grid"
          style={{ position: "absolute", inset: 0, opacity: 0.4 }}
        />

        {/* Corner accents */}
        <div style={{ position: "absolute", top: 12, left: 12,   width: 16, height: 16, borderTop:    "2px solid #e8b4a0", borderLeft:   "2px solid #e8b4a0" }} className={isWorking ? "work-pulse-accent" : ""} />
        <div style={{ position: "absolute", top: 12, right: 12,  width: 16, height: 16, borderTop:    "2px solid #e8b4a0", borderRight:  "2px solid #e8b4a0" }} className={isWorking ? "work-pulse-accent" : ""} />
        <div style={{ position: "absolute", bottom: 12, left: 12,  width: 16, height: 16, borderBottom: "2px solid #e8b4a0", borderLeft:   "2px solid #e8b4a0" }} className={isWorking ? "work-pulse-accent" : ""} />
        <div style={{ position: "absolute", bottom: 12, right: 12, width: 16, height: 16, borderBottom: "2px solid #e8b4a0", borderRight:  "2px solid #e8b4a0" }} className={isWorking ? "work-pulse-accent" : ""} />

        {/* Speech bubble */}
        <div
          style={{
            position:  "absolute",
            top:       12,
            left:      "50%",
            transform: "translateX(-50%)",
            zIndex:    10,
            display:   "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background:   "#161616",
              border:       "1px solid #2e2e2e",
              borderRadius: 4,
              padding:      "4px 10px",
              whiteSpace:   "nowrap",
              minHeight:    "1.8em",
              display:      "flex",
              alignItems:   "center",
            }}
          >
            <span
              key={bubbleText}
              className="bubble-text"
              style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.58rem",
                letterSpacing: "0.06em",
                color:         "#9a9692",
              }}
            >
              {bubbleText}
            </span>
          </div>
          {/* Pointer triangle pointing down */}
          <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid #2e2e2e" }} />
          <div style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid #161616", marginTop: -4 }} />
        </div>

        {/* Coffee mug — bottom-left */}
        <div style={{ position: "absolute", bottom: 22, left: "9%", zIndex: 5 }} aria-hidden="true">
          <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
            {/* Steam wisps */}
            <path d="M9 14 Q11 10 9 6"  stroke="#4a3a2a" strokeWidth="1.3" strokeLinecap="round" className="steam-1"/>
            <path d="M14 12 Q16  8 14 4" stroke="#4a3a2a" strokeWidth="1.3" strokeLinecap="round" className="steam-2"/>
            {/* Rim */}
            <rect x="1" y="15" width="24" height="3" rx="1.5" fill="#242424" stroke="#333" strokeWidth="0.8"/>
            {/* Body */}
            <rect x="2" y="17" width="22" height="21" rx="2" fill="#1a1a1a" stroke="#2e2e2e" strokeWidth="0.8"/>
            {/* Handle */}
            <path d="M24 21 Q31 21 31 27.5 Q31 34 24 34" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Liquid surface */}
            <rect x="3" y="18" width="20" height="3" rx="1" fill="#2d1508"/>
            {/* Subtle accent stripe */}
            <rect x="2" y="30" width="22" height="1.5" rx="0.5" fill="#261208" opacity="0.6"/>
          </svg>
        </div>

        {/* Desk lamp — bottom-right */}
        <div style={{ position: "absolute", bottom: 20, right: "7%", zIndex: 5 }} aria-hidden="true">
          <svg width="48" height="76" viewBox="0 0 48 76" fill="none">
            <defs>
              <radialGradient id="halo" cx="50%" cy="60%" r="50%">
                <stop offset="0%"   stopColor="#d4813a" stopOpacity="0.22"/>
                <stop offset="100%" stopColor="#d4813a" stopOpacity="0"/>
              </radialGradient>
            </defs>
            {/* Ambient glow beneath shade */}
            <ellipse cx="24" cy="34" rx="18" ry="11" fill="url(#halo)" className="lamp-glow"/>
            {/* Lampshade — downward cone */}
            <path d="M10 30 L17 18 L31 18 L38 30 Z" fill="#1e1e1e" stroke="#323232" strokeWidth="0.8"/>
            {/* Inner warm glow */}
            <path d="M12 29 L18 20 L30 20 L36 29 Z" fill="#2a1505" className="lamp-inner" opacity="0.9"/>
            {/* Top cap */}
            <rect x="16" y="16" width="16" height="3" rx="1" fill="#252525" stroke="#303030" strokeWidth="0.8"/>
            {/* Stem */}
            <line x1="24" y1="18" x2="24" y2="62" stroke="#252525" strokeWidth="2" strokeLinecap="round"/>
            {/* Base plate */}
            <rect x="14" y="62" width="20" height="4"  rx="2"   fill="#1e1e1e" stroke="#2e2e2e" strokeWidth="0.8"/>
            <rect x="10" y="65" width="28" height="3.5" rx="1.5" fill="#191919" stroke="#282828" strokeWidth="0.8"/>
          </svg>
        </div>

        {/* Sprite area */}
        <div
          style={{
            position:       "absolute",
            inset:          0,
            display:        "flex",
            alignItems:     "flex-end",
            justifyContent: "center",
            padding:        "2.5rem 2rem 2rem",
          }}
        >
          {frameFailed ? (
            <FallbackSilhouette />
          ) : (
            <div
              style={{
                position:    "relative",
                width:       "100%",
                maxWidth:    "70%",
                aspectRatio: `${sourceAspect}`,
              }}
            >
              {/*
               * Plain <img> — NOT next/image.
               * next/image doesn't reliably flush at 6–12fps; native <img>
               * swaps from cache instantly with no flicker.
               */}
              <img
                key={frameSrc}
                src={frameSrc}
                alt=""
                draggable={false}
                style={{
                  position:       "absolute",
                  inset:          0,
                  width:          "100%",
                  height:         "100%",
                  objectFit:      "contain",
                  objectPosition: "bottom center",
                  imageRendering: "pixelated",
                  display:        "block",
                  userSelect:     "none",
                  filter:         isWorking ? "brightness(0.85)" : undefined,
                }}
                onError={handleImageError}
              />
            </div>
          )}
        </div>

        {/* Anim state badge (bottom-right, unobtrusive) */}
        <div
          style={{
            position:     "absolute",
            bottom:       10,
            right:        12,
            background:   "#111",
            border:       "1px solid #1e1e1e",
            borderRadius: 2,
            padding:      "1px 6px",
          }}
          aria-hidden="true"
        >
          <span style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.52rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color:         "#333",
          }}>
            {reducedMotion ? "idle" : isWorking ? "work" : animName}.anim
          </span>
        </div>
      </div>

      {/* ── Controls bar ───────────────────────────────────────────────────── */}
      <div
        style={{
          display:      "flex",
          borderLeft:   "1px solid #272727",
          borderRight:  "1px solid #272727",
          borderBottom: "1px solid #272727",
          borderRadius: "0 0 4px 4px",
          background:   "#0b0b0b",
          overflow:     "hidden",
        }}
        role="group"
        aria-label="Character controls"
      >
        <ControlButton
          label="hi!"
          onClick={handleHi}
          disabled={reducedMotion || isWaving}
        />
        <div style={{ width: 1, background: "#1e1e1e", flexShrink: 0 }} />
        <ControlButton
          label="walk"
          onClick={handleWalk}
          isToggle
          active={isWalking}
          disabled={reducedMotion}
        />
        <div style={{ width: 1, background: "#1e1e1e", flexShrink: 0 }} />
        <ControlButton
          label="work"
          onClick={handleWork}
          isToggle
          active={isWorking}
          disabled={reducedMotion}
        />
        <div style={{ width: 1, background: "#1e1e1e", flexShrink: 0 }} />
        <ControlButton
          label="blink"
          onClick={handleBlink}
          disabled={reducedMotion || isBlinking}
        />
      </div>

      <style>{`
        /* ── Control buttons ── */
        .sprite-ctrl-btn {
          background:    transparent;
          border:        none;
          padding:       6px 0;
          cursor:        pointer;
          font-family:   var(--font-mono);
          font-size:     0.58rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color:         #4a4643;
          transition:    color 140ms ease, background 140ms ease;
          min-width:     0;
        }
        .sprite-ctrl-btn:hover:not(:disabled) {
          color:      #e8b4a0;
          background: #111;
        }
        .sprite-ctrl-btn:focus-visible {
          outline:        1px solid #e8b4a0;
          outline-offset: -1px;
          color:          #e8b4a0;
        }
        .sprite-ctrl-btn:active:not(:disabled) {
          background: #161616;
        }
        .sprite-ctrl-btn[aria-pressed="true"] {
          color:      #e8b4a0;
          background: #111;
        }
        .sprite-ctrl-btn:disabled {
          cursor:  default;
          opacity: 0.3;
        }

        /* ── Speech bubble text fade-in ── */
        @keyframes sprite-bubble-fadein {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .bubble-text {
          animation: sprite-bubble-fadein 220ms ease forwards;
        }

        /* ── Work mode corner pulse ── */
        @keyframes work-pulse {
          0%, 100% { opacity: 1;    border-color: #e8b4a0; }
          50%       { opacity: 0.35; border-color: #c9947e; }
        }
        .work-pulse-accent {
          animation: work-pulse 1.8s ease-in-out infinite;
        }

        /* ── Coffee steam ── */
        @keyframes steam-rise {
          0%   { opacity: 0;   transform: translateY(0px)   scaleX(1);   }
          40%  { opacity: 0.7; transform: translateY(-5px)  scaleX(1.15); }
          100% { opacity: 0;   transform: translateY(-11px) scaleX(0.85); }
        }
        .steam-1 { animation: steam-rise 2.4s ease-in-out infinite; }
        .steam-2 { animation: steam-rise 2.4s ease-in-out 0.75s infinite; }

        /* ── Lamp glow pulse ── */
        @keyframes lamp-pulse {
          0%, 100% { opacity: 1;   }
          50%       { opacity: 0.55; }
        }
        .lamp-glow  { animation: lamp-pulse 3.2s ease-in-out infinite; }
        .lamp-inner { animation: lamp-pulse 3.2s ease-in-out 0.4s infinite; }
      `}</style>
    </motion.div>
  );
}

// ── Fallback silhouette ───────────────────────────────────────────────────────
function FallbackSilhouette() {
  return (
    <div
      style={{
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        gap:           "1.25rem",
      }}
    >
      <div style={{ position: "relative" }}>
        {/* Head */}
        <div style={{
          width: 40, height: 40,
          background:   "#1c1c1c",
          border:       "1px solid #333",
          borderRadius: 2,
          margin:       "0 auto 4px",
          position:     "relative",
        }}>
          <div style={{ position: "absolute", bottom: 10, left: 6, display: "flex", gap: 4 }}>
            <div style={{ width: 10, height: 7, border: "1.5px solid #e8b4a0", borderRadius: 1 }} />
            <div style={{ width: 10, height: 7, border: "1.5px solid #e8b4a0", borderRadius: 1 }} />
          </div>
          <div style={{ position: "absolute", top: -4, left: 4, right: 4, height: 8, background: "#3a2a20", borderRadius: "2px 2px 0 0" }} />
        </div>
        {/* Body */}
        <div style={{ width: 52, height: 60, background: "#161616", border: "1px solid #2a2a2a", borderRadius: 2, margin: "0 auto" }} />
      </div>

      <p style={{
        fontFamily:    "var(--font-mono)",
        fontSize:      "0.58rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color:         "#333",
        textAlign:     "center",
      }}>
        sprite not found
      </p>
    </div>
  );
}
