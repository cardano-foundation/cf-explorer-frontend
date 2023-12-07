import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${process.env.PORT || 3000}`,
    supportFile: "cypress/support/e2e.ts",
    hideXHRInCommandLog: true,
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 120000,
    pageLoadTimeout: 120000,
    execTimeout: 120000,
    taskTimeout: 120000,
    requestTimeout: 120000,
    responseTimeout: 120000,
    setupNodeEvents() {
      // implement node event listeners here
    }
  }
});
