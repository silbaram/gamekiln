# GameKiln — AI Game Design Harness

GameKiln is a small, staged game-design harness for AI coding assistants. It keeps planning artifacts short, forces prototype evidence before detailed design, and ships provider-specific Tier 1 support for Codex, Claude Code, and Gemini CLI.

The package scaffolds a project with **Tier 1** only by default: main-loop skill flows for interactive pitch/cycle planning, plus autonomous subagents for macro design, disposable prototype code, evidence review, and cross-stage routing.

## Quick Start

```bash
# From this repository
node bin/create-gamekiln.js ./my-game

# Or limit provider files
node bin/create-gamekiln.js ./my-game --provider claude
node bin/create-gamekiln.js ./my-game --provider codex
node bin/create-gamekiln.js ./my-game --provider gemini
```

Generated projects are updated in place. Existing project notes such as prototype learnings are created only when missing.

## What Gets Scaffolded

| Path | Purpose |
| --- | --- |
| `AGENTS.md` | Runtime harness rules shared by providers. |
| `CLAUDE.md`, `GEMINI.md` | Provider entry notes when those providers are enabled. |
| `.codex/agents/` | Codex custom agents for autonomous Tier 1 roles: `macro_designer`, `prototype_coder`, `cycle_reviewer`, and `stage_router`. |
| `.claude/agents/` | Claude Code subagents for the same four autonomous Tier 1 roles. |
| `.claude/skills/` | Real copied Tier 1 skill directories; no symlinks, for Windows-safe checkouts. |
| `.gemini/agents/` | Gemini CLI agents for the same four autonomous Tier 1 roles, with hard rules inlined where Gemini cannot auto-load skills. |
| `.agents/skills/` | Canonical Tier 1 skill sources, including the main-loop `pitch-one-pager` and `prototype-hypothesis` flows. |
| `docs/harness/` | Reference docs for harness authors; not required runtime reading. |
| `docs/game/` | Stage 0/1/3+ game-design artifacts. |
| `prototypes/` | Stage 2 cycle folders plus cumulative `learnings.md`, `playtest.md`, and `killed-hypotheses.md`. |
| `game/` | Production game code, used after prototype evidence justifies it. |

## Main-Loop Skills vs Subagents

Tier 1 deliberately splits execution by whether the role needs user input while running:

| Component | Execution shape | Why |
| --- | --- | --- |
| Stage 0 pitch interview | Main agent + `pitch-one-pager` skill | Interviews need direct back-and-forth with the user. |
| Stage 1 macro design | `macro_designer` subagent | Drafts from existing pitch artifact without mid-run user input. |
| Stage 2 cycle planning | Main agent + `prototype-hypothesis` skill | Hypothesis/signals may need direct user clarification. |
| Stage 2 prototype coding | `prototype_coder` subagent | Builds from confirmed hypothesis after the main agent resolves build-blocking questions. |
| Stage 2 review gate | `cycle_reviewer` subagent | Reviews recorded evidence and recommends proceed/retry/regress/kill. |
| Cross-stage routing | `stage_router` subagent | Reads project state and recommends the next component or gate. |

There are no `concept-interviewer` or `cycle-planner` provider subagent files in the scaffold. Those roles are represented by the two main-loop skills above.

## Tier 1 Flow

1. **Stage 0 — Pitch**: the main agent runs the Stage 0 interview with the `pitch-one-pager` skill and creates `docs/game/0-pitch.md` in the one-page, six-section pitch format.
2. **Stage 1 — Macro Design**: `macro_designer` creates `docs/game/1-macro-design.md` under the five-page cap and extracts Top Risks.
3. **Stage 2 — Cycle Planning**: the main agent plans the next cycle with the `prototype-hypothesis` skill and creates one `prototypes/cycle-NN-<topic>/hypothesis.md` with a `Tests: R<N>` risk anchor.
4. **Stage 2 — Disposable Prototype**: `prototype_coder` creates one self-contained `prototype.html` or `prototype.py` inside that cycle folder only.
5. **Stage 2 — Playtest Evidence**: after playing, record observations in `prototypes/playtest.md` using separate Facts and Interpretations.
6. **Stage 2 — Review Gate**: `cycle_reviewer` recommends exactly one of proceed, retry, regress, or kill. The user confirms the gate.
7. **Routing**: `stage_router` inspects files and recommends the next single component or gate without auto-advancing stages.

Do not advance stages, kill a project, or expand scope without explicit user confirmation.

## Claude Skills Are Windows-Safe Copies

Claude Code loads skills from `.claude/skills/<skill>/SKILL.md`. Earlier symlink-based layouts can break on Windows checkouts when Git symlink support is disabled, turning links into tiny text files and silently disabling skill preloads.

GameKiln now uses real copied directories for Claude Tier 1 skills:

- `dirty-code-html`
- `dirty-code-python`
- `forbidden-in-macro`
- `macro-design-5p`
- `pitch-one-pager`
- `prototype-hypothesis`

`harness-subagents` is intentionally **not** scaffolded into ordinary game projects; it is for authoring and reviewing the harness itself.

Verify local Claude skill copies with:

```bash
npm run verify:claude-skills
```

The verifier fails if a Claude skill is missing, is a symlink, differs from the canonical `.agents/skills/` copy, or if `harness-subagents` appears under `.claude/skills/`.

## Subagent Question Handoff

Provider subagents may run in isolated contexts and may not be able to ask the user follow-up questions mid-run. Interactive roles stay in the main loop for that reason; remaining subagents use this fallback handoff pattern:

1. If required input is missing, the subagent returns only a short grouped question list and stops.
2. The main agent asks the user and collects answers.
3. The main agent reinvokes the subagent with the answers plus relevant artifact paths.
4. The subagent continues from the recorded artifacts and explicit answers.

Agents must not invent missing controls, win/loss conditions, formulas, balance values, or other build-changing details just to avoid the handoff.

## Stage 2 Playtest Evidence

Tier 1 includes `prototypes/playtest.md` as the lightweight evidence log. Record facts and interpretations separately:

```markdown
## cycle-01-example
Facts:
- <What actually happened during play. No guesses.>
Interpretations:
- <What the fact suggests for the next decision.>
```

`cycle_reviewer` reads the current hypothesis plus playtest evidence. If evidence exists only in the user message, the reviewer may use it but must state that limitation.

## Top Risks Ledger

`docs/game/1-macro-design.md` maintains a living Top Risks table with `Risk ID`, `Risk`, `Why It Matters`, `Cycle`, and `Status`.

Rules:

- Stage 1 starts with stable `R1`, `R2`, and `R3` rows.
- New Stage 2 risks are append-only as `R4`, `R5`, and so on.
- Never reuse an existing Risk ID.
- Existing risk text is not rewritten after Stage 1; only `Cycle` and `Status` change.
- If multiple cycles test the same risk, `Cycle` means the latest cycle slug.
- `Status` is one of `open`, `testing`, `resolved`, or `killed`.

## Development Checks

```bash
npm run verify:claude-skills
npm run smoke
npm pack --dry-run
```

`npm run smoke` scaffolds `./tmp-smoke` with all provider files using a cross-platform relative path. Remove the directory after inspection if needed.

## Harness Authoring Notes

Runtime rules live in `AGENTS.md`, provider agent bodies, and `SKILL.md` files. The files under `docs/harness/` explain design rationale and the larger agent/skill roster, but ordinary game-planning work should start with Tier 1 and should not require reading the reference docs.

Use `docs/harness/design-guide.md`, `docs/harness/agents-skills-spec.md`, and `.agents/skills/harness-subagents/references/provider-formats.md` when creating, updating, or reviewing harness agents and skills.
