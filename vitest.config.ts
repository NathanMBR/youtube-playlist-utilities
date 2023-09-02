/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import path from "node:path";

import { viteConfig } from "./vite.config";

export default defineConfig(
  async () => {
    return {
      ...viteConfig,
      root: path.resolve(__dirname),
      test: {
        watch: false,
        threads: false,
        exclude: [
          "node_modules",
          "dist",
          ".idea",
          ".git",
          ".cache",
          "src/main/**/*"
        ]
      }
    };
  }
);
