"use client";

export default function HireCTA() {
  return (
    <section className="bg-background px-4 sm:px-8 lg:px-12 py-16 lg:py-24 border-b border-border">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-[760px]">
          <p
            className="font-mono text-[11px] uppercase tracking-widest text-muted mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Next Step
          </p>
          <h2
            className="font-serif text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.1] tracking-[-0.02em] text-text mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            I built this to show what I can do, not describe it.
          </h2>
          <p
            className="font-mono text-[14px] text-muted leading-relaxed mb-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            This is a real pipeline, run against real accounts, producing real output. The docs, architecture, and results are all here. The workflow and prompt code are not — because that conversation belongs in a room, not a repository.
          </p>
          <p
            className="font-mono text-[14px] text-muted leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            If you are the hiring manager reading this, the next step is straightforward.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:abhic7@gmail.com?subject=Let's talk — AI GTM Engineer&body=Hi Abi,"
              className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest bg-primary text-white px-6 py-3 rounded-[4px] hover:bg-primary-dark transition-colors duration-200"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/>
              </svg>
              Book a conversation
            </a>
            <a
              href="https://www.linkedin.com/in/abichaudhuri/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest border border-border text-text px-6 py-3 rounded-[4px] hover:border-text transition-colors duration-200"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
