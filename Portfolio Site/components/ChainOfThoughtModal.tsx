"use client";

import { useEffect, useState } from "react";

const REASONING_STEPS = [
  { label: "Transcripts Loaded", detail: "8 call files read via PowerShell Get-Content" },
  { label: "Call Type Detected", detail: "account-review dynamic prompt config selected" },
  { label: "Speaker Lines Identified", detail: "Customer vs Podium AM lines separated" },
  { label: "Goal Statements Extracted", detail: "Implicit + explicit signals captured with confidence scoring" },
  { label: "Think Tags Stripped", detail: "<think>...</think> removed before JSON parse" },
  { label: "JSON Validated", detail: "Truncation repaired · phantom brackets stripped · array normalised" },
  { label: "Goals Passed Downstream", detail: "To Aggregate Goals → Usage Analysis" },
];

const SAMPLE_JSON = `[
  {
    "goal": "Implement complex, multi-tiered call routing logic that handles multiple staff members across defined shifts",
    "callType": "phone-routing",
    "callDate": "2025-11-12",
    "goalCategory": "operations",
    "confidence": "high"
  },
  {
    "goal": "Establish digital documentation of verbal agreements on quotes to secure job commitment without requiring an SMS or deposit",
    "callType": "sales-follow-up-1",
    "callDate": "2025-10-08",
    "goalCategory": "efficiency",
    "confidence": "high"
  },
  {
    "goal": "Automate the process of entering leads into a contest or draw upon specific triggers like quoting or chatting",
    "callType": "sales-intro",
    "callDate": "2025-09-22",
    "goalCategory": "revenue-growth",
    "confidence": "high"
  },
  {
    "goal": "Implement a live chat bot on the website to ensure 24/7 lead capture and qualification",
    "callType": "ai-setup",
    "callDate": "2025-11-30",
    "goalCategory": "customer-experience",
    "confidence": "high"
  },
  {
    "goal": "Prevent duplicate automated Google review requests for repeat customers",
    "callType": "ai-upgrade-account-review",
    "callDate": "2026-01-15",
    "goalCategory": "customer-reputation",
    "confidence": "medium"
  }
]`;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ChainOfThoughtModal({ open, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        REASONING_STEPS.forEach((_, i) => {
          setTimeout(() => setActiveStep(i), i * 200);
        });
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setActiveStep(null);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(SAMPLE_JSON);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col sm:flex-row">
      {/* Overlay */}
      <div
        className="flex-1 bg-text/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer — full-screen on mobile, right drawer on desktop */}
      <div className="w-full sm:w-[720px] bg-surface flex flex-col h-full overflow-hidden shadow-2xl sm:max-h-full max-h-[90vh] sm:max-h-none rounded-t-lg sm:rounded-none mt-auto sm:mt-0">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-border flex-shrink-0">
          <div>
            <p
              className="font-mono text-[11px] uppercase tracking-widest text-muted"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Execution Log
            </p>
            <h3
              className="font-mono text-[16px] text-text mt-0.5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Node_3 · Goal Extraction · Northfield Electrical
            </h3>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-text transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Close ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">

          {/* Reasoning Timeline */}
          <div className="px-8 py-6 border-b border-border">
            <p
              className="font-mono text-[11px] uppercase tracking-widest text-muted mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Reasoning Timeline
            </p>
            <div className="space-y-0">
              {REASONING_STEPS.map((step, i) => {
                const isActive = activeStep !== null && i <= activeStep;
                return (
                  <div key={i} className="flex gap-4 pl-4 border-l border-border py-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 transition-colors duration-300 ${isActive ? "bg-primary" : "bg-border"}`}
                    />
                    <div>
                      <p
                        className={`font-mono text-[13px] transition-colors duration-300 ${isActive ? "text-text" : "text-muted"}`}
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {step.label}
                      </p>
                      <p
                        className="font-mono text-[11px] text-muted mt-0.5"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* JSON Output */}
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <p
                className="font-mono text-[11px] uppercase tracking-widest text-muted"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Parsed Goal Output (5 of 9 goals shown)
              </p>
              <button
                onClick={handleCopy}
                className="font-mono text-[11px] uppercase tracking-widest text-primary hover:text-primary-dark transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {copied ? "COPIED ✓" : "COPY JSON"}
              </button>
            </div>

            <div
              className="bg-[#111111] rounded-[4px] p-5 overflow-x-auto"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <pre className="font-mono text-[12px] leading-relaxed whitespace-pre-wrap">
                {SAMPLE_JSON.split("\n").map((line, i) => {
                  // Colour strings green, keys muted
                  const keyMatch = line.match(/^(\s*")([\w]+)(":\s*)/);
                  const strMatch = line.match(/:\s*(".+")/) ;
                  return (
                    <span key={i} className="block">
                      {line.replace(/\S.*/, "").length > 0 && (
                        <span style={{ color: "#444" }}>{line.match(/^\s+/)?.[0] ?? ""}</span>
                      )}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: line
                            .trimStart()
                            .replace(
                              /("[\w]+")(:\s*)/g,
                              '<span style="color:#8E8E8E">$1</span><span style="color:#555">$2</span>'
                            )
                            .replace(
                              /:\s*(".*?")(,?)$/g,
                              ': <span style="color:#00E599">$1</span>$2'
                            )
                            .replace(/[{}\[\],]/g, '<span style="color:#555">$&</span>'),
                        }}
                      />
                    </span>
                  );
                })}
              </pre>
            </div>

            {/* Model info */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { label: "Model", value: "google/gemma-4-e4b" },
                { label: "Temperature", value: "0.1" },
                { label: "Goals Extracted", value: "9 total" },
              ].map((item) => (
                <div key={item.label} className="border border-border rounded-[4px] p-3">
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
      </div>
    </div>
  );
}
