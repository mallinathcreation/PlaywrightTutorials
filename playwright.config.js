import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 50 * 1000,
  expect: {
    timeout: 50 * 1000,
  },
   reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot :"only-on-failure",
    trace :"retain-on-failure",
    
  },

  /* Configure projects for major browsers */
  
});

module.exports =config

