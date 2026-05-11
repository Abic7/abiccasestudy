"use client";

import { useEffect, useState } from "react";

export default function IPDisclaimer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("ip-acknowledged")) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("ip-acknowledged", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-text/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-surface border border-border rounded-[4px] max-w-[560px] w-full mx-4 sm:mx-6 p-6 sm:p-10 shadow-lg">

        <p
          className="font-mono text-[11px] uppercase tracking-widest text-muted mb-5"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Before You Continue
        </p>

        <h2
          className="font-serif text-[32px] leading-[1.1] text-text mb-5"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Intellectual Property Notice
        </h2>

        <p
          className="font-mono text-[13px] text-text leading-relaxed mb-8"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          This pipeline including its architecture, prompt designs, workflow logic, and all associated code was built solely as a case study submission and should{" "}
          <span className="text-primary">not be adopted, deployed, or used by Podium</span>.
          <br /><br />
          All intellectual property rights remain exclusively with{" "}
          <span className="text-text font-medium">Abi C</span>. Viewing this work does not constitute a licence, assignment, or transfer of any rights to Podium or any third party.
        </p>

        <button
          onClick={dismiss}
          className="w-full font-mono text-[12px] uppercase tracking-widest bg-primary text-white py-3 rounded-[4px] hover:bg-primary-dark transition-colors duration-200"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          I understand continue
        </button>

      </div>
    </div>
  );
}
