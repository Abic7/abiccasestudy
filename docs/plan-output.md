# Plan Phase Output - Handoff to Build

**Phase:** Plan
**Status:** Complete
**Date:** 2026-04-27
**Next Phase:** Build

---

## Approved Requirements

- [x] Hybrid AI pipeline: local extraction + cloud reasoning
- [x] n8n as orchestration layer (visual, explainable)
- [x] LM Studio + Gemma-4-E4B for Goal Extraction, Usage Analysis, Gap Detection
- [x] Claude Haiku 4.5 for Opportunity Mapping and QBR Brief Generation
- [x] Input: call transcripts (.txt) + customer data (.xlsx)
- [x] Output: structured markdown QBR brief
- [x] MVP scope: no CRM integrations, no real-time sync

Full requirements: [requirements.md](requirements.md)

---

## Architectural Decisions

| Decision | Outcome |
|----------|---------|
| Orchestration | n8n (localhost:5678 via npm) |
| Local model | Gemma-4-E4B via LM Studio (localhost:1234) |
| Cloud model | claude-haiku-4-5-20251001 via Anthropic API |
| Pipeline stages | 7 nodes: 2 input + 3 local + 2 cloud |
| Output | Markdown QBR brief |
| Split point | After Gap Detection node |

Full architecture: [architecture.md](architecture.md)

---

## Technology Choices

| Tool | Version/Config | Why |
|------|---------------|-----|
| n8n | Local npm | Visual demo, JD-aligned tooling |
| LM Studio | Gemma-4-E4B | Strong long-context extraction, free |
| Anthropic API | Haiku 4.5 | Cost-efficient cloud reasoning |
| Input format | .txt + .xlsx | Matches provided case study data |
| Output format | Markdown | AM-readable, no UI dependency |

---

## Files Generated (Plan Phase)

| File | Purpose |
|------|---------|
| `architecture.html` | Animated pipeline diagram for demo |
| `wsn.html` | What/So What/Now What narrative page for demo |
| `docs/requirements.md` | Full project requirements |
| `docs/architecture.md` | Full architecture specification |
| `CLAUDE.md` | Session memory (auto-loads each chat) |
| `INDEX.md` | Master phase tracker |

---

## Next Steps for Build Phase

1. Confirm LM Studio is running: `http://localhost:1234/v1/models`
2. Confirm n8n is running: `http://localhost:5678`
3. Add Anthropic API key to n8n credentials
4. Build nodes in order: Read Transcripts → Read Customer Data → Goal Extraction → Usage Analysis → Gap Detection → Opportunity Mapping → QBR Brief
5. Test each node individually before chaining
6. Run full pipeline on Meridian Furniture data
7. Capture sample output and save to `docs/sample-output-meridian.md`

---

## Open Questions

- [ ] How will n8n read local .txt files? (Read Binary File node vs Code node)
- [ ] Should transcripts be chunked if they exceed model context window?
- [ ] What JSON schema should Goal Extraction output? (needs defining before Usage Analysis)
- [ ] Should the QBR brief output to a file, or display in n8n execution log?
