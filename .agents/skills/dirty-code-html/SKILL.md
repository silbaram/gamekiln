---
name: dirty-code-html
description: Use for Stage 2 disposable browser prototypes. Forces one-page, self-contained, vanilla HTML/CSS/JavaScript code for hypothesis testing only.
---

# Dirty Code HTML

Use this skill when writing a Stage 2 browser prototype under `prototypes/cycle-NN-<topic>/`.

## Hard Rules

- One `prototype.html` file only.
- Keep the whole prototype in one self-contained HTML page; do not split files to create production structure.
- No hard HTML line cap. Keep scope controlled by testing one hypothesis, not by compressing playable clarity.
- Use vanilla HTML, CSS, and JavaScript only.
- Inline CSS and JavaScript are allowed.
- No build step, bundler, framework, package manager, or external CDN/library without user confirmation.
- Do not import or link code from earlier prototype cycles.
- Do not place prototype code under `game/`.
- Player-facing UI text, button labels, state messages, result summaries, and playtest questions must be in Korean unless the hypothesis explicitly tests another language.
- The prototype must expose enough state and feedback for a playtester to understand what changed without needing agent narration.

## Allowed

- Hardcoded values.
- Short variable names.
- TODO/FIXME comments.
- Messy DOM code if it makes the hypothesis test faster.
- Clear controls, readable layout, visible game state, reset/retry affordances, and enough visual polish to support playtesting.

## Completion

The prototype is complete when it opens in a browser, can test the cycle hypothesis, a playtester can use it without extra explanation, and it is easy to delete.
