---
name: prototype-hypothesis
description: Use for Stage 2 cycle planning. Enforces one hypothesis per cycle with explicit failure and success signals in a one-page prototype hypothesis.
---

# Prototype Hypothesis

Use this skill when writing `prototypes/cycle-NN-<topic>/hypothesis.md`.

## Output Contract

Begin the file with one anchor line citing the macro risk this cycle tests:

    > Tests: R2 (이 사이클이 검증하는 위험 한 줄 요약)

Then write exactly three sections:

1. Hypothesis
2. Failure Signal
3. Success Signal

The anchor must cite a Risk ID (R1/R2/R3) that exists in `docs/game/1-macro-design.md`
Top Risks. If the cycle primarily tests one risk but touches another, cite the primary
risk in `Tests:` and add `(also touches R3 — observe-only)`. Only the primary risk
decides the gate.

## Caps

- Absolute cap: 1 page or roughly 80 lines.
- Hypothesis length: 1-3 sentences.
- One cycle tests one hypothesis only.

## Block

Block multi-hypothesis drafts. Treat "and", "also", "while also", and stacked bullet hypotheses as suspicious unless they describe one testable claim.

## Completion

Complete only when the file begins with a `Tests: R<N>` anchor citing an existing macro risk, and failure and success signals are observable during play or prototype runs.
