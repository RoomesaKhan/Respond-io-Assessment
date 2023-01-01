const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //Home page Url is defined here
    baseUrl: 'https://iprice.my/', 

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  
  viewportWidth: 1200,
  viewportHeight: 900
});
