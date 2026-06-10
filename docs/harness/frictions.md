# 하네스 마찰 1회차 기록

목적: 하네스 운영 중 관찰된 마찰의 1회차 기록. 같은 유형이 2번 쌓이면 two-strikes — 구조 결함으로 보고 해당 컴포넌트를 수정한 뒤 `docs/harness/retrospective.md`로 옮겨 기록한다.

규칙: append-only. 단, two-strikes로 해결된 기존 줄 끝에 ` → resolved (retrospective YYYY-MM-DD)`를 붙이는 수정만 허용한다.

형식: `YYYY-MM-DD | 마찰 — <관찰 1줄> | 출처 — <어느 작업/사이클에서>`

운영 규칙:
- 새 마찰을 적기 전에 이 파일에서 같은 유형을 먼저 찾는다: `rg "<핵심 문구>" docs/harness/frictions.md`.
- 이미 있으면 새 줄을 적지 말고 two-strikes를 발동한다: 컴포넌트 수정 + `docs/harness/retrospective.md` append + 해당 줄 끝에 ` → resolved (retrospective YYYY-MM-DD)` 표기.
- 없으면 위 형식으로 한 줄 append한다.

2026-06-10 | 마찰 — Codex가 형식 정의된 파일에 append할 때 프롬프트의 리터럴 표기를 따라가 파일의 형식 정의를 위반 | 출처 — Tier 2 구현 PR의 retrospective.md 항목
