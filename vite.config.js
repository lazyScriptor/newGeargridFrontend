import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Manual chunking keeps repeat-visit performance high — vendor libs change
    // rarely, so cache them separately from app code that rebuilds every deploy.
    rollupOptions: {
      output: {
        // Manual chunking keeps repeat-visit performance high. Vite 8 / rolldown
        // expects this as a function, not the legacy { name: [...] } shape.
        manualChunks(id) {
          if (id.includes("node_modules/framer-motion")) return "motion";
          if (
            id.includes("node_modules/react-router") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react\\")
          ) {
            return "react";
          }
          return undefined;
        },
      },
    },
    // Hint the browser to fetch lazy chunks at modulepreload priority.
    modulePreload: { polyfill: true },
    // Smaller asset inlining cutoff — keep PNG/SVG external so they can be
    // long-cached and don't bloat the index bundle.
    assetsInlineLimit: 4096,
  },
});
