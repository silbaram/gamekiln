#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const TIER1_SKILLS = [
  "dirty-code-html",
  "dirty-code-python",
  "forbidden-in-macro",
  "macro-design-5p",
  "pitch-one-pager",
  "prototype-hypothesis",
];

let failed = false;

function fail(message) {
  console.error(`FAIL: ${message}`);
  failed = true;
}

for (const skill of TIER1_SKILLS) {
  const canonicalDir = path.join(ROOT, ".agents", "skills", skill);
  const claudeDir = path.join(ROOT, ".claude", "skills", skill);
  const canonicalSkill = path.join(canonicalDir, "SKILL.md");
  const claudeSkill = path.join(claudeDir, "SKILL.md");

  if (!fs.existsSync(canonicalSkill)) {
    fail(`missing canonical skill: ${path.relative(ROOT, canonicalSkill)}`);
    continue;
  }
  if (!fs.existsSync(claudeSkill)) {
    fail(`missing Claude skill copy: ${path.relative(ROOT, claudeSkill)}`);
    continue;
  }
  if (fs.lstatSync(claudeDir).isSymbolicLink()) {
    fail(`Claude skill must be a real directory, not a symlink: ${path.relative(ROOT, claudeDir)}`);
    continue;
  }

  const canonical = fs.readFileSync(canonicalSkill, "utf8");
  const claude = fs.readFileSync(claudeSkill, "utf8");
  if (canonical !== claude) {
    fail(`Claude skill copy is out of sync: ${path.relative(ROOT, claudeSkill)}`);
  }
}

const unexpectedHarnessSkill = path.join(ROOT, ".claude", "skills", "harness-subagents");
if (fs.existsSync(unexpectedHarnessSkill)) {
  fail("harness-subagents is harness-authoring only and must not be installed under .claude/skills");
}

if (failed) {
  process.exit(1);
}

console.log("Claude Tier 1 skill copies are real directories and in sync.");
