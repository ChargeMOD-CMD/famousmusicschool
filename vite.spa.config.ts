// SPA-only build for GitHub Pages. Run with: bun run build:spa
// This bypasses TanStack Start / Cloudflare Workers and produces a pure
// static client bundle in `dist/` that any static host (incl. GitHub Pages)
// can serve. The regular `bun run build` (vite.config.ts) is unchanged and
// still drives the SSR Worker build used by the Lovable editor and Publish.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  // GitHub Pages serves this project at /famousmusicschool/.
  // Change here if the repo is renamed.
  base: "/famousmusicschool/",
  plugins: [
    tsconfigPaths(),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
