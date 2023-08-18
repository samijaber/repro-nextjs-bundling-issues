import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const USE_CLIENT_BUNDLE_NAME = "USE_CLIENT_BUNDLE";
const USE_SERVER_BUNDLE_NAME = "USE_SERVER_BUNDLE";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "./src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
    },
    rollupOptions: {
      external: ["next/navigation", "react", "react/jsx-runtime", "react-dom"],
      output: {
        // move all code that uses `use client` or `use server` into separate bundles
        manualChunks(id, { getModuleInfo }) {
          if (getModuleInfo(id).code.match(/^['"]use client['"]/)) {
            return USE_CLIENT_BUNDLE_NAME;
          } else if (getModuleInfo(id).code.match(/^['"]use server['"]/)) {
            return USE_SERVER_BUNDLE_NAME;
          }
        },
        // add a banner to the top of each bundle
        banner(chunk) {
          if (chunk.name === USE_CLIENT_BUNDLE_NAME) {
            return "'use client';";
          } else if (chunk.name === USE_SERVER_BUNDLE_NAME) {
            return "'use server';";
          }
        },
        globals: {
          react: "react",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
  },
});
