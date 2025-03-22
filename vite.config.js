import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, join } from "path";

export default defineConfig(({ command, mode }) => {
  const projectName = process.env.PROJECT_NAME;

  if (!projectName) {
    throw new Error("PROJECT_NAME environment variable is required");
  }

  const projectDir = resolve(join(__dirname, "site", projectName));
  const outDir = resolve(join(__dirname, "docs", projectName));

  return {
    root: projectDir,
    plugins: [react()],
    base: `/fm/${projectName}/`,
    build: {
      outDir,
      rollupOptions: {
        input: {
          main: resolve(projectDir, "index.html"),
        },
      },
    },
  };
});
