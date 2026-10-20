"use client";

import { personal } from "@/data/portfolio";

export default function Footer() {
  const year = 2026;

  return (
    <footer
      role="contentinfo"
      style={{ borderTop: "1px solid #24282e", padding: "1.75rem 0" }}
    >
      <div style={{
        maxWidth:       720,
        margin:         "0 auto",
        padding:        "0 1.5rem",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        flexWrap:       "wrap",
        gap:            "0.75rem",
      }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", letterSpacing: "0.06em", color: "#2e3238" }}>
          © {year} {personal.name}
        </p>

        <div style={{ display: "flex", gap: "1.25rem" }}>
          {[
            { label: "github",   href: personal.github            },
            { label: "linkedin", href: personal.linkedin          },
            { label: "leetcode", href: personal.leetcode          },
            { label: "email",    href: `mailto:${personal.email}` },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.6rem",
                letterSpacing: "0.08em",
                color:         "#2e3238",
                transition:    "color 180ms ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#e8551a"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#2e3238"; }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
