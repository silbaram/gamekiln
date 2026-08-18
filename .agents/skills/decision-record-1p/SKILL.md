---
name: decision-record-1p
description: Use when writing Stage 4 detail docs for one validated vertical-slice system. Records verified decisions only, with strict 1-2 page caps and game-local evidence for material gameplay numbers or formulas.
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

Every material number, formula, content quantity, timing, cost, HP, damage, cooldown, drop rate, economy value, or balance claim asserted as a `Verified Decision`, and every `Evidence` item presented as proof of it, must cite this game's evidence. Use Korean labels in a Korean artifact and English labels in an English artifact:

- `Observation:` / `관측:` with a named Stage 2 cycle or VS play session.
- `Measurement:` / `측정:` with an actual VS performance, time, cost, or production result.

The `Evidence` section may preserve a clearly classified citation, constraint, target, or estimate as relevant context or history. A user-confirmed production condition may also appear in `Implementation Notes`. None of these classes is verified evidence, whether alone or combined with one another. Keep its original source or inputs and link separate observation or measurement rather than relabelling it.

Structural identifiers, section numbers, and version numbers do not need provenance. Refuse unsupported material values; remove them or ask for the missing observation or measurement.

## Block Immediately

- Meta sections; delegate review to `forbidden-meta-sections`.
- Any system not validated by the vertical slice.
- Multiple systems in one detail doc.
- Future predictions, roadmaps, full-game plans, or backlog promises.
- Unverified assumptions presented as decisions or implementation commitments. Point unresolved assumptions to `prototypes/assumptions.md`; do not create or edit that file.
- Writing under `game/` or production code directories.
- Bypassing the `AGENTS.md` stage-transition boundary to start Stage 5.

## Completion

Complete only when:

- The detail doc is within the 1-2 page cap.
- Every material number and formula in the verified decision has observed or measured evidence from this game.
- No forbidden meta section remains.
- Control returns to the main agent for the `AGENTS.md` confirmation boundary before another system or Stage 5.
