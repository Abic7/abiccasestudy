"use client";

import { useState } from "react";

const ACCOUNTS = [
  {
    id: "meridian",
    name: "Meridian Furniture",
    bundle: "Core",
    vertical: "Retail / Furniture",
    engagement: "Power",
    arr: "$5,145.96",
    transcripts: 10,
    callTypes: ["account-review", "ai-setup", "onboarding", "phones-review"],
    opportunities: 10,
    badge: "10 expansion opportunities",
    snapshot: [
      "Multi-location furniture retailer; Power engagement tier; strong reviews baseline (247 lifetime, 38 invites/30 days).",
      "Integrations active: Shopify, Zoho CRM, Meta, Square integration sync reliability is a stated priority.",
      "AI subscription active but conversational quality issues flagged; IVR and custom PHP website in use.",
      "Sentiment: engaged but frustrated with adoption gaps blocking stated automation and AI goals.",
    ],
    themes:
      "Meridian is using Podium broadly but leaving automation value unclaimed. Call recording + missed call workflows are unfunded priorities. Their custom PHP website and offshore routing setup (Scene7 / Cin7) create integration ambiguity the AM should clarify on-call. AI tone and KB customisation were explicitly requested but not actioned.",
    opportunities_list: [
      {
        title: "Enable Call Recording + Missed Call Automation",
        product: "Phones",
        signal: "upsell",
        talking:
          "You've flagged IVR menus and multi-location routing as priorities. Call recording isn't active you're losing institutional knowledge on every call. Enabling recording + auto-SMS on missed calls captures leads you're currently dropping.",
        action: "Audit current phone config; enable recording; set up missed-call SMS flow within 7 days.",
      },
      {
        title: "Campaigns Nurture Sequence for Repeat Buyers",
        product: "Campaigns",
        signal: "expansion",
        talking:
          "2 campaign messages sent, 0 responses in 30 days. Your Shopify integration means you have purchase history a post-purchase nurture sequence (review request → upsell) is a one-hour setup that compounds monthly.",
        action: "Build 2-step post-purchase sequence; target last 90 days of Shopify buyers; run within 14 days.",
      },
      {
        title: "Lead Sync Reliability with Zoho CRM",
        product: "Integrations",
        signal: "retention",
        talking:
          "Zoho CRM sync reliability was flagged in multiple calls. If leads aren't syncing cleanly, attribution breaks and your team loses visibility. This is a churn signal we need to resolve before it compounds.",
        action: "Pull sync error log together; identify failure pattern; escalate to integrations team within 5 days.",
      },
      {
        title: "AI Tone & Knowledge Base Customisation",
        product: "AI",
        signal: "expansion",
        talking:
          "Your AI is live but you've asked for tone adjustments and KB updates multiple times. Unactioned KB gaps mean your AI is answering incorrectly this directly undermines customer trust. Let's dedicate 30 min on this call to a KB review.",
        action: "Screen-share KB; identify 3 gap areas; commit to content update within 1 week.",
      },
      {
        title: "Status-Based Automation Triggers",
        product: "Automation",
        signal: "upsell",
        talking:
          "You've described wanting automations that trigger on job status changes. This is exactly what Podium's workflow triggers support. Currently nothing is automated off status that's manual follow-up your team is doing that doesn't need to happen.",
        action: "Map 2 current manual follow-up steps; build status-trigger automations in session; go live same day.",
      },
    ],
    agenda: [
      { item: "Integration reliability audit (Zoho CRM + Shopify sync)", time: "12 min" },
      { item: "Phone config review: call recording + missed call SMS", time: "10 min" },
      { item: "AI KB review and tone update", time: "10 min" },
      { item: "Campaigns: build post-purchase nurture sequence live", time: "8 min" },
      { item: "Status-based automation: identify + build 2 triggers", time: "10 min" },
    ],
  },
  {
    id: "northfield",
    name: "Northfield Electrical",
    bundle: "Core",
    vertical: "Trades / Electrical",
    engagement: "Power",
    arr: "$9,845.88",
    transcripts: 8,
    callTypes: ["ai-setup", "ai-upgrade-account-review", "phone-routing", "phones-ai-review", "podium-overview", "sales-intro", "sales-follow-up-1", "sales-follow-up-2"],
    opportunities: 9,
    badge: "9 expansion opportunities",
    snapshot: [
      "Core services contractor (electrical, smoke alarms, security); 3,000 website visitors/month; strong reputation (4.89 avg, 235 reviews).",
      "Leaking leads: 12 missed calls in 30 days despite paid phones active.",
      "Zero payment processing or campaign activity despite explicit goals around both.",
      "Sentiment: growth-focused, frustrated with operational gaps blocking lead volume and AI quality goals.",
    ],
    themes:
      "Northfield is solving communication and reputation well but leaving revenue on the table in three critical areas: call routing is broken (12 missed calls/month); quote-to-commitment friction (zero payment use despite explicit need); and zero automation despite documented goals for lead contests and recurring service upsells.",
    opportunities_list: [
      {
        title: "Eliminate 12 Missed Calls Fix Call Routing",
        product: "Phones",
        signal: "upsell",
        talking:
          "You're dropping 12 calls per month despite having paid phones active. You explicitly stated the priority to implement 'complex, multi-tiered call routing logic that handles multiple staff members across defined shifts.' These missed calls are costing you leads directly.",
        action: "Audit current routing config; identify why calls are dropping; test time-based routing rules within 7 days.",
      },
      {
        title: "Secure Job Commitments with Digital Quote Documentation",
        product: "Payments",
        signal: "expansion",
        talking:
          "You've stated the need to 'establish digital documentation of verbal agreements on quotes to secure the job commitment.' Zero payment processing in 30 days. Enabling Payments lets you confirm quotes digitally in conversation reducing follow-up friction and protecting revenue.",
        action: "Schedule 20-min Payments setup walkthrough; identify 2–3 recent jobs where digital signing would have closed faster.",
      },
      {
        title: "Automate Lead Contests & Recurring Service Upsells",
        product: "Campaigns",
        signal: "expansion",
        talking:
          "You stated the goal to 'automate the process of entering leads into a contest or draw upon specific triggers like quoting or chatting.' Zero campaigns running. A simple automation triggered on quote acceptance could enter leads into a contest and prompt upsell for yearly smoke alarm testing.",
        action: "Build and launch one test campaign: auto-enroll quoted leads into monthly contest; measure engagement in 30 days.",
      },
      {
        title: "Implement 24/7 AI Chatbot on Website for Lead Capture",
        product: "AI",
        signal: "upsell",
        talking:
          "You stated the goal to 'implement a live chat bot on the website to ensure 24/7 lead capture and qualification.' You receive 3,000 visitors per month. Your AI is already trained deploying it as a website chat widget captures leads around the clock.",
        action: "Enable web chat widget; configure AI to collect name, address, problem; set up SMS handoff within 5 days.",
      },
      {
        title: "Train AI on Repetitive Questioning",
        product: "AI",
        signal: "retention",
        talking:
          "Your AI is active with 107 conversations but asking redundant questions and generating nonsensical responses. This hurts customer experience and blocks your goal to ensure the sales team can 'handle objections correctly.' Retraining eliminates these friction points.",
        action: "Export 10–15 recent AI conversations; identify 3 patterns of repetitive questioning; retraining session within 2 weeks.",
      },
    ],
    agenda: [
      { item: "Call routing audit & fix", time: "12 min" },
      { item: "Quick wins: missed call SMS + review frequency caps", time: "8 min" },
      { item: "Quote-to-cash: Payments setup", time: "10 min" },
      { item: "AI quality retraining", time: "10 min" },
      { item: "Website chat + lead contests (expansion wins)", time: "10 min" },
    ],
  },
];

function SignalBadge({ signal }: { signal: string }) {
  const colors: Record<string, string> = {
    upsell: "bg-blue-50 text-primary border-blue-200",
    expansion: "bg-green-50 text-green-700 border-green-200",
    retention: "bg-orange-50 text-orange-700 border-orange-200",
  };
  return (
    <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-[4px] border ${colors[signal] ?? "bg-gray-50 text-muted border-border"}`}
      style={{ fontFamily: "var(--font-mono)" }}>
      {signal}
    </span>
  );
}

export default function AccountOutput() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="output" className="bg-background px-4 sm:px-8 lg:px-12 py-12 lg:py-24 border-b border-border">
      <div className="max-w-[1440px] mx-auto">

        <div className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3" style={{ fontFamily: "var(--font-mono)" }}>
            Case Study Output
          </p>
          <h2 className="font-serif text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.02em] text-text" style={{ fontFamily: "var(--font-serif)" }}>
            Two real accounts. See the actual output.
          </h2>
          <p className="font-mono text-[13px] text-muted mt-3" style={{ fontFamily: "var(--font-mono)" }}>
            Click an account below to see the full brief the tool produced, including opportunities, talking points, and a suggested meeting agenda.
          </p>
        </div>

        <div className="space-y-4">
          {ACCOUNTS.map((account) => {
            const isOpen = selected === account.id;
            return (
              <div
                key={account.id}
                className={`bg-surface border rounded-[4px] transition-all duration-200 overflow-hidden ${
                  isOpen ? "border-text" : "border-border hover:border-[#C0C0BC] cursor-pointer"
                }`}
              >
                {/* Card header always visible */}
                <button
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                  onClick={() => setSelected(isOpen ? null : account.id)}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <div>
                      <h3 className="font-serif text-[20px] sm:text-[24px] text-text" style={{ fontFamily: "var(--font-serif)" }}>
                        {account.name}
                      </h3>
                      <p className="font-mono text-[11px] sm:text-[12px] text-muted mt-1" style={{ fontFamily: "var(--font-mono)" }}>
                        {account.vertical} · {account.bundle} bundle · ARR {account.arr}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-white bg-primary px-2 sm:px-3 py-1 rounded-[4px]" style={{ fontFamily: "var(--font-mono)" }}>
                        {account.badge}
                      </span>
                      <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-muted border border-border px-2 sm:px-3 py-1 rounded-[4px]" style={{ fontFamily: "var(--font-mono)" }}>
                        {account.transcripts} transcripts · {account.callTypes.length} call types
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[20px] text-muted transition-transform duration-200" style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>
                    +
                  </span>
                </button>

                {/* Expanded brief */}
                {isOpen && (
                  <div className="px-8 pb-10 border-t border-border">

                    {/* Account Snapshot */}
                    <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                      <div className="col-span-1 space-y-4">
                        <p className="font-mono text-[11px] uppercase tracking-widest text-muted" style={{ fontFamily: "var(--font-mono)" }}>Account Snapshot</p>
                        <ul className="space-y-3">
                          {account.snapshot.map((bullet, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">—</span>
                              <p className="font-mono text-[12px] text-text leading-relaxed" style={{ fontFamily: "var(--font-mono)" }}>{bullet}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="col-span-2 space-y-4">
                        <p className="font-mono text-[11px] uppercase tracking-widest text-muted" style={{ fontFamily: "var(--font-mono)" }}>Key Themes</p>
                        <p className="font-mono text-[13px] text-text leading-relaxed" style={{ fontFamily: "var(--font-mono)" }}>{account.themes}</p>
                      </div>
                    </div>

                    {/* Opportunities */}
                    <div className="mt-10">
                      <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-5" style={{ fontFamily: "var(--font-mono)" }}>
                        Expansion Opportunities ({account.opportunities_list.length} shown)
                      </p>
                      <div className="space-y-4">
                        {account.opportunities_list.map((opp, i) => (
                          <div key={i} className="border border-border rounded-[4px] p-6 grid grid-cols-[24px_1fr] gap-4">
                            <span className="font-mono text-[13px] text-muted" style={{ fontFamily: "var(--font-mono)" }}>{i + 1}</span>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 flex-wrap">
                                <h4 className="font-serif text-[18px] text-text" style={{ fontFamily: "var(--font-serif)" }}>{opp.title}</h4>
                                <SignalBadge signal={opp.signal} />
                                <span className="font-mono text-[10px] uppercase tracking-widest text-muted border border-border px-2 py-0.5 rounded-[4px]" style={{ fontFamily: "var(--font-mono)" }}>{opp.product}</span>
                              </div>
                              <p className="font-mono text-[12px] text-text leading-relaxed" style={{ fontFamily: "var(--font-mono)" }}>
                                <span className="text-muted">Talking point: </span>{opp.talking}
                              </p>
                              <p className="font-mono text-[12px] text-primary" style={{ fontFamily: "var(--font-mono)" }}>
                                → {opp.action}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* QBR Agenda */}
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-5" style={{ fontFamily: "var(--font-mono)" }}>
                          Recommended QBR Agenda
                        </p>
                        <div className="space-y-3">
                          {account.agenda.map((item, i) => (
                            <div key={i} className="flex items-start gap-4 py-3 border-b border-border last:border-0">
                              <span className="font-mono text-[11px] text-muted w-5 flex-shrink-0" style={{ fontFamily: "var(--font-mono)" }}>{i + 1}</span>
                              <p className="font-mono text-[12px] text-text flex-1" style={{ fontFamily: "var(--font-mono)" }}>{item.item}</p>
                              <span className="font-mono text-[11px] text-muted flex-shrink-0" style={{ fontFamily: "var(--font-mono)" }}>{item.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-background border border-border rounded-[4px] p-6 flex flex-col justify-between">
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3" style={{ fontFamily: "var(--font-mono)" }}>Pipeline Run Details</p>
                          <div className="space-y-2">
                            {[
                              { label: "Local model", value: "google/gemma-4-e4b" },
                              { label: "Cloud model", value: "claude-haiku-4-5" },
                              { label: "Transcripts", value: `${account.transcripts} files` },
                              { label: "Call types", value: account.callTypes.length.toString() },
                              { label: "Hallucinated stats", value: "0" },
                            ].map((row) => (
                              <div key={row.label} className="flex justify-between">
                                <span className="font-mono text-[11px] text-muted" style={{ fontFamily: "var(--font-mono)" }}>{row.label}</span>
                                <span className={`font-mono text-[11px] ${row.label === "Hallucinated stats" ? "text-accent" : "text-text"}`} style={{ fontFamily: "var(--font-mono)" }}>{row.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-border">
                          <p className="font-mono text-[11px] text-muted" style={{ fontFamily: "var(--font-mono)" }}>
                            All talking points trace back to a customer quote or data field.
                          </p>
                        </div>
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
