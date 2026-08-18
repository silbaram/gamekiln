#!/usr/bin/env node

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { cumulativeComponents } = require("../lib/component-tiers");

const ROOT = path.resolve(__dirname, "..");
const AGENTS = cumulativeComponents("3", "agents").sort();
const CLAUDE_SKILLS = Object.freeze({
  "art-director": ["art-direction-5p"],
  "decision-recorder": ["decision-record-1p", "forbidden-meta-sections"],
  "kill-arbiter": ["kill-criteria"],
  "macro-designer": ["macro-design-5p", "forbidden-in-macro"],
  "prototype-coder": ["disposable-prototype"],
  "tech-decider": ["tech-decision-template"],
  "vs-spec-writer": ["vs-spec-template"],
});
const GEMINI_REQUIRED_CONTRACT_TERMS = Object.freeze({
  "kill-arbiter": [
    /At Stage 0,/,
    /At Stage 1,/,
    /At Stage 2,/,
    /At Stage 3,/,
    /return exactly one of proceed, retry, regression, or kill/,
    /At Stage 4-5, use proceed or retry; regression and kill do not apply/,
    /preserve learnings, killed hypotheses, and verified decisions/,
    /discard unverified assumptions, prototype code, and documents after the regression target/,
    /AGENTS\.md.*project-decision boundary/,
  ],
});

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function agentNames(provider, extension) {
  return fs.readdirSync(path.join(ROOT, `.${provider}`, "agents"))
    .filter((name) => name.endsWith(extension))
    .map((name) => name.slice(0, -extension.length))
    .sort();
}

function yamlValue(text, key) {
  const match = text.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return match && match[1].trim();
}

function yamlList(text, key) {
  const match = text.match(new RegExp(`^${key}:\\s*\\n((?:  - .+\\n?)*)`, "m"));
  return match ? match[1].trim().split(/\n/).map((line) => line.replace(/^\s*-\s*/, "")) : [];
}

assert.deepStrictEqual(agentNames("codex", ".toml"), AGENTS);
assert.deepStrictEqual(agentNames("claude", ".md"), AGENTS);
assert.deepStrictEqual(agentNames("gemini", ".md"), AGENTS);

for (const agent of AGENTS) {
  const snake = agent.replaceAll("-", "_");
  const codex = read(`.codex/agents/${agent}.toml`);
  const claude = read(`.claude/agents/${agent}.md`);
  const gemini = read(`.gemini/agents/${agent}.md`);

  assert.match(codex, new RegExp(`^name = "${snake}"$`, "m"));
  const codexDescription = codex.match(/^description = "(.+)"$/m);
  assert.ok(codexDescription);
  assert.match(codex, /developer_instructions = """[\s\S]+"""\s*$/);

  assert.strictEqual(yamlValue(claude, "name"), agent);
  assert.strictEqual(yamlValue(claude, "description"), codexDescription[1]);
  assert.ok(yamlValue(claude, "tools"));
  assert.ok(yamlValue(claude, "maxTurns"));
  assert.deepStrictEqual(yamlList(claude, "skills"), CLAUDE_SKILLS[agent] || []);

  assert.strictEqual(yamlValue(gemini, "name"), agent);
  assert.strictEqual(yamlValue(gemini, "description"), codexDescription[1]);
  assert.strictEqual(yamlValue(gemini, "kind"), "local");
  assert.ok(yamlValue(gemini, "max_turns"));
  assert.match(gemini, /^tools:\s*$/m);

  const inlinedContracts = gemini.match(/contract \(inlined\):/g) || [];
  const expectedContracts = (CLAUDE_SKILLS[agent] || []).length > 0 ? 1 : 0;
  assert.strictEqual(
    inlinedContracts.length,
    expectedContracts,
    `${agent}: expected ${expectedContracts} Gemini inlined contract, found ${inlinedContracts.length}`
  );

  for (const requiredTerm of GEMINI_REQUIRED_CONTRACT_TERMS[agent] || []) {
    assert.match(gemini, requiredTerm, `${agent}: incomplete Gemini inlined contract`);
  }

  for (const skill of CLAUDE_SKILLS[agent] || []) {
    assert.match(codex, new RegExp(skill), `${agent}: Codex body does not reference ${skill}`);
  }

  for (const body of [codex, claude, gemini]) {
    assert.doesNotMatch(body, /dirty-code-(?:html|python)/);
  }
}

console.log(`Provider definitions structurally valid and contract-linked: ${AGENTS.length} agents across Codex, Claude, and Gemini.`);
