# Game Design Harness

This repository uses the AI game-design harness.

## Runtime Contract

- One Stage 2 cycle tests one observable hypothesis.
- Every stage gate considers proceed, retry, regress, and kill, and marks outcomes that do not apply at the current stage.
- Classify material numeric, formula, and balance claims as observation/measurement, constraint/citation, or target/estimate, using labels matched to the artifact language. Only observation/measurement validates this game's behavior; later evidence links without relabelling the original claim. Stage 4 implementation specs are the exception: their implementation instructions use no provenance labels, link verified decision records, and keep tunable values in `game/` data.
- Keep Stage 2 artifacts under `prototypes/`, isolated from `game/`; do not import, share, or copy implementation, assets, settings, or architecture across that boundary. A same-engine prototype is still an independent throwaway project.
- Require explicit user confirmation only for stage transitions, project kill, and material scope changes, including material cuts. Reordering work inside approved scope is not a material scope change.
- Stage 4 artifacts cover only systems the vertical slice validated. Detail documents record verified decisions; implementation specs extend them within the approved scope without contradicting them.

## Subagent Handoff Pattern

- Ask only when a missing choice would materially change the artifact. Otherwise proceed from recorded evidence.
- A blocked subagent returns a short grouped question list and stops; the main agent gathers the answers and reinvokes it.

Artifact formats, caps, and component-specific checks belong to the relevant `SKILL.md`. Agent bodies own only their role, inputs, output, and genuine stop conditions. `docs/harness/` is authoring reference material, not ordinary runtime context.
