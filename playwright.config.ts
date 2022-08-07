import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests',
  testMatch: '**/*.test.ts',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  /** workers: process.env.CI ? 1 : undefined, */
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'github' : 'list',

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    headless: true
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Chrome 1366x768',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 } // WXGA
      }
    },
    {
      name: 'Chrome 1280x720',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 } // HD
      }
    },
    {
      name: 'Chrome 1024x768',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1024, height: 768 } // XGA
      }
    },
    {
      name: 'Chrome 360×800',
      use: {
        ...devices['iPhone 11'],
        viewport: { width: 360, height: 800 }
      }
    },
    {
      name: 'Chrome 414×896',
      use: {
        ...devices['Galaxy S9+'],
        viewport: { width: 414, height: 896 }
      }
    },
    {
      name: 'Chrome 280x653',
      use: {
        ...devices['Pixel 2'],
        viewport: { width: 280, height: 653 }
      }
    }
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start',
    port: 3000
  }
}

export default config
