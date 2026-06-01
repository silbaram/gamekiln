#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const PACKAGE_ROOT = path.resolve(__dirname, "..");
const PROVIDERS = new Set(["all", "codex", "claude", "gemini"]);
const TIER1_CLAUDE_SKILLS = [
  "dirty-code-html",
  "dirty-code-python",
  "forbidden-in-macro",
  "macro-design-5p",
  "pitch-one-pager",
  "prototype-hypothesis",
];

function usage() {
  console.log(`Usage:
  create-gamekiln <project-dir> [--provider all|codex|claude|gemini]

Examples:
  create-gamekiln my-game
  create-gamekiln my-game --provider codex
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

function ensureEmptyTarget(targetDir) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    return;
  }
  const entries = fs.readdirSync(targetDir);
  if (entries.length > 0) {
    throw new Error(`Target directory is not empty: ${targetDir}`);
  }
}

function copyPath(relativePath, targetRoot) {
  const src = path.join(PACKAGE_ROOT, relativePath);
  const dest = path.join(targetRoot, relativePath);
  if (!fs.existsSync(src)) {
    throw new Error(`Scaffold source is missing: ${relativePath}`);
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, {
    recursive: true,
    errorOnExist: true,
    force: false,
    dereference: false,
  });
}

function copySourceToTarget(srcRelativePath, destAbsolutePath) {
  const src = path.join(PACKAGE_ROOT, srcRelativePath);
  if (!fs.existsSync(src)) {
    throw new Error(`Scaffold source is missing: ${srcRelativePath}`);
  }
  fs.mkdirSync(path.dirname(destAbsolutePath), { recursive: true });
  fs.cpSync(src, destAbsolutePath, {
    recursive: true,
    errorOnExist: true,
    force: false,
    dereference: false,
  });
}

function writeGeneratedGitignore(targetRoot) {
  const content = [
    ".antigravitycli/",
    "node_modules/",
    "*.tgz",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(targetRoot, ".gitignore"), content, { flag: "wx" });
}

function createClaudeSkillLinks(targetRoot) {
  const claudeSkillsDir = path.join(targetRoot, ".claude", "skills");
  fs.mkdirSync(claudeSkillsDir, { recursive: true });

  for (const skill of TIER1_CLAUDE_SKILLS) {
    const linkPath = path.join(claudeSkillsDir, skill);
    const linkTarget = path.join("..", "..", ".agents", "skills", skill);
    try {
      fs.symlinkSync(linkTarget, linkPath, "dir");
    } catch (error) {
      if (error.code !== "EPERM" && error.code !== "EACCES") {
        throw error;
      }
      copySourceToTarget(
        path.join(".agents", "skills", skill),
        path.join(claudeSkillsDir, skill)
      );
    }
  }
}

function providerEnabled(selected, provider) {
  return selected === "all" || selected === provider;
}

function scaffold({ target, provider }) {
  const targetRoot = path.resolve(process.cwd(), target);
  ensureEmptyTarget(targetRoot);

  copyPath("AGENTS.md", targetRoot);
  writeGeneratedGitignore(targetRoot);

  if (providerEnabled(provider, "claude")) {
    copyPath("CLAUDE.md", targetRoot);
  }
  if (providerEnabled(provider, "gemini")) {
    copyPath("GEMINI.md", targetRoot);
  }

  copyPath(path.join(".agents", "skills"), targetRoot);
  copyPath(path.join("docs", "harness"), targetRoot);
  copyPath(path.join("docs", "decisions", ".gitkeep"), targetRoot);
  copyPath(path.join("docs", "game", "details", ".gitkeep"), targetRoot);
  copyPath(path.join("game", ".gitkeep"), targetRoot);
  copyPath(path.join("prototypes", "learnings.md"), targetRoot);
  copyPath(path.join("prototypes", "killed-hypotheses.md"), targetRoot);

  if (providerEnabled(provider, "codex")) {
    copyPath(".codex", targetRoot);
  }
  if (providerEnabled(provider, "claude")) {
    copyPath(path.join(".claude", "agents"), targetRoot);
    createClaudeSkillLinks(targetRoot);
  }
  if (providerEnabled(provider, "gemini")) {
    copyPath(".gemini", targetRoot);
  }

  console.log(`Created Game Design Harness v2 project at ${targetRoot}`);
  console.log(`Provider files: ${provider}`);
  console.log("Next: start Stage 0 with concept_interviewer.");
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
