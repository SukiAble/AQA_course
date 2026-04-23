// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({path: '.env'});

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  snapshotDir: './data',
  testDir: './tests',
  /* Run tests in files in parallel */
  globalTeardown: './global-teardown.js',
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'], 
    ['html', { open: 'never' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    geolocation: { longitude: 50.4501, latitude: 30.5235 },
    permissions: ['geolocation'],
    timezoneId: 'UTC',
    timeout: 60000,
    headless: false,
    actionTimeout: 10000,
    navigationTimeout: 10000,
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'setup-ui',
      testMatch: 'auth.setup.js',
      use: {
        baseURL: process.env.UI_BASE_URL,
                ...devices['Desktop Chrome'],

      }
    },

    {
      name: 'e2e-tests',
      testMatch: 'test_app.test.js',
      dependencies: ['setup-ui'],
      use: {
        baseURL: process.env.UI_BASE_URL,
        storageState: 'data/storageState.json',
        ...devices['Desktop Chrome'],
            }
    },

    {
      name: 'api-tests',
      testMatch: 'api.test.js',
      use: {
        baseURL: process.env.API_BASE_URL
      }
    },

    {
      name: 'visual-regression',
      testMatch: 'visualRegression.test.js',
      dependencies: ['setup-ui'],
      use: {
        baseURL: process.env.UI_BASE_URL,
        storageState: 'data/storageState.json',
        ...devices['Desktop Chrome'],
            }
    }

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

