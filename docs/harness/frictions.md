# 하네스 마찰 1회차 기록

목적: 하네스 운영 중 관찰된 마찰의 1회차 기록. 같은 유형이 2번 쌓이면 two-strikes — 구조 결함으로 보고 해당 컴포넌트를 수정한 뒤 `docs/harness/retrospective.md`로 옮겨 기록한다.

규칙: append-only. 단, two-strikes로 해결된 기존 줄 끝에 ` → resolved (retrospective YYYY-MM-DD)`를 붙이는 수정만 허용한다.

형식: `YYYY-MM-DD | 마찰 — <관찰 1줄> | 출처 — <어느 작업/사이클에서>`

운영 규칙:
- 새 마찰을 적기 전에 이 파일에서 같은 유형을 먼저 찾는다: `rg "<핵심 문구>" docs/harness/frictions.md`.
- 이미 있으면 새 줄을 적지 말고 two-strikes를 발동한다: 컴포넌트 수정 + `docs/harness/retrospective.md` append + 해당 줄 끝에 ` → resolved (retrospective YYYY-MM-DD)` 표기.
- 없으면 위 형식으로 한 줄 append한다.

2026-06-10 | 마찰 — Codex가 형식 정의된 파일에 append할 때 프롬프트의 리터럴 표기를 따라가 파일의 형식 정의를 위반 | 출처 — Tier 2 구현 PR의 retrospective.md 항목
2026-06-10 | 마찰 — 에이전트가 참조하는 파일(prototypes/assumptions.md)이 템플릿으로 존재하지 않아 안내가 빈 곳을 가리킴 | 출처 — Tier 3 Stage 4 세트 구현 후 구성 검토
2026-08-17 | 마찰 — Codex custom agent의 skills.config를 TOML 맵으로 선언해 역할 파일 전체가 무시됨 | 출처 — Tier 2/3 역할 로딩 경고 조사
2026-08-18 | 마찰 — Codex가 사용자 제공 제작 수치는 보존했지만 Production Frame의 `사용자 제약` 출처 태그를 생략 | 출처 — Issue #12 구현 스폿체크 → resolved (retrospective 2026-08-18)
2026-08-18 | 마찰 — cycle-level proceed와 Stage 2 전체 proceed가 같은 용어라 단일 Risk 해결이 Stage 3 진입으로 오인될 수 있음 | 출처 — Issue #13 라우팅 검토
2026-08-18 | 마찰 — Stage 3의 고정 산출물 순서가 blocker 유무와 무관하게 기술·아트·전체 명세를 제작 전에 요구 | 출처 — Issue #15 라우팅 검토
2026-08-18 | 마찰 — scope estimate 최대 분량이 참고 명세에만 있고 runtime skill이 없어 scaffolded agent가 cap을 받지 못함 | 출처 — Issue #15 최종 리뷰
2026-08-18 | 마찰 — Stage 4–5 런타임이 production plan과 batch 라우팅 없이 끝나고 regression/kill을 해당 없음으로 고정 | 출처 — Issue #16 검토
2026-08-19 | 마찰 — provider 검증기가 CRLF의 다항목 Claude skills 목록을 첫 항목까지만 파싱하고 자동 게이트에서도 누락 | 출처 — Issue #25 Windows 체크아웃 재현
