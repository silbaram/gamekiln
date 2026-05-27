# Game Design Harness v2

This repository uses the v2 AI game-design harness described in `plans/`.

## Source Of Truth

- Read `plans/game-design-harness-v2.md` before creating game-planning artifacts.
- Read `plans/agents-skills-spec.md` before creating or invoking harness agents or skills.
- Start with Tier 1 only unless the user explicitly asks for Tier 2/3 or the project is blocked.

## Harness Rules

- Documents record decisions; they do not predict the whole game up front.
- Every stage must allow proceed, retry, regress, or kill.
- Do not advance stages, kill a project, or expand scope without explicit user confirmation.
- Stage 2 prototypes are disposable. Keep prototype code physically separate from production code.
- Enforce caps: pitch 1 page, macro design 5 pages, prototype hypothesis 1 per cycle, detail docs 1-2 pages per system.
- Numbers, formulas, tables, and balance claims require observed prototype/playtest evidence or an explicit reference source.
- Do not write Stage 4 detail docs before a vertical slice has validated the relevant decision.
- Avoid "this document decides / does not decide" meta sections in game docs.

## Tier 1 Agents

- `concept_interviewer`: Stage 0 pitch interview.
- `macro_designer`: Stage 1 macro design.
- `cycle_planner`: Stage 2 one-cycle hypothesis.
- `prototype_coder`: Stage 2 disposable prototype code.
- `cycle_reviewer`: Stage 2 proceed/retry/regress/kill recommendation.
- `stage_router`: Cross-stage routing.
