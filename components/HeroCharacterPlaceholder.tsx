// HeroCharacterPlaceholder.tsx
// ──────────────────────────────────────────────────────────────────────────
// Temporary placeholder for the animated pixel-art sprite.
// To replace: swap this component with HeroSprite.tsx without changing Hero.tsx.
// The container dimensions and class names must remain stable.

"use client";

import { motion } from "framer-motion";

export default function HeroCharacterPlaceholder() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      // Stable wrapper — keep this className and dimensions
      className="hero-character-container"
      style={{
        width: "100%",
        maxWidth: 380,
        aspectRatio: "3/4",
        position: "relative",
        margin: "0 auto",
      }}
      aria-label="Character placeholder — pixel-art sprite coming soon"
      role="img"
    >
      {/* Outer border frame */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "1px solid #272727",
          borderRadius: 4,
          overflow: "hidden",
          background: "#0e0e0e",
        }}
      >
        {/* Pixel grid background */}
        <div
          className="pixel-grid"
          style={{ position: "absolute", inset: 0, opacity: 0.6 }}
        />

        {/* Corner accents */}
        <div style={{ position: "absolute", top: 12, left: 12, width: 16, height: 16, borderTop: "2px solid #e8b4a0", borderLeft: "2px solid #e8b4a0" }} />
        <div style={{ position: "absolute", top: 12, right: 12, width: 16, height: 16, borderTop: "2px solid #e8b4a0", borderRight: "2px solid #e8b4a0" }} />
        <div style={{ position: "absolute", bottom: 12, left: 12, width: 16, height: 16, borderBottom: "2px solid #e8b4a0", borderLeft: "2px solid #e8b4a0" }} />
        <div style={{ position: "absolute", bottom: 12, right: 12, width: 16, height: 16, borderBottom: "2px solid #e8b4a0", borderRight: "2px solid #e8b4a0" }} />

        {/* Central placeholder content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.25rem",
          }}
        >
          {/* Pixel-art silhouette placeholder */}
          <div style={{ position: "relative" }}>
            {/* Head */}
            <div style={{
              width: 40, height: 40,
              background: "#1c1c1c",
              border: "1px solid #333",
              borderRadius: 2,
              margin: "0 auto 4px",
              position: "relative",
            }}>
              {/* Glasses */}
              <div style={{
                position: "absolute", bottom: 10, left: 6,
                display: "flex", gap: 4,
              }}>
                <div style={{ width: 10, height: 7, border: "1.5px solid #e8b4a0", borderRadius: 1 }} />
                <div style={{ width: 10, height: 7, border: "1.5px solid #e8b4a0", borderRadius: 1 }} />
              </div>
              {/* Hair strands */}
              <div style={{
                position: "absolute", top: -4, left: 4, right: 4, height: 8,
                background: "#3a2a20",
                borderRadius: "2px 2px 0 0",
              }} />
            </div>
            {/* Body */}
            <div style={{
              width: 52, height: 60,
              background: "#161616",
              border: "1px solid #2a2a2a",
              borderRadius: 2,
              margin: "0 auto",
            }}>
              {/* Arms */}
              <div style={{
                position: "absolute",
                left: -12, top: 4,
                width: 10, height: 40,
                background: "#161616",
                border: "1px solid #2a2a2a",
                borderRadius: 2,
              }} />
              <div style={{
                position: "absolute",
                right: -12, top: 4,
                width: 10, height: 40,
                background: "#161616",
                border: "1px solid #2a2a2a",
                borderRadius: 2,
              }} />
            </div>
          </div>

          {/* Label */}
          <div style={{ textAlign: "center" }}>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#4a4a4a",
              marginBottom: 4,
            }}>
              sprite_placeholder.png
            </p>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.06em",
              color: "#333",
            }}>
              awaiting pixel-art sprite
            </p>
          </div>
        </div>

        {/* Status badge */}
        <div style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#161616",
          border: "1px solid #272727",
          borderRadius: 2,
          padding: "2px 8px",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#4a4a4a",
          }}>
            char_idle.anim
          </span>
        </div>
      </div>
    </motion.div>
  );
}
