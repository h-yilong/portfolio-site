import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1440,
  viewportHeight: 1080,
  e2e: {
    baseUrl: "http://localhost:8765",
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
    excludeSpecPattern: ["cypress/e2e/examples"],
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});