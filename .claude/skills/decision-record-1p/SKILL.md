---
name: decision-record-1p
description: Use when writing Stage 4 detail docs for one validated vertical-slice system. Records verified decisions only, with strict 1-2 page caps and sources for every number or formula.
---

# Decision Record 1p

Use this skill to write exactly one Stage 4 detail doc at `docs/game/details/<slug>.md` for exactly one system validated by the vertical slice.

## Output Contract

Create or revise one Markdown file with this shape:

1. `# <System Name>`
2. `## Verified Decision`
3. `## Evidence`
4. `## Implementation Notes`
5. `## Open Assumptions` only as pointers to move elsewhere; do not write the assumptions here.

The document records decisions already validated by the vertical slice. It is not a future system spec, roadmap, backlog, or prediction of the full game.

## Caps

- Absolute cap: 1-2 pages per system.
- One invocation documents one system only.
- Keep details thin enough for Stage 5 production handoff, not an encyclopedia.

## Source Rules

Every number, formula, content quantity, timing, cost, HP, damage, cooldown, drop rate, economy value, or balance claim must cite one of:

- `관측: cycle-NN-<topic>, ...`
- `측정: VS, ...`
- `인용: <explicit source>, ...`

Refuse to write or accept unsourced numbers or formulas. Remove the value or ask for its source.

## Block Immediately

- Meta sections; delegate review to `forbidden-meta-sections`.
- Any system not validated by the vertical slice.
- Multiple systems in one detail doc.
- Future predictions, roadmaps, full-game plans, or backlog promises.
- Unverified assumptions entering the body. Tell the user to move them to `prototypes/assumptions.md`; do not create or edit that file.
- Writing under `game/` or production code directories.
- Automatic progression to Stage 5 without user confirmation.

## Completion

Complete only when:

- The detail doc is within the 1-2 page cap.
- Every number and formula has an allowed source.
- No forbidden meta section remains.
- The response asks the user to confirm before documenting another system or moving toward Stage 5.
