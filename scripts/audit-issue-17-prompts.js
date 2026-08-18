#!/usr/bin/env node

const assert = require("assert");
const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const BASELINE_REF = process.env.ISSUE17_BASELINE_REF || "main";

const TASKS = [
  {
    id: "macro-writing",
    context: ["AGENTS.md", "GEMINI.md", ".gemini/agents/macro-designer.md"],
    prompt: `A Stage 0 pitch is confirmed. It records these complete inputs:
- Pillars: deliberate risk, readable consequences, short repeatable runs
- Core loop: choose a route, resolve one encounter, take one consequence, repeat
- Character and verbs: one courier who moves, bargains, retreats, and commits cargo
- References: Into the Breach for consequence readability; FTL for route pressure
- Open design risks: whether cargo sacrifice creates meaningful tension; whether route previews support planning

Do not write files. Decide whether the macro draft can begin without clarification. Return only compact JSON with this shape:
{"action":"proceed|ask","questions":[],"planned_output":"...","guards":{"no_unverified_numbers":true,"no_auto_stage_advance":true}}`,
  },
  {
    id: "general-stage2-prototype",
    context: [
      "AGENTS.md",
      "CLAUDE.md",
      ".claude/agents/prototype-coder.md",
      ".claude/skills/dirty-code-html/SKILL.md|.claude/skills/disposable-prototype/SKILL.md",
      ".claude/skills/dirty-code-python/SKILL.md|-",
    ],
    prompt: `The confirmed cycle artifact contains:
Tests: R1 — cargo sacrifice must change the next encounter plan.
Prototype: browser page — a route choice and its next-encounter consequence are visible together.
Hypothesis: players can explain how sacrificing cargo changes their next route choice.
Failure Signal: players repeat a route but cannot explain the cargo trade-off.
Success Signal: players choose different routes and cite the cargo consequence.
Controls: mouse/touch buttons. End condition: choose one route and view its consequence. Starting state: three qualitative cargo cards, no numeric balance values. Screen contents: cargo, two routes, consequence preview, reset. Edge case: choosing with no cargo is disabled with a Korean explanation.

Do not write files. Decide whether building can begin. Return only compact JSON with this shape:
{"action":"proceed|ask|rewrite-modality","questions":[],"modality":"...","guards":{"no_invented_values":true,"prototype_isolated":true,"no_auto_stage_advance":true}}`,
  },
  {
    id: "control-physics-stage2-prototype",
    context: ["AGENTS.md", "GEMINI.md", ".gemini/agents/prototype-coder.md"],
    prompt: `The confirmed cycle artifact contains:
Tests: R2 — analog acceleration plus camera lag must make a heavy vehicle readable before collision.
Prototype: engine graybox — controller input, rigid-body collision, and frame-level camera response must be felt together and cannot be represented faithfully by a turn-based page.
Hypothesis: players anticipate the vehicle's stopping distance from acceleration and camera response.
Failure Signal: players repeatedly collide after saying the vehicle looked able to stop.
Success Signal: players release acceleration before the obstacle and explain the visual cue used.
Controls: left stick steer, right trigger accelerate, left trigger brake. End condition: stop before or collide with one obstacle. Starting values: use only engine defaults already recorded in the graybox project; do not tune or invent values. Screen contents: vehicle, obstacle, start/retry prompt. Edge case: controller disconnect pauses with a Korean reconnect message.

Do not write files. Decide whether building can begin. Return only compact JSON with this shape:
{"action":"proceed|ask|rewrite-modality","questions":[],"modality":"...","guards":{"no_invented_values":true,"prototype_isolated":true,"no_auto_stage_advance":true}}`,
  },
];

function git(...args) {
  const result = spawnSync("git", args, { cwd: ROOT, encoding: "utf8" });
  assert.strictEqual(result.status, 0, result.stderr || result.stdout);
  return result.stdout.trim();
}

function baselineFile(spec) {
  const [baselinePath, candidatePath] = spec.split("|");
  if (candidatePath === "-") {
    return git("show", `${BASELINE_REF}:${baselinePath}`);
  }
  return git("show", `${BASELINE_REF}:${baselinePath}`);
}

function candidateFile(spec) {
  const [baselinePath, candidatePath = baselinePath] = spec.split("|");
  if (candidatePath === "-") {
    return null;
  }
  return fs.readFileSync(path.join(ROOT, candidatePath), "utf8").trim();
}

function mergedContext(task, version) {
  const chunks = [];
  for (const spec of task.context) {
    const [baselinePath, candidatePath = baselinePath] = spec.split("|");
    const content = version === "before" ? baselineFile(spec) : candidateFile(spec);
    if (content === null) continue;
    const label = version === "before" ? baselinePath : candidatePath;
    chunks.push(`## ${label}\n\n${content}`);
  }
  return chunks.join("\n\n");
}

function parseJson(text) {
  const trimmed = text.trim().replace(/^```json\s*/i, "").replace(/\s*```$/, "");
  return JSON.parse(trimmed);
}

function runModel(task, version) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `gamekiln-issue17-${version}-`));
  try {
    fs.writeFileSync(path.join(tempDir, "AGENTS.md"), mergedContext(task, version));
    const result = spawnSync(
      "codex",
      [
        "exec",
        "--ephemeral",
        "--skip-git-repo-check",
        "--ignore-rules",
        "-s", "read-only",
        "-C", tempDir,
        "-c", 'model_reasoning_effort="low"',
        task.prompt,
      ],
      { cwd: tempDir, encoding: "utf8", maxBuffer: 1024 * 1024 * 4 }
    );
    assert.strictEqual(result.status, 0, result.stderr || result.stdout);
    const model = (result.stderr.match(/^model:\s*(.+)$/m) || [])[1] || "unknown";
    const tokens = Number((result.stderr.match(/^tokens used\s*\n([\d,]+)$/m) || [])[1]?.replaceAll(",", "")) || null;
    return { model, tokens, output: parseJson(result.stdout) };
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

const results = [];
for (const task of TASKS) {
  for (const version of ["before", "after"]) {
    process.stderr.write(`Running ${task.id} ${version}...\n`);
    results.push({ task: task.id, version, ...runModel(task, version) });
  }
}

function contextHash(version) {
  const hash = crypto.createHash("sha256");
  for (const task of TASKS) {
    hash.update(task.id);
    hash.update("\0");
    hash.update(mergedContext(task, version));
    hash.update("\0");
  }
  return hash.digest("hex");
}

console.log(JSON.stringify({
  baselineRef: BASELINE_REF,
  baselineCommit: git("rev-parse", BASELINE_REF),
  baselineContextHash: contextHash("before"),
  candidateBranch: git("branch", "--show-current"),
  candidateHead: git("rev-parse", "HEAD"),
  candidateContextHash: contextHash("after"),
  tasks: TASKS.map(({ id, prompt }) => ({ id, prompt })),
  results,
}, null, 2));
