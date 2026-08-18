---
name: forbidden-in-macro
description: Use when reviewing Stage 1 macro design drafts. Detects and blocks unverified numbers, formulas, concrete content effects, UI descriptions, tech stack choices, and meta sections.
---

# Forbidden In Macro

Use this skill to review `docs/game/1-macro-design.md` before accepting Stage 1.

## Block Immediately

Flag and require removal of:

- Unverified gameplay values or formulas presented as decisions.
- Concrete card, enemy, boss, item, or skill effects that belong in a tested system detail.
- Screen-by-screen UI specifications or production technology decisions.
- Meta sections about what the document decides, excludes, owns, or is responsible for.

Judge meaning in context. A keyword or operator alone is not a violation.

## Allowed

- Named references with clear "steal / do not steal" notes.
- Qualitative loops, risks, pillars, verbs, and anti-verbs.
- Cycle mapping that says when a risky assumption will be tested.
- Structural identifiers, page caps, risk counts, cited reference facts, and observed values used only as evidence.

## Output

Return a short report:

- Pass or Block.
- Offending lines or sections.
- Minimal edits needed to pass.
