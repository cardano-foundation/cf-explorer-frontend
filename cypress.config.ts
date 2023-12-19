import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

const defaultBaseUrl = `http://localhost:${process.env.PORT || 3000}`;
const baseUrl = process.env.CYPRESS_BASE_URL || defaultBaseUrl;

export default defineConfig({
  e2e: {
    baseUrl: baseUrl,
    supportFile: "cypress/support/e2e.ts",
    hideXHRInCommandLog: true,
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 100000,
    pageLoadTimeout: 100000,
    execTimeout: 100000,
    taskTimeout: 100000,
    requestTimeout: 100000,
    responseTimeout: 100000,
    setupNodeEvents() {
      // implement node event listeners here
    }
  }
});
