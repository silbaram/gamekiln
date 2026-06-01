---
name: dirty-code-python
description: Use for Stage 2 disposable Python prototypes. Forces one self-contained file with Korean-facing prompts and no production architecture.
---

# Dirty Code Python

Use this skill when writing a Stage 2 Python prototype under `prototypes/cycle-NN-<topic>/`.

## Hard Rules

- One `prototype.py` file only.
- Keep the whole prototype in one self-contained Python file; do not split files to create production structure.
- No hard Python line cap. Keep scope controlled by testing one hypothesis, not by compressing playable clarity.
- No type hints.
- No docstrings.
- At most 5 classes.
- No external package imports without user confirmation.
- Do not import code from earlier prototype cycles.
- Do not place prototype code under `game/`.
- Player-facing prompts, menu labels, state messages, result summaries, and playtest questions must be in Korean unless the hypothesis explicitly tests another language.
- The prototype must expose enough state and feedback for a playtester to understand what changed without needing agent narration.

## Allowed

- Hardcoded values.
- Short variable names.
- TODO/FIXME comments.
- Messy control flow if it makes the hypothesis test faster.
- Clear terminal menus, repeated play/reset loops, visible state summaries, and concise Korean instructions.

## Completion

The prototype is complete when it can test the cycle hypothesis, a playtester can run it without extra explanation, and it is easy to delete.
