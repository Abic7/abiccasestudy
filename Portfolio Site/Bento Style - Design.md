# Intelligence Bento

## Product Overview

**The Pitch:** A high-end interactive case study showcasing a complex n8n LLM automation workflow. It translates intricate technical architecture into a digestible, high-contrast Bento Grid, proving ROI through transparent AI reasoning and hard metrics.

**For:** CTOs, Lead Engineers, and RevOps leaders evaluating enterprise-grade AI automation workflows.

**Device:** desktop

**Design Direction:** A sharp, editorial-meets-technical aesthetic. Ultra-clean white/grey structural grids punctuated by electric blue accents, pairing sophisticated serif headers with monospaced technical data.

**Inspired by:** Vercel Ship site, Stripe Press.

---

## Screens

- **Hero & Problem Statement:** High-impact typographic introduction and contextual grounding.
- **Workflow Bento Grid:** An interactive, modular map of the n8n execution nodes.
- **Intelligence Metrics:** Massive, stark ROI data points in dedicated bento boxes.
- **Chain of Thought Modal:** A drill-down view revealing the raw LLM reasoning logs.

---

## Key Flows

**Explore Node Logic:** User investigates how the LLM makes decisions.
1. User is on **Workflow Bento Grid** -> sees pulsing electric blue indicator on the "Classifier LLM" bento card.
2. User clicks "View Execution Log" -> **Chain of Thought Modal** slides up.
3. User sees raw JSON output and a step-by-step reasoning timeline.

---

<details>
<summary>Design System</summary>

## Color Palette

- **Primary:** `#0055FF` - Electric Blue (Accents, active states, data highlights)
- **Background:** `#F9F9F8` - Off-white paper tone
- **Surface:** `#FFFFFF` - Bento card background
- **Text:** `#0D0D0D` - Near-black headers and body
- **Muted:** `#8E8E8E` - Technical metadata, secondary labels
- **Border:** `#E2E2E0` - Grid lines, card outlines
- **Accent:** `#00E599` - Success markers, completed nodes

## Typography

- **Headings:** `Instrument Serif`, 400, 48-72px
- **Body:** `Switzer`, 400, 16px (Tight tracking)
- **Technical/Data:** `Geist Mono`, 400, 13px (Uppercase for small labels)
- **Buttons:** `Geist Mono`, 500, 12px (Uppercase, tracking-widest)

**Style notes:** 
Cards have exactly `4px` border-radius. Shadows are non-existent; separation is achieved entirely through `#E2E2E0` 1px solid borders. Layout relies on rigid, mathematically perfect grid gaps (`16px`).

## Design Tokens

```css
:root {
  --color-primary: #0055FF;
  --color-background: #F9F9F8;
  --color-surface: #FFFFFF;
  --color-text: #0D0D0D;
  --color-muted: #8E8E8E;
  --color-border: #E2E2E0;
  --font-serif: 'Instrument Serif', serif;
  --font-sans: 'Switzer', sans-serif;
  --font-mono: 'Geist Mono', monospace;
  --radius: 4px;
  --spacing-grid: 16px;
}
```

</details>

---

<details>
<summary>Screen Specifications</summary>

### Hero & Problem Statement

**Purpose:** Hook the user with a stark, editorial introduction to the automation challenge.

**Layout:** 50/50 split. Left: Massive serif typography. Right: Monospaced technical abstract.

**Key Elements:**
- **Headline:** `Instrument Serif`, 72px, `#0D0D0D`. "Automating the Unstructured."
- **Abstract Box:** `Geist Mono`, 13px, `#8E8E8E`, right-aligned. Details tech stack (n8n, OpenAI, Postgres).
- **Primary CTA:** Solid `#0055FF` background, `Geist Mono` `#FFFFFF` text, "VIEW ARCHITECTURE", `4px` radius.

**States:**
- **Empty:** N/A
- **Loading:** Fade in text staggered by 100ms.
- **Error:** N/A

**Components:**
- **Tag:** 24px height, `#FFFFFF` surface, `#E2E2E0` border, `Geist Mono` 11px text.

**Interactions:**
- **Hover CTA:** Background shifts to `#0044CC`, text tracks out slightly.
- **Click CTA:** Smooth scroll to Workflow Bento Grid.

**Responsive:**
- **Desktop:** 2-column layout.
- **Tablet:** Stacks vertically.
- **Mobile:** 48px typography, reduced padding.

### Workflow Bento Grid

**Purpose:** Visualizing the n8n nodes as a high-end, interactive architectural diagram.

**Layout:** 3x3 asymmetrical CSS grid. Central prominent card for the LLM node.

**Key Elements:**
- **Trigger Card:** 1x1 grid cell. Displays Webhook icon, "Inbound Lead".
- **LLM Engine Card:** 2x2 grid cell. Massive `#0055FF` pulsing dot, title "GPT-4 Classifier".
- **Routing Cards:** 1x1 grid cells connected by SVG dashed lines (`#E2E2E0`).

**States:**
- **Empty:** N/A
- **Loading:** Skeleton pulse on cards left-to-right to simulate data flow.
- **Error:** Card border turns red `#FF3333`, displays "Execution Failed".

**Components:**
- **Bento Card:** `FFFFFF` surface, `1px solid #E2E2E0` border, `24px` padding.
- **Status Dot:** `8px` circle, `#0055FF` with `0 0 0 4px rgba(0,85,255,0.2)` shadow.

**Interactions:**
- **Hover Bento Card:** Border color shifts to `#0D0D0D`.
- **Click LLM Engine Card:** Triggers Chain of Thought Modal.

**Responsive:**
- **Desktop:** 3x3 grid, `16px` gap.
- **Tablet:** 2-column grid.
- **Mobile:** 1-column vertical stack.

### Intelligence Metrics

**Purpose:** Quantifying the ROI of the n8n automation.

**Layout:** Horizontal strip of 3 large square cards.

**Key Elements:**
- **Metric Value:** `Instrument Serif`, 84px, `#0D0D0D`. e.g., "94%" or "1.2s".
- **Metric Label:** `Geist Mono`, 14px, `#8E8E8E`, uppercase. e.g., "CLASSIFICATION ACCURACY".
- **Delta Indicator:** `Switzer`, 14px, `#00E599`. e.g., "↑ 42% vs Manual".

**States:**
- **Empty:** N/A
- **Loading:** Values count up from 0 to target number over 1.5s.
- **Error:** Displays "--" instead of value.

**Components:**
- **Metric Card:** 320x320px, `#FFFFFF` surface, bottom-aligned text block.

**Interactions:**
- **Hover Metric Card:** Subtle `Y-translate -4px`.

**Responsive:**
- **Desktop:** 3 columns inline.
- **Tablet:** Horizontal scroll snap.
- **Mobile:** Vertical stack.

### Chain of Thought Modal

**Purpose:** Proving the AI's efficacy by exposing the exact prompt and JSON response.

**Layout:** Full-height right-aligned drawer (720px wide).

**Key Elements:**
- **Overlay:** `#0D0D0D` at 40% opacity, `backdrop-blur-sm`.
- **Header:** "Execution Log: Node_LLM_1", `Geist Mono`, 16px.
- **Code Block:** Dark mode `#111111` surface, `Geist Mono`, 13px text, `#00E599` for strings, `#8E8E8E` for keys.
- **Reasoning Timeline:** Vertical stepper showing "Context Parsed" -> "Intent Evaluated" -> "JSON Generated".

**States:**
- **Empty:** N/A
- **Loading:** Shimmering lines inside the code block.
- **Error:** "Log unavailable".

**Components:**
- **Code Block:** `16px` padding, `4px` radius, overflow-y scroll.
- **Step Item:** `24px` left padding, `1px solid #E2E2E0` left border.

**Interactions:**
- **Click Overlay:** Closes modal.
- **Click "Copy JSON":** Copies text, button text changes to "COPIED" for 2s.

**Responsive:**
- **Desktop:** 720px right drawer.
- **Tablet:** 100vw right drawer.
- **Mobile:** Bottom sheet, 90vh height.

</details>

---

<details>
<summary>Build Guide</summary>

**Stack:** HTML + Tailwind CSS v3

**Build Order:**
1. **Design System Setup:** Configure `tailwind.config.js` with exact fonts (`Instrument Serif`, `Switzer`, `Geist Mono`), colors, and `4px` border radius override.
2. **Workflow Bento Grid:** Start here. It defines the card styling, borders, and complex CSS grid layout (`grid-cols-3`, `gap-4`).
3. **Hero Section:** Establish typography scale and the stark contrast between serif headers and mono body text.
4. **Intelligence Metrics:** Implement the large typography and intersection-observer count-up animations.
5. **Chain of Thought Modal:** Build the dark-mode code block and vertical timeline logic last.

</details>