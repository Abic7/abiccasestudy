# Architecture - AI Account Review & Expansion Agent

## System Overview

Hybrid AI pipeline with two processing layers:
- **Local layer** (LM Studio + Gemma-4-E4B): token-heavy extraction tasks, free, no data egress
- **Cloud layer** (Claude Haiku 4.5): strategic reasoning and narrative generation
- **Orchestration** (n8n): visual workflow, each step is an inspectable node

## Pipeline Diagram

```
[INPUTS]
  Call Transcripts (.txt)  +  Customer Data (.xlsx)
           |
           v
+------------------------------------------+
|  LOCAL PROCESSING  (LM Studio / Gemma-4-E4B) |
|                                            |
|  [Goal Extraction]                         |
|        |                                   |
|  [Usage Analysis]                          |
|        |                                   |
|  [Gap Detection]                           |
+------------------------------------------+
           |
     Structured JSON
     (goals, gaps, usage)
           |
           v
+------------------------------------------+
|  CLOUD REASONING  (Claude Haiku 4.5)      |
|                                            |
|  [Opportunity Mapping]                     |
|        |                                   |
|  [QBR Brief Generation]                    |
+------------------------------------------+
           |
           v
     [QBR OUTPUT]
     Markdown brief
```

## Component Breakdown

### Node 1: Read Transcripts
- Tool: n8n Read Binary File or HTTP Request to local filesystem
- Input: .txt transcript files for target account
- Output: concatenated transcript text
- Notes: all transcripts for one account merged before processing

### Node 2: Read Customer Data
- Tool: n8n Spreadsheet File node
- Input: customer_data.xlsx
- Output: structured usage metrics JSON
- Notes: filter to target account rows

### Node 3: Goal Extraction (Local)
- Tool: n8n HTTP Request to LM Studio
- Endpoint: `http://localhost:1234/v1/chat/completions`
- Model: Gemma-4-E4B
- Input: transcript text
- Output: JSON array of customer goals
- Prompt pattern: extract, do not infer

### Node 4: Usage Analysis (Local)
- Tool: n8n HTTP Request to LM Studio
- Model: Gemma-4-E4B
- Input: goals JSON + usage data JSON
- Output: structured comparison (goal → usage status)

### Node 5: Gap Detection (Local)
- Tool: n8n HTTP Request to LM Studio
- Model: Gemma-4-E4B
- Input: goals vs usage comparison
- Output: top 3 gaps with feature names and goal alignment

### Node 6: Opportunity Mapping (Cloud)
- Tool: n8n HTTP Request to Anthropic API
- Endpoint: `https://api.anthropic.com/v1/messages`
- Model: `claude-haiku-4-5-20251001`
- Input: gaps JSON + usage context
- Output: top 3 ranked upsell opportunities with business rationale

### Node 7: QBR Brief Generation (Cloud)
- Tool: n8n HTTP Request to Anthropic API
- Model: `claude-haiku-4-5-20251001`
- Input: goals + gaps + opportunities
- Output: formatted markdown QBR brief

## Data Flow

```
transcripts.txt
      +           --> [Goal Extraction] --> goals.json
customer.xlsx                                  |
                  --> [Usage Analysis] --> usage_vs_goals.json
                                               |
                  --> [Gap Detection]  --> gaps.json
                                               |
                  --> [Opp Mapping]    --> opportunities.json
                                               |
                  --> [QBR Brief]      --> brief.md
```

## Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Orchestration | n8n over Python | Visual, explainable in demo, matches JD tooling |
| Local model | Gemma-4-E4B over nemotron-nano-4b | Better long-context extraction on messy transcripts |
| Cloud model | Haiku 4.5 over Sonnet | Cost-efficient, sufficient for structured output tasks |
| Split point | After Gap Detection | Local handles extraction; cloud handles judgment |
| Output format | Markdown | AM-readable, no UI needed for MVP |

## MVP Design Decision: Transcript Grouping (Option A)

Node 1 groups transcripts by call type before passing them downstream. Each type carries different signal, so downstream prompts reference the right bucket rather than a single undifferentiated blob.

| Call Type | Key Signal | Used By |
|-----------|-----------|---------|
| `onboarding` | Goals set, initial promises made | Goal Extraction |
| `aiSetup` | Adoption friction, what got stuck | Usage Analysis |
| `accountReview` | Unmet expectations, satisfaction gaps | Gap Detection |
| `phonesReview` | Product-specific usage patterns | Usage Analysis |
| `sales` | Original pain points, what was sold | Goal Extraction |

The output of Node 1 is `transcriptsByType` - a labelled object, not a flat string. This lets each downstream node prompt say "here are the account review calls" rather than asking the model to self-sort a 200k-character blob.

**Why not Option B (parallel branches)?** See below.

---

## Production Upgrade: Parallel Branch Architecture (Option B)

### What it is

Instead of one linear pipeline, n8n splits into a parallel track per call type after Node 1. Each branch has a **specialised prompt** tuned to that call type's signal. A Merge node then synthesises all branch outputs before Opportunity Mapping.

```
Node 1: Read + Group Transcripts
         |
         +---> [Onboarding Branch]   --> "What goals were set? What was promised?"
         |
         +---> [AI Setup Branch]     --> "What adoption friction occurred? What features were skipped?"
         |
         +---> [Account Review Branch] -> "What expectations are unmet? What frustration was expressed?"
         |
         +---> [Phones Branch]       --> "What usage patterns or gaps appeared in phone/routing calls?"
         |
              [Merge] --> Opportunity Mapping --> QBR Brief
```

### Why it produces better output

- Each LLM call has a focused context window - no signal dilution across call types
- Prompts can be tuned per call type ("extract frustration" vs "extract adoption blockers")
- Gaps are attributed to the call type that surfaced them (traceable, auditable)
- Parallel execution is faster than sequential when branches are independent

### Why MVP uses Option A instead

- Linear workflow is easier to walk through in a live demo
- Fewer nodes to debug during build phase
- The semantic benefit is preserved (labels + grouped buckets) without the branching complexity
- Option B is the natural "what I'd build with more time" answer in a debrief

### What it would take to implement Option B

1. Add a Switch node after Node 1 that routes each call type to its own branch
2. Replace the single Goal Extraction node with 2-3 specialised extraction nodes (one per call type with a tailored prompt)
3. Add a Merge node before Opportunity Mapping to consolidate branch outputs into a unified gaps JSON
4. Update downstream prompts to reference the merged structure

Estimated additional nodes: 6-8. Core pipeline nodes (Opportunity Mapping, QBR Brief) unchanged.

---

## Production Gap (what this is not)
- No CRM webhook trigger (manual only in demo)
- No Gong/Chorus API (flat files only)
- No hallucination scoring or confidence thresholds
- No AM feedback loop
- No multi-account batch processing

## API References
- LM Studio: `http://localhost:1234/v1/chat/completions` (OpenAI-compatible)
- Anthropic: `https://api.anthropic.com/v1/messages`
- Auth header: `x-api-key: [ANTHROPIC_API_KEY]`
- Anthropic version header: `anthropic-version: 2023-06-01`
