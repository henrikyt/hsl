import { test, expect } from "../fixturesSmoke";

test("login to main page and load session", async ({ page, accessibilityScan }) => {
	await page.goto("http://localhost:8080/");
	await page.getByRole("table").click();
	await accessibilityScan();
});
