# Provider Formats

Verified against official docs on 2026-05-27.

## Codex

Official sources:

- https://developers.openai.com/codex/skills
- https://developers.openai.com/codex/subagents
- https://developers.openai.com/codex/guides/agents-md

Use `.agents/skills/<skill-name>/SKILL.md` for reusable Codex skills. A Codex skill is a directory with required `SKILL.md` metadata (`name`, `description`) and optional `scripts/`, `references/`, `assets/`, and `agents/openai.yaml`.

Use `.codex/agents/<agent>.toml` for project-scoped custom agents. Use `~/.codex/agents/<agent>.toml` only for personal agents. Each standalone custom agent file must define:

- `name`
- `description`
- `developer_instructions`

Useful optional fields include `model`, `model_reasoning_effort`, `sandbox_mode`, `mcp_servers`, and `skills.config`. Codex identifies the custom agent by the `name` field, not the filename.

Codex subagents are explicit-orchestration tools. The parent should ask Codex to spawn a subagent; do not rely on automatic use. Keep `[agents] max_depth = 1` unless recursive delegation is intentionally required.

For project-wide instructions, use `AGENTS.md` at the repo root or nearer directories. Codex reads global instructions first, then project files from root to the current working directory. Later, more specific files override earlier guidance.

Harness convention:

- Internal id and Codex `name`: snake_case, e.g. `cycle_planner`.
- Filename: kebab-case, e.g. `.codex/agents/cycle-planner.toml`.
- Default read-only agents: `stage_router`, reviewers, researchers.
- Write-capable agents: only those that must create a documented artifact, and only within the requested stage.

## Claude Code

Official source:

- https://code.claude.com/docs/en/sub-agents

Use `.claude/agents/<agent>.md` for project subagents and `~/.claude/agents/<agent>.md` for personal subagents. Subagent files are Markdown with YAML frontmatter followed by the system prompt body.

Required frontmatter:

- `name`
- `description`

Common optional fields:

- `tools` to allowlist tools
- `disallowedTools` to deny tools
- `model`
- `permissionMode`
- `maxTurns`
- `skills`
- `mcpServers`
- `hooks`
- `memory`
- `isolation`
- `color`

The Markdown body becomes the subagent system prompt. A custom subagent starts with fresh isolated context and does not see the parent conversation history. The `description` field drives delegation; write it as a trigger, not as a generic summary.

Claude Code subagent names should use lowercase letters and hyphens. Convert plan ids such as `macro_designer` to `macro-designer`, and include the original harness id in the body when useful.

Use `skills` only when a subagent must preload complete skill content at startup. This injects the full skill content, so avoid it for broad skills unless the saved context is worth the cost.

Claude Code skills live at `.claude/skills/<skill-name>/SKILL.md` (project) or `~/.claude/skills/<skill-name>/SKILL.md` (personal). The SKILL.md format follows the Agent Skills open standard, so the file is byte-identical to a Codex skill under `.agents/skills/<skill-name>/SKILL.md`. This repository keeps `.agents/skills/<name>` as the canonical authoring source, then copies real directories to `.claude/skills/<name>` and verifies they match. Do not use symlinks here; Windows checkouts without symlink support can turn them into plain text files. Claude watches these directories for live changes within a session, but creating the top-level `.claude/skills/` directory for the first time requires restarting Claude Code so the watcher attaches.

## Gemini CLI

Official sources:

- https://github.com/google-gemini/gemini-cli/blob/main/docs/core/subagents.md
- https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html
- https://google-gemini.github.io/gemini-cli/docs/cli/custom-commands.html

Use `.gemini/agents/<agent>.md` for project subagents and `~/.gemini/agents/<agent>.md` for personal subagents. Custom agents are Markdown files with YAML frontmatter; the body becomes the agent system prompt.

Common frontmatter fields shown in the official subagent docs include:

- `name`
- `description`
- `kind`
- `tools`
- `model`
- `temperature`
- `max_turns`
- `mcpServers`

Gemini can delegate automatically based on description, or the user can force a subagent with `@agent-name` at the start of the prompt. Use `/agents reload` after adding files during an active session.

Use `tools` to keep subagent tool access narrow. Inline `mcpServers` can isolate MCP tools to one agent. Persistent overrides live in `settings.json` under `agents.overrides`.

For project-wide context, use `GEMINI.md`. The CLI loads global, project/ancestor, and subdirectory context files. Custom commands are TOML files under `.gemini/commands/` or `~/.gemini/commands/`; do not confuse commands with subagent definitions.

Harness convention:

- Agent names: lowercase kebab-case, e.g. `prototype-coder`.
- `kind: local` for normal local project agents.
- Keep `max_turns` low for gate/review agents; raise only for deep codebase analysis.

## Cross-Provider Harness Rules

- Keep provider-specific syntax in provider files, but keep the harness philosophy identical.
- Do not create equivalent providers unless the user asked for that provider or all providers.
- Prefer names and descriptions that make routing obvious: include stage, task, and artifact.
- Avoid broad "game designer" agents. The harness is made of small agents with kill gates.
- If provider docs conflict with the plan, preserve the provider syntax but preserve the plan's behavior.
