# AI Account Review & Expansion Agent
**Case Study Submission — Podium AI Go-To-Market Engineer**
Built by Abi C

---

## What This Is

A hybrid AI pipeline that replaces manual QBR preparation for Account Managers.

Account Managers spend 30–60 minutes per account manually reviewing call transcripts, pulling usage dashboards, and writing briefs before a Quarterly Business Review. This pipeline does that automatically — reading transcripts, detecting adoption gaps, surfacing upsell opportunities, and producing an AM-ready markdown brief.

**Two accounts tested. Two briefs produced.**
- Meridian Furniture — 10 expansion opportunities identified
- Northfield Electrical — 9 expansion opportunities identified

All talking points trace back to a customer quote or a usage data field. Zero hallucinated stats.

---

## Architecture

Five-node prompt chain across a hybrid local/cloud stack:

```
Call Transcripts (.txt)  +  Customer Usage Data (.json)
                    |
                    v
        ┌─────────────────────────────┐
        │   LOCAL — Gemma-4-E4B       │
        │   (LM Studio, no egress)    │
        │                             │
        │   Node 3: Goal Extraction   │
        │   Node 4: Usage Analysis    │
        │   Node 5: Gap Detection     │
        └─────────────────────────────┘
                    |
              Structured JSON
                    |
                    v
        ┌─────────────────────────────┐
        │   CLOUD — Claude Haiku      │
        │   (Anthropic API)           │
        │                             │
        │   Node 6: Opportunity Map   │
        │   Node 7: QBR Brief         │
        └─────────────────────────────┘
                    |
                    v
        qbr-brief-{account}.md
```

| Layer | Tool | Role |
|-------|------|------|
| Orchestration | n8n | Visual workflow; each step inspectable |
| Local LLM | Gemma-4-E4B via LM Studio | Goal extraction, usage analysis, gap detection |
| Cloud LLM | Claude Haiku 4.5 (Anthropic API) | Opportunity mapping, QBR narrative |
| Data | .txt transcripts + pre-joined .json | Meridian Furniture, Northfield Electrical |

**Why hybrid?** Heavy extraction work runs locally — free, no data egress, parallelisable. Strategic reasoning and narrative generation go to Claude Haiku where output quality matters most.

---

## Pipeline Design Decisions

### Prompt engineering for Gemma-4-E4B
Generic prompts did not work with this model. Six specific fixes were required:

1. **Dropped evidence fields** — Gemma hallucinated direct quotes. Replaced with a `confidence` enum (high / medium / low).
2. **Think-tag stripping** — Gemma wraps reasoning in `<think>` tags before JSON output. Stripped in every Parse node before `JSON.parse()`.
3. **Truncation repair** — Gemma hits token limits mid-JSON. Parse nodes detect and repair unclosed brackets before parsing.
4. **Positive inclusion structure** — Negation rules ("do NOT include X") were ignored. Replaced with a 4-step positive sequence: identify speakers → find goal statements → extract → return JSON.
5. **Dynamic call type routing** — Replaced 4 hardcoded filter branches (23 nodes) with 1 dynamic Prepare node using a lookup table. Handles any call type; unknown types fall back to account-review config.
6. **Removed `/no_think` flag** — Ollama-specific, not part of Gemma's instruction set. Think-tag stripping is the correct handling path.

### Architecture: Option B (parallel filter branches → dynamic node)
Original design used a single `transcriptsByType` object. Built with parallel filter branches per call type for cleaner data routing and demo explainability. Later rebuilt as a single dynamic node when Northfield's 8 call types exposed the hardcoded design's limits.

### Customer data pre-join
Excel COM automation via PowerShell inside n8n silently failed (exitCode 0, empty stdout — cmd.exe truncates multiline commands). Resolved by pre-joining the dimension and fact tables into a flat JSON file using SFDC org ID as the join key. Node 2 reads this file directly.

---

## Data Discrepancies Found

Four discrepancies surfaced during build:

1. **Customer names scrubbed** — `customer_data.xlsx` used placeholder names (`Mr Sparky`, `Auscraft Furniture`). Real names resolved from a dimension table via SFDC org ID join.
2. **Apex file planted in dataset** — A transcript for an unrelated third company (Apex) was included alongside Meridian and Northfield files. The pipeline's account-scoped wildcard filter excluded it correctly. Naive glob patterns would have included it silently.
3. **Integration names garbled** — The same system appeared as "Scene Seven", "Sinsven", "Sync7", "Sin Seven" across transcripts. AU/NZ accent + generic ASR = ambiguous output. Parse node flags rather than corrects — AM to confirm with customer.
4. **84-column undocumented schema** — `customer_data.xlsx` has no data dictionary. Column positions discovered by inspection and hardcoded. Any schema change in a BI export would cause silent misreads.

---

## What's in This Repo

| Path | Contents |
|------|----------|
| `docs/requirements.md` | Full requirements and MVP scope |
| `docs/architecture.md` | Architecture decisions and option comparison |
| `docs/assumptions.md` | 21 logged assumptions with risk ratings |
| `docs/plan-output.md` | Plan phase handoff document |
| `docs/sample-output-meridian.md` | Verified QBR brief — Meridian Furniture (10 opportunities) |
| `docs/sample-output-northfield.md` | Verified QBR brief — Northfield Electrical (9 opportunities) |
| `architecture.html` | Animated pipeline diagram (demo asset) |
| `wsn.html` | What / So What / Now What narrative page |
| `Portfolio Site/` | Next.js case study site |
| `workflows/` | See workflows/README.md |

---

## What's Not in This Repo

Workflow files, prompt code, and parse logic are not published as part of this submission. The architecture documentation, assumptions log, and verified sample outputs above demonstrate the build without exposing the implementation.

---

## Intellectual Property

This pipeline — including its architecture, prompt designs, workflow logic, and all associated code — was built solely as a case study submission and should not be adopted, deployed, or used by Podium. All intellectual property rights remain exclusively with Abi C. Submission of this work does not constitute a licence, assignment, or transfer of any rights to Podium or any third party.

---

*Built April 2026. Questions: [abhic7@gmail.com](mailto:abhic7@gmail.com) · [LinkedIn](https://www.linkedin.com/in/abichaudhuri/) · [GitHub](https://github.com/Abic7/Podium_AI_GTM_Eng)*
