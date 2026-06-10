# Stage Router 라우팅 시나리오

용도: `stage_router`를 수정할 때마다 이 표 전체를 대조한다. 상시 실행 테스트가 아니다.

갱신 규칙: 라우팅 분기를 추가하거나 변경했을 때만 행을 추가/수정한다.

## Should-route

| 파일/상태 조건 | 기대 라우팅 |
|---|---|
| `docs/game/0-pitch.md` 없음 | 메인 에이전트가 `pitch-one-pager` 스킬로 Stage 0 인터뷰 |
| pitch confirm 있음 + `docs/game/1-macro-design.md` 없음 | `macro_designer` |
| macro design confirm 있음 + active cycle 없음 | 메인 에이전트가 `prototype-hypothesis` 스킬로 다음 사이클 계획 |
| cycle hypothesis confirm 있음 + 사이클 디렉터리에 `prototype.py`/`prototype.html` 없음 | `prototype_coder` |
| prototype 있음 + `prototypes/playtest.md`, cycle-local playtest note, 사용자 메시지에 playtest evidence 없음 | 메인 에이전트가 `playtest-log-template` 스킬로 playtest 인터뷰 |
| hypothesis + playtest evidence 있음 | `cycle_reviewer` |
| 사용자-confirmed Stage 2 proceed + `docs/game/3-tech-decision.md` 없음 | `tech_decider` |
| tech decision confirm 있음 + `docs/game/3-vertical-slice-spec.md` 없음 | `vs_spec_writer`; architecture spike/art direction은 필요할 때만 수동/Tier 3 언급 |
| VS build complete + measured production data 있음 | `scope_estimator` |
| VS spec confirm 있음 + completed VS build 없음 | VS production은 자동 harness subagent가 아니라 ordinary coding work라고 설명 |
| scope estimate confirm 있음 | Stage 3 gate 질문 제시: "Can this be finished, and at what cost?"; Tier 3 `decision_recorder`는 아직 미설치라고 설명 |
| 사용자-confirmed retry | 같은 cycle의 `prototype_coder`로 복귀 |
| 사용자-confirmed regress | 바꿔야 할 artifact에 따라 `macro_designer` 또는 `prototype-hypothesis` planning으로 복귀 |
| 사용자-confirmed kill | 사용자가 새 방향을 선택할 때까지 routing 중지 |

## Near-miss

| 경계 사례 | 기대 동작 |
|---|---|
| pitch 파일은 있지만 사용자 confirm 기록이 대화에 없음 | `macro_designer`로 보내기 전에 confirm 여부를 먼저 물음 |
| playtest evidence가 사용자 메시지에만 있음 | `cycle_reviewer` 허용 + evidence source 한계 명시 |
| Stage 2 proceed처럼 보이나 사용자 confirm이 없음 | Stage 3 컴포넌트로 보내지 말고 proceed confirm 요청 |
