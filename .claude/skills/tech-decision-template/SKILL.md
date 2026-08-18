---
name: tech-decision-template
description: Use when a Stage 3 technology choice blocks the next playable increment. Enforces Stage 2 evidence, viable-candidate comparison, and an increment-level validation plan for docs/game/3-tech-decision.md.
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

- Absolute cap: 2 pages or roughly 120 lines. This is a maximum, not a target or minimum.
- Make one blocking technology decision only. If several choices are needed, handle only the one blocking the current playable increment.
- Stay inside the current increment's needs; defer server infrastructure, monetization, long-term live ops, and other out-of-slice choices.

## Required Shape

- Decision: name the selected engine, framework, toolchain, or production stack choice in one short paragraph or bullet list.
- Rationale: every reason must cite at least one Stage 2 cycle slug such as `cycle-03-combat-readability` and connect the choice to what was observed in that cycle.
- Candidate Comparison: include every genuinely viable candidate in a trade-off table with columns for Candidate, Fit To Stage 2 Evidence, Trade-Offs, and Increment Risk. Do not invent a third candidate to fill the table.
- Validation Plan: describe how the next playable increment will validate or falsify the decision.

## Block

Block the draft and ask for missing evidence when any of these appear:

- Unsupported claims such as "X is generally better", "X is the industry standard", or equivalent authority claims without an explicit source.
- A Decision or Rationale entry without at least one cited Stage 2 cycle slug.
- A pre-emptive decision that does not unblock making or measuring the current playable increment. If a user constraint or existing project already fixes the stack and no technology risk remains, do not create this document.
- Technology choices outside the current increment, including server infrastructure, monetization, live operations, or full production pipeline decisions.
- Writing this document before `stage-3-ready` has been explicitly confirmed by the user. A confirmed `risk-resolved` is not sufficient.
- Meta sections such as "what this document decides" or "what this document does not decide".

## Completion

Complete only when `docs/game/3-tech-decision.md` contains one blocking decision, Stage 2 cycle-cited rationale, a comparison of the viable candidates, a next-increment validation plan, and stays within cap. Report the remaining validation risk without adding an artifact-level confirmation gate.
