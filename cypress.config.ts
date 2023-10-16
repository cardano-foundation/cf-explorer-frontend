import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${process.env.PORT || 3000}`,
    supportFile: "cypress/support/e2e.js",
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
