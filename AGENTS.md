# Game Design Harness

This repository uses the AI game-design harness.

## Runtime Contract

- One Stage 2 cycle tests one observable hypothesis.
- Every stage gate considers proceed, retry, regress, and kill, and marks outcomes that do not apply at the current stage.
- Classify material numeric, formula, and balance claims as observation/measurement, constraint/citation, or target/estimate, using labels matched to the artifact language. Only observation/measurement validates this game's behavior; later evidence links without relabelling the original claim.
- Keep Stage 2 artifacts under `prototypes/`, isolated from `game/`; do not import, share, or copy implementation, assets, settings, or architecture across that boundary. A same-engine prototype is still an independent throwaway project.
- Require explicit user confirmation only for stage transitions, project kill, and material scope changes, including material cuts. Reordering work inside approved scope is not a material scope change.
- Do not write a Stage 4 detail document until the vertical slice has validated that system.

## Subagent Handoff Pattern

- Ask only when a missing choice would materially change the artifact. Otherwise proceed from recorded evidence.
- A blocked subagent returns a short grouped question list and stops; the main agent gathers the answers and reinvokes it.

Artifact formats, caps, and component-specific checks belong to the relevant `SKILL.md`. Agent bodies own only their role, inputs, output, and genuine stop conditions. `docs/harness/` is authoring reference material, not ordinary runtime context.
