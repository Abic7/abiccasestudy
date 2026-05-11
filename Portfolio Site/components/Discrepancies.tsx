"use client";

import { useState } from "react";

const DISCREPANCIES = [
  {
    id: "names",
    number: "01",
    title: "Customer names scrubbed in the fact table.",
    tag: "Data Quality",
    tagColor: "bg-red-50 text-red-700 border-red-200",
    summary:
      "Both real customer names were replaced with placeholder names in customer_data.xlsx. Meridian Furniture appeared as 'Auscraft Furniture' and Northfield Electrical appeared as 'Mr Sparky' making the fact table unreadable without a join.",
    detail:
      "The real org names were retained in a separate dimension table (customer.xlsx). A one-time export script was built to join the dim and fact tables on ORGANIZATION_UID the Salesforce org ID and write a clean customer_data_joined.json. The pipeline reads this joined file at runtime. Without the dim table, account identity would have been unresolvable from the fact table alone.",
    finding:
      "If this scrubbing pattern applies to production data, any pipeline that reads customer_data.xlsx directly will fail to identify accounts correctly. The SFDC org ID join must be a standard step in any production data preparation layer.",
  },
  {
    id: "apex",
    number: "02",
    title: "Apex lead program transcript planted in the dataset.",
    tag: "Dataset Integrity",
    tagColor: "bg-orange-50 text-orange-700 border-orange-200",
    summary:
      "A transcript for a third, unrelated company Apex was included in the dataset alongside Meridian and Northfield files. The file (call-transcript--apex-lead-program-intro-call.txt) does not belong to either account and appears to have been added deliberately to test whether the pipeline would incorrectly include it.",
    detail:
      "The pipeline's wildcard filter (call-transcript--northfield-electrical-* and call-transcript--meridian-furniture-*) correctly excluded the Apex file from both account runs. However, any pipeline using a broader file glob or no filter at all would silently include a third company's data in the brief. The presence of 'north' in the filename pattern makes it a plausible confusion point for naive string matching.",
    finding:
      "Dataset boundary enforcement needs to be explicit in production not implicit in filename conventions. Account scoping should be validated against the SFDC org ID, not inferred from filename patterns alone.",
  },
  {
    id: "garbling",
    number: "03",
    title: "Integration names garbled by audio transcription.",
    tag: "Transcription",
    tagColor: "bg-blue-50 text-primary border-blue-200",
    summary:
      "The same third-party integration was referred to as 'Scene Seven', 'Sinsven', 'Sync7', and 'Sin Seven' across different transcripts all likely the same system, either Cin7 or Scene7, mangled by the ASR layer on AU-accented speech.",
    detail:
      "The Parse Goals node applies a name correction map to normalise known variants. However, the ambiguity between Cin7 (inventory management) and Scene7 (digital asset management) could not be resolved from audio alone these are genuinely different products. Rather than assume, the correction map flags the name as ambiguous and adds a note for the AM to confirm with the customer which system they actually use.",
    finding:
      "AU/NZ-accented product names are a consistent failure point for generic English ASR models. The correction map is a workaround the root cause sits in Podium's transcription stack and is addressed in the Production Upgrade Path below.",
  },
  {
    id: "schema",
    number: "04",
    title: "84-column fact table with no schema or data dictionary.",
    tag: "Data Infrastructure",
    tagColor: "bg-purple-50 text-purple-700 border-purple-200",
    summary:
      "customer_data.xlsx contains 84 columns with no accompanying schema, column definitions, or data dictionary. Column positions for all key metrics AI Conversations, Missed Calls, ARR, integration names had to be discovered by direct file inspection.",
    detail:
      "Column indices were verified manually on 2026-04-27 and hardcoded into the export script. This is a silent failure risk: any BI export schema change a column added, removed, or reordered would cause the pipeline to read the wrong metric without throwing an error. The pipeline would continue producing briefs with silently incorrect data.",
    finding:
      "A production data layer needs a versioned schema contract, not positional column reads from an undocumented spreadsheet. Any pipeline consuming Podium BI exports should validate column names not positions at read time.",
  },
];

export default function Discrepancies() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="discrepancies" className="bg-background px-12 py-24 border-b border-border">
      <div className="max-w-[1440px] mx-auto">

        <div className="mb-12">
          <p
            className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Data & Source Discrepancies
          </p>
          <h2
            className="font-serif text-[48px] leading-[1.1] tracking-[-0.02em] text-text max-w-[700px]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            What the data revealed.
          </h2>
          <p
            className="font-mono text-[13px] text-muted mt-4 max-w-[620px]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Discrepancies surfaced during build not assumptions made before it. Each finding has a direct implication for how Podium structures its production data layer.
          </p>
        </div>

        <div className="space-y-3">
          {DISCREPANCIES.map((d) => {
            const isOpen = expanded === d.id;
            return (
              <div
                key={d.id}
                className={`bg-surface border rounded-[4px] transition-all duration-200 cursor-pointer ${
                  isOpen ? "border-text" : "border-border hover:border-[#C0C0BC]"
                }`}
                onClick={() => setExpanded(isOpen ? null : d.id)}
              >
                {/* Row header */}
                <div className="px-8 py-5 flex items-center gap-6">
                  <span
                    className="font-mono text-[13px] text-muted flex-shrink-0 w-8"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {d.number}
                  </span>
                  <div className="flex-1 flex items-center gap-4 flex-wrap">
                    <h3
                      className="font-serif text-[20px] text-text"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {d.title}
                    </h3>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-[4px] border ${d.tagColor}`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {d.tag}
                    </span>
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
                    <div className="pt-6 grid grid-cols-3 gap-8">
                      <div className="space-y-2">
                        <p
                          className="font-mono text-[11px] uppercase tracking-widest text-muted"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          What We Found
                        </p>
                        <p
                          className="font-mono text-[13px] text-text leading-relaxed"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {d.summary}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p
                          className="font-mono text-[11px] uppercase tracking-widest text-muted"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          How We Handled It
                        </p>
                        <p
                          className="font-mono text-[13px] text-text leading-relaxed"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {d.detail}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p
                          className="font-mono text-[11px] uppercase tracking-widest text-muted"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Production Implication
                        </p>
                        <p
                          className="font-mono text-[13px] text-accent leading-relaxed"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {d.finding}
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
