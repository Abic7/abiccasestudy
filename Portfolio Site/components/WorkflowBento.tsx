"use client";

interface BentoCardProps {
  node: string;
  title: string;
  subtitle: string;
  detail: string;
  signal?: "local" | "cloud" | "data" | "output";
  large?: boolean;
  onClick?: () => void;
  clickable?: boolean;
}

const signalColors = {
  local: { dot: "#0055FF", label: "Local LLM", labelColor: "#0055FF" },
  cloud: { dot: "#00E599", label: "Cloud LLM", labelColor: "#00E599" },
  data: { dot: "#8E8E8E", label: "Data In", labelColor: "#8E8E8E" },
  output: { dot: "#0D0D0D", label: "Output", labelColor: "#0D0D0D" },
};

function BentoCard({ node, title, subtitle, detail, signal, large, onClick, clickable }: BentoCardProps) {
  const sig = signal ? signalColors[signal] : null;

  return (
    <div
      onClick={onClick}
      className={`
        bg-surface border border-border rounded-[4px] p-6 flex flex-col justify-between
        transition-all duration-200
        ${large ? "p-8" : ""}
        ${clickable
          ? "cursor-pointer hover:border-text hover:shadow-md group"
          : "hover:border-[#C0C0BC]"}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <span
          className="font-mono text-[11px] uppercase tracking-widest text-muted"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Node {node}
        </span>
        {sig && (
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${signal === "local" ? "pulse-dot" : ""}`}
              style={{ backgroundColor: sig.dot }}
            />
            <span
              className="font-mono text-[11px] uppercase tracking-widest"
              style={{ fontFamily: "var(--font-mono)", color: sig.labelColor }}
            >
              {sig.label}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-1 flex-1">
        <h3
          className={`font-serif text-text ${large ? "text-[32px] leading-[1.1]" : "text-[22px] leading-[1.15]"}`}
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </h3>
        <p
          className="font-mono text-[13px] text-muted mt-2"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {subtitle}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <p
          className="font-mono text-[12px] text-muted leading-relaxed"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {detail}
        </p>
        {clickable && (
          <p
            className="font-mono text-[11px] uppercase tracking-widest text-primary mt-3 group-hover:underline"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            View Execution Log →
          </p>
        )}
      </div>
    </div>
  );
}

export default function WorkflowBento({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section id="workflow" className="bg-background px-4 sm:px-8 lg:px-12 py-12 lg:py-24 border-b border-border">
      <div className="max-w-[1440px] mx-auto">

        <div className="mb-12">
          <p
            className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            How It Works
          </p>
          <h2
            className="font-serif text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.02em] text-text"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Five steps from raw data to ready-to-use brief.
          </h2>
        </div>

        {/* Asymmetric 3-column bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Row 1: Data In (1col) | Goal Extraction large (2col) */}
          <BentoCard
            node="1–2"
            title="Data Ingestion"
            subtitle="Transcripts + Usage"
            detail="18 call transcripts across 8 call types. customer_data_joined.json pre-joined from dim + fact tables. PowerShell reads each file; dates parsed; call types extracted from filename."
            signal="data"
          />

          <div className="sm:col-span-1 lg:col-span-2">
            <BentoCard
              node="3"
              title="Goal Extraction"
              subtitle="Gemma-4-E4B · Local"
              detail="Dynamic prompt lookup across 8 call types. Sales calls get commitment-extraction framing. Confidence scoring (high / medium / low) replaces evidence quotes eliminates hallucination at source. Think-tag stripping, truncation repair, phantom bracket fix all applied in Parse node."
              signal="local"
              large
              clickable
              onClick={onOpenModal}
            />
          </div>

          {/* Row 2: Usage Analysis (1col) | Gap Detection (1col) | Opportunity Mapping large (1col) */}
          <BentoCard
            node="4"
            title="Usage Analysis"
            subtitle="Gemma-4-E4B · Local"
            detail="Aggregates all goals. Cross-references against live usage data per product area. Preserves named integrations verbatim (Shopify, Zoho CRM, Cin7). Outputs adoptionStatus: strong · partial · minimal · none."
            signal="local"
          />

          <BentoCard
            node="5"
            title="Gap Detection"
            subtitle="Gemma-4-E4B · Local"
            detail="3–5 most significant gaps per account. Each gap scored by severity (high · medium · low) and signal type (churn-risk · upsell · expansion · none). Urgency window: immediate · near-term · watch."
            signal="local"
          />

          <BentoCard
            node="6–7"
            title="Opportunity Mapping & Brief"
            subtitle="Claude Haiku · Cloud"
            detail="Gaps + high-confidence transcript goals passed as dual context. Claude generates evidence-based talking points grounded in actual customer quotes. No invented stats. Final brief: 4 sections, AM-readable in 3 minutes."
            signal="cloud"
          />

        </div>

        {/* Flow indicator */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary pulse-dot" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted" style={{ fontFamily: "var(--font-mono)" }}>
              Local LLM Gemma-4-E4B (LM Studio)
            </span>
          </div>
          <span className="text-border mx-2">·</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted" style={{ fontFamily: "var(--font-mono)" }}>
              Cloud LLM Claude Haiku (Anthropic API)
            </span>
          </div>
          <span className="text-border mx-2">·</span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted" style={{ fontFamily: "var(--font-mono)" }}>
            Click Node 3 to view execution log
          </span>
        </div>

      </div>
    </section>
  );
}
