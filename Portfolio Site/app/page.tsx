"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WorkflowBento from "@/components/WorkflowBento";
import Metrics from "@/components/Metrics";
import AccountOutput from "@/components/AccountOutput";
import BuildDecisions from "@/components/BuildDecisions";
import ArchitectureRationale from "@/components/ArchitectureRationale";
import Recommendations from "@/components/Recommendations";
import Discrepancies from "@/components/Discrepancies";
import GitHubCTA from "@/components/GitHubCTA";
import ChainOfThoughtModal from "@/components/ChainOfThoughtModal";
import Footer from "@/components/Footer";
export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main>
<Nav />
      <div className="pt-14">
        <Hero />
        <WorkflowBento onOpenModal={() => setModalOpen(true)} />
        <Metrics />
        <ArchitectureRationale />
        <BuildDecisions />
        <AccountOutput />
        <Discrepancies />
        <Recommendations />
        <GitHubCTA repoUrl="https://github.com/Abic7/Podium_AI_GTM_Eng" />
<Footer />
      </div>
      <ChainOfThoughtModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
