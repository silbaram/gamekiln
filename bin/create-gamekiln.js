#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const PACKAGE_ROOT = path.resolve(__dirname, "..");
const PROVIDERS = new Set(["all", "codex", "claude", "gemini"]);
const GENERATED_GITIGNORE_ENTRIES = [
  ".antigravitycli/",
  "node_modules/",
  "*.tgz",
];
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

function usage() {
  console.log(`Usage:
  create-gamekiln <project-dir> [--provider all|codex|claude|gemini]

Examples:
  create-gamekiln my-game
  create-gamekiln my-game --provider codex

Existing harness files in <project-dir> are updated in place. Project notes
such as prototype learnings are created only when missing.
`);
}

function parseArgs(argv) {
  const args = [...argv];
  let target = null;
  let provider = "all";

  while (args.length > 0) {
    const arg = args.shift();
    if (arg === "-h" || arg === "--help") {
      return { help: true };
    }
    if (arg === "--provider") {
      provider = args.shift();
      if (!provider) {
        throw new Error("--provider requires a value.");
      }
      continue;
    }
    if (arg.startsWith("--provider=")) {
      provider = arg.slice("--provider=".length);
      continue;
    }
    if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    }
    if (target) {
      throw new Error(`Unexpected extra argument: ${arg}`);
    }
    target = arg;
  }

  if (!target) {
    throw new Error("Missing project directory.");
  }
  if (!PROVIDERS.has(provider)) {
    throw new Error(`Invalid provider "${provider}". Use all, codex, claude, or gemini.`);
  }
  return { target, provider, help: false };
}

function ensureTargetDir(targetDir) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    return;
  }
  if (!fs.statSync(targetDir).isDirectory()) {
    throw new Error(`Target path is not a directory: ${targetDir}`);
  }
}

function copyPath(relativePath, targetRoot, options = {}) {
  const overwrite = options.overwrite ?? true;
  const src = path.join(PACKAGE_ROOT, relativePath);
  const dest = path.join(targetRoot, relativePath);
  if (!fs.existsSync(src)) {
    throw new Error(`Scaffold source is missing: ${relativePath}`);
  }
  if (!overwrite && fs.existsSync(dest)) {
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, {
    recursive: true,
    errorOnExist: false,
    force: overwrite,
    dereference: false,
  });
}

function copySourceToTarget(srcRelativePath, destAbsolutePath, options = {}) {
  const overwrite = options.overwrite ?? true;
  const src = path.join(PACKAGE_ROOT, srcRelativePath);
  if (!fs.existsSync(src)) {
    throw new Error(`Scaffold source is missing: ${srcRelativePath}`);
  }
  if (!overwrite && fs.existsSync(destAbsolutePath)) {
    return;
  }
  fs.mkdirSync(path.dirname(destAbsolutePath), { recursive: true });
  fs.cpSync(src, destAbsolutePath, {
    recursive: true,
    errorOnExist: false,
    force: overwrite,
    dereference: false,
  });
}

function writeGeneratedGitignore(targetRoot) {
  const gitignorePath = path.join(targetRoot, ".gitignore");
  const existing = fs.existsSync(gitignorePath)
    ? fs.readFileSync(gitignorePath, "utf8")
    : "";
  const existingLines = new Set(existing.split(/\r?\n/));
  const missing = GENERATED_GITIGNORE_ENTRIES.filter((entry) => !existingLines.has(entry));
  if (missing.length === 0) {
    return;
  }

  const prefix = existing.length > 0 && !existing.endsWith("\n") ? "\n" : "";
  const suffix = existing.length > 0 && !existing.endsWith("\n\n") ? "\n" : "";
  fs.writeFileSync(gitignorePath, `${existing}${prefix}${suffix}${missing.join("\n")}\n`);
}

function copyRuntimeSkills(targetRoot) {
  for (const skill of RUNTIME_SKILLS) {
    copySourceToTarget(
      path.join(".agents", "skills", skill),
      path.join(targetRoot, ".agents", "skills", skill)
    );
  }
}

function createClaudeSkillCopies(targetRoot) {
  const claudeSkillsDir = path.join(targetRoot, ".claude", "skills");
  fs.mkdirSync(claudeSkillsDir, { recursive: true });

  for (const skill of RUNTIME_SKILLS) {
    const skillPath = path.join(claudeSkillsDir, skill);
    fs.rmSync(skillPath, { recursive: true, force: true });
    copySourceToTarget(
      path.join(".agents", "skills", skill),
      skillPath
    );
  }
}

function providerEnabled(selected, provider) {
  return selected === "all" || selected === provider;
}

function scaffold({ target, provider }) {
  const targetRoot = path.resolve(process.cwd(), target);
  ensureTargetDir(targetRoot);

  copyPath("AGENTS.md", targetRoot);
  writeGeneratedGitignore(targetRoot);

  if (providerEnabled(provider, "claude")) {
    copyPath("CLAUDE.md", targetRoot);
  }
  if (providerEnabled(provider, "gemini")) {
    copyPath("GEMINI.md", targetRoot);
  }

  copyRuntimeSkills(targetRoot);
  copyPath(path.join("docs", "harness"), targetRoot);
  copyPath(path.join("docs", "decisions", ".gitkeep"), targetRoot, { overwrite: false });
  copyPath(path.join("docs", "game", "details", ".gitkeep"), targetRoot, { overwrite: false });
  copyPath(path.join("game", ".gitkeep"), targetRoot, { overwrite: false });
  copyPath(path.join("prototypes", "learnings.md"), targetRoot, { overwrite: false });
  copyPath(path.join("prototypes", "playtest.md"), targetRoot, { overwrite: false });
  copyPath(path.join("prototypes", "killed-hypotheses.md"), targetRoot, { overwrite: false });

  if (providerEnabled(provider, "codex")) {
    copyPath(".codex", targetRoot);
  }
  if (providerEnabled(provider, "claude")) {
    copyPath(path.join(".claude", "agents"), targetRoot);
    createClaudeSkillCopies(targetRoot);
  }
  if (providerEnabled(provider, "gemini")) {
    copyPath(".gemini", targetRoot);
  }

  console.log(`Created or updated Game Design Harness project at ${targetRoot}`);
  console.log(`Provider files: ${provider}`);
  console.log("Next: start Stage 0 in the main agent with the pitch-one-pager skill.");
}

function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    if (options.help) {
      usage();
      return;
    }
    scaffold(options);
  } catch (error) {
    console.error(`create-gamekiln: ${error.message}`);
    console.error("");
    usage();
    process.exitCode = 1;
  }
}

main();
