"use client";

import { useState } from "react";

const DECISIONS = [
  {
    id: "evidence",
    number: "01",
    title: "Dropped evidence fields. Added confidence scoring.",
    tag: "Hallucination fix",
    tagColor: "bg-red-50 text-red-700 border-red-200",
    problem:
      'v1 prompt asked Gemma to return an "evidence" field containing a direct customer quote. Gemma consistently fabricated quotes plausible-sounding but not present in the transcript.',
    fix: 'Removed the evidence field entirely. Replaced with a "confidence" enum (high / medium / low). Gemma scores what it extracted without being asked to reproduce verbatim text it may not have accurately read.',
    result: "Zero fabricated quotes in all subsequent runs. Confidence scores gave downstream nodes a signal to weight goals appropriately.",
    version: "v1 → v3",
  },
  {
    id: "think",
    number: "02",
    title: "Stripped <think> tags before JSON parse.",
    tag: "Model behaviour",
    tagColor: "bg-blue-50 text-primary border-blue-200",
    problem:
      "Gemma-4-E4B wraps its chain-of-thought reasoning in <think>...</think> tags before the JSON output. Passing the raw response directly to JSON.parse() threw a syntax error on every run.",
    fix: "Parse Goals node strips <think>...</think> and <reasoning>...</reasoning> blocks before attempting to parse. Also falls back to the reasoning_content field if the content field is empty Gemma sometimes routes output differently.",
    result: "Parse node handles Gemma's think-tag output reliably across all 8 call types. No manual intervention needed.",
    version: "Node 3 Parse",
  },
  {
    id: "truncation",
    number: "03",
    title: "Built truncation repair into every Parse node.",
    tag: "Reliability",
    tagColor: "bg-orange-50 text-orange-700 border-orange-200",
    problem:
      "Gemma would occasionally hit the max_tokens limit mid-JSON, leaving unclosed arrays or objects. Standard JSON.parse() failed silently or threw either way, the goals were lost.",
    fix: 'Parse node detects unclosed brackets and appends the closing character before parsing. Also handles a "phantom ]" pattern where Gemma appends a trailing ] after a single object stripped before parse, then the object is wrapped in an array.',
    result: "Full pipeline completion across all 18 transcripts with no parse failures. Token limit hits are recovered gracefully rather than dropping the item.",
    version: "Nodes 3–5",
  },
  {
    id: "prompts",
    number: "04",
    title: "Replaced negation rules with STEP 1–4 positive structure.",
    tag: "Prompt architecture",
    tagColor: "bg-green-50 text-green-700 border-green-200",
    problem:
      'v2 prompt used negation-heavy rules: "Do NOT include CSM suggestions", "Do NOT include questions". Gemma largely ignored negation constraints and continued mixing in CSM-stated goals alongside customer goals.',
    fix: "Restructured to a four-step positive inclusion sequence: (1) identify customer speaker lines, (2) find goal statements, (3) extract only explicit goals, (4) return JSON. Each step narrows the model's focus forward rather than blocking it backward. Call-type-specific examples added for positive and negative cases.",
    result: "Customer vs CSM goal separation improved significantly. Pipeline went from 1 usable opportunity (v2 starvation) to 10 grounded opportunities (v5 best run).",
    version: "v2 → v3",
  },
  {
    id: "dynamic",
    number: "05",
    title: "Replaced 4 hardcoded branches with 1 dynamic prompt node.",
    tag: "Architecture",
    tagColor: "bg-purple-50 text-purple-700 border-purple-200",
    problem:
      "The original design had 4 hardcoded Filter branches (account-review, ai-setup, onboarding, phones-review) built for Meridian's call types. Northfield has 8 different call types 4 were silently dropped, 2 others collapsed to the wrong Meridian equivalent.",
    fix: "Replaced 23 nodes (4× Filter, 4× Sort, 3× Switch, 4× Prepare, 4× LM Studio, 4× Parse, 1× Merge) with a single dynamic Prepare node. A lookup table maps any call type to its prompt config. Sales calls (sales-intro, sales-follow-up-*) get a dedicated commitment-extraction framing. Unknown types fall back to account-review.",
    result: "Pipeline now handles any call type without code changes. Northfield's sales call goals the baseline commitments the customer signed up with were surfaced correctly for the first time.",
    version: "v4 rebuild",
  },
  {
    id: "nothink",
    number: "06",
    title: "Removed /no_think flag from all Gemma prompts.",
    tag: "Model behaviour",
    tagColor: "bg-blue-50 text-primary border-blue-200",
    problem:
      '/no_think is an Ollama-specific flag for suppressing chain-of-thought output. It is not part of Gemma\'s instruction set. Including it in the prompt had no effect on output but added noise and suggested the prompts were written for a different model.',
    fix: "Removed from all 5 Gemma-facing prompts (Nodes 3, 4, 5). Think-tag stripping in the Parse node handles the chain-of-thought output instead the correct model-specific solution.",
    result: "Cleaner prompts. Think-tag stripping is now the canonical handling path, documented and testable.",
    version: "Nodes 3–5",
  },
];

export default function BuildDecisions() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="build-decisions" className="bg-background px-4 sm:px-8 lg:px-12 py-12 lg:py-24 border-b border-border">
      <div className="max-w-[1440px] mx-auto">

        <div className="mb-12">
          <p
            className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Under the Hood · AI Tuning
          </p>
          <h2
            className="font-serif text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.02em] text-text max-w-[700px]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Six things that broke, and how they were fixed.
          </h2>
          <p
            className="font-mono text-[13px] text-muted mt-4 max-w-[600px]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Getting AI to behave reliably is not just about writing better instructions. Each fix below came from a real failure, a diagnosis, and a specific code change, not a workaround.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DECISIONS.map((d) => {
            const isOpen = expanded === d.id;
            return (
              <div
                key={d.id}
                className={`bg-surface border rounded-[4px] transition-all duration-200 cursor-pointer ${
                  isOpen ? "border-text col-span-full" : "border-border hover:border-[#C0C0BC]"
                }`}
                onClick={() => setExpanded(isOpen ? null : d.id)}
              >
                {/* Card header */}
                <div className="p-6 flex items-start justify-between gap-4">
                  <div className="flex gap-4 items-start">
                    <span
                      className="font-mono text-[13px] text-muted flex-shrink-0 mt-0.5"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {d.number}
                    </span>
                    <div className="space-y-3">
                      <h3
                        className="font-serif text-[20px] leading-[1.2] text-text"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {d.title}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-[4px] border ${d.tagColor}`}
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {d.tag}
                        </span>
                        <span
                          className="font-mono text-[10px] uppercase tracking-widest text-muted border border-border px-2 py-0.5 rounded-[4px]"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {d.version}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className="font-mono text-[20px] text-muted flex-shrink-0 transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </div>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="px-6 pb-8 border-t border-border">
                    <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                      <div className="space-y-2">
                        <p
                          className="font-mono text-[11px] uppercase tracking-widest text-muted"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Problem
                        </p>
                        <p
                          className="font-mono text-[13px] text-text leading-relaxed"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {d.problem}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p
                          className="font-mono text-[11px] uppercase tracking-widest text-muted"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Fix
                        </p>
                        <p
                          className="font-mono text-[13px] text-text leading-relaxed"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {d.fix}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p
                          className="font-mono text-[11px] uppercase tracking-widest text-muted"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Result
                        </p>
                        <p
                          className="font-mono text-[13px] text-accent leading-relaxed"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {d.result}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
