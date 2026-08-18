---
name: disposable-prototype
description: Use for Stage 2 prototypes. Chooses the cheapest disposable modality that faithfully exposes one cycle's success and failure signals.
---

# Disposable Prototype

Use this skill to build the artifact or setup named by `> Prototype:` in the current cycle's `hypothesis.md`.

## Outcome Contract

- Choose the fastest, cheapest modality that lets a playtester observe both recorded signals. Browser or terminal code are convenient defaults, not an allowlist; engine grayboxes, tabletop setups, spreadsheets, simulations, and minimal network tests are valid when the hypothesis needs them.
- Keep every digital artifact and setup note inside the current `prototypes/cycle-NN-<topic>/` directory.
- Build only what the one hypothesis needs. The selected modality does not decide the Stage 3 technology stack.
- A playtester must be able to run or set up the test and recognize outcomes without agent narration. Use Korean for player-facing text unless language is itself under test.

## Iteration Record

Maintain `iterations.md` in the cycle directory. Add one immutable line per tested build or setup:

    v1: <modality> — <artifact or setup>; baseline — <what is tested>
    v2: <modality> — <artifact or setup>; change — <why>; comparison — <difference from v1>

Do not overwrite a previously tested artifact. How an artifact is archived is modality-specific; use the simplest collision-free name or snapshot.

## Stop

Stop only when `hypothesis.md` or its `Prototype:` choice is missing, or when an unresolved choice would materially change whether the recorded signals can be observed. Return a short grouped question list in that case.

## Completion

Complete when the test is runnable or reproducibly set up, both signals are observable, and the tested build/setup is logged in `iterations.md`. Return brief run/setup instructions and remind the user to record Facts and Interpretations after play.
