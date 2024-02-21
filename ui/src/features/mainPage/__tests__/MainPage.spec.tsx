import { HttpResponse, http } from "msw";
import { expect, test } from "../../../../test/fixturesUnit";
import { MainPage } from "../MainPage";

test("loads user session", async ({ mount, worker }) => {
	// trigger update of vehicles

	const component = await mount(<MainPage />);

	await expect(component).toContainText("...");
});

test("displays nothing when req fails", async ({ mount, worker }) => {
	// trigger update of vehicles

	await worker.use(
		http.get("/api/vehicles", async () => {
			return new HttpResponse(null, {
				status: 500,
			});
		}),
	);

	const component = await mount(<MainPage />);

	await expect(component).toContainText("...");
});
