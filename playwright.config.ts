import { defineConfig } from '@playwright/test'

const port = 4173
const baseURL = `http://localhost:${port}`

// Runs against the production build: `bun run build` first.
export default defineConfig({
  testDir: 'e2e',
  testMatch: '**/*.e2e.ts',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL,
    // CI and sandboxes provide their own Chromium.
    launchOptions: { executablePath: process.env.CHROMIUM_PATH || undefined },
  },
  webServer: {
    command: 'bun .output/server/index.mjs',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    // No Telegram credentials: the contact API must never reach the network.
    env: { PORT: String(port), NITRO_PORT: String(port), NUXT_TELEGRAM_BOT_TOKEN: '' },
  },
})
