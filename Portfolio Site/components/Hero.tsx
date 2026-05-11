"use client";

export default function Hero() {
  return (
    <section className="min-h-screen bg-background border-b border-border flex items-center px-4 sm:px-8 lg:px-12 py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left serif headline */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted border border-border px-3 py-1 rounded-[4px]">
              Case Study
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted border border-border px-3 py-1 rounded-[4px]">
              n8n · LM Studio · Claude API
            </span>
          </div>

          <h1
            className="font-serif text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.02em] text-text"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Your AI prep assistant for every customer call.
          </h1>

          <p
            className="text-[18px] leading-relaxed text-muted max-w-[480px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Account Managers spend 30–60 minutes manually preparing for quarterly reviews.
            This tool reads call transcripts, spots what customers are missing out on,
            and writes the meeting brief for you, automatically.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#workflow"
              className="font-mono text-[12px] uppercase tracking-widest bg-primary text-white px-5 py-3 rounded-[4px] hover:bg-primary-dark transition-colors duration-200"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              See How It Works
            </a>
            <a
              href="#output"
              className="font-mono text-[12px] uppercase tracking-widest border border-border text-text px-5 py-3 rounded-[4px] hover:border-text transition-colors duration-200"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              View Sample Output
            </a>
            <a
              href="https://github.com/Abic7/Podium_AI_GTM_Eng"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] uppercase tracking-widest text-muted hover:text-text transition-colors duration-200 flex items-center gap-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Right mono technical abstract */}
        <div className="bg-surface border border-border rounded-[4px] p-8 space-y-6">
          <p
            className="font-mono text-[11px] uppercase tracking-widest text-muted"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            What it does, step by step
          </p>

          <div className="space-y-4 font-mono text-[13px] text-muted leading-relaxed" style={{ fontFamily: "var(--font-mono)" }}>
            <div className="flex gap-4">
              <span className="text-primary min-w-[24px]">01</span>
              <span><span className="text-text">Reads the calls</span> Processes every call transcript and pulls out what the customer actually said they needed</span>
            </div>
            <div className="flex gap-4">
              <span className="text-primary min-w-[24px]">02</span>
              <span><span className="text-text">Checks what they use</span> Compares their stated goals against what they actually have active in the product today</span>
            </div>
            <div className="flex gap-4">
              <span className="text-primary min-w-[24px]">03</span>
              <span><span className="text-text">Spots the gaps</span> Flags where the customer is paying for something they are not using, or missing something they clearly need</span>
            </div>
            <div className="flex gap-4">
              <span className="text-primary min-w-[24px]">04</span>
              <span><span className="text-text">Builds the talking points</span> Turns each gap into a specific, evidence-backed conversation starter for the AM</span>
            </div>
            <div className="flex gap-4">
              <span className="text-primary min-w-[24px]">05</span>
              <span><span className="text-text">Writes the brief</span> Delivers a clean, structured summary the AM can read in 3 minutes before walking into the call</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border grid grid-cols-3 gap-4">
            {[
              { label: "Orchestration", value: "n8n" },
              { label: "Local LLM", value: "Gemma-4-E4B" },
              { label: "Cloud LLM", value: "Claude Haiku" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted" style={{ fontFamily: "var(--font-mono)" }}>
                  {item.label}
                </p>
                <p className="font-mono text-[13px] text-text mt-1" style={{ fontFamily: "var(--font-mono)" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
