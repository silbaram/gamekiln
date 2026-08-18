---
name: kill-criteria
description: Use when judging proceed, retry, regress, or kill gates across game-design harness stages. Requires cumulative evidence and stage-specific criteria while honoring the AGENTS.md decision boundary.
---

# Kill Criteria

Use this skill for project-level gate judgment across stages.

## Output Contract

Return exactly one recommendation:

- Kill recommendation
- Regression recommendation
- Retry recommendation
- Proceed OK

Then include:

- Stage-specific checklist result.
- Evidence used and evidence gaps.
- Assets to preserve and discard if the user confirms kill or regression.
- Handoff to the `AGENTS.md` project-decision boundary.

## Stage Checklist

Use only these criteria; do not invent new kill rules.

- At any stage, recommend retry when current evidence is insufficient but another attempt can produce distinct learning. Recommend proceed when the recorded evidence supports the current gate.
- Stage 0: regression does not apply. If the concept is not worth prototyping, recommend kill.
- Stage 1: if no testable hypothesis can be extracted, recommend regression to Stage 0. Kill only if the pitch has lost prototyping value.
- Stage 2: if representative attempts keep failing the same core assumption and another cycle has no distinct learning value, recommend kill or regression to Stage 0. If fun is found in a different assumption, recommend regression to Stage 1 as a pivot. Judge the consistency, relevance, and cost of accumulated evidence; no fixed cycle count is proof.
- Stage 3: if cost explodes, recommend regression to Stage 2. If the project is technically infeasible, recommend kill review.
- Stage 4-5: proceed and retry apply; regression and kill do not.

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
- Bypassing the `AGENTS.md` project-decision boundary.
- Editing files while acting as a kill judge.

## Completion

Complete with a recommendation and the `AGENTS.md` confirmation handoff. The user makes the final proceed/retry/regress/kill decision.
