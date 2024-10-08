import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

import "dotenv/config";
import { returnBooleanForHeadless } from "./playwright/utils/parse";

const viewport = { width: 1400, height: 1500 };

const testDir = defineBddConfig({
  paths: ["playwright/tests/**/*.feature"],
  require: ["playwright/tests/**/*.ts"]
});
export default defineConfig({
  testDir,
  reporter: [
    ["allure-playwright"],
    ["list"],
    ["html", { outputFolder: "./.reports/playwright-html-report" }],
    ["junit", { outputFile: "./.reports/junit/results.xml" }]
  ],
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 20000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: Boolean(process.env.CI),
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 0,
    baseURL: process.env.APPLICATION_URL,
    headless: returnBooleanForHeadless(process.env.HEADLESS as string),
    ignoreHTTPSErrors: true,
    trace: "on-first-retry"
  },

  projects: [
    {
      name: "chrome",
      testDir,
      outputDir: "./.reports/chrome/test-results",
      use: {
        ...devices["Desktop Chrome"],
        viewport: viewport
      }
    }
  ]
});
