"use client";

import { motion } from "framer-motion";
import { research } from "@/data/portfolio";

const reveal = (delay = 0) => ({
  initial:     { opacity: 0, filter: "blur(5px)", y: 6 },
  whileInView: { opacity: 1, filter: "blur(0px)", y: 0 },
  viewport:    { once: true, margin: "-50px" },
  transition:  { duration: 0.5, delay, ease: "easeOut" as const },
});

export default function Research() {
  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      style={{ paddingTop: "5rem", paddingBottom: "5rem", borderTop: "1px solid #24282e" }}
    >
      <div className="section-inner">

        <motion.span {...reveal()} className="section-label">research</motion.span>

        {/* Heading + status inline */}
        <motion.div
          {...reveal(0.05)}
          style={{ display: "flex", alignItems: "baseline", gap: "0.875rem", flexWrap: "wrap", marginBottom: "0.5rem" }}
        >
          <h2
            id="research-heading"
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(1.125rem, 2vw, 1.375rem)",
              fontWeight:    500,
              fontStyle:     "italic",
              letterSpacing: "-0.02em",
              color:         "#f2f3f5",
              margin:        0,
            }}
          >
            {research.area}
          </h2>
          <span style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.6rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color:         "#e8551a",
          }}>
            {research.status}
          </span>
        </motion.div>

        <motion.p
          {...reveal(0.1)}
          style={{
            fontSize:     "0.8125rem",
            color:        "#8b9096",
            lineHeight:   1.75,
            maxWidth:     560,
            marginBottom: "1.25rem",
          }}
        >
          {research.description}
        </motion.p>

        <motion.div {...reveal(0.15)}>
          <p style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.6rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color:         "#4a5057",
            marginBottom:  "0.625rem",
          }}>
            areas of focus
          </p>
          <ul
            role="list"
            style={{
              listStyle:     "none",
              margin:        0,
              padding:       0,
              display:       "flex",
              flexDirection: "column",
              gap:           "0.35rem",
            }}
          >
            {research.focus.map((item, i) => (
              <li
                key={i}
                style={{
                  display:    "flex",
                  gap:        "0.625rem",
                  fontSize:   "0.8125rem",
                  color:      "#4a5057",
                  lineHeight: 1.6,
                }}
              >
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize:   "0.55rem",
                  color:      "#2e333a",
                  marginTop:  "0.3em",
                  flexShrink: 0,
                }}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
