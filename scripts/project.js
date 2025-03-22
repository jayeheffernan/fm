const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const cmd = process.argv[2];
const projectName =
  process.argv[3] || process.env.INIT_CWD.split(path.sep).pop();

const projectDir = path.resolve(
  path.join(__dirname, "..", "site", projectName),
);
const config = path.resolve(path.join(__dirname, "..", "vite.config.js"));

if (!fs.existsSync(projectDir)) {
  console.error(`Project ${projectName} does not exist`);
  process.exit(1);
}

process.env.PROJECT_NAME = projectName;

let vite = ["vite", "-c", config];

if (cmd === "build") {
  vite.push("build");
}

const proc = spawn("npx", vite, {
  stdio: "inherit",
  cwd: projectDir,
  env: { ...process.env },
});

proc.on("close", (code) => process.exit(code));
