---
name: feature-spec
description: Use when writing or updating one Stage 4 implementation spec at docs/game/specs/NAME.md for a vertical-slice-validated system or content category needed by the current production batch. Produces buildable rules, state schemas, edge cases, dependencies, and acceptance criteria without inventing decisions or duplicating balance data.
---

# Feature Spec

Write or revise exactly one implementation spec for one system or content category at `docs/game/specs/<name>.md`.

## Preconditions

Use the confirmed Stage 3 gate, current production batch, `docs/game/1-macro-design.md`, relevant vertical-slice results, and related `docs/game/details/<slug>.md` decision records. Do not write the spec when any source needed to define the current batch behavior is missing.

Read every existing spec named under `Depends On` before writing or revising this spec. If a required dependency spec is missing or inaccessible, stop rather than infer its contract.

Search existing specs for exact references to this spec before setting `Used By`. Include only confirmed reverse dependencies; use `None` when no existing spec references it.

Allow instances within a validated system and approved scope, even when the vertical slice contained only a representative subset. Block a system absent from the vertical slice and return it to Stage 3 validation.

## Output Contract

Use this shape:

1. `# <Name>`
2. `## Purpose` — one sentence stating why the system exists.
3. `## Rules` — independently decidable statements, each with a stable rule identifier.
4. `## State And Data` — when needed; define state and data schema fields, not balance values. For a content category, define the project-chosen comparison axes used across its entities; the harness does not prescribe those axes.
5. `## Formulas` — when needed.
6. `## Edge Cases` — when needed.
7. `## Acceptance Criteria` — implementation-ready, testable statements that reference the covered rule identifiers.
8. `## References` — list `Depends On`, `Used By`, and `Evidence` with exact repository paths. Evidence links point to decision records under `docs/game/details/` rather than restating their rationale. Use `None` when a relationship has no known target; do not invent a link.
9. `## Open Questions` — only when unresolved items remain.

`Purpose`, `Rules`, `Acceptance Criteria`, and `References` are required. Every Rule must have at least one corresponding Acceptance Criterion. Each criterion must contain one behavior that an implementer can build and a tester can verify.

## Scope And Consistency

- Cover only the current production batch. Do not pre-specify the full game, future batches, a roadmap, or multiple systems in one file.
- Do not contradict verified decisions in `docs/game/details/` or the macro design. Link those sources instead of repeating their evidence.
- Do not require observation, measurement, constraint, citation, target, or estimate labels for implementation instructions.
- Treat excessive length as a signal that the system or content category should be split; do not impose a page cap or omit edge cases to shorten the document.
- Never fill material ambiguity with a plausible guess. Put a non-blocking unknown in `Open Questions`; if it prevents complete Rules or Acceptance Criteria for the current batch, stop and return a short grouped question list.

## Numeric Source Rule

Keep tunable balance values in data files under `game/` as their single source. In `State And Data`, name fields and define their meaning or type without copying values. Refer to the owning data path when known. A balance adjustment must not require a spec edit unless it changes a rule, schema, formula structure, edge case, dependency, or acceptance behavior.

## Completion Check

Before finishing, verify:

- one file covers one validated system or content category needed by the current batch;
- every Rule maps to at least one testable Acceptance Criterion;
- schema fields contain no duplicated balance values;
- a content category defines its project-specific entity comparison axes;
- every existing `Depends On` spec was read before writing;
- all non-`None` `Depends On`, `Used By`, and `Evidence` paths resolve;
- no statement contradicts the macro design or a verified decision;
- unresolved choices are explicit and no blocking choice was invented.
