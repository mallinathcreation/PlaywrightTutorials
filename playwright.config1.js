import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retires:1,
  workers:5, // how many tests to run in parallel. By default it will take the number of cores in your system.
  timeout: 50 * 1000,
  expect: {
    timeout: 50 * 1000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: "only-on-failure",
        trace: "only-on-failure",
      }
    },
    {
      name: 'chrome',

      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: "only-on-failure",
        trace: "retain-on-failure",
        // video: "retain-on-failure",-->to take video of the test execution. It will take video only when the test fails.
        // ...devices['Galaxy S24'] --> to configure with devices what we want
        // viewport: { width: 720, height: 720 }, --> to change browser dimensions

      }
    }
   ]

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  /* Configure projects for major browsers */
  
});

module.exports = config

