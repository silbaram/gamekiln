---
name: pitch-one-pager
description: Use for Stage 0 game concept pitches. Enforces a one-page, six-section pitch and blocks system details, UI details, formulas, and unsupported numeric claims.
---

# Pitch One Pager

Use this skill when writing or reviewing `docs/game/0-pitch.md`.

## Interview Flow

When no complete Stage 0 pitch exists, the main agent conducts the interview directly with this skill.

- Ask only enough short, grouped questions to fill the six required sections.
- As soon as the answers are sufficient, write `docs/game/0-pitch.md`; do not keep interviewing for extra detail.
- Keep the conversation at pitch level: do not ask for or expand into system details, UI flows, technical stack choices, formulas, or unsupported numeric claims.
- Do not automatically advance to Stage 1. After the pitch is written, ask the user to confirm before any Stage 1 work begins.

## Output Contract

Write `docs/game/0-pitch.md` as a one-page markdown pitch with exactly these sections:

1. One Sentence
2. Target
3. Why Now
4. Pillars And Anti-Pillars
5. References
6. Top Risks

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

## Completion

The pitch is complete only when all six sections are filled, the draft stays within the one-page cap, and the user is asked to confirm before Stage 1.
