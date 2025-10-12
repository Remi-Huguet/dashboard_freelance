import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    testDir: './src/tests/playwright',
    testMatch: "**/*.test.mts",
    fullyParallel: false,
    retries: 4,
    timeout: 60000,
    workers: 1,
    use: {
        baseURL: process.env.PLAYWRIGHT_TEST_URL,
        trace: 'on-first-retry',
        headless: true,
        storageState: undefined,
        ignoreHTTPSErrors: true,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'PORT=3001 npm run dev',
        port: 3001,
        reuseExistingServer: false,
        timeout: 120_000
    }
});
