#!/usr/bin/env node

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const { cumulativeComponents } = require("../lib/component-tiers");

const ROOT = path.resolve(__dirname, "..");
const CLI = path.join(ROOT, "bin", "create-gamekiln.js");
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "gamekiln-smoke-"));
const EXPECTED_CUMULATIVE_COUNTS = Object.freeze({
  1: Object.freeze({ agents: 4, skills: 5 }),
  2: Object.freeze({ agents: 7, skills: 9 }),
  3: Object.freeze({ agents: 11, skills: 15 }),
});

function namesIn(dir, extension) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => extension ? entry.isFile() && entry.name.endsWith(extension) : entry.isDirectory())
    .map((entry) => extension ? entry.name.slice(0, -extension.length) : entry.name)
    .sort();
}

function scaffold(name, args) {
  const target = path.join(tempRoot, name);
  runScaffold(target, args);
  return target;
}

function runScaffold(target, args) {
  const result = spawnSync(process.execPath, [CLI, target, ...args], {
    cwd: ROOT,
    encoding: "utf8",
  });
  assert.strictEqual(result.status, 0, result.stderr || result.stdout);
}

function assertTier(target, tier, providers) {
  const expectedAgents = cumulativeComponents(tier, "agents").sort();
  const expectedSkills = cumulativeComponents(tier, "skills").sort();
  const expectedCounts = EXPECTED_CUMULATIVE_COUNTS[tier];

  assert.strictEqual(expectedAgents.length, expectedCounts.agents);
  assert.strictEqual(expectedSkills.length, expectedCounts.skills);

  assert.deepStrictEqual(namesIn(path.join(target, ".agents", "skills"), ""), expectedSkills);

  for (const provider of ["codex", "claude", "gemini"]) {
    const extension = provider === "codex" ? ".toml" : ".md";
    const actual = namesIn(path.join(target, `.${provider}`, "agents"), extension);
    assert.deepStrictEqual(actual, providers.includes(provider) ? expectedAgents : []);
  }

  const claudeSkills = namesIn(path.join(target, ".claude", "skills"), "");
  assert.deepStrictEqual(claudeSkills, providers.includes("claude") ? expectedSkills : []);
}

try {
  const tier1 = scaffold("tier1-default", []);
  assertTier(tier1, "1", ["codex", "claude", "gemini"]);

  const tier2 = scaffold("tier2-codex", ["--provider", "codex", "--tier", "2"]);
  assertTier(tier2, "2", ["codex"]);

  const tier3 = scaffold("tier3-all", ["--tier=3"]);
  assertTier(tier3, "3", ["codex", "claude", "gemini"]);
  for (const skillPath of [
    path.join(tier3, ".agents", "skills", "feature-spec", "SKILL.md"),
    path.join(tier3, ".claude", "skills", "feature-spec", "SKILL.md"),
    path.join(tier3, ".agents", "skills", "production-plan", "SKILL.md"),
    path.join(tier3, ".claude", "skills", "production-plan", "SKILL.md"),
  ]) {
    assert.ok(fs.existsSync(skillPath), `missing Tier 3 skill: ${skillPath}`);
  }
  assert.ok(
    fs.existsSync(path.join(tier3, "docs", "game", "specs", ".gitkeep")),
    "missing specs output directory"
  );
  assert.match(
    fs.readFileSync(path.join(tier3, "CLAUDE.md"), "utf8"),
    /\.claude\/skills\/production-plan\/SKILL\.md/
  );
  assert.match(
    fs.readFileSync(path.join(tier3, "GEMINI.md"), "utf8"),
    /\.agents\/skills\/production-plan\/SKILL\.md/
  );

  const invalid = spawnSync(process.execPath, [CLI, path.join(tempRoot, "invalid"), "--tier", "4"]);
  assert.notStrictEqual(invalid.status, 0);

  console.log("Scaffold smoke passed: default Tier 1, cumulative Tier 2/3, and provider filtering.");
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
