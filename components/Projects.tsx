"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";

const statusColors: Record<string, string> = {
  "In Progress": "#e8551a",
  "Completed":   "#8aaa8a",
  "Concept":     "#8aa0b4",
  "Prototype":   "#b0a0c8",
};

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      style={{ paddingTop: "5rem", paddingBottom: "5rem", borderTop: "1px solid #24282e" }}
    >
      <div className="section-inner">

        <motion.span
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="section-label"
        >
          projects
        </motion.span>

        <motion.h2
          id="projects-heading"
          initial={{ opacity: 0, filter: "blur(5px)", y: 6 }} whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
          className="section-intro"
        >
          Things I&apos;ve built.
        </motion.h2>

        <div>
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, filter: "blur(4px)", y: 5 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              style={{ borderTop: "1px solid #24282e", padding: "1.75rem 0" }}
            >
              {/* Title row */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.875rem", flexWrap: "wrap", marginBottom: "0.375rem" }}>
                <h3 style={{
                  fontFamily:    "var(--font-serif)",
                  fontSize:      "0.9375rem",
                  fontWeight:    600,
                  fontStyle:     "italic",
                  letterSpacing: "-0.01em",
                  color:         "#f2f3f5",
                  margin:        0,
                }}>
                  {project.title}
                </h3>

                <span style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.6rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color:         statusColors[project.status] ?? "#8b9096",
                }}>
                  {project.status}
                </span>

                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source`}
                    className="u-link"
                    style={{
                      fontFamily:    "var(--font-mono)",
                      fontSize:      "0.6rem",
                      letterSpacing: "0.06em",
                      color:         "#4a5057",
                    }}
                  >
                    github
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} demo`}
                    className="u-link"
                    style={{
                      fontFamily:    "var(--font-mono)",
                      fontSize:      "0.6rem",
                      letterSpacing: "0.06em",
                      color:         "#4a5057",
                    }}
                  >
                    live
                  </a>
                )}
              </div>

              {/* Category */}
              <p style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.625rem",
                letterSpacing: "0.07em",
                color:         "#4a5057",
                marginBottom:  "0.625rem",
              }}>
                {project.category}
              </p>

              {/* Description */}
              <p style={{ fontSize: "0.8125rem", color: "#8b9096", lineHeight: 1.75, marginBottom: "0.75rem" }}>
                {project.description}
              </p>

              {/* Feature bullets */}
              {project.features && project.features.length > 0 && (
                <ul
                  role="list"
                  style={{
                    listStyle:     "none",
                    margin:        "0 0 0.875rem",
                    padding:       0,
                    display:       "flex",
                    flexDirection: "column",
                    gap:           "0.3rem",
                  }}
                >
                  {project.features.map((feat, fi) => (
                    <li
                      key={fi}
                      style={{
                        display:  "flex",
                        gap:      "0.625rem",
                        fontSize: "0.75rem",
                        color:    "#4a5057",
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
                      {feat}
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech */}
              <p style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.625rem",
                letterSpacing: "0.04em",
                color:         "#2e333a",
              }}>
                {project.tech.join("  ·  ")}
              </p>
            </motion.article>
          ))}
          <div style={{ borderTop: "1px solid #24282e" }} />
        </div>
      </div>
    </section>
  );
}
