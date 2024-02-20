import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: "./test",
	/* Glob patterns or regular expressions that match test files. */
	testMatch: "*.spec.ts",
	/* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
	snapshotDir: "./test/__snapshots__",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: process.env.CI
		? [
				["html", { open: "never", outputFile: "report.html", outputFolder: "test-report/report" }],
				["junit", { outputFile: "pw-report.xml" }],
			]
		: "line",
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: "http://localhost:8080",
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
		// Tell all tests to load signed-in state from 'storageState.json'.
		// storageState: "out/storageState.json",
		bypassCSP: true,
	},

	/* Configure projects for major browsers */
	projects: process.env.CI
		? [
				{
					name: "chromium",
					use: { ...devices["Desktop Chrome"] },
				},

				{
					name: "firefox",
					use: { ...devices["Desktop Firefox"] },
				},

				{
					name: "webkit",
					use: { ...devices["Desktop Safari"] },
				},

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
				//   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
				// },
			]
		: undefined,

	/* Run your local dev server before starting the tests */
	webServer: process.env.CI
		? undefined
		: {
				command: "pnpm dev",
				reuseExistingServer: true,
			},
});
