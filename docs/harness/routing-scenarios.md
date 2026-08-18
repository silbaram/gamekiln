# Stage Router 라우팅 시나리오

용도: `stage_router`를 수정할 때마다 이 표 전체를 대조한다. 상시 실행 테스트가 아니다.

갱신 규칙: 라우팅 분기를 추가하거나 변경했을 때만 행을 추가/수정한다.

## Should-route

| 파일/상태 조건 | 기대 라우팅 |
|---|---|
| `docs/game/0-pitch.md` 없음 | 메인 에이전트가 `pitch-one-pager` 스킬로 Stage 0 인터뷰 |
| pitch confirm 있음 + `docs/game/1-macro-design.md` 없음 | `macro_designer` |
| macro design confirm 있음 + active cycle 없음 | 메인 에이전트가 `prototype-hypothesis` 스킬로 다음 사이클 계획 |
| cycle hypothesis confirm 있음 + 선택 artifact/setup 또는 `iterations.md`의 현재 `v<N>:` 기록 없음 | `prototype_coder` |
| artifact/setup 기록 있음 + `prototypes/playtest.md`, cycle-local note, 사용자 메시지에 playtest evidence 없음 | 메인 에이전트가 Facts/Interpretations를 수집; `playtest-log-template`이 설치됐으면 사용 |
| 사용자가 kill을 고민함 / `cycle_reviewer`가 project-level 2차 의견을 권고 | 설치된 경우 `kill_arbiter`, 아니면 Tier 3 설치 또는 수동 검토 안내 |
| hypothesis + playtest evidence 있음 | `cycle_reviewer` |
| 사용자-confirmed Stage 2 proceed + Tier 2 agent 미설치 | 누적 `--tier 2` 설치 또는 수동 Stage 3 경로 중 하나 안내 |
| 사용자-confirmed Stage 2 proceed + Tier 2 agent 설치 + `docs/game/3-tech-decision.md` 없음 | `tech_decider` |
| tech decision confirm + 시각 표현 게임 + art agent 설치 + art direction 없음 | `art_director` |
| art direction confirm/skip + VS spec agent 설치 + VS spec 없음 | `vs_spec_writer` |
| VS build complete + measured production data + scope agent 설치 | `scope_estimator` |
| VS spec confirm 있음 + completed VS build 없음 | VS production은 자동 harness subagent가 아니라 ordinary coding work라고 설명 |
| scope estimate 완료 + Stage 3 gate 사용자 confirm 없음 | Stage 3 gate 질문 제시: "Can this be finished, and at what cost?" |
| scope estimate confirm 이후 Stage 3 gate 사용자 confirm + decision agent 설치 | 검증된 시스템별로 `decision_recorder` |
| Stage 3 gate confirm + Tier 3 agent 미설치 | 누적 `--tier 3` 설치 또는 수동 기록 안내 |
| 검증된 시스템의 detail docs가 충분히 기록됨 | Stage 5 production 지원은 미설치라고 안내 |
| 사용자-confirmed retry | 같은 cycle의 `prototype_coder`로 복귀 |
| 사용자-confirmed regress | 바꿔야 할 artifact에 따라 `macro_designer` 또는 `prototype-hypothesis` planning으로 복귀 |
| 사용자-confirmed kill | 사용자가 새 방향을 선택할 때까지 routing 중지 |

## Near-miss

| 경계 사례 | 기대 동작 |
|---|---|
| pitch 파일은 있지만 사용자 confirm 기록이 대화에 없음 | `macro_designer`로 보내기 전에 confirm 여부를 먼저 물음 |
| playtest evidence가 사용자 메시지에만 있음 | `cycle_reviewer` 허용 + evidence source 한계 명시 |
| `Prototype: engine graybox`인데 HTML/Python 파일 없음 | `iterations.md`와 선택 artifact/setup을 기준으로 판단; 코드 파일명만으로 미완료 취급하지 않음 |
| Stage 2 proceed처럼 보이나 사용자 confirm이 없음 | Stage 3 컴포넌트로 보내지 말고 proceed confirm 요청 |
| reviewer가 retry를 권고했는데 사용자가 kill을 물어봄 | `kill_arbiter`로 2차 의견을 받되, 최종 결정은 사용자 confirm |
| 텍스트/터미널 중심 게임에서 `art_director` 라우팅 조건처럼 보임 | art direction skip을 제안하고 `vs_spec_writer`로 라우팅 |
