"use client";

import { useEffect, useRef, useState } from "react";

interface MetricCardProps {
  value: string;
  label: string;
  delta: string;
  numericTarget?: number;
  prefix?: string;
  suffix?: string;
}

function useCountUp(target: number, duration = 1500, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, shouldStart]);

  return count;
}

function MetricCard({ value, label, delta, numericTarget, prefix = "", suffix = "" }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(numericTarget ?? 0, 1500, visible && !!numericTarget);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const displayValue = numericTarget
    ? `${prefix}${count}${suffix}`
    : value;

  return (
    <div
      ref={ref}
      className="bg-surface border border-border rounded-[4px] p-8 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200"
      style={{ minHeight: "280px" }}
    >
      <div>
        <p
          className="font-mono text-[11px] uppercase tracking-widest text-muted"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {label}
        </p>
      </div>

      <div>
        <div
          className="font-serif text-[60px] sm:text-[72px] lg:text-[84px] leading-none tracking-[-0.03em] text-text"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {displayValue}
        </div>
        <p
          className="font-sans text-[14px] text-accent mt-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {delta}
        </p>
      </div>
    </div>
  );
}

export default function Metrics() {
  return (
    <section id="metrics" className="bg-background px-4 sm:px-8 lg:px-12 py-12 lg:py-24 border-b border-border">
      <div className="max-w-[1440px] mx-auto">

        <div className="mb-12">
          <p
            className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Results at a Glance
          </p>
          <h2
            className="font-serif text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.02em] text-text"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            What this actually saves.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard
            value="30–60 min"
            label="Time saved per meeting prep"
            delta="Per account manager, per customer review, every time"
          />
          <MetricCard
            value="19"
            label="Revenue opportunities found"
            delta="Across 2 accounts, all backed by real customer quotes"
            numericTarget={19}
          />
          <MetricCard
            value="18→2"
            label="Calls turned into two briefs"
            delta="18 call recordings across 8 topics, two ready-to-read documents"
          />
        </div>

        {/* Trust callout */}
        <div className="mt-6 bg-surface border border-border rounded-[4px] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 justify-between">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
            <p
              className="font-mono text-[13px] text-text"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <strong>0 made-up numbers.</strong> Every talking point traces back to a real customer quote or a data field. The AI is not allowed to guess. If there is no evidence, it does not include it.
            </p>
          </div>
          <span
            className="font-mono text-[11px] uppercase tracking-widest text-muted ml-8 flex-shrink-0"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Build Decision →
          </span>
        </div>

      </div>
    </section>
  );
}
