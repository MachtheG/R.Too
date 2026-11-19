import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  use: { baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3123" },
  webServer: { command: "npx next start -p 3123", url: "http://localhost:3123/en", reuseExistingServer: true, timeout: 60_000 },
});
