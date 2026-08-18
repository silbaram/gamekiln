---
name: forbidden-in-macro
description: Use when reviewing Stage 1 macro design drafts. Blocks unverified numeric decisions, formulas, concrete content effects, UI descriptions, tech stack choices, and meta sections without rejecting structural tables or identifiers.
---

# Forbidden In Macro

Use this skill to review `docs/game/1-macro-design.md` before accepting Stage 1.

## Block Immediately

Flag and require removal of:

- Unverified gameplay values, numeric targets, estimates, or formulas presented as macro decisions rather than later tests.
- Concrete card, enemy, boss, item, or skill effects that belong in a tested system detail.
- Screen-by-screen UI specifications or production technology decisions.
- Meta sections about what the document decides, excludes, owns, or is responsible for.

Judge meaning in context. A keyword or operator alone is not a violation.

## Allowed

- Named references with clear "steal / do not steal" notes.
- Qualitative loops, risks, pillars, verbs, and anti-verbs.
- Cycle mapping that says when a risky assumption will be tested.
- An explicit language-matched target value (`목표:` in Korean or `Target:` in English) only when it is a testable assumption linked to a later cycle, never a settled macro system value.
- Non-numeric Risk, reference, and comparison tables.
- Structural identifiers, page caps, risk counts, cycle numbers, and version numbers.
- Named reference facts marked as citation/context rather than proof that this game works.
- Observed values used only as evidence rather than promoted into an untested macro decision.

## Output

Return a short report:

- Pass or Block.
- Offending lines or sections.
- Minimal edits needed to pass.
