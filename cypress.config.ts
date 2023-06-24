import { defineConfig } from "cypress";
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${process.env.PORT || 3000}`,
    supportFile: false,
    viewportWidth: 1024,
    viewportHeight: 768,
    setupNodeEvents() {
      // implement node event listeners here
    }
  }
});
