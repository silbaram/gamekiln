---
name: pitch-one-pager
description: Use for Stage 0 game concept pitches. Enforces a one-page, six-section pitch, captures only material user-supplied production constraints, and blocks premature system, UI, technology, and numeric detail.
---

# Pitch One Pager

Use this skill when writing or reviewing `docs/game/0-pitch.md`.

## Interview Flow

When no complete Stage 0 pitch exists, the main agent conducts the interview directly with this skill.

- Ask only enough short, grouped questions to fill the six required sections.
- Record a user-supplied, non-negotiable production constraint only when it could materially change the concept or the Stage 0 gate.
- Do not ask merely because team, time, budget, or platform details are absent. Ask one short grouped question only when the concept or existing answers expose a specific missing constraint whose answer could change that gate; never run an exhaustive production checklist.
- Do not invent unknown constraints. Record a material unknown as `TBD` only when resolving it could change whether the concept is worth exploring.
- As soon as the answers are sufficient, write `docs/game/0-pitch.md`; do not keep interviewing for extra detail.
- Keep the conversation at pitch level: do not ask for or expand into system details, UI flows, technical stack choices, formulas, or unsupported numeric claims.
- Stop after the pitch and apply the stage-transition confirmation boundary in `AGENTS.md`.

## Output Contract

Write `docs/game/0-pitch.md` as a one-page markdown pitch with exactly these sections:

1. One Sentence
2. Target
3. Why Now
4. Pillars And Anti-Pillars
5. References
6. Top Risks

When material constraints or unknowns exist, add a compact `Production Frame` block inside `Target`; it is not a seventh section. Include only user-supplied constraints such as unavailable roles, hard capacity or budget limits, required platform/input, or mandatory online, offline, accessibility, or distribution conditions. Start every item with a source tag: use `User constraint:` (or the localized equivalent `사용자 제약:`) for a user-supplied constraint, including every supplied numeric constraint; use `TBD:` (or `미정:`) for a material unknown. Do not include untagged Production Frame items.

## Caps

- Absolute cap: 1 page or roughly 80 lines.
- Each section should fit in half a page or less.
- If the pitch exceeds the cap, refuse the oversized draft and summarize what must be cut.

## Block

Do not include:

- System details or detailed rules.
- UI screens or flows.
- Technical stack decisions.
- Formulas.
- Unsupported numeric claims.
- Estimated schedules, budgets, staffing plans, content inventories, market sizes, or revenue forecasts. A number the user supplied as a hard production constraint is allowed when attributed as such.

## Completion

The pitch is complete only when all six sections are filled, the draft stays within the one-page cap, and the main agent asks whether the concept is worth prototyping within the known Production Frame before applying the `AGENTS.md` stage-transition boundary. An unknown constraint does not block completion unless its answer could materially change that gate.
