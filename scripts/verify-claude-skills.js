#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const RUNTIME_SKILLS = [
  "dirty-code-html",
  "decision-record-1p",
  "dirty-code-python",
  "forbidden-in-macro",
  "forbidden-meta-sections",
  "macro-design-5p",
  "pitch-one-pager",
  "playtest-log-template",
  "prototype-hypothesis",
  "kill-criteria",
  "tech-decision-template",
  "vs-spec-template",
];
const AUTHORING_ONLY_SKILLS = ["harness-subagents"];
const CLAUDE_SKILL_COPIES = [...RUNTIME_SKILLS, ...AUTHORING_ONLY_SKILLS].sort();

let failed = false;

function fail(message) {
  console.error(`FAIL: ${message}`);
  failed = true;
}

function relative(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function assertRealDirectory(dirPath, label) {
  if (!fs.existsSync(dirPath)) {
    fail(`missing ${label}: ${relative(dirPath)}`);
    return false;
  }

  const stat = fs.lstatSync(dirPath);
  if (stat.isSymbolicLink()) {
    fail(`${label} must be a real directory, not a symlink: ${relative(dirPath)}`);
    return false;
  }
  if (!stat.isDirectory()) {
    fail(`${label} must be a directory: ${relative(dirPath)}`);
    return false;
  }

  return true;
}

function entryType(entry) {
  if (entry.isDirectory()) {
    return "directory";
  }
  if (entry.isFile()) {
    return "file";
  }
  if (entry.isSymbolicLink()) {
    return "symlink";
  }
  return "other";
}

function entriesByName(dirPath) {
  return new Map(
    fs.readdirSync(dirPath, { withFileTypes: true }).map((entry) => [entry.name, entry])
  );
}

function compareDirectories(canonicalDir, claudeDir, skill, subdir = "") {
  const canonicalCurrent = path.join(canonicalDir, subdir);
  const claudeCurrent = path.join(claudeDir, subdir);
  const canonicalEntries = entriesByName(canonicalCurrent);
  const claudeEntries = entriesByName(claudeCurrent);
  const entryNames = new Set([...canonicalEntries.keys(), ...claudeEntries.keys()]);

  for (const name of [...entryNames].sort()) {
    const canonicalEntry = canonicalEntries.get(name);
    const claudeEntry = claudeEntries.get(name);
    const childSubdir = path.join(subdir, name);
    const canonicalPath = path.join(canonicalDir, childSubdir);
    const claudePath = path.join(claudeDir, childSubdir);

    if (!canonicalEntry) {
      fail(`extra file in Claude skill copy (${skill}): ${relative(claudePath)}`);
      continue;
    }
    if (!claudeEntry) {
      fail(`missing file in Claude skill copy (${skill}): ${relative(claudePath)}`);
      continue;
    }

    const canonicalType = entryType(canonicalEntry);
    const claudeType = entryType(claudeEntry);
    if (canonicalType === "symlink" || claudeType === "symlink") {
      fail(`skill copies must not contain symlinks (${skill}): ${relative(claudePath)}`);
      continue;
    }
    if (canonicalType !== claudeType) {
      fail(
        `file type mismatch in Claude skill copy (${skill}): ${relative(claudePath)} ` +
          `(${canonicalType} != ${claudeType})`
      );
      continue;
    }

    if (canonicalType === "directory") {
      compareDirectories(canonicalDir, claudeDir, skill, childSubdir);
      continue;
    }

    if (canonicalType === "file") {
      const canonical = fs.readFileSync(canonicalPath);
      const claude = fs.readFileSync(claudePath);
      if (!canonical.equals(claude)) {
        fail(`Claude skill copy is out of sync (${skill}): ${relative(claudePath)}`);
      }
      continue;
    }

    fail(`unsupported file type in skill directory (${skill}): ${relative(claudePath)}`);
  }
}

for (const skill of CLAUDE_SKILL_COPIES) {
  const canonicalDir = path.join(ROOT, ".agents", "skills", skill);
  const claudeDir = path.join(ROOT, ".claude", "skills", skill);
  const canonicalSkill = path.join(canonicalDir, "SKILL.md");
  const claudeSkill = path.join(claudeDir, "SKILL.md");

  const canonicalOk = assertRealDirectory(canonicalDir, "canonical skill directory");
  const claudeOk = assertRealDirectory(claudeDir, "Claude skill copy");
  if (!canonicalOk || !claudeOk) {
    continue;
  }

  if (!fs.existsSync(canonicalSkill)) {
    fail(`missing canonical skill: ${relative(canonicalSkill)}`);
    continue;
  }
  if (!fs.existsSync(claudeSkill)) {
    fail(`missing Claude skill copy: ${relative(claudeSkill)}`);
    continue;
  }

  compareDirectories(canonicalDir, claudeDir, skill);
}

if (failed) {
  process.exit(1);
}

console.log(
  `Claude skill copies are real directories and in sync: ${CLAUDE_SKILL_COPIES.length} checked.`
);
