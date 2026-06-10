---
name: tech-decision-template
description: Use for Stage 3 technology decisions. Enforces Stage 2 evidence, A/B/C candidate comparison, and a validation plan for docs/game/3-tech-decision.md.
---

# Tech Decision Template

Use this skill when writing or reviewing `docs/game/3-tech-decision.md`.

## Output Contract

Write a markdown technology decision with exactly these four sections:

1. Decision
2. Rationale
3. Candidate Comparison
4. Validation Plan

## Caps

- Absolute cap: 1-2 pages or roughly 120 lines.
- Make one technology decision only. If several choices are needed, split them into separate confirmed decisions.
- Stay inside vertical-slice needs; defer server infrastructure, monetization, long-term live ops, and other out-of-slice choices.

## Required Shape

- Decision: name the selected engine, framework, toolchain, or production stack choice in one short paragraph or bullet list.
- Rationale: every reason must cite at least one Stage 2 cycle slug such as `cycle-03-combat-readability` and connect the choice to what was observed in that cycle.
- Candidate Comparison: include an A/B/C trade-off table with columns for Candidate, Fit To Stage 2 Evidence, Trade-Offs, and VS Risk.
- Validation Plan: describe how the vertical slice will validate or falsify the decision before Stage 4 detail docs.

## Block

Block the draft and ask for missing evidence when any of these appear:

- Unsupported claims such as "X is generally better", "X is the industry standard", or equivalent authority claims without an explicit source.
- A Decision or Rationale entry without at least one cited Stage 2 cycle slug.
- Technology choices outside vertical-slice scope, including server infrastructure, monetization, live operations, or full production pipeline decisions.
- Writing this document before Stage 2 proceed has been explicitly confirmed by the user.
- Meta sections such as "what this document decides" or "what this document does not decide".

## Completion

Complete only when `docs/game/3-tech-decision.md` contains one decision, Stage 2 cycle-cited rationale, an A/B/C candidate comparison table, a validation plan, stays within cap, and ends by asking the user to confirm before any next Stage 3 work begins.
