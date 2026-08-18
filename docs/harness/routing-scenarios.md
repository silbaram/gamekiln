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
| 사용자-confirmed `risk-resolved` + Stage 2 근거가 더 필요한 core/high-impact Risk 있음 | 메인 에이전트가 `prototype-hypothesis` 스킬로 다음 Risk 계획 |
| 사용자-confirmed `risk-resolved` + 누적 근거가 Stage 3 투자를 정당화할 수 있음 + Stage 2 exit review 결과 없음 | 메인 에이전트가 Top Risks, learnings, playtest evidence, killed hypotheses를 종합하는 Stage 2 exit review |
| 사용자-confirmed `stage-3-ready` + Tier 2 agent 미설치 | 누적 `--tier 2` 설치 또는 수동 Stage 3 경로 중 하나 안내 |
| 사용자-confirmed `stage-3-ready` + Slice Goal/현재 Production Risk/다음 Playable Increment가 아직 없음 + VS spec agent 설치 | `vs_spec_writer`가 짧은 `3-vertical-slice-spec.md`를 seed |
| 현재 Playable Increment를 막는 미해결 기술 선택 + tech agent 설치 | `tech_decider` |
| 현재 Playable Increment를 막는 기술 실현 가능성 또는 구조 위험 | 해당 위험만 확인하는 ordinary spike/note를 안내; 새 상시 문서나 미설치 agent를 요구하지 않음 |
| 시각 방향/완성 품질 샘플이 현재 blocker + art agent 설치 | `art_director` |
| 시각 방향/완성 품질 샘플이 현재 blocker + art agent 미설치 | 누적 `--tier 3` 설치 또는 현재 증분에 한정한 수동 visual sample 경로 안내 |
| Slice Goal/현재 Risk/다음 Increment가 있고 제작을 막는 미해결 선택 없음 | 선택 tech/art/architecture 문서가 없어도 ordinary VS production 안내 |
| 증분 build/measurement 뒤 새 blocker 또는 다음 증분이 드러남 | `vs_spec_writer`로 현재 Risk와 다음 Increment를 갱신하거나, blocker를 직접 해소하는 조건부 agent/spike 중 하나만 안내 |
| 대표 VS build complete + measured production data + scope agent 설치 | `scope_estimator` |
| scope estimate 완료 + Stage 3 gate 사용자 confirm 없음 | Stage 3 gate 질문 제시: "Can this be finished, and at what cost?" |
| Stage 3 gate confirm + `3-scope-estimate.md` 또는 approved-scope basis 없음 | production plan을 seed하지 않고 `scope_estimator`로 누락된 추정 근거 생성 |
| Stage 3 gate confirm + production-plan skill 미설치 | 누적 `--tier 3` 설치 또는 현재 batch만 담는 수동 production plan 안내 |
| Stage 3 gate confirm + production-plan skill 설치 + `docs/game/production-plan.md` 없음 | 메인 에이전트가 `production-plan` 스킬로 현재 batch를 seed |
| production plan의 현재 batch가 VS-validated system 기록을 필요로 함 + decision agent 설치 | 해당 시스템 하나만 `decision_recorder` |
| 현재 batch의 build/품질/playtest 근거가 아직 없음 | 필요한 근거 하나를 만드는 ordinary production/QA/playtest 작업 |
| 현재 batch의 새 실측 근거가 있지만 production plan에 반영되지 않음 | 메인 에이전트가 `production-plan` 스킬로 estimate-versus-actual과 gate snapshot 갱신 |
| confirmed scope 또는 새 실측으로 기존 scope estimate가 stale | 기존 estimate를 plan에서 덮어쓰지 않고 `scope_estimator`로 재계산 |
| material scope expansion/cut 제안 + 사용자 confirm 없음 | plan에 proposed로만 남기고 사용자 확인 요청 |
| Stage 4–5에서 regression/kill 판단 필요 + arbiter 설치 | `kill_arbiter` |
| Stage 4–5 gate의 사용자-confirmed proceed | `production-plan`으로 다음 batch 또는 release review 설정 |
| Stage 4–5 gate의 사용자-confirmed retry | 같은 batch의 부족한 근거/품질/공정 작업으로 복귀 |
| Stage 4–5 gate의 사용자-confirmed regress | 근거가 깨진 Stage 3 산출물 또는 관련 Stage 4 decision으로 복귀 |
| Stage 2 사용자-confirmed retry | 같은 cycle의 `prototype_coder`로 복귀 |
| Stage 0–3 사용자-confirmed regress | 바꿔야 할 artifact에 따라 이전 단계 또는 현재 cycle planning으로 복귀 |
| 사용자-confirmed kill | 사용자가 새 방향을 선택할 때까지 routing 중지 |

## Near-miss

| 경계 사례 | 기대 동작 |
|---|---|
| pitch 파일은 있지만 사용자 confirm 기록이 대화에 없음 | `macro_designer`로 보내기 전에 confirm 여부를 먼저 물음 |
| playtest evidence가 사용자 메시지에만 있음 | `cycle_reviewer` 허용 + evidence source 한계 명시 |
| `Prototype: engine graybox`인데 HTML/Python 파일 없음 | `iterations.md`와 선택 artifact/setup을 기준으로 판단; 코드 파일명만으로 미완료 취급하지 않음 |
| `risk-resolved`만 확인됐는데 사용자가 Stage 3 진입을 요청 | Stage 3 컴포넌트로 보내지 말고 Stage 2 exit review를 먼저 안내 |
| 모든 Top Risk가 resolved지만 반대 신호/evidence gap 검토가 없음 | 자동 진입하지 말고 Stage 2 exit review를 안내 |
| 열린 Risk가 있지만 Vertical Slice로 미뤄도 된다는 근거가 있음 | 열린 Risk만으로 차단하지 말고 exit review에서 처리 시점의 타당성을 판단 |
| 성공 사이클이 여러 번이라는 이유만으로 Stage 3 진입을 요청 | 고정 횟수를 readiness로 취급하지 말고 누적 근거의 대표성·일관성을 검토 |
| `stage-3-ready` 권고처럼 보이나 사용자 confirm이 없음 | Stage 3 컴포넌트로 보내지 말고 사용자 confirm 요청 |
| scope estimate는 있지만 Stage 3 gate 사용자 confirm이 없음 | production plan이나 detail docs를 시작하지 않고 Stage 3 gate 질문 제시 |
| Stage 3 gate는 confirm됐지만 approved-scope basis가 없음 | 승인만으로 scope를 추정하지 않고 `scope_estimator` 입력/측정 gap을 보고 |
| reviewer가 retry를 권고했는데 사용자가 kill을 물어봄 | `kill_arbiter`로 2차 의견을 받되, 최종 결정은 사용자 confirm |
| `3-tech-decision.md`가 없지만 선택이 사용자 제약/기존 프로젝트로 확정됐고 기술 blocker도 없음 | 문서 생성을 요구하지 않고 다음 Increment 명세 또는 production으로 라우팅 |
| 시각 표현 게임이지만 최소 visual direction이 VS spec에 있고 시각 blocker가 없음 | `art_director`를 요구하지 않고 다음 Increment 명세 또는 production으로 라우팅 |
| `3-architecture.md`가 없지만 현재 증분을 막는 구조 위험이 없음 | 문서나 미설치 `architecture_designer`를 요구하지 않고 production으로 라우팅 |
| VS spec이 15페이지보다 짧음 | 현재 Increment를 제작·측정하기에 충분하면 분량을 채우게 하지 않음 |
| 실제 처리량이 VS estimate와 다름 | 고정 퍼센트로 자동 회귀하지 않고 현재 estimate 범위·품질·release 조건이 방어 가능한지 검토 |
| production plan이 다음 여러 batch의 상세 일정/전체 콘텐츠 매트릭스를 포함함 | 현재 batch 밖 상세를 제거하고 승인 scope 요약만 유지 |
| material scope cut이 제안됐지만 사용자 confirm이 없음 | 승인 scope에 적용하지 않고 `Scope Change` 제안으로만 기록 |
| approved scope 안에서 batch 순서만 바뀜 | material scope change confirm을 요구하지 않고 plan 갱신 허용 |
