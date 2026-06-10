---
name: prototype-hypothesis
description: Use for Stage 2 cycle planning. Enforces one hypothesis per cycle with explicit failure and success signals in a one-page prototype hypothesis.
---

# Prototype Hypothesis

Use this skill when writing `prototypes/cycle-NN-<topic>/hypothesis.md`.

## Planning Flow

When planning the next Stage 2 cycle, the main agent runs this skill directly.

- Read `docs/game/1-macro-design.md` and `prototypes/learnings.md` if it exists.
- Choose the next riskiest assumption to test from the macro Top Risks and prior learnings.
- Ask the user a short grouped question list only when the risk choice or the failure/success signals are genuinely ambiguous. If the next test is clear, proceed without asking.
- Never guess the hypothesis or its signals when they are genuinely ambiguous; stop and ask instead.
- After selecting the risk, update the macro Top Risks ledger: set only that risk's `Cycle` cell to the `cycle-NN-<topic>` slug and only its `Status` cell to `testing`. Never edit the risk text or any other cells as part of that ledger update.
- Create `prototypes/cycle-NN-<topic>/hypothesis.md` using the output contract below.
- Do not automatically call `prototype_coder`; ask the user to confirm before any prototype build begins.

## Output Contract

Begin `hypothesis.md` with one anchor line citing the macro risk this cycle tests:

    > Tests: R2 (이 사이클이 검증하는 위험 한 줄 요약)

Then write exactly three sections:

1. Hypothesis
2. Failure Signal
3. Success Signal

The anchor must cite a Risk ID (R1/R2/R3, or a later appended R4+) that exists in `docs/game/1-macro-design.md`
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

Complete only when the file begins with a `Tests: R<N>` anchor citing an existing macro risk (including appended R4+ risks), failure and success signals are observable during play or prototype runs, the macro Top Risks ledger marks only the tested risk's Cycle and Status cells for this cycle, and the user is asked to confirm before prototype coding.
