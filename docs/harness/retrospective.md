# 하네스 회고 기록

이 파일은 게임 내용이 아니라 하네스 운영 중 반복된 마찰과 그에 따른 하네스 수정 이력을 남긴다. 형식은 한 줄씩 추가하며, 기존 줄은 수정하지 않는다.

형식: `YYYY-MM-DD | 마찰 — <반복 관찰된 문제 1줄> | 변경 — <어느 컴포넌트를 어떻게> | 이유 — <1줄>`

규칙: 같은 유형의 마찰이 2번 발생하면 실행 실수가 아니라 구조 결함으로 보고 해당 스킬/에이전트를 수정하며, 수정할 때 이 파일에 한 줄 append한다.

2026-06-10 | 마찰 — Windows checkout에서 .claude/skills 심링크가 텍스트 파일로 깨져 스킬 강제가 무력화 | 변경 — 심링크 → 실제 복사본 + verify 스크립트 + pre-commit 훅 | 이유 — 단일 소스의 이점보다 조용한 파손 위험이 큼
2026-06-10 | 마찰 — 대화형 역할(concept_interviewer, cycle_planner)이 서브에이전트라 실행 중 사용자 질문 불가, 왕복 마찰 | 변경 — 메인 루프 스킬 흐름으로 전환 | 이유 — 사용자 입력이 필요한 역할은 격리가 순손해
2026-06-10 | 마찰 — Tier 2 명세가 이후 확립된 원칙(대화형=메인 루프, 누적 파일=사용자 전용)과 충돌 | 변경 — playtest_recorder 메인루프화, learnings_accumulator·cycle-isolation 제외, vs-spec-template Tier 2 승격 | 이유 — 안 쓸 컴포넌트는 명세 오류라는 스펙 자체 규칙 적용
2026-06-10 | 마찰 — 하네스 개선 루프가 사람 기억 의존(1회차 마찰 기록처 없음, 수정 후 행동 검증 없음) | 변경 — frictions.md·routing-scenarios.md 신설, 피드백 질문·매핑표·spot test·유지보수 절차를 harness-subagents와 cycle_reviewer에 추가 | 이유 — two-strikes 카운트를 기억이 아닌 기록 기반으로 전환
2026-08-18 | 마찰 — 같은 런타임 규칙과 Stage 2 구현 proxy가 AGENTS/provider/agent/skill 및 여러 provider에서 반복 노출 | 변경 — core owner 매핑, modality-neutral disposable-prototype, 누적 Tier scaffold, authoring progressive disclosure로 치환 | 이유 — hard constraint는 보존하면서 중복 지침·불필요한 선택 후보·질문 turn을 줄임
2026-08-18 | 마찰 — 사용자 제공 수치가 제작 제약인지 미검증 목표·추정인지 일관되게 분류되지 않아 출처 태그 누락과 검증 수준 과장이 함께 발생 | 변경 — AGENTS의 짧은 근거 등급, 단계별 owning skill, assumptions/learnings, 3-provider scope_estimator에 관측·측정·제약·인용·목표·추정의 최소 계약을 동기화 | 이유 — 필요한 작업값은 보존하되 제약·인용·목표·추정을 이 게임의 검증 근거로 승격하지 않고 provider 프롬프트 중복도 피함
