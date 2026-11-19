import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@data": fileURLToPath(new URL("./data", import.meta.url)), "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: { environment: "jsdom", include: ["tests/**/*.test.ts?(x)"], exclude: ["e2e/**", "node_modules/**"] },
});
