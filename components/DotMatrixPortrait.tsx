"use client";

/**
 * DotMatrixPortrait
 *
 * Loads /images/bhavya-portrait.jpeg, samples pixel luminance on a regular
 * grid, and renders each sample as an antialiased dot whose opacity tracks
 * image brightness.  Bright areas (face, hair, skin) produce visible dots;
 * dark areas recede into the background.
 *
 * Animations (all skipped under prefers-reduced-motion):
 *   - Staggered radial entrance
 *   - Slow diagonal brightness wave
 *   - Cursor-proximity ripple (base → orange)
 *
 * Fallback: "portrait unavailable" if the image fails to load.
 */

import { useEffect, useRef, useCallback, useState } from "react";

// ─── Canvas dimensions (matches photo 3:4 ratio exactly) ──────────────────
const W = 360;
const H = 480;
const SPACING = 7;   // tighter grid = more facial detail
const DOT_R   = 1.4;
const AA      = 0.7;

// ─── Colours ──────────────────────────────────────────────────────────────
const BASE:   readonly [number, number, number] = [240, 235, 227];  // warm off-white
const TEAL:   readonly [number, number, number] = [45,  212, 191];  // #2dd4bf
const ORANGE: readonly [number, number, number] = [232,  85,  26];  // #e8551a
const BG:     readonly [number, number, number] = [14,   16,  19];  // #0e1013

// ─── Pre-computed antialiased disc kernel ─────────────────────────────────
interface KPx { dx: number; dy: number; weight: number }

function buildKernel(): KPx[] {
  const kr = Math.ceil(DOT_R + AA);
  const out: KPx[] = [];
  for (let dy = -kr; dy <= kr; dy++) {
    for (let dx = -kr; dx <= kr; dx++) {
      const d = Math.hypot(dx, dy);
      if      (d <= DOT_R)        out.push({ dx, dy, weight: 1 });
      else if (d <= DOT_R + AA)   out.push({ dx, dy, weight: 1 - (d - DOT_R) / AA });
    }
  }
  return out;
}

// ─── Dot ──────────────────────────────────────────────────────────────────
interface Dot {
  px:     number;
  py:     number;
  baseOp: number;   // derived from image luminance
  phase:  number;   // random wave phase
  teal:   boolean;
  orange: boolean;
}

function buildDotsFromImageData(data: Uint8ClampedArray): Dot[] {
  const dots: Dot[] = [];
  const cols = Math.round((W - SPACING) / SPACING) + 1;
  const rows = Math.round((H - SPACING) / SPACING) + 1;
  const ox   = (W - (cols - 1) * SPACING) / 2;
  const oy   = (H - (rows - 1) * SPACING) / 2;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const px = ox + c * SPACING;
      const py = oy + r * SPACING;
      const ix = Math.min(W - 1, Math.max(0, Math.round(px)));
      const iy = Math.min(H - 1, Math.max(0, Math.round(py)));

      const base = (iy * W + ix) * 4;
      const R    = data[base];
      const G    = data[base + 1];
      const B    = data[base + 2];
      // Perceptual luminance
      const lum  = (0.299 * R + 0.587 * G + 0.114 * B) / 255;

      // Soft ramp: near-black → 0, mid-grey → ~0.45, bright → 0.88
      // Threshold at 0.06 so pure-black bg pixels produce no dots
      let baseOp = 0;
      if (lum > 0.06) {
        baseOp = Math.min(0.88, ((lum - 0.06) / 0.94) * 0.88);
      }

      if (baseOp < 0.025) continue;

      // Teal on bright highlight zones (~9%), orange on warm mid-tones (~5%)
      const teal   = lum > 0.68 && Math.random() < 0.09;
      const orange = !teal && lum > 0.30 && lum < 0.60 && Math.random() < 0.05;

      dots.push({ px, py, baseOp, phase: Math.random() * Math.PI * 2, teal, orange });
    }
  }
  return dots;
}

// ─── Component ────────────────────────────────────────────────────────────
export default function DotMatrixPortrait() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rafRef     = useRef(0);
  const t0Ref      = useRef(0);
  const mouseRef   = useRef({ x: -9999, y: -9999 });
  const dotsRef    = useRef<Dot[]>([]);
  const kernelRef  = useRef<KPx[]>([]);
  const pixelBufRef= useRef<ImageData | null>(null);
  const reducedRef = useRef(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  // ── Load image → sample luminance → build dots ────────────────────────
  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    kernelRef.current  = buildKernel();

    const img  = new window.Image();
    img.onload = () => {
      const off = document.createElement("canvas");
      off.width  = W;
      off.height = H;
      const ctx  = off.getContext("2d");
      if (!ctx) { setStatus("error"); return; }

      // The photo is 768×1024 (3:4), canvas is 360×480 (3:4) — exact fit, no crop.
      ctx.drawImage(img, 0, 0, W, H);

      const imgData  = ctx.getImageData(0, 0, W, H);
      dotsRef.current = buildDotsFromImageData(imgData.data);
      setStatus("ready");
    };
    img.onerror = () => setStatus("error");
    img.src = "/images/bhavya-portrait.jpeg";
  }, []);

  // ── RAF draw loop ──────────────────────────────────────────────────────
  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current;
    if (!canvas) { rafRef.current = requestAnimationFrame(draw); return; }
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx)   { rafRef.current = requestAnimationFrame(draw); return; }

    if (!t0Ref.current) t0Ref.current = ts;
    const t   = (ts - t0Ref.current) * 0.001;
    const red = reducedRef.current;

    if (!pixelBufRef.current) pixelBufRef.current = ctx.createImageData(W, H);
    const { data } = pixelBufRef.current;

    // Fast background fill
    const u32    = new Uint32Array(data.buffer);
    const bgPack = ((255 << 24) | (BG[2] << 16) | (BG[1] << 8) | BG[0]) >>> 0;
    u32.fill(bgPack);

    const mx     = mouseRef.current.x;
    const my     = mouseRef.current.y;
    const kernel = kernelRef.current;

    for (const dot of dotsRef.current) {
      // Staggered entrance — dots nearer canvas centre appear first
      const radDist = Math.hypot(dot.px - W / 2, dot.py - H * 0.42);
      const delay   = red ? 0 : (radDist / 280) * 0.65;
      const entry   = red ? 1 : Math.min(1, Math.max(0, (t - delay) / 0.8));
      if (entry <= 0) continue;

      // Slow diagonal wave (subtle brightness shimmer)
      const wave   = red ? 0 : Math.sin(t * 0.38 + dot.phase + dot.px * 0.013 + dot.py * 0.009) * 0.07;
      // Cursor ripple
      const cd     = Math.hypot(dot.px - mx, dot.py - my);
      const ripple = red ? 0 : Math.max(0, 1 - cd / 80) * 0.20;

      const op = Math.min(1, (dot.baseOp + wave + ripple) * entry);
      if (op < 0.01) continue;

      // Colour: teal or orange accent dots; base = warm off-white; cursor → orange shift
      const oMix = Math.min(1, ripple * 2.5);
      let cr: number, cg: number, cb_: number;
      if (dot.teal) {
        cr  = Math.round(TEAL[0]   + (ORANGE[0] - TEAL[0])   * oMix);
        cg  = Math.round(TEAL[1]   + (ORANGE[1] - TEAL[1])   * oMix);
        cb_ = Math.round(TEAL[2]   + (ORANGE[2] - TEAL[2])   * oMix);
      } else if (dot.orange) {
        cr  = ORANGE[0]; cg = ORANGE[1]; cb_ = ORANGE[2];
      } else {
        cr  = Math.round(BASE[0]   + (ORANGE[0] - BASE[0])   * oMix);
        cg  = Math.round(BASE[1]   + (ORANGE[1] - BASE[1])   * oMix);
        cb_ = Math.round(BASE[2]   + (ORANGE[2] - BASE[2])   * oMix);
      }

      const ox = Math.round(dot.px);
      const oy = Math.round(dot.py);
      for (const { dx, dy, weight } of kernel) {
        const x = ox + dx;
        const y = oy + dy;
        if (x < 0 || x >= W || y < 0 || y >= H) continue;
        const i = (y * W + x) * 4;
        const a = op * weight;
        data[i]     = BG[0] + Math.round((cr  - BG[0]) * a);
        data[i + 1] = BG[1] + Math.round((cg  - BG[1]) * a);
        data[i + 2] = BG[2] + Math.round((cb_ - BG[2]) * a);
      }
    }

    ctx.putImageData(pixelBufRef.current, 0, 0);
    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    if (status !== "ready") return;
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw, status]);

  // ── Cursor tracking ───────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onMove  = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - r.left) * (W / r.width),
        y: (e.clientY - r.top)  * (H / r.height),
      };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove",  onMove);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      canvas.removeEventListener("mousemove",  onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // ── Fallback ──────────────────────────────────────────────────────────
  if (status === "error") {
    return (
      <div style={{
        width:          "100%",
        maxWidth:       W,
        aspectRatio:    `${W} / ${H}`,
        background:     "#0e1013",
        border:         "1px solid #24282e",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
      }}>
        <span style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.6rem",
          letterSpacing: "0.08em",
          color:         "#4a5057",
        }}>
          portrait unavailable
        </span>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      aria-hidden="true"
      style={{
        display:    "block",
        width:      "100%",
        maxWidth:   W,
        height:     "auto",
        opacity:    status === "ready" ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    />
  );
}
