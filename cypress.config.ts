import { defineConfig } from "cypress";
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: "http://10.4.10.231:7276",
    supportFile: "cypress/support/e2e.js",
    hideXHRInCommandLog: true,
    viewportWidth: 1024,
    viewportHeight: 768,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
