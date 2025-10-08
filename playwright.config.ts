import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    testDir: './src/tests/playwright',
    testMatch: "**/*.test.mts",
    fullyParallel: true,
    retries: 0,
    use: {
        baseURL: process.env.PLAYWRIGHT_TEST_URL,
        trace: 'on-first-retry',
        headless: true,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'npm run dev',
        port: 3000,
        reuseExistingServer: false,
        timeout: 120_000
    }
});
