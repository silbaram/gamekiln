---
name: forbidden-meta-sections
description: Use when reviewing Stage 4 detail docs. Detects and blocks meta sections such as what the document decides, does not decide, scope, boundary, or purpose.
---

# Forbidden Meta Sections

Use this skill to review `docs/game/details/*.md` before accepting Stage 4 detail docs.

## Block Immediately

Flag and require removal of meta sections or headings that explain the document's role instead of recording validated decisions.

Keywords to grep:

- Korean: `결정하는 것`, `결정하지 않는 것`, `책임 경계`, `문서 범위`, `이 문서의 역할`
- English: `decides`, `does not decide`, `responsibility boundary`, `out of scope`, `document purpose`

Treat heading matches as blocking. Treat body matches as blocking when they create a document-scope or responsibility-boundary explanation.

## Allowed

- Short section headings that record the actual validated system decision.
- Evidence citations and implementation notes tied to vertical-slice proof.
- Brief open-question pointers that tell the user to move unverified assumptions outside the detail doc.

## Output

Return a short report:

- Pass or Block.
- Offending lines or sections.
- Minimal edits needed to pass.
