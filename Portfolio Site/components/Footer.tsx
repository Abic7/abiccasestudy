"use client";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border px-12 py-10">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-6">

        {/* Disclaimer */}
        <div className="bg-surface border border-border rounded-[4px] px-6 py-5">
          <p
            className="font-mono text-[11px] uppercase tracking-widest text-muted mb-2"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Intellectual Property Disclaimer
          </p>
          <p
            className="font-mono text-[12px] text-text leading-relaxed max-w-[900px]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            This pipeline, including its architecture, prompt designs, workflow logic, and all associated code, was built solely as a case study submission and should not be adopted, deployed, or used by Podium. All intellectual property rights remain exclusively with Abi C. Submission of this work does not constitute a licence, assignment, or transfer of any rights to Podium or any third party.
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <p
            className="font-mono text-[11px] text-muted"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © {new Date().getFullYear()} Abi C. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="mailto:abhic7@gmail.com"
              className="font-mono text-[11px] text-muted hover:text-text transition-colors duration-200"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              abhic7@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/abichaudhuri/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-muted hover:text-text transition-colors duration-200"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
