---
name: scope-estimate-method
description: Use after a representative Stage 3 vertical slice has measured production data. Enforces a 3-page maximum and transparent measurement-to-estimate calculations for docs/game/3-scope-estimate.md.
---

# Scope Estimate Method

Use this skill when writing or reviewing `docs/game/3-scope-estimate.md` after the representative vertical slice is complete.

## Output Contract

Create a concise scope estimate from recorded vertical-slice production results and explicit whole-game targets. Use Korean labels in a Korean artifact and English labels in an English artifact.

## Cap

- Absolute cap: 3 pages. This is a maximum, not a target or minimum.
- Include only inputs, calculations, uncertainty, and gaps needed to answer the Stage 3 scope question.

## Required Shape

- Classify recorded VS production time, cost, and performance as `Measurement` / `측정` only when actually measured.
- Classify explicit whole-game quantities as `Target` / `목표` and confirmed production bounds as `Constraint` / `제약`.
- Label every calculated result `Estimate` / `추정` and show its input values and sources, calculation method, range or confidence interval, uncertainty, and unmeasured items.
- Keep each source label unchanged; never relabel a Target, Constraint, Citation, or Estimate as Measurement.

## Block

Block completion when:

- recorded VS measurements or explicit whole-game targets are missing;
- a point estimate depends on invented inputs;
- a range or confidence interval cannot be defended from the recorded inputs;
- a Target, Constraint, Citation, or Estimate is presented as Measurement;
- the document exceeds 3 pages or adds full-game planning beyond the scope calculation.

When inputs are insufficient, leave the point estimate incomplete and identify only the smallest additional measurement or explicit scenario bounds needed.

## Completion

Complete only when `docs/game/3-scope-estimate.md` stays within 3 pages and presents transparent estimates with sourced inputs, calculations, a defensible range or confidence interval, uncertainty, and unmeasured items.
