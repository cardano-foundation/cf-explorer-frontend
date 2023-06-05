import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: false,
    viewportWidth: 1024,
    viewportHeight: 768,
    setupNodeEvents() {
      // implement node event listeners here
    }
  }
});
