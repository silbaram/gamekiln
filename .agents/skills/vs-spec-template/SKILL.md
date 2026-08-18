---
name: vs-spec-template
description: Use to create or incrementally update a Stage 3 vertical-slice plan. Enforces the current playable increment, classified numeric evidence and test targets, and a 15-page maximum for docs/game/3-vertical-slice-spec.md.
---

# VS Spec Template

Use this skill when writing or reviewing `docs/game/3-vertical-slice-spec.md`.

## Output Contract

Create or update a vertical-slice specification as a living plan. Write only what is needed to make and measure the next playable increment; do not wait to specify the entire slice before production begins.

Required current-state sections:

1. Slice Goal
2. Current Production Risk
3. Next Playable Increment
4. Build And Measure Plan

Add only the sections the current increment needs, such as Included Content, Core Loop In Slice, Player Character And Verbs, Systems In Slice, Enemies And Boss, Levels Or Encounters, Art/Audio/Feedback Needs, or Open Questions. Minimal visual direction belongs in Art/Audio/Feedback Needs; a separate art-direction document is optional.

## Caps

- Absolute cap: 15 pages. This is a maximum, not a target or minimum; an initial plan should usually be much shorter.
- Choose the smallest next playable increment that advances toward a representative end-to-end slice and can expose the current production risk.
- Include only content and system depth required for that increment; justify each included category from Stage 2 evidence or the named current production risk.

## Required Shape

Classify every material number, formula, content quantity, timing, cost, HP, damage, cooldown, drop rate, or balance claim with a nearby label or table source column. Use Korean labels in a Korean artifact and English labels in an English artifact. One label may cover a compact group; do not tag every sentence.

- `Observation:` / `관측:` — Stage 2 play evidence from a named cycle.
- `Measurement:` / `측정:` — an actual recorded performance, time, cost, or production result.
- `Constraint:` / `제약:` — a user-confirmed production condition; it does not prove gameplay behavior.
- `Citation:` / `인용:` — a named external source used as context or an initial reference; it is not evidence that this game works.
- `Target:` / `목표:` — an unvalidated value the vertical slice will test. Name the validation method or success/failure signal.

Keep estimates in `docs/game/3-scope-estimate.md`, not in the VS specification. Structural identifiers, page caps, section numbers, Risk IDs, and version numbers do not need provenance labels. Keep all requirements tied to making and validating the vertical slice.

Technology, art-direction, and architecture artifacts are conditional inputs. Reference them when they exist and affect the current increment; never block a seed or update merely because one is absent. After build or playtest evidence arrives, update Current Production Risk and Next Playable Increment instead of appending speculative later-slice detail.

## Block

Block the draft when it contains:

- Full-game content matrices, all character/class lists, long-term roadmaps, or production plans beyond the vertical slice.
- Detail for later increments with no role in the current playable increment or production-risk validation.
- A material numeric or formula claim with no classification.
- A constraint or citation presented as proof that gameplay or balance works in this game.
- A target presented as verified, or without a vertical-slice validation method.
- A scope estimate presented as a VS requirement instead of being recorded in `docs/game/3-scope-estimate.md`.
- Meta sections such as "what this document decides" or "what this document does not decide".
- Stage 4 detail docs or instructions to write them before the slice is validated.

## Completion

Complete when `docs/game/3-vertical-slice-spec.md` names the Slice Goal, current Production Risk, a buildable and measurable Next Playable Increment, and its Build And Measure Plan; every material number and formula in that increment is classified, every target names its validation, and the document stays within cap. Report the next build action or blocker without adding an artifact-level confirmation gate.
