# Assumptions Log

Assumptions made during design and build. Each entry has a risk level and what breaks if the assumption is wrong.

---

## Data

### A01 — Customer data org names are scrubbed in the fact table
**Assumption:** `ORGANIZATION NAME` in `customer_data.xlsx` contains placeholder names (`Mr Sparky`, `Auscraft Furniture`). The real account names are in `customer.xlsx` (dim table).
**Evidence:** `Mr Sparky` and `Auscraft Furniture` share identical `ORGANIZATION_UID` values with `Northfield Electrical` and `Meridian Furniture` respectively.
**Risk:** Medium — if any future row has a real name, the join still works (we join on UID, not name); name scrubbing is only relevant for human readability.
**Breaks if wrong:** Nothing — the join is on `ORGANIZATION_UID`, not `ORGANIZATION NAME`.

### A02 — Join key between dim and fact is ORGANIZATION_UID
**Assumption:** `customer.xlsx` col 2 (`ORGANIZATION_UID`) = `customer_data.xlsx` col 84 (`ORGANIZATION_UID`). These are stable UUIDs and will always match exactly.
**Evidence:** Verified by inspection — UIDs confirmed matching across both files.
**Risk:** Low — UUIDs are system-generated and stable.
**Breaks if wrong:** Node 2 returns no data; pipeline errors at Structure Customer Data.

### A03 — Account slug maps to org name by lowercasing and replacing spaces with hyphens
**Assumption:** `meridian-furniture` in the Config node maps to `Meridian Furniture` in `customer.xlsx` via `name.toLowerCase().replace(' ', '-')`.
**Evidence:** Naming convention is consistent across both accounts in the dim table.
**Risk:** Low — consistent pattern observed. Would break for names with punctuation or abbreviations (e.g. `O'Brien` → `o'brien`).
**Breaks if wrong:** Node 2 cannot resolve `ORGANIZATION_UID`; outputs error JSON.

### A04 — customer_data.xlsx column indices are stable
**Assumption:** Column positions in the fact table (e.g. `ORGANIZATION_UID` at col 84, `AI Conversations L28 Days` at col 24) will not change between exports.
**Evidence:** Columns verified by direct inspection on 2026-04-27.
**Risk:** Medium — this is a Podium BI export; schema may shift with product updates.
**Breaks if wrong:** Node 2 reads wrong columns; usage data is silently incorrect downstream.

### A05 — Fact table always has one data row per account
**Assumption:** Each account has exactly one row in `customer_data.xlsx`. No multi-location row expansion.
**Evidence:** Both observed accounts (Mr Sparky / Auscraft Furniture) have one row each. The `Organization Count` col shows 1 for both.
**Risk:** Low for this dataset. In production, a multi-location account would need row aggregation.
**Breaks if wrong:** Node 2 takes the first matching row; other location rows are ignored.

---

## Transcripts

### A06 — Call date is in the first 6 lines of every transcript
**Assumption:** Each `.txt` transcript file contains the recording date within the first 6 lines, in the format `Recorded on [Month Day, Year]`.
**Evidence:** Pattern confirmed across sampled Meridian Furniture transcripts.
**Risk:** Medium — if any transcript uses a different format or omits the date, `callDate` will be `null` and the file sorts last.
**Breaks if wrong:** Affected file gets `callDate: null`, sorted to end. Does not crash the pipeline.

### A07 — Transcript filenames encode call type
**Assumption:** Call type is reliably inferable from the filename (e.g. `account-review`, `ai-setup`, `onboarding`, `phones-review`, `sales`, `podium-overview`).
**Evidence:** All 9 Meridian Furniture filenames follow this convention.
**Risk:** Low for this dataset. In production with Gong/Chorus exports, filenames are often auto-generated and would need a different classification method.
**Breaks if wrong:** Affected file gets `callTypeName: 'other'`; falls through unrouted after Split Out1.

### A08 — All transcripts for one account share the account slug in the filename
**Assumption:** `call-transcript--meridian-furniture-*.txt` wildcard correctly captures all and only Meridian's transcripts.
**Evidence:** Wildcard filter tested; returns 9 files, all confirmed Meridian Furniture.
**Risk:** Low — naming convention is consistent.
**Breaks if wrong:** Wrong files included, or files missed. Would silently corrupt the transcript corpus.

### A09 — n8n loop order is deterministic and matches Split into File Paths output order
**Assumption:** `splitInBatches` (batch size 1) processes items in the same order they arrive. This allows index-based zipping in the Re-index node (`$('Split into File Paths').all()[i]` matches enriched item `i`).
**Evidence:** Observed consistent ordering across multiple test runs.
**Risk:** Medium — n8n docs do not formally guarantee loop ordering. If order shifts, metadata (filename, callTypeName) gets crossed between files.
**Breaks if wrong:** Wrong filename/callTypeName assigned to wrong content. Silent data corruption — hard to detect without manual inspection.

### A10 — `$('Split into File Paths').item` pairing holds through Execute Command
**Assumption:** Inside the loop, referencing `$('Split into File Paths').item.json` in the `Extract Call Date3` Code node correctly returns the metadata for the current loop iteration.
**Evidence:** Assumed — item pairing through Execute Command boundaries is not guaranteed in n8n. Not yet stress-tested.
**Risk:** Medium — if pairing breaks, metadata fields (filename, callTypeName) will be undefined or from the wrong item.
**Breaks if wrong:** `Extract Call Date3` returns `undefined` for filename/callTypeName. Fallback: use zip-by-index in Re-index node instead.

---

## Infrastructure

### A11 — Customer data is pre-exported to customer_data_joined.json
**Assumption:** `customer_data_joined.json` in the data folder is current and was generated by the one-time export script. Node 2 reads this file directly — no Excel COM at runtime.
**Evidence:** Export script run on 2026-04-27, confirmed 2 rows written (Northfield Electrical, Meridian Furniture).
**Why changed:** Multiline PowerShell passed via `powershell -command "..."` in n8n Execute Command is truncated by cmd.exe at the first newline — stdout was empty, exitCode 0. Pre-exporting to JSON eliminates the COM dependency and the multiline shell problem entirely.
**Risk:** Low — file is static for this demo. In production, this export would be triggered by a scheduled job or webhook on each CRM sync.
**Breaks if wrong:** If the JSON file is deleted or the data folder path changes, Node 2 throws. Re-run the export script to regenerate.

### A12 — LM Studio is running with gemma-4-e4b loaded at 192.168.50.230:1234
**Assumption:** All local AI nodes (Goal Extraction, Usage Analysis, Gap Detection) can reach `http://192.168.50.230:1234/v1/chat/completions` with gemma-4-e4b responding.
**Evidence:** Confirmed live 2026-04-28 — full pipeline run completed, all 3 local nodes returned valid output.
**Risk:** High for demo — if LM Studio crashes or the model is unloaded, all 3 local nodes fail.
**Breaks if wrong:** HTTP Request nodes return 503/connection refused. Demo-critical: must verify before every run.

### A13 — n8n is running at localhost:5678
**Assumption:** n8n is started via `npx n8n` before each session and accessible at the default port.
**Risk:** Low — standard setup.
**Breaks if wrong:** Nothing runs.

---

## Pipeline Design

### A14 — One account processed per run (no batch)
**Assumption:** The pipeline processes one account at a time, selected via `Config: Account + Path`. Switching accounts means changing the `account` field in the Config node.
**Evidence:** Design decision — MVP scope.
**Risk:** Low — intentional for demo clarity.
**Breaks if wrong:** Nothing — this is by design. Batching is a production upgrade path.

### A15 — Transcripts are the primary signal; usage data is supporting context
**Assumption:** The AI nodes will weight transcript content (goals, frustrations, adoption friction) more heavily than usage metrics when detecting gaps and generating opportunities.
**Evidence:** Design decision based on data availability — usage data has fewer fields than transcripts carry in narrative form.
**Risk:** Low — if usage data is rich, prompts can be rebalanced.
**Breaks if wrong:** Opportunity quality degrades if transcripts are thin and usage data has the real signal.

### A16 — Meridian has no `sales` or `podium-overview` transcripts
**Assumption:** Meridian's 10 transcript files are: 4 account-review, 3 ai-setup, 2 onboarding, 1 phones-review. No sales or podium-overview files exist, so those filter branches are not needed.
**Evidence:** Confirmed by file listing on 2026-04-27.
**Risk:** None for this demo.
**Breaks if wrong:** N/A — confirmed.

### A17 — Local model in use is gemma-4-e4b (not Gemma-4-E4B)
**Assumption:** The model loaded in LM Studio at `http://192.168.50.230:1234` is `gemma-4-e4b`. All LM Studio HTTP Request nodes use model id `gemma-4-e4b` in the request body.
**Evidence:** Confirmed live on 2026-04-28 — response body shows `"model":"google/gemma-4-e4b"`. LM Studio accepts the short id and normalises to the full id in responses.
**Risk:** Low — model is running and responding. Quality difference vs Gemma-4-E4B unknown until output is reviewed.
**Breaks if wrong:** N/A — confirmed by live run.

### A18 — Parse Goals reads `content` first, falls back to `reasoning_content`
**Assumption:** The Parse Goals fallback logic (`content` → `reasoning_content`) handles gemma-4-e4b output correctly. Original behaviour was confirmed for nemotron-3-nano-4b; gemma-4-e4b output field is unverified until first live run.
**Evidence:** Fallback confirmed working for nemotron-3-nano-4b. gemma-4-e4b not yet tested.
**Risk:** Medium — if gemma-4-e4b puts output in a different field, Parse Goals will receive an empty string and return no goals.
**Breaks if wrong:** Parse Goals returns empty goals array. Fix: inspect raw LM Studio response in n8n execution log, update Parse node to read the correct field.

### A19 — Goal Extraction reads from Sort1 (onboarding) and Sort3 (account-review) by node name
**SUPERSEDED by A20. This assumption no longer applies — the 4-branch design has been replaced.**

### A20 — Call type routing is dynamic via lookup table (v4 Prepare node)
**Assumption:** The single dynamic Prepare node handles all call types by reading `callTypeName` from the transcript item and selecting the matching prompt config from a lookup table. Unknown call types fall back to the account-review config.
**Evidence:** Design decision 2026-04-29 — the 4 hardcoded filter branches were replaced after confirming Northfield has 8 different call types that the old design silently dropped.
**Risk:** Low — any unknown call type gets a working fallback. Sales calls (`startsWith('sales-')`) get a dedicated commitment-extraction framing.
**Breaks if wrong:** If a call type name contains unexpected characters or casing, the lookup misses and falls back to account-review — still produces output, may miss call-type-specific signals.

### A21 — Sales call transcripts contain extractable customer commitment goals
**Assumption:** Northfield's 3 sales calls (`sales-intro`, `sales-follow-up-1`, `sales-follow-up-2`) contain customer-stated goals, expectations, or confirmed commitments that are extractable as goals. These represent the baseline expectations the customer signed up with.
**Evidence:** Northfield is confirmed as a paying customer in `customer_data_joined.json`. Sales calls precede product onboarding and should contain qualifying discussions where the customer stated what they needed.
**Risk:** Medium — if the sales calls are purely rep-driven pitches with no customer engagement, goal extraction will return empty arrays and these files contribute nothing to the pipeline.
**Breaks if wrong:** Empty goals from sales calls — no downstream impact (Aggregate Goals handles empty arrays). The pipeline continues with goals from other call types only.

---

## Demo-Critical Checklist

Before running the demo, verify:
- [ ] A01: Confirm UID join returns Meridian data (not Northfield)
- [ ] A06: At least one transcript has a parseable `callDate`
- [ ] A09: Run pipeline twice and confirm same item ordering
- [ ] A10: Confirm `Extract Call Date3` returns correct filename for each item
- [ ] A11: `customer_data_joined.json` exists in data folder (re-run export script if missing)
- [x] A12: LM Studio running at 192.168.50.230:1234 with gemma-4-e4b — confirmed 2026-04-28
- [x] A17: Model confirmed as google/gemma-4-e4b — all 3 LM Studio nodes updated
- [ ] A19: Confirm Sort1 = onboarding, Sort3 = account-review in the live workflow before running Goal Extraction
