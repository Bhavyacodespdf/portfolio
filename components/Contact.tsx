"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/portfolio";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{ paddingTop: "5rem", paddingBottom: "5rem", borderTop: "1px solid #24282e" }}
    >
      <div className="section-inner">

        <motion.span
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="section-label"
        >
          contact
        </motion.span>

        <motion.h2
          id="contact-heading"
          initial={{ opacity: 0, filter: "blur(5px)", y: 6 }} whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
          className="section-intro"
          style={{ marginBottom: "1.25rem" }}
        >
          Let&apos;s talk.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, filter: "blur(4px)", y: 5 }} whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          style={{ fontSize: "0.875rem", color: "#8b9096", lineHeight: 1.8, maxWidth: 460, marginBottom: "2rem" }}
        >
          I&apos;m open to interesting conversations, collaboration on projects,
          technical discussions, and opportunities that align with what I&apos;m
          working toward.
        </motion.p>

        {/* Links — inline underlined, reference style */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(4px)", y: 5 }} whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem 1.5rem", alignItems: "center" }}
        >
          {[
            { label: "email",    href: `mailto:${personal.email}`  },
            { label: "github",   href: personal.github             },
            { label: "linkedin", href: personal.linkedin           },
            { label: "leetcode", href: personal.leetcode           },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="u-link"
              style={{
                fontFamily:    "var(--font-serif)",
                fontSize:      "0.875rem",
                fontStyle:     "italic",
                color:         "#c5c8cc",
              }}
            >
              {label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
