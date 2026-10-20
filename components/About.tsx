"use client";

import { motion } from "framer-motion";
import { personal, academics } from "@/data/portfolio";

const reveal = (delay = 0) => ({
  initial:     { opacity: 0, filter: "blur(5px)", y: 6 },
  whileInView: { opacity: 1, filter: "blur(0px)", y: 0 },
  viewport:    { once: true, margin: "-50px" },
  transition:  { duration: 0.5, delay, ease: "easeOut" as const },
});

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      style={{ paddingTop: "5rem", paddingBottom: "5rem", borderTop: "1px solid #24282e" }}
    >
      <div className="section-inner">

        <motion.span {...reveal()} className="section-label">about</motion.span>

        <motion.h2
          {...reveal(0.05)}
          id="about-heading"
          className="section-intro"
          style={{ marginBottom: "1.75rem" }}
        >
          CS student building at the intersection of AI, software, and design.
        </motion.h2>

        {/* Academic highlights row */}
        <motion.div
          {...reveal(0.1)}
          style={{
            display:       "flex",
            gap:           "2rem",
            flexWrap:      "wrap",
            marginBottom:  "2rem",
            paddingBottom: "1.75rem",
            borderBottom:  "1px solid #24282e",
          }}
        >
          {academics.highlights.map(({ stat, detail }) => (
            <div key={stat}>
              <p style={{
                fontFamily:  "var(--font-display)",
                fontStyle:   "italic",
                fontSize:    "1.0625rem",
                fontWeight:  500,
                color:       "#e8551a",
                margin:      0,
                lineHeight:  1.2,
              }}>
                {stat}
              </p>
              <p style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.6rem",
                letterSpacing: "0.07em",
                color:         "#4a5057",
                marginTop:     "0.25rem",
              }}>
                {detail}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          {...reveal(0.15)}
          style={{ fontSize: "0.875rem", color: "#c5c8cc", lineHeight: 1.8, marginBottom: "0.875rem" }}
        >
          {personal.bio}
        </motion.p>

        <motion.p
          {...reveal(0.18)}
          style={{ fontSize: "0.875rem", color: "#8b9096", lineHeight: 1.8, marginBottom: "2rem" }}
        >
          {personal.bioParagraph2}
        </motion.p>

        {/* Metadata */}
        <motion.div
          {...reveal(0.22)}
          style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
        >
          {[
            { label: "location", value: personal.location },
            { label: "status",   value: "open to opportunities" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.625rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color:         "#4a5057",
                marginBottom:  3,
              }}>
                {label}
              </p>
              <p style={{ fontSize: "0.75rem", color: "#8b9096", fontStyle: "italic" }}>{value}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
