"use client";

import { useTheme } from "./ThemeProvider";

export default function Nav() {
  const { theme, toggle } = useTheme();
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm border-b border-border" style={{ backgroundColor: "color-mix(in srgb, var(--color-background) 90%, transparent)" }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-14 flex items-center justify-between">

        {/* Left name + case study label */}
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[13px] font-medium text-text"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Abi C
          </span>
          <span className="text-border hidden sm:inline">|</span>
          <span
            className="font-mono text-[11px] uppercase tracking-widest text-muted hidden sm:inline"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            AI Account Review &amp; Expansion Agent
          </span>
        </div>

        {/* Right email + LinkedIn */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:abhic7@gmail.com"
            className="font-mono text-[12px] text-muted hover:text-text transition-colors duration-200 hidden md:inline"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            abhic7@gmail.com
          </a>
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="text-muted hover:text-text transition-colors duration-200"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm8-4a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1zM4 13a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h1zm14.657-6.243a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM7.05 16.95a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm11.314 1.414a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zM5.636 6.757a1 1 0 0 1-1.414 0L3.515 6.05A1 1 0 1 1 4.93 4.636l.707.707a1 1 0 0 1 0 1.414zM12 20a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <a
            href="https://www.linkedin.com/in/abichaudhuri/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-text transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>

      </div>
    </header>
  );
}
