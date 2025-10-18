const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com/',
    supportFile: false, // no support file needed
    setupNodeEvents(on, config) {
      // Mochawesome reporter
      const mochawesome = require('cypress-mochawesome-reporter/plugin');
      mochawesome(on);

      // Take screenshots automatically on test failure
      on('after:screenshot', (details) => {
        console.log('Screenshot taken:', details.path);
      });

      return config;
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      charts: true
    },
  },
});
