// ─── Sprite Configuration ─────────────────────────────────────────────────
//
// Edit this file once your sprite assets are ready.
// All animation behaviour is driven entirely from these values.
//
// FILE STRUCTURE EXPECTED IN public/sprites/:
//
//   public/sprites/
//     idle/
//       frame_0.png
//       frame_1.png
//       ... (frameCount - 1 frames total)
//     blink/
//       frame_0.png
//       frame_1.png
//       ...
//     wave/
//       frame_0.png
//       frame_1.png
//       ...
//     walk/
//       frame_0.png
//       frame_1.png
//       ...
//
// FRAME REQUIREMENTS:
//   - Format:     PNG with transparency (RGBA)
//   - Background: fully transparent
//   - Rendering:  image-rendering: pixelated (handled by the component)
//   - Dimensions: all frames within one animation must be identical pixels
//   - Scale:      the component scales the image to fit; do NOT pre-scale
//
// RECOMMENDED FRAME SIZES (pick one and use it consistently):
//   Small sprite:  32 × 48 px  (upscaled ~8× in the hero container)
//   Medium sprite: 48 × 64 px  (upscaled ~6×)
//   Large sprite:  64 × 80 px  (upscaled ~5×)
//
// Once you know your actual dimensions, update frameWidth / frameHeight below.

export type AnimName = "idle" | "blink" | "wave" | "walk";

export interface AnimConfig {
  /** Number of frames in this animation. */
  frameCount: number;
  /** Playback speed in frames per second. */
  fps: number;
  /** Whether this animation loops forever. */
  loop: boolean;
  /**
   * Animation to switch to automatically when a non-looping animation ends.
   * Looping animations ignore this field.
   */
  nextAnim: AnimName;
}

export interface SpriteConfig {
  /**
   * Pixel width of a single frame, in source pixels.
   * Used for display only — the component scales by CSS, not by this value.
   * Set this to the actual width of your source PNGs.
   */
  frameWidth: number;

  /**
   * Pixel height of a single frame, in source pixels.
   * Used to compute the display aspect ratio so the image is never distorted.
   */
  frameHeight: number;

  /**
   * Base path for sprite frames, relative to /public.
   * Default: "/sprites". Do not add a trailing slash.
   */
  basePath: string;

  /** Per-animation settings. */
  animations: Record<AnimName, AnimConfig>;

  /**
   * How often (in ms) the idle loop triggers a spontaneous blink.
   * A random jitter of ±30% is added automatically so it doesn't feel mechanical.
   * Set to 0 to disable automatic blinking.
   */
  blinkIntervalMs: number;

  /**
   * If true, the character plays the wave animation once after the page loads.
   * The delay is controlled by waveOnMountDelayMs.
   */
  waveOnMount: boolean;

  /**
   * Delay (ms) before the mount wave plays.
   * Gives the hero entrance animation time to complete first.
   */
  waveOnMountDelayMs: number;

  /**
   * Accessible label for the sprite image (used as aria-label).
   */
  ariaLabel: string;
}

// ─── Fill in your values here ────────────────────────────────────────────────
const spriteConfig: SpriteConfig = {
  // ── Replace these with your actual frame dimensions ──────────────────────
  frameWidth:  96,   // px — the width of one source PNG frame
  frameHeight: 144,  // px — the height of one source PNG frame

  basePath: "/sprites",

  animations: {
    idle: {
      frameCount: 4,   // adjust to match the number of idle frames you supply
      fps:        6,   // slow gentle breathing feel
      loop:       true,
      nextAnim:   "idle",
    },
    blink: {
      frameCount: 3,   // typically: eyes-open → half-closed → closed
      fps:        12,  // fast — a blink is ~250ms
      loop:       false,
      nextAnim:   "idle",
    },
    wave: {
      frameCount: 6,   // adjust to your wave frame count
      fps:        8,
      loop:       false,
      nextAnim:   "idle",
    },
    walk: {
      frameCount: 4,   // typical 4-frame walk cycle
      fps:        10,
      loop:       true,
      nextAnim:   "idle",
    },
  },

  blinkIntervalMs:    4500,  // blink roughly every 4.5 seconds
  waveOnMount:        true,
  waveOnMountDelayMs: 1400,  // let the hero animation settle first

  ariaLabel: "Pixel-art character — Bhavya",
};

export default spriteConfig;
