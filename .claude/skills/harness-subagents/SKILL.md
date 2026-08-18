---
name: harness-subagents
description: "Use when creating, updating, or reviewing game-design harness subagents or supporting skills for Codex, Claude Code, or Gemini CLI. Enforces the harness reference docs' philosophy: short staged documents, kill gates, throwaway prototypes, source-backed numbers, and provider-specific agent file formats."
---

# Harness Subagents

Use this skill to author the AI game-design harness agents and skills described in `docs/harness/`.

## Required Sources

Read `docs/harness/core-contract.md` for every harness authoring task. Then load only what the target needs:

- The target component's section in `docs/harness/agents-skills-spec.md`.
- The selected provider's section in `references/provider-formats.md` when changing provider files.
- The relevant `docs/harness/design-guide.md` section only when stage boundaries or design rationale are at issue.
- All of `docs/harness/routing-scenarios.md` only when changing `stage_router`.

Do not require whole reference documents for a local component edit. Do not duplicate reference prose into generated agents.

## Non-Negotiables

Every harness component must preserve `core-contract.md` without restating it:

- Change a rule only in its canonical owner; other layers reference it.
- Enforce each artifact's cap and shape in its owning skill, not in provider entry files or unrelated agent bodies.
- Prefer Tier 1 only unless the user explicitly asks for a Tier 2/3 component or the project is already blocked at that point.
- Ordinary runtime agents should not require reading `docs/harness/`. Put the necessary behavior in AGENTS.md, the relevant SKILL.md files, or the agent body.
- Roles that need user input during execution must be implemented as main-loop skill flows, not subagents.
- First-time harness friction is recorded in `docs/harness/frictions.md`; check it before appending, because a same-type second entry triggers two-strikes repair plus `docs/harness/retrospective.md`.
- Recurring friction (same type observed twice) while operating the harness is a structural defect: fix the responsible skill/agent and append one line to `docs/harness/retrospective.md`. Never fix the same friction silently twice.

## Workflow

1. Identify target provider(s): `codex`, `claude`, `gemini`, or all three. If unspecified, create provider-neutral guidance and ask before writing provider files.
2. Identify the smallest useful tier. Default to Tier 1: main-loop skill flows for `concept_interviewer` and `cycle_planner`, plus subagents `macro_designer`, `prototype_coder`, `cycle_reviewer`, and `stage_router`.
3. For each component, choose the execution shape first: use a main-loop skill flow when the role needs user input during execution; use a subagent for autonomous drafting, coding, review, or routing. Do not create provider subagent files for main-loop skill flows. Then write one responsibility only: role, inputs, exact output, and genuine stop conditions. Leave artifact format and cap rules in the skill.
4. Convert names by provider:
   - Internal harness id: keep harness ids such as `concept_interviewer`.
   - Codex agent `name`: keep snake_case.
   - Claude/Gemini agent `name`: use lowercase kebab-case, such as `concept-interviewer`.
5. Use the provider templates in `assets/templates/` when creating files. Adjust tool access narrowly instead of inheriting broad write permissions by default.
6. After writing, validate frontmatter/TOML shape, provider parity, and ownership against `core-contract.md`. Reject duplicate rules as well as forbidden expansion.

## Friction To Fix Target

| 마찰 유형 | 수정 대상 |
|---|---|
| 산출물 품질/형식 위반 | 해당 SKILL.md의 Output Contract/Block |
| 에이전트 행동·역할 이탈 | 해당 에이전트 본문 (3개 프로바이더 동시) |
| 단계 순서·라우팅 오류 | stage_router (+ routing-scenarios.md 대조) |
| 위임·트리거 오작동 | 에이전트/스킬 description |
| Codex 프롬프트발 오류 (리터럴이 형식을 이김 등) | harness-subagents의 작성 규칙 |

## Guard Change Spot Test

When adding or changing a blocking rule/guard in a skill or agent, run one spot check with 1-3 realistic prompts: with-skill vs without-skill, or before vs after. Report whether the guard changed behavior. Do not create a standing test suite.

## Maintenance Workflow

1. 감사 — Compare the core ownership table and spec component lists against actual files; list mismatches.
2. 변경 — Fix the smallest canonical owner set that resolves the observed structural issue.
3. 이력 동기화 — Update `docs/harness/retrospective.md` and the relevant spec.
4. 검증 — Run verify scripts; when `stage_router` changed, compare all of `docs/harness/routing-scenarios.md`; when guard rules changed, run the spot test.

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
4. **Gemini CLI**: Gemini has no skill auto-loading mechanism. Inline the skill's minimum output contract once under a `<skill-name> contract (inlined):` block. Do not add a second Block list that restates it.

`harness-subagents` is special: it is for authoring this harness, not ordinary game-project work. In this authoring repository, install it as a real copied directory at `.claude/skills/harness-subagents/` so Claude Code can load it while editing the harness. The scaffolder distributes runtime skills from the cumulative tier registry in `lib/component-tiers.js`, so `harness-subagents` is not copied into newly scaffolded game projects.

Verification after adding or changing a skill:

- `test -f .claude/skills/<name>/SKILL.md` succeeds and `.claude/skills/<name>` is not a symlink.
- `npm run verify:claude-skills` passes, proving the Claude copies match the canonical `.agents/skills/` directories, including the authoring-only `harness-subagents` copy in this repository.
- The Claude subagent frontmatter lists runtime skills under `skills:` when those skills must preload for that subagent.
- The corresponding Gemini agent body contains the inlined rules for runtime skills.
- Keep `harness-subagents` out of scaffolded game projects; it is present only in this harness authoring repository's `.claude/skills/` copy set.

## Authoring Contract

Every generated subagent must include:

- Single responsibility and stage.
- Trigger guidance in the description.
- Required inputs and exact output path or response shape.
- Explicit stop condition.
- Only component-specific blocking rules not already owned by `AGENTS.md` or a loaded skill.

Avoid:

- "This document decides / does not decide" meta sections in game docs.
- Large explanatory essays inside agent prompts.
- Repeating a loaded/inlined skill's format, cap, or block rules in the agent body.
- Tier 3 components created in advance.
- Provider-specific fields invented from memory. Check `references/provider-formats.md` first.

## Final Response Shape

When this skill is used, report:

- Files created or updated.
- Provider docs consulted.
- Tier coverage.
- Any skipped agents or skills and why.
- If harness friction was observed during this work, whether it was recorded in `docs/harness/frictions.md` or triggered two-strikes repair.
