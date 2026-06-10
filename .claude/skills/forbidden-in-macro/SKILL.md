---
name: forbidden-in-macro
description: Use when reviewing Stage 1 macro design drafts. Detects and blocks unverified numbers, formulas, concrete content effects, UI descriptions, tech stack choices, and meta sections.
---

# Forbidden In Macro

Use this skill to review `docs/game/1-macro-design.md` before accepting Stage 1.

## Block Immediately

Flag and require removal of:

- Concrete HP, damage, cost, cooldown, drop-rate, economy, or balance values.
  - Keywords to grep (English): `HP`, `MP`, `ATK`, `DEF`, `damage`, `dmg`, `cost`, `mana`, `cooldown`, `crit`, `drop rate`, `gold`.
  - Keywords to grep (Korean): `체력`, `공격력`, `방어력`, `마나`, `코스트`, `쿨다운`, `드롭률`, `골드`, `데미지`, `명중`, `회피`.
  - Any bare number ≥ 2 attached to a stat-like noun (e.g., `체력 100`, `damage 20-30`, `3턴`).
- Formula-like definitions such as `X = Y * Z`.
  - Operators to grep: `=`, `+`, `*`, `/`, `^`, `%`, `√`.
  - Functions/keywords: `floor`, `round`, `ceil`, `min`, `max`, `clamp`, `sum`.
  - Korean operators: `당`, `마다`, `이상`, `미만`, `초당`, `턴당`, `회마다`.
- Concrete card, enemy, boss, item, or skill effects.
  - Examples to flag: `"Strike: 6 damage"`, `"Slime: 8 HP"`, `"화염구: 3 데미지"`.
- UI screen descriptions.
  - Keywords to grep: `버튼`, `화면`, `메뉴`, `툴팁`, `HUD`, `button`, `screen`, `menu`, `tooltip`, `modal`, `popup`.
- Engine, framework, language, or production technology choices.
  - Keywords to grep: `Unity`, `Unreal`, `Godot`, `Phaser`, `Pixi`, `libGDX`, `TypeScript`, `React`, `Node`, `Rust`, `WebGL`.
- Meta sections such as "what this document decides", "what this document does not decide", or "responsibility boundary".
  - Headings to grep: `결정하는 것`, `결정하지 않는 것`, `책임 경계`, `문서 범위`, `decides`, `does not decide`, `responsibility boundary`, `out of scope`.

## Allowed

- Named references with clear "steal / do not steal" notes.
- Qualitative loops, risks, pillars, verbs, and anti-verbs.
- Cycle mapping that says when a risky assumption will be tested.

## Output

Return a short report:

- Pass or Block.
- Offending lines or sections.
- Minimal edits needed to pass.
