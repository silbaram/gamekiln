---
name: prototype-hypothesis
description: Use for Stage 2 cycle planning. Enforces the one-page hypothesis artifact with explicit failure and success signals.
---

# Prototype Hypothesis

Use this skill when writing `prototypes/cycle-NN-<topic>/hypothesis.md`.

## Planning Flow

When planning the next Stage 2 cycle, the main agent runs this skill directly.

- Read `docs/game/1-macro-design.md` and `prototypes/learnings.md` if it exists.
- Choose the next riskiest assumption to test from the macro Top Risks and prior learnings. If `prototypes/assumptions.md` exists, scan it too for candidate hypotheses.
- Ask the user a short grouped question list only when the risk choice or the failure/success signals are genuinely ambiguous. If the next test is clear, proceed without asking.
- Never guess the hypothesis or its signals when they are genuinely ambiguous; stop and ask instead.
- Choose the cheapest prototype modality that can faithfully expose both signals. Prefer a browser page or terminal script when adequate, but use an engine graybox, tabletop setup, spreadsheet, simulation, or minimal network test when interaction, physics, social play, or timing requires it. Ask only if materially different setups remain equally plausible.
- After selecting the risk, update the macro Top Risks ledger: set only that risk's `Cycle` cell to the `cycle-NN-<topic>` slug and only its `Status` cell to `testing`. Never edit the risk text or any other cells as part of that ledger update.
- Create `prototypes/cycle-NN-<topic>/hypothesis.md` using the output contract below.
- Stop after planning; do not build the prototype in the same skill invocation.

## Output Contract

Begin `hypothesis.md` with one anchor line citing the macro risk this cycle tests:

    > Tests: R2 (이 사이클이 검증하는 위험 한 줄 요약)

Then record the selected test form and why it exposes the signals:

    > Prototype: <modality> — <one-line reason>

Then write exactly three sections:

1. Hypothesis
2. Failure Signal
3. Success Signal

If the hypothesis or either signal uses an unvalidated numeric threshold, mark it inline as `목표:` in a Korean artifact or `Target:` in an English artifact, and state what this cycle will observe. The label means a test criterion, not prior evidence. Do not tag structural Risk IDs, cycle numbers, page caps, or version numbers.

The anchor must cite a Risk ID (R1/R2/R3, or a later appended R4+) that exists in `docs/game/1-macro-design.md`
Top Risks. If the cycle primarily tests one risk but touches another, cite the primary
risk in `Tests:` and add `(also touches R3 — observe-only)`. Only the primary risk
decides the gate.

## Caps

- Absolute cap: 1 page or roughly 80 lines.
- Hypothesis length: 1-3 sentences.

## Block

Apply the single-hypothesis invariant from `AGENTS.md`: block drafts with more than one independently decidable claim. Treat "and", "also", "while also", and stacked bullet hypotheses as review signals rather than automatic violations.

Also block an unvalidated gameplay number presented as an observed fact, measurement, constraint, or citation. Relabel it as a target when it is genuinely needed for this cycle; otherwise remove it.

## Completion

Complete only when the file begins with valid `Tests:` and `Prototype:` lines, the chosen modality can expose both observable signals, the macro Top Risks ledger marks only the tested risk's Cycle and Status cells for this cycle, and the artifact is ready for the `prototype_coder` handoff.
