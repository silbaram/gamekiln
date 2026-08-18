---
name: production-plan
description: Use after the user confirms the Stage 3 gate to create or update a short current-batch production plan from VS estimates and actual production evidence.
---

# Production Plan

Use this main-loop skill after the user confirms the Stage 3 gate and `docs/game/3-scope-estimate.md` records the approved scope basis. Create or update `docs/game/production-plan.md`; do not delegate the user decisions in this flow to a subagent.

## Output Contract

Keep one living document with these sections:

1. `# Production Plan`
2. `## Approved Scope`
3. `## Current Batch`
4. `## Throughput Check`
5. `## Quality Checkpoints`
6. `## Risks And Scope Change`
7. `## Gate Snapshot`

## Cap And Focus

- Absolute cap: 3 pages. This is a maximum, not a target or minimum.
- Detail only the current production batch and its completion evidence.
- Keep later work at approved-scope summary level; do not create a full content matrix, fixed long-range schedule, or full-game backlog.
- Keep Stage 4 detail docs separate. This plan may point to a VS-validated system that needs a detail record, but must not specify an unvalidated system.

## Evidence And Updates

- Preserve the confirmed Stage 3 scope estimate as `Estimate`/`추정`, planned quantities or completion values as `Target`/`목표`, and confirmed production boundaries as `Constraint`/`제약`.
- Record actual batch time, cost, throughput, build results, and test results only as `Measurement`/`측정` or `Observation`/`관측` when the project has produced them.
- Compare actual results with the estimate's stated range and assumptions. Do not invent missing results or use a universal percentage threshold.
- Do not recalculate the full-game estimate in this artifact. If confirmed scope or new measurements make it stale, mark that gap and route recalculation to `scope-estimate-method`.
- If actual results are not available yet, mark the check pending and state the next measurement instead of predicting it.
- Define release readiness only from this project's confirmed targets and evidence; do not import a generic release checklist.

## Scope Change And Gate

- Record a proposed or confirmed material scope expansion or cut under `Risks And Scope Change`, including its evidence and impact on the current batch or estimate.
- Keep a material scope change proposed until it passes the `AGENTS.md` material-scope decision boundary. Reordering work inside the approved scope is not by itself a material scope change.
- Scope change is not a fifth gate result. Keep the gate recommendation as proceed, retry, regress, or kill/stop, and use `kill-criteria` when a project-level regression or kill judgment is needed.
- Return stage, material-scope, and project-stop decisions to the `AGENTS.md` boundary.

## Block Immediately

- The Stage 3 gate has not been explicitly confirmed by the user.
- `docs/game/3-scope-estimate.md` or its recorded approved-scope basis is missing.
- The plan exceeds 3 pages or predicts batches beyond the current one in detail.
- Throughput, quality evidence, or readiness is invented.
- A universal throughput threshold or generic release checklist is introduced.
- A material scope change that has not passed the `AGENTS.md` boundary is written as approved.
- Unvalidated Stage 4 system detail or automated project termination is added.

## Completion

Complete only when the current approved scope, one current batch, its completion evidence, estimate-versus-actual status, current risks or scope-change proposals, and one gate snapshot are visible within 3 pages. Return any material scope change or stage/kill decision to the `AGENTS.md` confirmation boundary.
