"use client";

const DECISIONS = [
  {
    number: "01",
    title: "n8n over Python.",
    why: "Every pipeline step is a visual, inspectable node. An AM or RevOps lead can follow the logic without reading code. A Python script would have been faster to write but impossible to walk through in a demo or hand off to a non-engineer.",
    tradeoff: "Trade-off accepted: n8n adds orchestration overhead and some node constraints (no fs module, cmd.exe truncation). Worked around where needed.",
    tag: "Orchestration",
  },
  {
    number: "02",
    title: "Hybrid local/cloud not one or the other.",
    why: "Token-heavy extraction work (Goal Extraction, Usage Analysis, Gap Detection) runs locally free, no data egress, no per-token API cost. Strategic synthesis (Opportunity Mapping, QBR Brief) goes to Claude Haiku where reasoning quality justifies the cost. The split was deliberate not a default.",
    tradeoff: "Trade-off accepted: local model requires LM Studio running before every pipeline execution. Demo-critical dependency managed via pre-run checklist.",
    tag: "Cost & Privacy",
  },
  {
    number: "03",
    title: "Prompt chaining over a single LLM call.",
    why: "One prompt asking for goals, gaps, opportunities, and a brief in one pass produces unfocused output. Each node in the chain produces structured JSON that gates the next step. Failures are isolatable a bad gap detection run doesn't corrupt the brief. Cleaner data in at each stage means cleaner output at the next.",
    tradeoff: "Trade-off accepted: longer end-to-end runtime. Acceptable for a QBR prep use case where the brief is generated hours before the call, not in real time.",
    tag: "Output Quality",
  },
  {
    number: "04",
    title: "Gemma-4-E4B local. Claude Haiku cloud.",
    why: "Gemma handles token-heavy extraction at zero cost with no data leaving the machine. Claude Haiku handles the synthesis steps where sentence quality, tone, and reasoning depth matter to the AM reading the brief. Two models with two distinct jobs not one model doing everything at cloud cost.",
    tradeoff: "Trade-off accepted: Gemma required significant prompt tuning to produce reliable structured output. Six model-specific fixes were necessary. That cost is paid once not on every API call.",
    tag: "Model Selection",
  },
];

export default function ArchitectureRationale() {
  return (
    <section id="rationale" className="bg-background px-4 sm:px-8 lg:px-12 py-12 lg:py-24 border-b border-border">
      <div className="max-w-[1440px] mx-auto">

        <div className="mb-12">
          <p
            className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Design Decisions
          </p>
          <h2
            className="font-serif text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.02em] text-text max-w-[640px]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Why it was built this way.
          </h2>
          <p
            className="font-mono text-[13px] text-muted mt-4 max-w-[560px]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Every tool choice had an alternative. Here is what was chosen, why it was chosen, and what was accepted as a trade-off.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DECISIONS.map((d) => (
            <div
              key={d.number}
              className="bg-surface border border-border rounded-[4px] p-6 flex flex-col justify-between hover:border-[#C0C0BC] transition-colors duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[11px] uppercase tracking-widest text-muted"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {d.number}
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-widest text-primary border border-blue-200 bg-blue-50 px-2 py-0.5 rounded-[4px]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {d.tag}
                  </span>
                </div>

                <h3
                  className="font-serif text-[22px] leading-[1.15] text-text"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {d.title}
                </h3>

                <p
                  className="font-mono text-[12px] text-text leading-relaxed"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {d.why}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <p
                  className="font-mono text-[11px] text-muted leading-relaxed italic"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {d.tradeoff}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
