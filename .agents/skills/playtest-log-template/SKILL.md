---
name: playtest-log-template
description: Use for Stage 2 playtest logging. Appends user-provided Facts, Interpretations, and Decisions to prototypes/playtest.md without inventing observations.
---

# Playtest Log Template

Use this skill when the main agent records Stage 2 playtest evidence in `prototypes/playtest.md`.

## Main-Loop Flow

After a prototype play session, the main agent runs this skill directly.

1. Ask a short interview: what the user saw, how many runs or attempts were played, and where play got stuck or changed.
2. Use only content present in the user's answers. Do not add observations, numbers, outcomes, causes, or decisions the user did not say.
3. Draft Facts, Interpretations, and Decisions sections for the relevant `## cycle-NN-<topic>` header.
4. When the user asked to record the session and the mapping is unambiguous, append it. Show a draft and wait only when an interpretation or decision is materially ambiguous, or when the user requested review before writing.

## Output Contract

Append under the existing cycle header format:

    ## cycle-NN-<topic>
    Facts:
    - <observed fact from user answer only>
    Interpretations:
    - <interpretation separated from facts>
    Decisions:
    - <next-cycle action, 1-3 items>

If the cycle header already exists, add the new entry beneath it with a date or session label instead of creating a duplicate header unless the file convention already uses duplicate headers.

## Caps

- Keep each interview short: prefer 3 grouped questions or fewer.
- Decisions must contain 1-3 next-cycle actions.
- Do not create or edit `prototypes/learnings.md` or `prototypes/killed-hypotheses.md`; those files are author-only handoffs from `cycle_reviewer`.

## Block

Block and rewrite Facts when they contain speculative language, including:

- Korean: "아마", "느낌", "보임", "같다", "듯".
- English: "probably", "seems", "feels".

Also block:

- Facts that include inferred causes rather than direct observations.
- Interpretations mixed into Facts.
- Decisions with more than 3 next-cycle actions.
- Any attempt to write `prototypes/learnings.md` or `prototypes/killed-hypotheses.md`.
- Appending an interpretation or decision that is not supported by the user's words.

## Completion

Complete when `prototypes/playtest.md` receives an append under `## cycle-NN-<topic>` based only on user-provided content, or when a materially ambiguous draft has been returned for clarification.
