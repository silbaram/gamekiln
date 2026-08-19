#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { cumulativeComponents } = require("../lib/component-tiers");

const PACKAGE_ROOT = path.resolve(__dirname, "..");
const PROVIDERS = new Set(["all", "codex", "claude", "gemini"]);
const TIERS = new Set(["1", "2", "3"]);
const GENERATED_GITIGNORE_ENTRIES = [
  ".antigravitycli/",
  "node_modules/",
  "*.tgz",
];
function usage() {
  console.log(`Usage:
  create-gamekiln <project-dir> [--provider all|codex|claude|gemini] [--tier 1|2|3]

Examples:
  create-gamekiln my-game
  create-gamekiln my-game --provider codex --tier 2

Tier 1 is the default. Higher tiers include all lower-tier components.
This command does not migrate projects created by older releases.
Project notes are created only when missing.
`);
}

function parseArgs(argv) {
  const args = [...argv];
  let target = null;
  let provider = "all";
  let tier = "1";

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
    if (arg === "--tier") {
      tier = args.shift();
      if (!tier) {
        throw new Error("--tier requires a value.");
      }
      continue;
    }
    if (arg.startsWith("--tier=")) {
      tier = arg.slice("--tier=".length);
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
  if (!TIERS.has(tier)) {
    throw new Error(`Invalid tier "${tier}". Use 1, 2, or 3.`);
  }
  return { target, provider, tier, help: false };
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

function copyRuntimeSkills(targetRoot, skills) {
  for (const skill of skills) {
    copySourceToTarget(
      path.join(".agents", "skills", skill),
      path.join(targetRoot, ".agents", "skills", skill)
    );
  }
}

function createClaudeSkillCopies(targetRoot, skills) {
  const claudeSkillsDir = path.join(targetRoot, ".claude", "skills");
  fs.mkdirSync(claudeSkillsDir, { recursive: true });

  for (const skill of skills) {
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

function copyProviderAgents(provider, targetRoot, agents) {
  for (const agent of agents) {
    const extension = provider === "codex" ? ".toml" : ".md";
    copyPath(path.join(`.${provider}`, "agents", `${agent}${extension}`), targetRoot);
  }
}

function scaffold({ target, provider, tier }) {
  const targetRoot = path.resolve(process.cwd(), target);
  const agents = cumulativeComponents(tier, "agents");
  const skills = cumulativeComponents(tier, "skills");
  ensureTargetDir(targetRoot);

  copyPath("AGENTS.md", targetRoot);
  writeGeneratedGitignore(targetRoot);

  if (providerEnabled(provider, "claude")) {
    copyPath("CLAUDE.md", targetRoot);
  }
  if (providerEnabled(provider, "gemini")) {
    copyPath("GEMINI.md", targetRoot);
  }

  copyRuntimeSkills(targetRoot, skills);
  copyPath(path.join("docs", "harness"), targetRoot);
  copyPath(path.join("docs", "decisions", ".gitkeep"), targetRoot, { overwrite: false });
  copyPath(path.join("docs", "game", "details", ".gitkeep"), targetRoot, { overwrite: false });
  copyPath(path.join("docs", "game", "specs", ".gitkeep"), targetRoot, { overwrite: false });
  copyPath(path.join("game", ".gitkeep"), targetRoot, { overwrite: false });
  copyPath(path.join("prototypes", "learnings.md"), targetRoot, { overwrite: false });
  copyPath(path.join("prototypes", "assumptions.md"), targetRoot, { overwrite: false });
  copyPath(path.join("prototypes", "playtest.md"), targetRoot, { overwrite: false });
  copyPath(path.join("prototypes", "killed-hypotheses.md"), targetRoot, { overwrite: false });

  if (providerEnabled(provider, "codex")) {
    copyPath(path.join(".codex", "config.toml"), targetRoot);
    copyProviderAgents("codex", targetRoot, agents);
  }
  if (providerEnabled(provider, "claude")) {
    copyProviderAgents("claude", targetRoot, agents);
    createClaudeSkillCopies(targetRoot, skills);
  }
  if (providerEnabled(provider, "gemini")) {
    copyProviderAgents("gemini", targetRoot, agents);
  }

  console.log(`Created or updated Game Design Harness project at ${targetRoot}`);
  console.log(`Provider files: ${provider}`);
  console.log(`Components: cumulative Tier ${tier} (${agents.length} agents, ${skills.length} skills)`);
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
