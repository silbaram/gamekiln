---
name: vs-spec-template
description: Use for Stage 3 vertical slice specs. Enforces VS-only scope, classified evidence and test targets for material numeric claims, and the 10-15 page cap for docs/game/3-vertical-slice-spec.md.
---

# VS Spec Template

Use this skill when writing or reviewing `docs/game/3-vertical-slice-spec.md`.

## Output Contract

Write a vertical-slice specification that is sufficient for one validated slice and no more.

Recommended sections:

1. Slice Goal
2. Included Content
3. Core Loop In Slice
4. Player Character And Verbs
5. Systems In Slice
6. Enemies And Boss
7. Levels Or Encounters
8. Art, Audio, And Feedback Needs
9. Build And Test Plan
10. Open Questions

## Caps

- Absolute cap: 10-15 pages.
- Choose the smallest representative end-to-end slice that can validate production quality and cost.
- Include only content and system depth required for that validation; justify each included category from Stage 2 evidence or a named production risk.

## Required Shape

Classify every material number, formula, content quantity, timing, cost, HP, damage, cooldown, drop rate, or balance claim with a nearby label or table source column. Use Korean labels in a Korean artifact and English labels in an English artifact. One label may cover a compact group; do not tag every sentence.

- `Observation:` / `관측:` — Stage 2 play evidence from a named cycle.
- `Measurement:` / `측정:` — an actual recorded performance, time, cost, or production result.
- `Constraint:` / `제약:` — a user-confirmed production condition; it does not prove gameplay behavior.
- `Citation:` / `인용:` — a named external source used as context or an initial reference; it is not evidence that this game works.
- `Target:` / `목표:` — an unvalidated value the vertical slice will test. Name the validation method or success/failure signal.

Keep estimates in `docs/game/3-scope-estimate.md`, not in the VS specification. Structural identifiers, page caps, section numbers, Risk IDs, and version numbers do not need provenance labels. Keep all requirements tied to making and validating the vertical slice.

## Block

Block the draft when it contains:

- Full-game content matrices, all character/class lists, long-term roadmaps, or production plans beyond the vertical slice.
- Content or system depth with no role in the slice goal or production-risk validation.
- A material numeric or formula claim with no classification.
- A constraint or citation presented as proof that gameplay or balance works in this game.
- A target presented as verified, or without a vertical-slice validation method.
- A scope estimate presented as a VS requirement instead of being recorded in `docs/game/3-scope-estimate.md`.
- Meta sections such as "what this document decides" or "what this document does not decide".
- Stage 4 detail docs or instructions to write them before the slice is validated.

## Completion

Complete only when `docs/game/3-vertical-slice-spec.md` stays inside VS scope, every material number and formula is classified, every target names its validation, the cap passes, and control returns for the `AGENTS.md` stage-transition boundary.
