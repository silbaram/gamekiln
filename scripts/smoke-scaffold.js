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

  const invalid = spawnSync(process.execPath, [CLI, path.join(tempRoot, "invalid"), "--tier", "4"]);
  assert.notStrictEqual(invalid.status, 0);

  console.log("Scaffold smoke passed: default Tier 1, cumulative Tier 2/3, and provider filtering.");
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
