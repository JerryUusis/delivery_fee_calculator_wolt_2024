/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./__tests__/testSetup.ts",
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html")
      },
    },
  },
});
