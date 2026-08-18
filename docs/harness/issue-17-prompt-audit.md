# Issue #17 Prompt Audit

Date: 2026-08-18
Baseline: `main` before issue #17
Candidate: `codex/issue-17-lean-runtime-rules`

The contract/token audit uses `o200k_base` over the runtime files that each representative task loads. Literal user prompts and the reproducible same-model runner live in `scripts/audit-issue-17-prompts.js`; each before/after pair uses the same prompt, model configuration, read-only sandbox, and tool policy. The runner builds isolated temporary contexts from `main` and the current worktree, then prints model, token, question, modality, and guard outputs without editing either tree.

| Representative task | Runtime context counted | Before | After | Change |
|---|---|---:|---:|---:|
| Macro writing, Gemini | `AGENTS.md` + `GEMINI.md` + macro agent | 1,814 | 593 | -67.3% |
| General Stage 2 prototype, Claude | global/entry + prototype agent + both legacy modality skills vs one disposable skill | 3,137 | 940 | -70.0% |
| Control/physics Stage 2 prototype, Gemini | `AGENTS.md` + `GEMINI.md` + prototype agent | 2,726 | 612 | -77.5% |

## Static contract checks

### Macro writing

Input condition: confirmed pitch containing qualitative pillars, a loop, references, and unresolved design risks.

- Before: macro format and forbidden content were described in the agent, inlined skill rules, and a second Block list.
- After: one inlined macro contract owns format/content checks; the agent adds only input, output, Top Risks continuity, and stop behavior.
- Preserved: five-page cap, six-section shape, source discipline, testable risks, stage gate.
- Required clarification turns: unchanged at zero when the pitch and confirmation exist.

### General Stage 2 prototype

Input condition: `Tests:` and `Prototype: browser` are present, both signals are observable, and consequential gameplay choices are already recorded.

- Before: Claude preloaded both HTML and Python skills while the agent separately required a five-category build preflight and repeated both implementations' restrictions.
- After: Claude preloads only `disposable-prototype`; the agent stops only for missing metadata or a choice that materially changes signal observability.
- Preserved: one hypothesis, evidence requirement, `prototypes/`/`game/` isolation, immutable iteration record, user-confirmed gate.
- Mandated preflight categories for a complete hypothesis: five to zero. Questions remain available for genuine observability blockers.

### Control/physics Stage 2 prototype

Input condition: the hypothesis tests analog acceleration, camera response, and collision feel, and selects an engine graybox because those signals cannot be represented faithfully in a turn-based page.

- Before: the HTML/Python allowlist and framework/tool restrictions could not directly honor the selected modality, requiring a modality rewrite or an exception turn.
- After: engine graybox is an explicit valid modality when it is the cheapest faithful test; the independent throwaway-project rule keeps it separate from production.
- Preserved: one hypothesis, observable signals, evidence, isolation, iteration history, and gate confirmation.
- Expected avoidable clarification/rework: one modality exception path removed.

## Result

All three contexts are smaller. The ownership audit found no loss of the stage gate, evidence, prototype isolation, or pre-VS Stage 4 guard. Static checks and scaffold smoke tests cover provider syntax, contract linkage, and clean-install Tier exposure. Migration from pre-tier releases is explicitly unsupported.

## Live same-model behavior audit

Executed on 2026-08-18 from the authoring repository:

```bash
npm run audit:issue17
```

The command sent only the listed harness runtime contexts and the three literal prompts to the configured Codex model. It is intentionally separate from the default test suite because it requires authenticated external model execution.

- Model: `gpt-5.6-sol`, reasoning effort `low`
- Baseline commit: `39c47a2a2bc7dc449ecc1dd1b2aafc58e156504a`
- Baseline context SHA-256: `56a5944113a273503b108c6e2fc0e53cb4aab5043892b40fb6c671b849d7199d`
- Candidate context SHA-256: `a4b2fb15638fc07d58e0ba958f88165183405690662458536d8ef99228d2216d`
- Isolation: ephemeral temporary directory, read-only sandbox, repository rules ignored except for the explicitly assembled before/after context

| Task | Version | Decision | Questions | Output/modality | Guards | Codex-reported tokens used |
|---|---|---|---:|---|---|---:|
| Macro writing | Before | proceed | 0 | Stage 1 macro draft | both true | 9,571 |
| Macro writing | After | proceed | 0 | `docs/game/1-macro-design.md` | both true | 4,863 |
| General Stage 2 prototype | Before | proceed | 0 | browser page | all three true | 7,510 |
| General Stage 2 prototype | After | proceed | 0 | browser page | all three true | 9,523 |
| Control/physics Stage 2 prototype | Before | proceed | 0 | engine graybox | all three true | 7,156 |
| Control/physics Stage 2 prototype | After | proceed | 0 | engine graybox | all three true | 5,015 |

Every pair preserved the requested decision, zero-question behavior, faithful modality, and all tested guards. The total reported token use fell from 24,237 to 19,401 (-20.0%). Macro writing fell 49.2% and control/physics prototyping fell 29.9%; general Stage 2 prototyping rose 26.8%. This six-call spot check therefore found no behavioral regression in the tested paths and removed the predicted modality exception, while the mixed per-task token result should not be treated as proof of a universal efficiency gain.
