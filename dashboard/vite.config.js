import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/insight-engine/" : "/",
  esbuild: {
    jsx: "automatic",
  },
}));
