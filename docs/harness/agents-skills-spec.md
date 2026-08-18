# 서브에이전트 & 스킬 명세서

> 하네스의 30+ 컴포넌트 명세. Tier 1(필수) → Tier 2(1차 확장) → Tier 3(필요시) 순.
> 하네스 참고 문서이며 게임 기획 산출물이나 런타임 규칙이 아닙니다. 새 에이전트/스킬을 만들거나 수정할 때만 참고합니다.

주의: 1회차 하네스 마찰은 `docs/harness/frictions.md`에 기록하고, two-strikes 수정 완료 이력은 `docs/harness/retrospective.md`에 기록한다.

주의: `stage_router` 분기를 변경할 때만 `docs/harness/routing-scenarios.md` 전체를 대조한다.

---

## Tier 1: 필수 (11개) — 첫 프로젝트 최소셋

### 메인 루프 스킬 흐름 2개

#### `concept_interviewer` (main-loop skill flow)
- **단계**: Stage 0
- **목적**: 메인 에이전트가 `pitch-one-pager` 스킬로 사용자와 인터뷰하여 1페이지 게임 컨셉 도출
- **입력**: 사용자 답변 (대화형)
- **산출**: `docs/game/0-pitch.md` (1p)
- **사용 스킬**: `pitch-one-pager`
- **호출 시점**: 새 프로젝트 시작 시
- **종료 조건**: 6개 섹션 모두 채워지고 사용자가 confirm

#### `cycle_planner` (main-loop skill flow)
- **단계**: Stage 2
- **목적**: 메인 에이전트가 `prototype-hypothesis` 스킬로 다음 사이클의 가설 1개와 최소 룰셋 설계
- **입력**: macro design + 이전 `learnings.md`
- **산출**: `prototypes/cycle-NN-<topic>/hypothesis.md` (1p)
- **사용 스킬**: `prototype-hypothesis`
- **호출 시점**: 새 사이클 시작 시
- **작성 전 질문**: 검증할 가설 또는 실패/성공 신호가 모호할 때만 메인 에이전트가 묶음 질문 (명확하면 질문 없이 진행, 모호한데 추측 금지)
- **원장 갱신**: 위험 선택 후 macro Top Risks의 해당 위험 Cycle=`cycle-NN-<topic>` 슬러그, Status=`testing` (그 두 칸만, 위험 텍스트 불가)
- **종료 조건**: 가설 1개 + 실패/성공 신호 + `Tests: R<N>` + `Prototype: <modality> — <reason>` + 원장 Status=testing

### 에이전트 4개

#### `macro_designer`
- **단계**: Stage 1
- **목적**: pitch를 기반으로 5페이지 macro design 작성
- **입력**: `0-pitch.md`
- **산출**: `docs/game/1-macro-design.md` (5p, 6섹션)
- **사용 스킬**: `macro-design-5p`, `forbidden-in-macro`
- **호출 시점**: Stage 0 완료 후
- **종료 조건**: 5p 캡 통과 + Stage 2 가설 추출 가능 검증

#### `prototype_coder`
- **단계**: Stage 2
- **목적**: 성공·실패 신호를 충실히 관측할 수 있는 가장 싼 disposable 테스트 제작
- **입력**: `hypothesis.md`의 `Tests:` / `Prototype:` 메타데이터와 신호
- **산출**: 선택 modality의 artifact 또는 setup + `iterations.md`
- **사용 스킬**: `disposable-prototype`
- **호출 시점**: 메인 에이전트의 `prototype-hypothesis` 흐름 완료 후
- **작성 전 질문**: 선택이 signal observability를 materially 바꿀 때만 짧은 묶음 질문을 반환하고 중단. 그 외에는 기록된 가설과 modality로 진행
- **반복 이력**: 테스트한 build/setup마다 `iterations.md`에 immutable `v<N>:` 한 줄을 추가하고, 테스트된 artifact는 modality에 맞는 가장 단순한 방식으로 보존
- **종료 조건**: 테스트가 실행 또는 재현 가능하고 두 신호가 관측 가능하며, build/setup이 기록되고 한국어 read-back·run/setup 안내·playtest 기록 안내가 반환됨

#### `cycle_reviewer`
- **단계**: Stage 2
- **목적**: 사이클 종료 시 다음 행동(진행/재시도/회귀/Kill) 권고
- **입력**: 사이클의 hypothesis + `prototypes/playtest.md` 또는 사용자 메시지의 playtest 결과 + (있으면) `iterations.md` 빌드 이력
- **산출**: 권고 메시지 (사용자 confirm 필수)
- **사용 스킬**: 없음 (judgment 중심)
- **호출 시점**: 사이클 플레이 종료 후
- **원장/기록 갱신(사용자 핸드오프)**: 게이트 전 `prototypes/playtest.md`에 Facts/Interpretations가 없으면 작성하고, macro Top Risks의 R<N> Status를 resolved(proceed)/testing(retry)/open(regress)/killed로 갱신 — reviewer는 읽기전용, 사용자가 작성
- **판단 기준**: 반복되고 관련성 높은 근거는 한 번의 결과보다 강하게 보되, 고정 횟수만으로 retry/regress/kill을 자동 결정하지 않음
- **종료 조건**: 4가지 옵션 중 1개 권고 + 근거 제시 + 핸드오프 체크리스트 제시

#### `stage_router`
- **단계**: Cross-stage
- **목적**: 현재 어느 단계 어느 사이클인지 추적, 다음 호출할 에이전트 결정
- **입력**: 프로젝트 파일 상태 + 사용자 의도
- **산출**: 다음 에이전트 추천 또는 게이트 안내
- **사용 스킬**: 없음
- **호출 시점**: 사용자가 의도 불명확하게 요청할 때
- **종료 조건**: 다음 행동 1개 명시. Optional Tier agent는 현재 provider 파일이 설치됐을 때만 이름으로 라우팅하고, 없으면 누적 Tier 설치 또는 수동 경로를 안내

### 스킬 5개

#### `pitch-one-pager`
- **단계**: Stage 0
- **목적**: 1페이지 pitch 형식 강제
- **강제 제약**:
  - 1페이지 캡 (초과 시 작성 거부)
  - 6섹션: 한 문장 / 타겟 / Why now / Pillars / References / Top Risks
- **검출/차단**: 수치, 공식, 시스템 상세, UI 설명
- **출력 형식**: 마크다운, 섹션당 ½페이지 이하

#### `macro-design-5p`
- **단계**: Stage 1
- **목적**: 6섹션 macro design 템플릿 + 5페이지 캡
- **강제 제약**:
  - 5페이지 절대 캡
  - 6섹션 순서: Pillars → Loop → Verbs → Macro Chart → References → Top Risks
  - 산문 최소화, 목록/표/다이어그램 우선
- **검출/차단**: 산문 단락이 3문장 초과 시 경고
- **출력 형식**: 마크다운 + Mermaid (Macro Chart)

#### `forbidden-in-macro`
- **단계**: Stage 1
- **목적**: macro design에서 금지 항목 자동 검출
- **강제 제약**: 다음 패턴 검출 시 차단
  - 구체 수치 (HP, damage, cost 등 단정 표현)
  - 공식 (`X = Y * Z` 형태)
  - 카드/적/보스의 구체 효과
  - UI 화면 설명
  - 기술 스택 결정
  - "이 문서가 결정하는 것/안 하는 것" 메타 섹션
- **검출/차단**: 정규식 + 키워드 매칭
- **출력 형식**: 검출 보고 + 수정 권고

#### `prototype-hypothesis`
- **단계**: Stage 2
- **목적**: 1 사이클 = 1 가설 형식 강제
- **강제 제약**:
  - 가설 *1개만* 작성 (다중 가설 차단)
  - 실패 신호와 성공 신호 둘 다 명시 필수
  - 가설 길이: 1~3 문장
- **검출/차단**: 접속사 자체가 아니라 독립적으로 판정해야 하는 claim이 둘 이상인지 의미로 판단
- **출력 형식**: `Tests:` / `Prototype:` 메타데이터 + 3섹션 (가설 / 실패 신호 / 성공 신호)

#### `disposable-prototype`
- **단계**: Stage 2
- **목적**: 성공·실패 신호에 가장 적합한 disposable modality 선택과 격리 강제
- **강제 제약**:
  - `Prototype:`에 기록된 가장 빠르고 싼 충실한 modality 사용; HTML/Python은 기본 선택지이지 allowlist가 아님
  - 모든 digital artifact/setup note는 cycle 디렉터리 안에 둠
  - `prototypes/`와 `game/` 사이 구현·asset·settings·architecture 공유/복사 금지
  - 한 가설만 구현하고 선택 modality를 Stage 3 기술 결정으로 취급하지 않음
  - 테스트한 build/setup을 immutable `v<N>:` 한 줄로 기록
- **플레이테스트 품질**: agent 설명 없이 실행/setup하고 결과를 인식할 수 있어야 하며 언어 자체를 검증하지 않으면 player-facing 문구는 한국어
- **출력 형식**: 선택된 artifact/setup + `iterations.md`

---

## Tier 2: 1차 확장 (7개) — 첫 프로젝트 중후반

### 메인 루프 스킬 흐름 1개

#### `playtest_recorder` → `playtest-log-template` 메인 루프 흐름
- **단계**: Stage 2
- **목적**: 플레이 후 사실/해석/결정 분리 인터뷰
- **실행 형태**: 서브에이전트가 아니라 메인 에이전트가 `playtest-log-template` 스킬로 직접 진행 (`concept_interviewer`와 같은 main-loop skill flow)
- **입력**: 사용자의 플레이 메모 + 대화
- **산출**: `prototypes/playtest.md`의 `## cycle-NN-<topic>` 아래 사용자 제공 내용만 append
- **호출 시점**: 사이클 플레이 종료 직후
- **종료 조건**: Facts / Interpretations / Decisions가 사용자 발화만으로 기록됨. 해석/결정 매핑이 materially 모호할 때만 초안을 반환하고 질문

### 서브에이전트 3개

#### `tech_decider`
- **단계**: Stage 3
- **목적**: Stage 2 발견 기반으로 엔진/스택 선택
- **입력**: `prototypes/learnings.md` + `docs/game/1-macro-design.md`
- **산출**: `docs/game/3-tech-decision.md` (1-2p)
- **사용 스킬**: `tech-decision-template`
- **호출 시점**: Stage 3 진입 첫 단계
- **종료 조건**: 결정 1개 + 근거(Stage 2 어느 발견) + 후보 비교 + 검증 방법 + 사용자 confirm 질문

#### `vs_spec_writer`
- **단계**: Stage 3
- **목적**: vertical slice 범위 한정 상세 명세
- **입력**: `docs/game/3-tech-decision.md` + `prototypes/learnings.md` + 있으면 art-direction
- **산출**: `docs/game/3-vertical-slice-spec.md` (10-15p)
- **사용 스킬**: `vs-spec-template`
- **호출 시점**: tech decision confirm 후 art direction이 confirm됐거나 텍스트/터미널 중심 게임이라 명시적으로 skip된 뒤. 아키텍처 스파이크는 수동 작업 또는 Tier 3 안내만
- **종료 조건**: VS 범위 내 + 모든 수치에 출처 명시 + 사용자 confirm 질문

#### `scope_estimator`
- **단계**: Stage 3
- **목적**: VS 제작 데이터로 전체 게임 비용/시간 추정
- **입력**: VS 제작 실측 데이터(제작 시간, 콘텐츠 수량 등) + 전체 게임 목표 수량
- **산출**: `docs/game/3-scope-estimate.md` (2-3p)
- **사용 스킬**: 없음 (계산 중심)
- **호출 시점**: VS 완성 직후, 메인 에이전트가 실측 데이터를 사용자와 선해소한 뒤
- **종료 조건**: 시간/비용 추정치 + 신뢰 구간 + 미측정 항목 표기 + Stage 3 게이트 질문

### 스킬 3개

#### `playtest-log-template` (구현됨)
- **단계**: Stage 2
- **목적**: Facts / Interpretations / Decisions 분리 강제
- **강제 제약**:
  - 메인 에이전트가 직접 짧게 인터뷰하고, 기록 요청과 매핑이 명확하면 append
  - 3섹션 명확히 분리
  - Facts에 추측 단어 금지 ("아마", "느낌", "보임", "같다", "듯", "probably", "seems", "feels")
  - Interpretations은 Facts와 별도 섹션
  - Decisions는 다음 사이클로 가져갈 행동 1-3개
  - `prototypes/learnings.md`와 `killed-hypotheses.md`는 쓰지 않음 (사용자 전용 handoff)
- **검출/차단**: Facts 섹션의 추측 표현, 사용자 발화에 없는 해석/결정 append
- **출력 형식**: `prototypes/playtest.md` 아래 마크다운 3섹션 append

#### `tech-decision-template` (구현됨)
- **단계**: Stage 3
- **목적**: 기술 결정의 근거를 Stage 2 발견과 연결 강제
- **강제 제약**:
  - `docs/game/3-tech-decision.md` 1-2p / 약 120줄
  - Decision / Rationale / Candidate Comparison / Validation Plan 4섹션
  - 결정 1개당 근거에 Stage 2 사이클 인덱스 1개 이상 인용
  - 후보 A/B/C trade-off 표 필수
  - 검증 방법 명시 필수
- **검출/차단**: 근거 없는 결정, Stage 2 proceed confirm 전 작성, VS 범위 밖 기술 결정
- **출력 형식**: 4섹션 기술 결정 문서

#### `vs-spec-template` (구현됨, Tier 3에서 Tier 2로 승격)
- **단계**: Stage 3
- **목적**: vertical slice 명세의 범위·출처 강제
- **강제 제약**:
  - `docs/game/3-vertical-slice-spec.md` 10-15p
  - 제작 품질과 비용을 검증할 수 있는 가장 작은 대표 end-to-end slice
  - 모든 수치/공식은 Stage 2 관측 또는 명시 레퍼런스 출처 필요
  - 메타 섹션 금지
- **검출/차단**: 모든 직업/전체 콘텐츠 매트릭스/장기 로드맵, 출처 없는 수치, Stage 4 detail docs
- **출력 형식**: VS 범위 한정 명세

---

## Tier 3: 필요시만 (추천 추가 순서대로)

> 첫 게임 프로젝트에서 *실제로 막힐 때* 하나씩 추가. 모두 한 번에 만들지 마세요.

### 에이전트

#### `macro_reviewer`
- **단계**: Stage 1
- **목적**: macro design의 5p 캡 + 가설 추출 가능성 자동 검증
- **입력**: `1-macro-design.md`
- **산출**: 통과/재작성 판정
- **추가 시점**: macro_designer가 자주 5p를 넘기거나 가설이 안 뽑힐 때

#### `decision_recorder` (구현됨)
- **단계**: Stage 4
- **목적**: VS에서 검증된 결정을 1-2p 문서로 정리 (호출당 시스템 1개)
- **입력**: VS 빌드 결과물 + `docs/game/3-vertical-slice-spec.md` + `prototypes/learnings.md` + Stage 3 gate(scope estimate confirm) 통과 확인
- **산출**: `docs/game/details/<slug>.md` (시스템당 1개, 1-2p)
- **사용 스킬**: `decision-record-1p`, `forbidden-meta-sections`
- **추가 시점**: Stage 4 진입 시 (= VS 완료 + scope estimate confirm 후)

#### `kill_arbiter` (구현됨)
- **단계**: Cross-stage
- **목적**: 각 단계 kill 조건 자동 검증, 사용자에게 kill/회귀/진행 OK 권고
- **입력**: 현재 단계 산출물 + `prototypes/learnings.md` + `prototypes/killed-hypotheses.md` + `prototypes/playtest.md` + macro Top Risks 원장 + (있으면) 각 사이클 `iterations.md`
- **산출**: 읽기 전용 권고 메시지 (진행 / 재시도 / 회귀 / kill 중 1개) + 보존/폐기 자산 목록
- **사용 스킬**: `kill-criteria`
- **추가 시점**: 사용자가 kill을 고민하거나 `cycle_reviewer`의 project-level 2차 의견이 필요할 때

#### `art_director` (구현됨)
- **단계**: Stage 3
- **목적**: 검증된 재미와 macro Pillar에 연결된 시각 방향 5페이지 작성
- **입력**: `docs/game/1-macro-design.md` + `prototypes/learnings.md` + (있으면) `docs/game/3-tech-decision.md` + 메인 에이전트가 선해소한 시각 선호(무드, 레퍼런스, 제작 제약)
- **산출**: `docs/game/3-art-direction.md` (5p)
- **사용 스킬**: `art-direction-5p`
- **추가 시점**: tech decision confirm 후, 시각 표현이 있는 게임에서 VS 명세 작성 전
- **종료 조건**: 6섹션 + Stage 2/macro 연결 + 완성 품질 샘플 1개 계획 + 사용자 confirm 질문

#### `architecture_designer`
- **단계**: Stage 3
- **목적**: VS 범위 한정 아키텍처 설계
- **입력**: tech-decision + VS 명세
- **산출**: `docs/game/3-architecture.md` (3-5p)
- **추가 시점**: 1인 개발이 아닐 때, 또는 협업자 합류 시

#### `assumption_separator`
- **단계**: 모든 단계
- **목적**: 미검증 가정을 본문에서 `assumptions.md`로 격리
- **입력**: 모든 작성 문서
- **산출**: `assumptions.md` 갱신
- **추가 시점**: 가정이 본문에 섞이기 시작할 때

### 스킬

#### `forbidden-meta-sections` (구현됨)
- **단계**: Stage 4
- **목적**: `docs/game/details/*.md`에서 "이 문서가 결정하는 것/안 하는 것/책임 경계" 메타 섹션 차단
- **강제 제약**: 한국어/영어 키워드 매칭으로 검출 즉시 차단, Pass/Block + 위반 줄 + 최소 수정안 출력
- **추가 시점**: Stage 4 진입 시

#### `decision-record-1p` (구현됨)
- **단계**: Stage 4
- **목적**: `docs/game/details/<slug>.md`의 1-2p 캡 + 검증 출처 강제
- **강제 제약**:
  - 시스템당 1-2페이지 캡, 호출당 시스템 1개
  - 모든 수치/공식에 출처 (`관측: cycle-NN-<topic>, ...`, `측정: VS, ...`, 또는 `인용: <명시 레퍼런스>, ...`) 필수
  - 메타 섹션 금지, 미검증 가정은 `prototypes/assumptions.md`로 이동 안내만
- **추가 시점**: Stage 4 진입 시

#### `kill-criteria` (구현됨)
- **단계**: Cross-stage
- **목적**: 각 단계의 kill/회귀 조건 명시 + 보존/폐기 자산 안내
- **강제 제약**: design-guide §6의 단계별 kill 조건 체크리스트만 사용, 증거 없는 kill 권고와 사용자 confirm 없는 kill 확정 차단
- **추가 시점**: Kill 판단이 흐려질 때

#### `art-direction-5p` (구현됨)
- **단계**: Stage 3
- **목적**: `docs/game/3-art-direction.md`의 5페이지 캡 + 검증된 재미 기반 시각 방향 강제
- **강제 제약**: 5페이지 캡, Visual Pillars / Color Palette / Typography And UI Tone / References / Style Rules / Sample Plan 6섹션, Visual Pillars는 Stage 2 학습과 macro Pillar 연결 필수, VS 전 완성 품질 샘플 1개 계획 필수
- **추가 시점**: 시각 표현이 있는 게임에서 tech decision confirm 후 VS 명세 작성 전

#### `assumption-tracker`
- **단계**: 모든 단계
- **목적**: 미검증 가정의 본문 진입 차단 + 별도 파일 관리
- **강제 제약**: "가정" / "추정" / "예상" 키워드 본문 발견 시 격리 권고
- **추가 시점**: assumption_separator 만들 때 같이

---

## 추가 권장 안 함 (현재 단계에서)

다음 항목들은 가이드 §7-8에 언급됐지만 *첫 프로젝트에는 필요 없음*. 두 번째 프로젝트 또는 출시 단계에서 검토:

**에이전트**:
- `concept_reviewer`, `risk_extractor` (간단한 검증은 사람이)
- `killed_recorder` (`cycle_reviewer`의 사용자 handoff로 충분)
- `learnings_accumulator` (추가 권장 안 함: `cycle_reviewer` 핸드오프의 누적 파일은 사용자 전용 작성(author-only) 설계와 충돌)
- `paper_proto_designer` (별도 agent는 불필요 — 필요하면 `disposable-prototype`이 tabletop modality를 선택)
- `tech_spike_runner`, `vs_builder`, `playtest_coordinator` (제작 활동 자체이지 자동화 대상 아님)
- `detail_reviewer` (`decision_recorder`로 통합 가능)
- `content_pipeline`, `balance_tuner`, `playtest_aggregator` (Stage 5 양산 시)
- `regression_handler`, `gate_validator` (`stage_router`로 통합 가능)

**스킬**:
- `concept-gate`, `pillars-vocabulary` (사람이 채우면 됨)
- `risk-to-hypothesis` (`prototype-hypothesis`로 통합 가능)
- `paper-prototype` (별도 skill은 불필요 — `disposable-prototype` modality로 통합)
- `cycle-review-criteria`, `learnings-format` (자유 형식 허용)
- `cycle-isolation` (추가 권장 안 함: production 격리는 `AGENTS.md`, cycle artifact 규칙은 `disposable-prototype`이 소유)
- `architecture-vs-scope`, `vs-only-validator`, `scope-estimate-method` (Stage 3 진입 시 결정)
- `content-batch-generation`, `telemetry-analysis`, `playtest-aggregation` (Stage 5 시)
- `stage-gate-validator`, `regression-protocol`, `verified-source-required` (다른 스킬에 흡수)
- `cerny-method-knowledge`, `prototype-best-practices` (도메인 지식은 가이드 문서 참조로 대체)

---

## 한눈에 보는 개수

| Tier | 에이전트 | 스킬 | 누계 |
|---|---|---|---|
| **Tier 1 (필수)** | 4 (+ main-loop skill flow 2) | 5 | **11** |
| **Tier 2 (1차 확장)** | 3 (+ main-loop skill flow 1) | 3 | **18** |
| **Tier 3 (partial)** | 3 구현 / 3 대기 | 4 구현 / 1 대기 | **25 구현 / 4 대기** |

**시작은 11개.** 기본 scaffold는 이 Tier 1 agent/skill만 노출하고, `--tier 2`와 `--tier 3`이 누적 확장합니다. 현재 Tier 3은 `decision_recorder`, `kill_arbiter`, `art_director`와 관련 스킬 4개가 구현됐고, 나머지는 트리거 대기입니다.

---

## 명세 작성 시 주의사항

각 component는 `docs/harness/core-contract.md`의 소유권을 지키며 다음만 포함:

1. **단일 책임**: 한 에이전트/스킬은 한 가지 일만
   - 실행 중 사용자 입력이 필요한 역할은 서브에이전트가 아니라 메인 루프 스킬 흐름으로 구현한다.
2. **Artifact skill**: 산출물 경로·형식·분량 cap·artifact-specific 차단·완료 조건
3. **Agent body**: 역할·필수 입력·정확한 출력·실제로 멈춰야 하는 조건
4. **Provider entry**: provider discovery와 메인 루프 경로만; `AGENTS.md` 규칙 재서술 금지
5. **Gemini 예외**: 자동 로드할 수 없는 skill의 최소 output contract를 한 번만 인라인

하네스 운영 중 반복 마찰은 `docs/harness/retrospective.md`에 기록하고, 같은 유형 2회 발생 시 담당 스킬/에이전트를 수정합니다.

같은 규칙이 두 계층에 있으면 누락이 아니라 소유권 위반입니다. canonical owner 한 곳만 고칩니다.
