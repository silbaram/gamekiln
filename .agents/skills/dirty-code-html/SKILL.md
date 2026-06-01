---
name: dirty-code-html
description: Use for Stage 2 disposable browser prototypes. Forces one-file, under-300-line, vanilla HTML/CSS/JavaScript code for hypothesis testing only.
---

# Dirty Code HTML

Use this skill when writing a Stage 2 browser prototype under `prototypes/cycle-NN-<topic>/`.

## Hard Rules

- One `prototype.html` file only.
- 300 lines maximum.
- Use vanilla HTML, CSS, and JavaScript only.
- Inline CSS and JavaScript are allowed.
- No build step, bundler, framework, package manager, or external CDN/library without user confirmation.
- Do not import or link code from earlier prototype cycles.
- Do not place prototype code under `game/`.

## Allowed

- Hardcoded values.
- Short variable names.
- TODO/FIXME comments.
- Messy DOM code if it makes the hypothesis test faster.
- Minimal visual styling that makes the prototype playable.

## Completion

The prototype is complete when it opens in a browser, can test the cycle hypothesis, and is easy to delete.
