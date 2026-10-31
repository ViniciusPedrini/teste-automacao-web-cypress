const { defineConfig } = require("cypress");
const { registerSummaryReporter } = require("./cypress/plugins/testSummaryReporter");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.automationexercise.com",
    specPattern: "cypress/e2e/automation-exercise/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",

    viewport: { width: 1366, height: 768 },
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    requestTimeout: 15000,

    screenshotsFolder: "cypress/screenshots",
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    video: false,

    blockHosts: [
      "*.googlesyndication.com",
      "*.doubleclick.net",
      "*.googleadservices.com",
      "adservice.google.*",
      "*.googletagmanager.com",
      "*.google-analytics.com",
    ],

    testIsolation: true,

    retries: { runMode: 1, openMode: 0 },

    setupNodeEvents(on, config) {
      registerSummaryReporter(on, config);
      return config;
    },
  },
});
