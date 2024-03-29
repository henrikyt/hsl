import { HttpResponse, http } from "msw";
import { expect, test } from "../../../../test/fixturesUnit";
import { VehicleDetailsStory } from "./VehicleDetailsStory";

test("displays vehicles in a list", async ({ mount, worker }) => {
	// trigger update of vehicles

	const component = await mount(<VehicleDetailsStory />);

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

	const component = await mount(<VehicleDetailsStory />);

	await expect(component).toContainText("2079706650247168");
});
