import type { Metadata } from "next";
import { Lora, Playfair_Display, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb-mono",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhavya — CS Student · AI/ML · Builder",
  description:
    "Computer science student interested in AI, machine learning, software engineering, and building thoughtful products.",
  keywords: ["Bhavya", "Computer Science", "AI", "Machine Learning", "Portfolio", "Developer"],
  authors: [{ name: "Bhavya" }],
  openGraph: {
    title: "Bhavya — CS Student · AI/ML · Builder",
    description:
      "Computer science student interested in AI, machine learning, software engineering, and building thoughtful products.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhavya — CS Student · AI/ML · Builder",
    description:
      "Computer science student interested in AI, machine learning, software engineering, and building thoughtful products.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lora.variable} ${playfair.variable} ${jbMono.variable} ${manrope.variable}`}>
      <head>
        <meta name="theme-color" content="#0e1013" />
      </head>
      <body>{children}</body>
    </html>
  );
}
