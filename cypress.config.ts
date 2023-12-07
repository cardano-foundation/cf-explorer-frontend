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
    defaultCommandTimeout: 9000000,
    pageLoadTimeout: 9000000,
    execTimeout: 9000000,
    taskTimeout: 9000000,
    requestTimeout: 9000000,
    responseTimeout: 9000000,
    setupNodeEvents() {
      // implement node event listeners here
    }
  }
});
