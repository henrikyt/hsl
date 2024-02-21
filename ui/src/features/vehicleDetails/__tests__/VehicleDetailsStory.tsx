// wrapped for initial request

import { FunctionComponent, useEffect } from "react";
import { VehicleDetails } from "../VehicleDetails";
import { useQueryClient } from "@tanstack/react-query";
import { getApiVehicle } from "../../../api/gen";

const cords = {
	latitudeStart: 60.161693147166,
	longitudeStart: 24.938047714233,
	latitudeEnd: 60.167993122888,
	longitudeEnd: 24.951252288818,
};

export const VehicleDetailsStory: FunctionComponent = () => {
	const client = useQueryClient();
	client.prefetchQuery({ queryKey: ["myVehicles"], queryFn: () => getApiVehicle(cords) });
	return <VehicleDetails></VehicleDetails>;
};
