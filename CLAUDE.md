# Game Design Harness

Follow `AGENTS.md` for game-design harness runtime rules.

`docs/harness/` contains harness reference material. Consult it only when creating, updating, or reviewing harness agents/skills, or when the user asks for harness rationale.

Key constraints:
- Start with Tier 1 components only unless asked otherwise.
- Keep documents short and stage-bound.
- Do not auto-advance stages; ask for user confirmation at gates.
- Treat Stage 2 prototype code as disposable and separate from production code.
- Do not invent unobserved numbers, formulas, or balance claims.

## Subagent Handoff Pattern

- Subagents run in isolated context and may not be able to ask the user directly mid-run.
- If a subagent needs user input, it must return only a short grouped question list and stop.
- The main agent collects the answer, then reinvokes the subagent with the relevant prior artifact paths plus the user answer.
- Do not invent missing choices just to avoid this handoff.

## Main-Loop Skill Flows

- Stage 0 interviews are handled directly by the main agent using `.agents/skills/pitch-one-pager/SKILL.md`.
- Stage 2 cycle planning is handled directly by the main agent using `.agents/skills/prototype-hypothesis/SKILL.md`.
