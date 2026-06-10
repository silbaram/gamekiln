# Game Design Harness

This repository uses the AI game-design harness.

## Source Of Truth

- Runtime rules live in this file, the SKILL.md files, and each provider agent body.
- Harness reference docs live in `docs/harness/`. They explain the design rationale and agent/skill roster; they are not required runtime reading for ordinary game-planning work.
- Read `docs/harness/design-guide.md` and `docs/harness/agents-skills-spec.md` only when creating, updating, or reviewing harness agents/skills, or when the user explicitly asks for harness rationale.
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

## Subagent Handoff Pattern

- Subagents run in isolated context and may not be able to ask the user directly mid-run.
- If a subagent needs user input, it must return only a short grouped question list and stop.
- The main agent collects the answer, then reinvokes the subagent with the relevant prior artifact paths plus the user answer.
- Do not invent missing choices just to avoid this handoff.

## Tier 1 Agents

- `concept_interviewer`: Stage 0 pitch interview.
- `macro_designer`: Stage 1 macro design.
- `cycle_planner`: Stage 2 one-cycle hypothesis.
- `prototype_coder`: Stage 2 disposable prototype code.
- `cycle_reviewer`: Stage 2 proceed/retry/regress/kill recommendation.
- `stage_router`: Cross-stage routing.
