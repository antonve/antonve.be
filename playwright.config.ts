import { defineConfig, devices } from '@playwright/test'

if (!process.env.E2E_BASE_URL || !process.env.E2E_ERROR_BASE_URL) {
  throw new Error('Run pnpm test:e2e to start the production image and error fixture.')
}

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }], [process.env.CI ? 'github' : 'list']],
  use: {
    baseURL: process.env.E2E_BASE_URL,
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
})
