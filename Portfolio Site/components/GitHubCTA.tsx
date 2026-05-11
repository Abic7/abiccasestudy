"use client";

import { useState } from "react";

const PUBLISHED = [
  "docs/requirements.md",
  "docs/architecture.md",
  "docs/assumptions.md",
  "docs/plan-output.md",
  "docs/sample-output-meridian.md",
  "docs/sample-output-northfield.md",
  "architecture.html",
  "wsn.html",
  "Portfolio Site/",
];

const WITHHELD = [
  "workflows/ n8n workflow JSON",
  "Prompt code and parse logic",
  "Customer data and transcripts",
  "Prompt tuning logs",
];

const FLOW_IMAGES = [
  { src: "/n8nflow-v1.png", label: "v1 — Initial build", caption: "First working pipeline: 4 hardcoded call-type branches, Meridian only." },
  { src: "/n8nflow-v2.png", label: "v2 — Prompt iteration", caption: "Prompt restructure: positive STEP 1–4 framing replaces negation rules. Confidence scoring added." },
  { src: "/n8nflow-v3.png", label: "v3 — Dynamic routing", caption: "23-node fan-out replaced with a single dynamic Prepare node. Handles all 8 call types. Northfield unlocked." },
];

function FlowViewer() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setCurrent((c) => (c - 1 + FLOW_IMAGES.length) % FLOW_IMAGES.length);
  const next = () => setCurrent((c) => (c + 1) % FLOW_IMAGES.length);

  return (
    <>
      <div className="bg-surface border border-border rounded-[4px] overflow-hidden">
        {/* Image area */}
        <div
          className="relative bg-[#111] cursor-zoom-in"
          onClick={() => setLightbox(true)}
          style={{ aspectRatio: "16/9" }}
        >
          <img
            src={FLOW_IMAGES[current].src}
            alt={FLOW_IMAGES[current].label}
            className="w-full h-full object-contain"
          />
          <span
            className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest bg-black/60 text-white px-2 py-1 rounded-[4px]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Click to enlarge
          </span>
        </div>

        {/* Controls */}
        <div className="px-5 py-4 flex items-center justify-between border-t border-border">
          <div>
            <p className="font-mono text-[12px] text-text" style={{ fontFamily: "var(--font-mono)" }}>
              {FLOW_IMAGES[current].label}
            </p>
            <p className="font-mono text-[11px] text-muted mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
              {FLOW_IMAGES[current].caption}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 ml-4">
            <button
              onClick={prev}
              className="font-mono text-[13px] text-muted hover:text-text transition-colors px-2"
              aria-label="Previous"
            >
              ←
            </button>
            <span className="font-mono text-[11px] text-muted" style={{ fontFamily: "var(--font-mono)" }}>
              {current + 1} / {FLOW_IMAGES.length}
            </span>
            <button
              onClick={next}
              className="font-mono text-[13px] text-muted hover:text-text transition-colors px-2"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="px-5 pb-4 flex gap-2">
          {FLOW_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${i === current ? "bg-primary" : "bg-border"}`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightbox(false)}
        >
          <img
            src={FLOW_IMAGES[current].src}
            alt={FLOW_IMAGES[current].label}
            className="max-w-full max-h-full object-contain rounded-[4px]"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-5 right-6 font-mono text-[11px] uppercase tracking-widest text-white/60 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Close ✕
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-6 text-white/60 hover:text-white text-2xl transition-colors">←</button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-6 text-white/60 hover:text-white text-2xl transition-colors">→</button>
        </div>
      )}
    </>
  );
}

export default function GitHubCTA({ repoUrl = "https://github.com/Abic7/Podium_AI_GTM_Eng" }: { repoUrl?: string }) {
  return (
    <section id="repo" className="bg-background px-4 sm:px-8 lg:px-12 py-12 lg:py-24 border-b border-border">
      <div className="max-w-[1440px] mx-auto space-y-12">

        {/* Top row: headline + published/withheld */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: headline + 3 buttons */}
          <div className="space-y-8">
            <div>
              <p
                className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Open Source
              </p>
              <h2
                className="font-serif text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.02em] text-text"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Look under the bonnet.
              </h2>
              <p
                className="font-mono text-[13px] text-muted mt-4 leading-relaxed"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                The architecture docs, full decision log, and verified output for both accounts are all here. Enough to see exactly how it was built and what it produced.
              </p>
              <p
                className="font-mono text-[13px] text-muted mt-3 leading-relaxed"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                The workflow JSON and prompt code are not published. I built this on my own time, with my own infrastructure. Sharing the engine before a conversation would be the same mistake this tool was built to prevent — giving away value before you understand its worth. If you want to see it, let's talk.
              </p>
            </div>

            {/* 3 action buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              {/* Download assets */}
              <a
                href="/assets.zip"
                download
                className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest bg-primary text-white px-5 py-3 rounded-[4px] hover:bg-primary-dark transition-colors duration-200"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Assets
              </a>

              {/* Watch n8n flow */}
              <a
                href="#flow-viewer"
                onClick={(e) => { e.preventDefault(); document.getElementById("flow-viewer")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest border border-border text-text px-5 py-3 rounded-[4px] hover:border-text transition-colors duration-200"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Watch Build Progression
              </a>

              {/* GitHub profile */}
              <a
                href="https://github.com/Abic7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-muted hover:text-text transition-colors duration-200"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Visit My GitHub
              </a>
            </div>
          </div>

          {/* Right: published / withheld */}
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-[4px] p-6">
              <p
                className="font-mono text-[11px] uppercase tracking-widest text-muted mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Published
              </p>
              <ul className="space-y-2">
                {PUBLISHED.map((file) => (
                  <li key={file} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="font-mono text-[12px] text-text" style={{ fontFamily: "var(--font-mono)" }}>
                      {file}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface border border-border rounded-[4px] p-6">
              <p
                className="font-mono text-[11px] uppercase tracking-widest text-muted mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Not published — ask me why
              </p>
              <ul className="space-y-2">
                {WITHHELD.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-border flex-shrink-0" />
                    <span className="font-mono text-[12px] text-muted" style={{ fontFamily: "var(--font-mono)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Flow image viewer */}
        <div id="flow-viewer">
          <p
            className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            n8n Build Progression · v1 to v3
          </p>
          <h3
            className="font-serif text-[28px] sm:text-[32px] leading-[1.1] tracking-[-0.02em] text-text mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Watch how the workflow evolved.
          </h3>
          <div className="max-w-[900px]">
            <FlowViewer />
          </div>
        </div>

      </div>
    </section>
  );
}
