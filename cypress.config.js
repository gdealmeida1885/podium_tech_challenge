const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://demo.podium.tools/qa-webchat-lorw/",
    defaultCommandTimeout: 6000,
    projectId: "yfwf5a"
  },
});
