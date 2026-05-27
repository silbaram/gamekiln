---
name: dirty-code-python
description: Use for Stage 2 disposable Python prototypes. Forces one-file, under-200-line, intentionally non-production code for hypothesis testing only.
---

# Dirty Code Python

Use this skill when writing a Stage 2 Python prototype under `prototypes/cycle-NN-<topic>/`.

## Hard Rules

- One file only.
- 200 lines maximum.
- No type hints.
- No docstrings.
- At most 5 classes.
- No external package imports without user confirmation.
- Do not import code from earlier prototype cycles.
- Do not place prototype code under `game/`.

## Allowed

- Hardcoded values.
- Short variable names.
- TODO/FIXME comments.
- Messy control flow if it makes the hypothesis test faster.

## Completion

The prototype is complete when it can test the cycle hypothesis and is easy to delete.
