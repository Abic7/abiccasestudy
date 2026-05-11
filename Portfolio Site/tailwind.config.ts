import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        accent: "var(--color-accent)",
        "primary-dark": "var(--color-primary-dark)",
      },
      fontFamily: {
        serif: ["Instrument Serif", "serif"],
        sans: ["Switzer", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "4px",
        none: "0px",
        full: "9999px",
      },
      gap: {
        grid: "16px",
      },
      fontSize: {
        "display-lg": ["72px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "metric": ["84px", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "mono-sm": ["11px", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        "mono-base": ["13px", { lineHeight: "1.5" }],
        "mono-md": ["14px", { lineHeight: "1.5", letterSpacing: "0.05em" }],
        "mono-lg": ["16px", { lineHeight: "1.5" }],
      },
    },
  },
  plugins: [],
};

export default config;
