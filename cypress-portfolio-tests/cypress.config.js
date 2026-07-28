const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4173',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    video: true,                 // capture a video of every spec run
    screenshotOnRunFailure: true, // auto screenshot on failure
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 6000,
    reporter: 'spec',
  },
});
