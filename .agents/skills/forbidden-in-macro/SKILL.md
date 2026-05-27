---
name: forbidden-in-macro
description: Use when reviewing Stage 1 macro design drafts. Detects and blocks unverified numbers, formulas, concrete content effects, UI descriptions, tech stack choices, and meta sections.
---

# Forbidden In Macro

Use this skill to review `docs/game/1-macro-design.md` before accepting Stage 1.

## Block Immediately

Flag and require removal of:

- Concrete HP, damage, cost, cooldown, drop-rate, economy, or balance values.
- Formula-like definitions such as `X = Y * Z`.
- Concrete card, enemy, boss, item, or skill effects.
- UI screen descriptions.
- Engine, framework, language, or production technology choices.
- Meta sections such as "what this document decides", "what this document does not decide", or "responsibility boundary".

## Allowed

- Named references with clear "steal / do not steal" notes.
- Qualitative loops, risks, pillars, verbs, and anti-verbs.
- Cycle mapping that says when a risky assumption will be tested.

## Output

Return a short report:

- Pass or Block.
- Offending lines or sections.
- Minimal edits needed to pass.
