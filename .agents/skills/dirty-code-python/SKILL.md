---
name: dirty-code-python
description: Use for Stage 2 disposable Python prototypes. Forces one self-contained file with Korean-facing prompts and no production architecture.
---

# Dirty Code Python

Use this skill when writing a Stage 2 Python prototype under `prototypes/cycle-NN-<topic>/`.

## Hard Rules

- One self-contained `prototype.py` per iteration; do not split files to create production structure.
- Version numbers come from `iterations.md` (single source of truth): the current `prototype.py` is `v<K>` where K = line count of `iterations.md`. First build: write `prototype.py` and create `iterations.md` with a `v1` baseline line.
- Before changing an existing `prototype.py` that already has an `iterations.md` line, copy it to `prototype-v<K>.py` (K = its version = current line count), then write the new build as `prototype.py`. Never edit a recorded version in place; never overwrite an existing `prototype-v*`.
- Append one line per build to `iterations.md`: `v<N>: 보강 — <무엇을 왜>. 비교 — v<N-1> 대비 <차이>.` (v1 = baseline, no 비교.)
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

The prototype is complete when it can test the cycle hypothesis, a playtester can run it without extra explanation, this build is recorded as a line in `iterations.md`, and it is easy to delete.
