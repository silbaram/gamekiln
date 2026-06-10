---
name: vs-spec-template
description: Use for Stage 3 vertical slice specs. Enforces VS-only scope, sourced numbers and formulas, and the 10-15 page cap for docs/game/3-vertical-slice-spec.md.
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
- Keep the slice to 10-20% of total intended content.
- Include one playable character/class only.
- Include one cycle's worth of core-system depth only.
- Include a small enemy set plus one boss.

## Required Shape

- Mark every number, formula, content quantity, timing, cost, HP, damage, cooldown, drop rate, or balance claim with a source.
- Valid sources are observed Stage 2 evidence written as `Observation: cycle-NN-<topic>, ...` or an explicit named reference source.
- If a value is not observed or sourced, remove it from the body or phrase it as an open question without using the value.
- Keep all requirements tied to making and validating the vertical slice.

## Block

Block the draft when it contains:

- Full-game content matrices, all character/class lists, long-term roadmaps, or production plans beyond the vertical slice.
- More than one playable character/class.
- Content beyond 10-20% of the total intended game.
- Multiple cycles' worth of core-system depth.
- Large enemy rosters or more than one boss.
- Any number or formula without a Stage 2 observation or explicit reference source.
- Meta sections such as "what this document decides" or "what this document does not decide".
- Stage 4 detail docs or instructions to write them before the slice is validated.

## Completion

Complete only when `docs/game/3-vertical-slice-spec.md` stays inside VS scope, every number and formula has a source, the cap passes, and the response ends by asking the user to confirm before production work or later-stage docs begin.
