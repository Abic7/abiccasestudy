"use client";

import { useState } from "react";

const RECOMMENDATIONS = [
  {
    id: "vtt",
    number: "01",
    title: "Upgrade VTT stack to region-specific ASR models.",
    tag: "Transcription",
    tagColor: "bg-red-50 text-red-700 border-red-200",
    audience: "Podium Engineering",
    summary:
      "Podium's current transcription stack does not accurately separate customer and CSR lines for AU/NZ speakers. Accent misattribution corrupts goal extraction at the source the pipeline extracts CSR-stated goals instead of customer-stated goals.",
    detail:
      "This is not a prompt problem. No amount of prompt tuning recovers goals that were never correctly transcribed. The fix sits upstream in Podium's ASR layer. Region-specific models trained on AU/NZ English Deepgram Nova-2 (Australian English) or AWS Transcribe (en-AU) handle accent variation and speaker diarisation significantly more accurately than generic English models.",
    recommendation:
      "Evaluate Deepgram Nova-2 or AWS Transcribe en-AU on a sample of AU/NZ call recordings. Measure word error rate and speaker attribution accuracy before and after. A 10–15% improvement in transcription accuracy compounds directly into opportunity quality downstream.",
    impact: "High",
  },
  {
    id: "feedback",
    number: "02",
    title: "Instrument brief output with per-opportunity AM feedback.",
    tag: "Product",
    tagColor: "bg-purple-50 text-purple-700 border-purple-200",
    audience: "Podium Product",
    summary:
      "Once a brief is generated, there is no mechanism for AMs to signal which opportunities were acted on, which were irrelevant, and which were missed entirely. Without this signal, the pipeline cannot improve at scale.",
    detail:
      "A per-opportunity thumbs up / not relevant / missed flag even as a simple form embedded in the brief creates a training dataset over time. AMs close to the customer know things the data doesn't: relationship context, prior commitments, product fit. Capturing that judgment makes the model smarter with every QBR cycle.",
    recommendation:
      "Build a lightweight feedback layer into the QBR brief delivery mechanism. Log AM ratings per opportunity, per account, per run. After 3 months of data, use this signal to retune opportunity mapping prompts and filter low-signal gap types.",
    impact: "High",
  },
  {
    id: "scheduling",
    number: "03",
    title: "Auto-trigger briefs from CRM calendar remove the manual step.",
    tag: "Operations",
    tagColor: "bg-orange-50 text-orange-700 border-orange-200",
    audience: "Podium RevOps",
    summary:
      "The pipeline currently runs on manual trigger, one account at a time. In production, AMs manage a full book of business. Manual triggering per account is not a workflow it's a bottleneck.",
    detail:
      "Podium's CRM already knows when every QBR is scheduled. The pipeline should listen to that calendar data and trigger automatically 48 hours before each QBR, per account, without AM intervention. The AM receives the brief in their inbox or CRM record the morning of the call.",
    recommendation:
      "Wire the pipeline trigger to a CRM webhook on QBR event creation or update. Batch-process all accounts with a QBR in the next 7 days on a nightly scheduled run. Deliver the brief via email or Salesforce record attachment no manual step required.",
    impact: "Medium",
  },
  {
    id: "governance",
    number: "04",
    title: "Version and regression-test prompts before any model update.",
    tag: "Engineering",
    tagColor: "bg-green-50 text-green-700 border-green-200",
    audience: "Podium Engineering",
    summary:
      "LLM prompts were tuned to specific model behaviour. When the underlying model is updated or swapped, prompt performance degrades silently no alerts, no test failures, no visibility until an AM notices the brief quality has dropped.",
    detail:
      "This is a production risk Podium needs to treat like any other service dependency. A regression suite of known transcripts with expected goal outputs gives engineering a baseline to test against before promoting any model update. Without it, a model version bump is a silent quality regression.",
    recommendation:
      "Build a prompt regression suite: 5–10 reference transcripts with validated goal outputs. Run the suite against any new model version before promoting to production. Treat prompt files as versioned artefacts in source control not embedded strings in workflow nodes.",
    impact: "Medium",
  },
  {
    id: "crm",
    number: "05",
    title: "Replace static data exports with a live CRM API layer.",
    tag: "Data Infrastructure",
    tagColor: "bg-blue-50 text-primary border-blue-200",
    audience: "Podium Engineering",
    summary:
      "Customer usage data is currently accessed via a pre-exported JSON file. That file is stale from the moment it is generated. In production, a customer could miss 5 calls, complete a payment, or churn between export and QBR none of that would be reflected in the brief.",
    detail:
      "The pipeline architecture is sound. The data layer underneath it is not production-ready. Podium needs a real-time API layer over customer usage data either a direct Salesforce / HubSpot query at pipeline runtime, or a near-real-time data sync into an internal service the pipeline can call. The pipeline node changes are minimal; the infrastructure work sits with Podium's data team.",
    recommendation:
      "Expose customer usage metrics via an internal API endpoint the pipeline can query at runtime. Scope: ARR, product usage L30, integration status, support sentiment. Query at trigger time not at export time. This makes every brief accurate to the hour it is generated.",
    impact: "High",
  },
];

const impactColors: Record<string, string> = {
  High: "bg-red-50 text-red-700 border-red-200",
  Medium: "bg-orange-50 text-orange-700 border-orange-200",
  Low: "bg-green-50 text-green-700 border-green-200",
};

export default function Recommendations() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="recommendations" className="bg-background px-4 sm:px-8 lg:px-12 py-12 lg:py-24 border-b border-border">
      <div className="max-w-[1440px] mx-auto">

        <div className="mb-12">
          <p
            className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            What Comes Next
          </p>
          <h2
            className="font-serif text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.02em] text-text max-w-[700px]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Five improvements to make this production-ready.
          </h2>
          <p
            className="font-mono text-[13px] text-muted mt-4 max-w-[620px]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            The pipeline works. But scaling it across an entire team means fixing a few things in the surrounding infrastructure. These are the five highest-impact changes, written for the teams who would own them.
          </p>
        </div>

        <div className="space-y-3">
          {RECOMMENDATIONS.map((r) => {
            const isOpen = expanded === r.id;
            return (
              <div
                key={r.id}
                className={`bg-surface border rounded-[4px] transition-all duration-200 cursor-pointer ${
                  isOpen ? "border-text" : "border-border hover:border-[#C0C0BC]"
                }`}
                onClick={() => setExpanded(isOpen ? null : r.id)}
              >
                {/* Row header */}
                <div className="px-4 sm:px-8 py-5 flex items-center gap-4 sm:gap-6">
                  <span
                    className="font-mono text-[13px] text-muted flex-shrink-0 w-8"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {r.number}
                  </span>

                  <div className="flex-1 flex items-center gap-4 flex-wrap">
                    <h3
                      className="font-serif text-[20px] text-text"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {r.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-[4px] border ${r.tagColor}`}
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {r.tag}
                      </span>
                      <span
                        className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-[4px] border ${impactColors[r.impact]}`}
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {r.impact} impact
                      </span>
                      <span
                        className="font-mono text-[10px] uppercase tracking-widest text-muted border border-border px-2 py-0.5 rounded-[4px]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {r.audience}
                      </span>
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
                  <div className="px-8 pb-8 border-t border-border">
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
                          {r.summary}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p
                          className="font-mono text-[11px] uppercase tracking-widest text-muted"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Detail
                        </p>
                        <p
                          className="font-mono text-[13px] text-text leading-relaxed"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {r.detail}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p
                          className="font-mono text-[11px] uppercase tracking-widest text-muted"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Recommendation
                        </p>
                        <p
                          className="font-mono text-[13px] text-accent leading-relaxed"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {r.recommendation}
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
