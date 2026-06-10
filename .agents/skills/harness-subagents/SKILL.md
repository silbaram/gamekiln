---
name: harness-subagents
description: "Use when creating, updating, or reviewing game-design harness subagents or supporting skills for Codex, Claude Code, or Gemini CLI. Enforces the harness reference docs' philosophy: short staged documents, kill gates, throwaway prototypes, source-backed numbers, and provider-specific agent file formats."
---

# Harness Subagents

Use this skill to author the AI game-design harness agents and skills described in `docs/harness/`.

## Required Sources

Read these before writing or changing harness agents:

- `docs/harness/design-guide.md` for the philosophy, stages, gates, output caps, and anti-encyclopedia rules.
- `docs/harness/agents-skills-spec.md` for the Tier 1/2/3 agent and skill roster.
- `references/provider-formats.md` before writing Codex, Claude Code, or Gemini CLI files.

Use the harness reference docs as source of truth for authoring. Do not duplicate the whole reference docs into generated agents.

## Non-Negotiables

Every harness agent, skill, or generated prompt must preserve these rules:

- Documents record decisions; they do not predict a complete game up front.
- Every stage decides proceed, retry, regress, or kill. Never auto-advance without user confirmation.
- Stage 2 prototype code is intentionally disposable. Keep it small, single-purpose, and separate from production code.
- Enforce the caps from the harness reference docs: pitch 1 page, macro design 5 pages, prototype hypothesis 1 hypothesis per cycle, prototype code as one self-contained HTML page or Python file without production architecture, detail docs 1-2 pages per system.
- Numeric values, formulas, tables, and balance claims need either observed playtest/prototype evidence or an explicitly named reference game/source.
- Stage 4 detail docs are only written after a vertical slice proves the relevant decision.
- Prefer Tier 1 only unless the user explicitly asks for a Tier 2/3 component or the project is already blocked at that point.
- Ordinary runtime agents should not require reading `docs/harness/`. Put the necessary behavior in AGENTS.md, the relevant SKILL.md files, or the agent body.

## Workflow

1. Identify target provider(s): `codex`, `claude`, `gemini`, or all three. If unspecified, create provider-neutral guidance and ask before writing provider files.
2. Identify the smallest useful tier. Default to Tier 1: `concept_interviewer`, `macro_designer`, `cycle_planner`, `prototype_coder`, `cycle_reviewer`, and `stage_router`.
3. For each agent, write one responsibility only: stage, purpose, inputs, outputs, blocking rules, and completion condition.
4. Convert names by provider:
   - Internal harness id: keep harness ids such as `concept_interviewer`.
   - Codex agent `name`: keep snake_case.
   - Claude/Gemini agent `name`: use lowercase kebab-case, such as `concept-interviewer`.
5. Use the provider templates in `assets/templates/` when creating files. Adjust tool access narrowly instead of inheriting broad write permissions by default.
6. After writing, validate frontmatter/TOML shape and scan for forbidden expansion: broad future specs, unverified numbers, automatic stage advancement, and Stage 4 details before Stage 3 evidence.

## Provider Targets

- Codex custom agents: `.codex/agents/<agent>.toml`; optional global settings in `.codex/config.toml`.
- Claude Code subagents: `.claude/agents/<agent>.md`.
- Gemini CLI subagents: `.gemini/agents/<agent>.md`.
- Codex repo skills: `.agents/skills/<skill-name>/SKILL.md`.
- Claude Code repo skills: `.claude/skills/<skill-name>/SKILL.md`. Same Agent Skills format as Codex.

Do not place all providers into one file. Each tool discovers its own directory and schema.

## Skill Distribution Across Providers

Skills are an open standard but each provider discovers them in different paths and has different auto-load rules. When you add or modify a Tier 1/2/3 skill, distribute it the same way every time:

1. **Author once under `.agents/skills/<name>/SKILL.md`** as the canonical source.
2. **Codex**: nothing more to do. Codex scans `.agents/skills/` automatically.
3. **Claude Code**: copy `.agents/skills/<name>` to `.claude/skills/<name>` as a real directory, then add the skill to the relevant subagent's `skills:` frontmatter so its content preloads at startup. Do not use symlinks in this repository; Windows checkouts can silently degrade them into text files.
4. **Gemini CLI**: Gemini has no skill auto-loading mechanism. Inline the skill's hard rules into each Gemini agent body under a `<skill-name> rules (inlined because Gemini does not auto-load skills):` block. Keep it tight — the harness anti-encyclopedia principle still applies.

Verification after adding a new skill:

- `test -f .claude/skills/<name>/SKILL.md` succeeds and `.claude/skills/<name>` is not a symlink.
- `npm run verify:claude-skills` passes, proving the Claude copies match the canonical `.agents/skills/` files.
- The Claude subagent frontmatter lists the skill under `skills:`.
- The corresponding Gemini agent body contains the inlined rules.
- Keep `harness-subagents` out of `.claude/skills/` in scaffolded game projects; it is for authoring this harness, not ordinary Tier 1 game work.

## Authoring Contract

Every generated subagent must include:

- Single responsibility and stage.
- Trigger guidance in the description.
- Required inputs and exact output path or response shape.
- Explicit stop condition.
- Blocking rules for the harness philosophy.
- A user-confirm gate before stage transitions, kill decisions, or scope expansion.

Avoid:

- "This document decides / does not decide" meta sections in game docs.
- Large explanatory essays inside agent prompts.
- Tier 3 components created in advance.
- Provider-specific fields invented from memory. Check `references/provider-formats.md` first.

## Final Response Shape

When this skill is used, report:

- Files created or updated.
- Provider docs consulted.
- Tier coverage.
- Any skipped agents or skills and why.
