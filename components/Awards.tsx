"use client";

import { motion } from "framer-motion";
import { awards } from "@/data/portfolio";

const reveal = (delay = 0) => ({
  initial:     { opacity: 0, filter: "blur(5px)", y: 6 },
  whileInView: { opacity: 1, filter: "blur(0px)", y: 0 },
  viewport:    { once: true, margin: "-40px" },
  transition:  { duration: 0.45, delay, ease: "easeOut" as const },
});

export default function Awards() {
  return (
    <section
      id="awards"
      aria-labelledby="awards-heading"
      style={{ paddingTop: "5rem", paddingBottom: "5rem", borderTop: "1px solid #24282e" }}
    >
      <div className="section-inner">

        <motion.span {...reveal()} className="section-label">awards &amp; recognition</motion.span>

        <motion.h2
          {...reveal(0.05)}
          id="awards-heading"
          className="section-intro"
        >
          Competitions, scholarships, and academic recognition.
        </motion.h2>

        <div>
          {awards.map((award, i) => (
            <motion.article
              key={award.title}
              {...reveal(0.08 + i * 0.05)}
              style={{ borderTop: "1px solid #24282e", padding: "1.5rem 0" }}
            >
              {/* Title + optional link */}
              <div style={{
                display:    "flex",
                alignItems: "baseline",
                gap:        "0.875rem",
                flexWrap:   "wrap",
                marginBottom: "0.3rem",
              }}>
                <h3 style={{
                  fontFamily:    "var(--font-serif)",
                  fontSize:      "0.9375rem",
                  fontWeight:    600,
                  fontStyle:     "italic",
                  letterSpacing: "-0.01em",
                  color:         "#f2f3f5",
                  margin:        0,
                }}>
                  {award.title}
                </h3>

                {award.link && (
                  <a
                    href={award.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link"
                    style={{
                      fontFamily:    "var(--font-mono)",
                      fontSize:      "0.6rem",
                      letterSpacing: "0.06em",
                      color:         "#4a5057",
                    }}
                  >
                    {award.linkLabel ?? "event site"}
                  </a>
                )}
              </div>

              {/* Event + organizer */}
              <p style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.625rem",
                letterSpacing: "0.07em",
                color:         "#e8551a",
                marginBottom:  award.organizer ? "0.2rem" : "0.625rem",
              }}>
                {award.event}
              </p>

              {award.organizer && (
                <p style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.575rem",
                  letterSpacing: "0.05em",
                  color:         "#4a5057",
                  marginBottom:  "0.625rem",
                }}>
                  {award.organizer}
                </p>
              )}

              {/* Description */}
              <p style={{
                fontSize:   "0.8125rem",
                color:      "#8b9096",
                lineHeight: 1.75,
              }}>
                {award.description}
              </p>
            </motion.article>
          ))}
          <div style={{ borderTop: "1px solid #24282e" }} />
        </div>

      </div>
    </section>
  );
}
