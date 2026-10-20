"use client";

import { motion } from "framer-motion";

export default function Writing() {
  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      style={{ paddingTop: "5rem", paddingBottom: "5rem", borderTop: "1px solid #24282e" }}
    >
      <div className="section-inner">

        <motion.span
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="section-label"
        >
          writing
        </motion.span>

        <motion.div
          initial={{ opacity: 0, filter: "blur(5px)", y: 6 }} whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
        >
          <h2 id="writing-heading" className="section-intro">
            Notes &amp; writing.
          </h2>

          <p style={{ fontSize: "0.8125rem", color: "#4a5057", fontStyle: "italic", lineHeight: 1.75 }}>
            Project learnings, technical notes, and experiments will live here. Nothing yet.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
