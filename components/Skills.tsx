"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      style={{ paddingTop: "5rem", paddingBottom: "5rem", borderTop: "1px solid #24282e" }}
    >
      <div className="section-inner">

        <motion.span
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="section-label"
        >
          skills
        </motion.span>

        <motion.h2
          id="skills-heading"
          initial={{ opacity: 0, filter: "blur(5px)", y: 6 }} whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
          className="section-intro"
        >
          Technologies &amp; tools.
        </motion.h2>

        {/* Flat grouped list — no cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {(Object.entries(skills) as [string, readonly string[]][]).map(([category, items], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, filter: "blur(3px)", y: 4 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: ci * 0.06, ease: "easeOut" }}
              style={{ display: "flex", gap: "1.5rem", alignItems: "baseline", flexWrap: "wrap" }}
            >
              {/* Category label */}
              <span style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.625rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color:         "#4a5057",
                flexShrink:    0,
                minWidth:      "9rem",
              }}>
                {category}
              </span>

              {/* Skills — inline, subtle separation */}
              <p style={{
                fontFamily: "var(--font-serif)",
                fontSize:   "0.8125rem",
                color:      "#8b9096",
                lineHeight: 1.7,
                margin:     0,
              }}>
                {items.join(",  ")}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
          style={{
            marginTop:     "2rem",
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.6rem",
            letterSpacing: "0.06em",
            color:         "#2e3238",
            fontStyle:     "italic",
          }}
        >
          at varying levels of familiarity — always learning more.
        </motion.p>
      </div>
    </section>
  );
}
