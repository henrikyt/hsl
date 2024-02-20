import { test, expect } from "./fixturesSmoke";

test("login to main page", async ({ page }) => {
	await page.goto("http://localhost:8080/");
	await page.getByRole("table").click();
});
