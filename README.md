# GameKiln — AI 게임 디자인 하네스

GameKiln은 AI 코딩 어시스턴트를 위한 작고 단계적인 게임 디자인 하네스입니다. 기획 산출물을 짧게 유지하고, 세부 설계 전에 프로토타입 근거를 요구하며, Codex, Claude Code, Gemini CLI용 Tier 1 지원 파일을 함께 제공합니다.

이 패키지는 기본적으로 **Tier 1**만 스캐폴딩합니다. Tier 1은 대화형 피치/사이클 계획을 위한 메인 루프 스킬 플로와, 매크로 디자인, 일회용 프로토타입 코드, 근거 리뷰, 단계 라우팅을 맡는 자율 서브에이전트로 구성됩니다.

## 빠른 시작

```bash
# 이 저장소에서 실행
node bin/create-gamekiln.js ./my-game

# 특정 제공자 파일만 생성
node bin/create-gamekiln.js ./my-game --provider claude
node bin/create-gamekiln.js ./my-game --provider codex
node bin/create-gamekiln.js ./my-game --provider gemini
```

생성된 프로젝트는 같은 명령으로 제자리 업데이트할 수 있습니다. 프로토타입 학습 기록 같은 기존 프로젝트 노트는 없을 때만 생성됩니다.

## 스캐폴딩되는 항목

| 경로 | 용도 |
| --- | --- |
| `AGENTS.md` | 제공자들이 공유하는 런타임 하네스 규칙입니다. |
| `CLAUDE.md`, `GEMINI.md` | 해당 제공자를 활성화했을 때 포함되는 제공자별 진입 안내입니다. |
| `.codex/agents/` | `macro_designer`, `prototype_coder`, `cycle_reviewer`, `stage_router` 자율 Tier 1 역할을 위한 Codex 커스텀 에이전트입니다. |
| `.claude/agents/` | 같은 네 가지 자율 Tier 1 역할을 위한 Claude Code 서브에이전트입니다. |
| `.claude/skills/` | Windows 체크아웃에서도 안전하도록 심볼릭 링크가 아닌 실제 복사본으로 둔 Tier 1 스킬 디렉터리입니다. |
| `.gemini/agents/` | 같은 네 가지 자율 Tier 1 역할을 위한 Gemini CLI 에이전트입니다. Gemini가 스킬을 자동 로드하지 못하는 부분은 핵심 규칙을 인라인합니다. |
| `.agents/skills/` | `pitch-one-pager`, `prototype-hypothesis` 같은 메인 루프 플로를 포함한 정식 Tier 1 스킬 원본입니다. |
| `docs/harness/` | 하네스 저작자를 위한 참고 문서입니다. 일반 런타임 작업에는 필수가 아닙니다. |
| `docs/game/` | Stage 0/1/3+ 게임 디자인 산출물 위치입니다. |
| `prototypes/` | Stage 2 사이클 폴더와 누적 `learnings.md`, `playtest.md`, `killed-hypotheses.md` 파일입니다. |
| `game/` | 프로토타입 근거가 정당화한 뒤 사용하는 프로덕션 게임 코드 위치입니다. |

## 메인 루프 스킬과 서브에이전트

Tier 1은 실행 중 사용자 입력이 필요한지에 따라 역할을 의도적으로 나눕니다.

| 구성 요소 | 실행 형태 | 이유 |
| --- | --- | --- |
| Stage 0 피치 인터뷰 | 메인 에이전트 + `pitch-one-pager` 스킬 | 인터뷰는 사용자와 직접 주고받는 과정이 필요합니다. |
| Stage 1 매크로 디자인 | `macro_designer` 서브에이전트 | 이미 존재하는 피치 산출물을 바탕으로, 중간 사용자 입력 없이 초안을 작성합니다. |
| Stage 2 사이클 계획 | 메인 에이전트 + `prototype-hypothesis` 스킬 | 가설과 성공/실패 신호는 사용자 확인이 필요할 수 있습니다. |
| Stage 2 프로토타입 코딩 | `prototype_coder` 서브에이전트 | 메인 에이전트가 빌드 차단 질문을 해결한 뒤 확정된 가설에서 프로토타입을 만듭니다. |
| Stage 2 리뷰 게이트 | `cycle_reviewer` 서브에이전트 | 기록된 근거를 검토하고 proceed/retry/regress/kill 중 하나를 추천합니다. |
| 단계 라우팅 | `stage_router` 서브에이전트 | 프로젝트 상태를 읽고 다음 구성 요소나 게이트 하나를 추천합니다. |

스캐폴드에는 `concept-interviewer`나 `cycle-planner` 제공자 서브에이전트 파일이 없습니다. 이 역할들은 위의 두 메인 루프 스킬로 표현됩니다.

## Tier 1 흐름

1. **Stage 0 — 피치**: 메인 에이전트가 `pitch-one-pager` 스킬로 Stage 0 인터뷰를 진행하고, 한 페이지 여섯 섹션 형식의 `docs/game/0-pitch.md`를 만듭니다.
2. **Stage 1 — 매크로 디자인**: `macro_designer`가 다섯 페이지 제한 안에서 `docs/game/1-macro-design.md`를 만들고 Top Risks를 추출합니다.
3. **Stage 2 — 사이클 계획**: 메인 에이전트가 `prototype-hypothesis` 스킬로 다음 사이클을 계획하고, `Tests: R<N>` 리스크 앵커가 있는 `prototypes/cycle-NN-<topic>/hypothesis.md` 하나를 만듭니다.
4. **Stage 2 — 일회용 프로토타입**: `prototype_coder`가 해당 사이클 폴더 안에만 자체 완결형 `prototype.html` 또는 `prototype.py` 하나를 만듭니다.
5. **Stage 2 — 플레이테스트 근거**: 플레이 후 관찰을 `prototypes/playtest.md`에 Facts와 Interpretations로 분리해 기록합니다.
6. **Stage 2 — 리뷰 게이트**: `cycle_reviewer`가 proceed, retry, regress, kill 중 정확히 하나를 추천합니다. 사용자가 게이트를 확정합니다.
7. **라우팅**: `stage_router`가 파일을 확인하고 단계를 자동 진행하지 않은 채 다음 구성 요소나 게이트 하나를 추천합니다.

사용자 확인 없이 단계를 진행하거나, 프로젝트를 종료하거나, 범위를 확장하지 마세요.

## Claude 스킬은 Windows 안전 복사본입니다

Claude Code는 `.claude/skills/<skill>/SKILL.md`에서 스킬을 로드합니다. 과거의 심볼릭 링크 기반 레이아웃은 Git의 심볼릭 링크 지원이 꺼진 Windows 체크아웃에서 작은 텍스트 파일로 바뀌어 스킬 프리로드가 조용히 비활성화될 수 있습니다.

GameKiln은 이제 이 저작 저장소에서 로드되어야 하는 Claude 스킬을 실제 복사 디렉터리로 둡니다.

- `dirty-code-html`
- `dirty-code-python`
- `forbidden-in-macro`
- `harness-subagents`(저작 저장소 전용)
- `macro-design-5p`
- `pitch-one-pager`
- `prototype-hypothesis`

`harness-subagents`는 일반 게임 프로젝트로 스캐폴딩되지 않습니다. 이 스킬은 하네스 자체를 저작하고 리뷰하기 위한 것입니다. 스캐폴더는 새 프로젝트에 여섯 개 Tier 1 런타임 스킬만 복사합니다.

로컬 Claude 스킬 복사본은 다음 명령으로 검증합니다.

```bash
npm run verify:claude-skills
```

검증기는 Claude 스킬 복사본이 누락되었거나, 심볼릭 링크이거나, 내부에 심볼릭 링크를 포함하거나, 정식 `.agents/skills/` 디렉터리와 다르면 실패합니다.

## 서브에이전트 질문 핸드오프

제공자 서브에이전트는 격리된 컨텍스트에서 실행될 수 있고, 실행 중 사용자에게 후속 질문을 직접 하지 못할 수 있습니다. 그래서 대화형 역할은 메인 루프에 남기고, 나머지 서브에이전트는 다음 핸드오프 패턴을 사용합니다.

1. 필수 입력이 없으면 서브에이전트는 짧게 묶은 질문 목록만 반환하고 멈춥니다.
2. 메인 에이전트가 사용자에게 질문하고 답을 모읍니다.
3. 메인 에이전트가 답변과 관련 산출물 경로를 함께 넣어 서브에이전트를 다시 호출합니다.
4. 서브에이전트는 기록된 산출물과 명시된 답변을 바탕으로 이어서 진행합니다.

에이전트는 핸드오프를 피하려고 조작법, 승패 조건, 공식, 밸런스 값, 기타 빌드에 영향을 주는 세부사항을 지어내면 안 됩니다.

## Stage 2 플레이테스트 근거

Tier 1에는 가벼운 근거 로그인 `prototypes/playtest.md`가 포함됩니다. 사실과 해석을 분리해 기록하세요.

```markdown
## cycle-01-example
Facts:
- <플레이 중 실제로 일어난 일. 추측 금지.>
Interpretations:
- <그 사실이 다음 결정에 시사하는 점.>
```

`cycle_reviewer`는 현재 가설과 플레이테스트 근거를 읽습니다. 근거가 사용자 메시지에만 있다면 사용할 수 있지만, 그 제한을 명시해야 합니다.

## Top Risks 장부

`docs/game/1-macro-design.md`는 `Risk ID`, `Risk`, `Why It Matters`, `Cycle`, `Status` 열을 가진 살아 있는 Top Risks 표를 유지합니다.

규칙:

- Stage 1은 안정적인 `R1`, `R2`, `R3` 행으로 시작합니다.
- 새 Stage 2 리스크는 `R4`, `R5`처럼 뒤에만 추가합니다.
- 기존 Risk ID를 재사용하지 않습니다.
- Stage 1 이후 기존 리스크 문구를 다시 쓰지 않습니다. `Cycle`과 `Status`만 바꿉니다.
- 여러 사이클이 같은 리스크를 테스트하면 `Cycle`은 가장 최근 사이클 슬러그를 뜻합니다.
- `Status`는 `open`, `testing`, `resolved`, `killed` 중 하나입니다.

## 개발 확인

```bash
npm run verify:claude-skills
npm run smoke
npm pack --dry-run
```

`npm run smoke`는 모든 제공자 파일을 포함한 `./tmp-smoke`를 크로스 플랫폼 상대 경로로 스캐폴딩합니다. 필요하면 확인 후 디렉터리를 삭제하세요.

`.agents/skills/`를 수정할 때는 커밋 전에 `.claude/skills/` 아래의 대응되는 실제 디렉터리 복사본도 다시 동기화하세요.
pre-commit 훅을 활성화하려면 `npm install`을 실행하거나, `git config core.hooksPath .githooks`로 직접 설정하세요.

## 하네스 저작 참고

런타임 규칙은 `AGENTS.md`, 제공자 에이전트 본문, `SKILL.md` 파일에 있습니다. `docs/harness/` 아래 파일은 설계 근거와 더 큰 에이전트/스킬 명단을 설명하지만, 일반 게임 기획 작업은 Tier 1에서 시작해야 하며 참고 문서를 읽을 필요가 없어야 합니다.

하네스 에이전트와 스킬을 만들거나 업데이트하거나 리뷰할 때는 `docs/harness/design-guide.md`, `docs/harness/agents-skills-spec.md`, `.agents/skills/harness-subagents/references/provider-formats.md`를 사용하세요.
