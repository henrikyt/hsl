import { test, expect } from "../../../../test/fixturesUnit";
import { getApiSession, getApiVehicle, useGetApiVehicle } from "../../../api/gen";
import { queryClient } from "../../../providers/ClientProvider";
import { Providers } from "../../../providers/Providers";
import { VehicleDetails } from "../VehicleDetails";

const cords = {
	latitudeStart: 60.161693147166,
	longitudeStart: 24.938047714233,
	latitudeEnd: 60.167993122888,
	longitudeEnd: 24.951252288818,
};

test("event should work", async ({ mount }) => {
	// trigger update of vehicles

	const component = await mount(
		<Providers>
			<VehicleDetails />
		</Providers>,
	);

	await queryClient.prefetchQuery("myVehicles" as any, getApiSession());
});
