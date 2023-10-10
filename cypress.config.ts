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
    defaultCommandTimeout: 200000,
    pageLoadTimeout: 200000,
    execTimeout: 200000,
    taskTimeout: 200000,
    requestTimeout: 200000,
    responseTimeout: 200000,
    setupNodeEvents() {
      // implement node event listeners here
    }
  }
});
