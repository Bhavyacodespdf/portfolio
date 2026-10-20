"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/portfolio";

// Blur-in reveal (ref: sd-blurIn — opacity + blur + translateY)
const blurUp = (delay = 0) => ({
  initial:    { opacity: 0, filter: "blur(6px)", y: 5 },
  animate:    { opacity: 1, filter: "blur(0px)", y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

const taglineTopics = personal.tagline
  .split("·")
  .map((t) => t.trim())
  .filter(Boolean);

export default function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      aria-label="Introduction"
      style={{
        minHeight:     "100dvh",
        display:       "flex",
        alignItems:    "center",
        paddingTop:    "4.5rem",
        paddingBottom: "4rem",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", width: "100%" }}>

        {/* Two-column grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "center" }}
          className="hero-grid"
        >

          {/* ── Left: text ─────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>

            {/* Eyebrow */}
            <motion.p {...blurUp(0.05)} style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.6875rem",
              letterSpacing: "0.1em",
              color:         "#8b9096",
              margin:        0,
            }}>
              hi, it&apos;s me
            </motion.p>

            {/* Name */}
            <motion.div {...blurUp(0.12)}>
              <h1 style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "clamp(2.25rem, 4.5vw, 3.25rem)",
                fontWeight:    500,
                fontStyle:     "italic",
                letterSpacing: "-0.02em",
                lineHeight:    1.05,
                color:         "#f2f3f5",
                margin:        0,
              }}>
                {personal.name}
                <span className="cursor-blink" aria-hidden="true" />
              </h1>
            </motion.div>

            {/* Tagline chips */}
            <motion.div
              {...blurUp(0.2)}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}
            >
              {taglineTopics.map((topic) => (
                <span key={topic} className="tagline-chip">
                  {topic.toLowerCase()}
                </span>
              ))}
            </motion.div>

            {/* Intro */}
            <motion.p {...blurUp(0.28)} style={{
              fontFamily: "var(--font-serif)",
              fontSize:   "clamp(0.875rem, 1.5vw, 1rem)",
              color:      "#c5c8cc",
              lineHeight: 1.7,
              maxWidth:   480,
              margin:     0,
            }}>
              {personal.intro}
            </motion.p>

            {/* Location */}
            <motion.p {...blurUp(0.38)} style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.65rem",
              letterSpacing: "0.07em",
              color:         "#4a5057",
              margin:        0,
            }}>
              {personal.location}
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...blurUp(0.44)}
              style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap", marginTop: "0.125rem" }}
            >
              <button
                onClick={() => scrollTo("#projects")}
                className="u-link"
                style={{
                  background: "none",
                  border:     "none",
                  cursor:     "pointer",
                  fontFamily: "var(--font-serif)",
                  fontSize:   "0.875rem",
                  color:      "#f2f3f5",
                  padding:    0,
                }}
              >
                view my work
              </button>

              <span style={{ color: "#24282e", fontSize: "0.75rem" }}>·</span>

              <button
                onClick={() => scrollTo("#about")}
                className="u-link"
                style={{
                  background: "none",
                  border:     "none",
                  cursor:     "pointer",
                  fontFamily: "var(--font-serif)",
                  fontSize:   "0.875rem",
                  color:      "#8b9096",
                  padding:    0,
                }}
              >
                about me
              </button>
            </motion.div>

            {/* Social */}
            <motion.div
              {...blurUp(0.5)}
              style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}
            >
              {[
                { href: personal.github,               label: "github"   },
                { href: personal.linkedin,             label: "linkedin" },
                { href: personal.leetcode,             label: "leetcode" },
                { href: `mailto:${personal.email}`,    label: "email"    },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    fontFamily:    "var(--font-mono)",
                    fontSize:      "0.6875rem",
                    letterSpacing: "0.07em",
                    color:         "#4a5057",
                    transition:    "color 180ms ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#e8551a"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#4a5057"; }}
                >
                  {label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: cozy illustration ──────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            className="hero-character-col"
          >
            <img
              src="/images/cozy-coding-illustration.png"
              alt="Cozy coding illustration — character sitting on sofa with laptop, coffee, and lamp"
              draggable={false}
              className="hero-illustration"
              style={{
                display:   "block",
                width:     "100%",
                height:    "auto",
                objectFit: "contain",
              }}
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{ marginTop: "3.5rem", display: "flex", alignItems: "center", gap: "0.625rem" }}
        >
          <div style={{ width: 24, height: 1, background: "#24282e" }} />
          <span style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.6rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color:         "#4a5057",
          }}>
            scroll
          </span>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr 420px !important;
            gap: 4rem !important;
          }
        }
        /* Illustration sizing */
        .hero-illustration {
          max-width: 320px;
        }
        @media (min-width: 900px) {
          .hero-illustration {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
