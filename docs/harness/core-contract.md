# Harness Core Contract

하네스 에이전트와 스킬을 저작할 때 사용하는 최소 계약이다. 일반 게임 기획 런타임은 루트 `AGENTS.md`만 따른다.

## 불변식과 단일 소유자

| 불변식 | Canonical runtime owner |
|---|---|
| 한 Stage 2 사이클은 관측 가능한 가설 하나를 검증 | `AGENTS.md` |
| 모든 stage gate는 proceed/retry/regress/kill을 검토하고 해당 없는 결과를 명시 | `AGENTS.md` |
| 중요한 수치·공식·밸런스 주장은 산출물 언어에 맞춰 근거/문맥/미검증 작업값으로 분류하고, 이 게임의 동작 검증은 관측·측정만 사용 | `AGENTS.md` |
| Stage 2 구현은 `prototypes/`에 격리하고 production에서 재사용하지 않음 | `AGENTS.md` |
| 단계 전환·project kill·중대한 범위 확대만 사용자 확인 필요 | `AGENTS.md` |
| VS 검증 전 Stage 4 detail doc 금지 | `AGENTS.md` |
| 산출물 경로·섹션·분량·artifact-specific 차단 | 해당 `SKILL.md` |
| 역할·입력·출력·실제 중단 조건 | provider agent body |
| provider 문법과 discovery 형식 | `references/provider-formats.md` |

## 저작 원칙

- 하위 계층은 상위 계약을 다시 쓰지 않는다. 필요한 규칙을 참조하고, 그 계층만 아는 정보를 추가한다.
- agent body가 스킬을 preload하면 스킬의 cap, 섹션, 금지 목록을 반복하지 않는다.
- Gemini처럼 스킬을 자동 로드하지 못하는 provider만 필요한 output contract를 한 번 인라인한다.
- 코드 스타일이나 특정 기술은 결과를 보장하지 못하는 proxy rule로 금지하지 않는다. 가장 빠르고 싼 형태가 성공·실패 신호를 충실히 드러내는지를 판단한다.
- 사용자 질문은 답이 달라지면 산출물이 materially 달라지는 경우에만 한다.
- 새 규칙을 추가하기 전에 기존 canonical owner의 규칙을 치환하거나 validator로 옮길 수 있는지 확인한다.

## Progressive Disclosure

1. 모든 저작 작업은 이 파일만 공통으로 읽는다.
2. 대상 component의 명세 구간만 `agents-skills-spec.md`에서 읽는다.
3. provider 파일을 바꿀 때 선택한 provider 구간만 `references/provider-formats.md`에서 읽는다.
4. stage 경계나 설계 근거가 실제로 쟁점일 때만 `design-guide.md`의 관련 구간을 읽는다.
5. `stage_router`를 바꿀 때만 `routing-scenarios.md` 전체를 대조한다.
