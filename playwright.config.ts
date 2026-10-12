import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [['html', { open: 'never' }], ['github']]
    : 'list',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    screenshot: 'on',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 7'] },
    },
  ],
  // Tests run against the production image. CI starts it before the tests.
  webServer: {
    command:
      'docker build --tag antonve-site:local . && docker run --rm --publish 127.0.0.1:3000:3000 antonve-site:local',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: true,
    timeout: 300_000,
  },
})
