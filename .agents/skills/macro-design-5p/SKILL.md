---
name: macro-design-5p
description: Use for Stage 1 macro design. Enforces the five-page, six-section macro design format with lists, tables, diagrams, and extractable Stage 2 risks.
---

# Macro Design 5p

Use this skill when writing or reviewing `docs/game/1-macro-design.md`.

## Output Contract

Write a markdown macro design with exactly these sections:

1. Pillars
2. Core Loop
3. Character And Verbs
4. Macro Chart
5. References
6. Top Risks

## Caps

- Absolute cap: 5 pages or roughly 300 lines.
- Prefer bullets, tables, and Mermaid diagrams.
- Warn on prose paragraphs longer than 3 sentences.

## Required Shape

- Pillars: P0/P1 pillars plus anti-pillars.
- Core Loop: 30-second, 5-minute, 30-minute, run, and long-term loops.
- Character And Verbs: what the player can do and explicitly cannot do.
- Macro Chart: first launch through long-term progression.
- References: each reference uses "steal / do not steal".
- Top Risks: the three riskiest assumptions as a living risk ledger table, not frozen at Stage 1.
  - Columns: Risk ID, Risk, Why It Matters, Cycle, Status.
  - Risk ID (R1/R2/R3) is stable and never reused; each cycle's hypothesis.md cites it.
  - Cycle holds a concrete `cycle-NN-<topic>` slug, or the literal `unassigned`.
  - Status is one of: open / testing / resolved / killed. Risks author at `open`.
  - After Stage 1 only the Cycle and Status cells change; the risk text never does.

## Block

Block vague cycle references. Treat any Cycle value that is not a concrete
`cycle-NN-<topic>` slug or the literal `unassigned` as incomplete — including
"first cycle", "later cycle", "future cycle", "next cycle", "TBD", "추후", "나중에".
Also treat any Status value outside open / testing / resolved / killed as incomplete.

## Completion

Complete only when the document stays within cap, every Top Risk has a stable Risk ID (R1/R2/R3) mapped to a concrete `cycle-NN-<topic>` slug or `unassigned` with Status `open` at authoring, and a Stage 2 first-cycle hypothesis can be extracted without another design document.
