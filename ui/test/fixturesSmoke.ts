import AxeBuilder from "@axe-core/playwright";
import { test as base, expect } from "@playwright/test";

type AxeFixture = {
	makeAxeBuilder: () => AxeBuilder;
	accessibilityScan: () => void;
};

// Extend base test by providing "makeAxeBuilder" and coverage
// This new "test" can be used in multiple test files, and each of them will get a consistently configured AxeBuilder instance.
export const test = base.extend<AxeFixture, { workerStorageState: string }>({
	makeAxeBuilder: async ({ page }, use, _testInfo) => {
		const makeAxeBuilder = () => new AxeBuilder({ page });
		await use(makeAxeBuilder);
	},
	accessibilityScan: async ({ page }, use, _testInfo) => {
		const makeAxeBuilder = () => new AxeBuilder({ page });
		await use(makeAxeBuilder);
		const accessibilityScanResults = await makeAxeBuilder().include("#root").analyze();
		console.log(accessibilityScanResults.violations);
		expect(accessibilityScanResults.violations).toEqual([]);
	},
});

export { expect } from "@playwright/test";
