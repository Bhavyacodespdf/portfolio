"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      style={{ paddingTop: "5rem", paddingBottom: "5rem", borderTop: "1px solid #24282e" }}
    >
      <div className="section-inner">

        <motion.span
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="section-label"
        >
          experience
        </motion.span>

        <motion.h2
          id="experience-heading"
          initial={{ opacity: 0, filter: "blur(5px)", y: 6 }} whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
          className="section-intro"
        >
          Student leadership &amp; activities.
        </motion.h2>

        {/* Flat entry list — no timeline, no cards */}
        <div>
          {experience.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, filter: "blur(4px)", y: 5 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              style={{ borderTop: "1px solid #24282e", padding: "1.375rem 0" }}
            >
              {/* Org + role inline */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.625rem", flexWrap: "wrap", marginBottom: "0.375rem" }}>
                <span style={{
                  fontFamily:    "var(--font-serif)",
                  fontSize:      "0.9375rem",
                  fontWeight:    600,
                  fontStyle:     "italic",
                  color:         "#f2f3f5",
                  letterSpacing: "-0.01em",
                }}>
                  {item.org}
                </span>
                <span style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.6rem",
                  letterSpacing: "0.07em",
                  color:         "#8b9096",
                }}>
                  —
                </span>
                <span style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.6875rem",
                  letterSpacing: "0.04em",
                  color:         "#e8551a",
                }}>
                  {item.role}
                </span>
                {item.period && (
                  <span style={{
                    fontFamily:    "var(--font-mono)",
                    fontSize:      "0.6rem",
                    letterSpacing: "0.06em",
                    color:         "#4a5057",
                    marginLeft:    "auto",
                  }}>
                    {item.period}
                  </span>
                )}
              </div>

              <p style={{ fontSize: "0.8125rem", color: "#8b9096", lineHeight: 1.75 }}>
                {item.description}
              </p>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-link"
                  style={{
                    display:       "inline-block",
                    marginTop:     "0.5rem",
                    fontFamily:    "var(--font-mono)",
                    fontSize:      "0.6rem",
                    letterSpacing: "0.07em",
                    color:         "#4a5057",
                  }}
                >
                  visit
                </a>
              )}
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid #24282e" }} />
        </div>
      </div>
    </section>
  );
}
