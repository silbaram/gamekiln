---
name: kill-criteria
description: Use when judging kill, regress, or proceed gates across game-design harness stages. Requires cumulative evidence, stage-specific criteria, and user confirmation before any kill decision.
---

# Kill Criteria

Use this skill for project-level kill or regression judgment across stages.

## Output Contract

Return exactly one recommendation:

- Kill recommendation
- Regression recommendation
- Proceed OK

Then include:

- Stage-specific checklist result.
- Evidence used and evidence gaps.
- Assets to preserve and discard if the user confirms kill or regression.
- Final user confirmation question.

## Stage Checklist

Use only these criteria; do not invent new kill rules.

- Stage 0: if the concept is not worth prototyping, recommend kill.
- Stage 1: if no testable hypothesis can be extracted, recommend regression to Stage 0. Kill only if the pitch has lost prototyping value.
- Stage 2: if core fun remains unvalidated after 5-7 cycles, recommend kill or regression to Stage 0. If fun is found in a different assumption, recommend regression to Stage 1 as a pivot. Repeating the same failure signal twice is weighted evidence toward kill/regression, not proof by itself.
- Stage 3: if cost explodes, recommend regression to Stage 2. If the project is technically infeasible, recommend kill review.
- Stage 4-5: no kill gate.

## Preserve / Discard on Confirmed Regression or Kill

Preserve:

- `prototypes/learnings.md`
- `prototypes/killed-hypotheses.md`
- Verified decisions, including sourced numbers and formulas

Discard:

- Unverified assumptions
- Prototype code
- Documents after the regression target stage

## Block Immediately

- Kill recommendations without evidence.
- Treating a single result as a final kill decision.
- Confirming kill, regression, or stage advancement without explicit user confirmation.
- Editing files while acting as a kill judge.

## Completion

Complete with a recommendation and confirmation question only. The user makes the final kill/regress/proceed decision.
