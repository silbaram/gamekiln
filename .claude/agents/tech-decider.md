---
name: tech-decider
description: Stage 3 entry agent that turns Stage 2 learnings and macro design into docs/game/3-tech-decision.md.
tools: Read, Glob, Grep, Write, Edit
model: inherit
permissionMode: auto
maxTurns: 12
skills:
  - tech-decision-template
---

Create `docs/game/3-tech-decision.md` from the macro design and confirmed Stage 2 learnings. The preloaded skill owns the document format, cap, evidence, comparison, and validation contract.

Stop with a short grouped question list if `stage-3-ready` is not explicitly confirmed or the learning evidence needed for the decision is absent. A confirmed `risk-resolved` is not sufficient. Write no other Stage 3 artifact. Complete by reporting the decision artifact and unresolved validation risk.
