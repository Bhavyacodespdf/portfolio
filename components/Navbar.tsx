"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal } from "@/data/portfolio";

const navLinks = [
  { label: "about",      href: "#about"      },
  { label: "awards",     href: "#awards"     },
  { label: "projects",   href: "#projects"   },
  { label: "research",   href: "#research"   },
  { label: "experience", href: "#experience" },
  { label: "skills",     href: "#skills"     },
  { label: "contact",    href: "#contact"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position:     "fixed",
        top: 0, left: 0, right: 0,
        zIndex:       50,
        transition:   "background 300ms ease, border-color 300ms ease",
        background:   scrolled ? "rgba(14,16,19,0.93)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid #24282e" : "1px solid transparent",
      }}
    >
      <nav
        style={{
          maxWidth:       1100,
          margin:         "0 auto",
          padding:        "0 1.5rem",
          height:         "2.75rem",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
        }}
        aria-label="Main navigation"
      >
        {/* Monogram — italic serif */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          aria-label="Back to top"
          style={{
            fontFamily:    "var(--font-display)",
            fontStyle:     "italic",
            fontSize:      "0.9375rem",
            color:         "#e8551a",
            letterSpacing: "-0.01em",
          }}
        >
          {personal.name.toLowerCase()}
        </a>

        {/* Desktop links */}
        <ul
          role="list"
          style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", gap: "1.75rem" }}
          className="hidden md:flex"
        >
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => handleLink(href)}
                style={{
                  background:    "none",
                  border:        "none",
                  cursor:        "pointer",
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.65rem",
                  letterSpacing: "0.08em",
                  color:         "#8b9096",
                  padding:       "3px 0",
                  transition:    "color 180ms ease",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#f2f3f5"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#8b9096"; }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden"
          style={{
            background:    "none",
            border:        "none",
            cursor:        "pointer",
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.65rem",
            letterSpacing: "0.08em",
            color:         "#8b9096",
            padding:       "4px 0",
          }}
        >
          {open ? "close" : "menu"}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            style={{
              background:   "#0e1013",
              borderBottom: "1px solid #24282e",
              padding:      "1rem 1.5rem 1.25rem",
            }}
          >
            <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => handleLink(href)}
                    style={{
                      background:    "none",
                      border:        "none",
                      cursor:        "pointer",
                      fontFamily:    "var(--font-mono)",
                      fontSize:      "0.6875rem",
                      letterSpacing: "0.07em",
                      color:         "#8b9096",
                      padding:       "3px 0",
                      width:         "100%",
                      textAlign:     "left",
                    }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
