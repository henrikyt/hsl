/**
 * Generated by orval 🍺
 * Do not edit manually.
 * HSL Realtime
 * OpenAPI spec version: 0.0.1
 */
import type { VehiclesSchemaVehiclesResponseSchemaItemState } from "./vehiclesSchemaVehiclesResponseSchemaItemState";

export type VehiclesSchemaVehiclesResponseSchemaItem = {
	id: string;
	state: VehiclesSchemaVehiclesResponseSchemaItemState;
	description?: string;
	operator: number;
	vehicleId: number;
	vehicleTime: string;
	speed?: number;
	heading?: number;
	latitude?: number;
	longitude?: number;
	acceleration?: number;
	scheduleOffset?: number;
	odometer?: number;
	doorStatus?: number;
	start?: string;
	stoppedAt?: number;
	route?: string;
	occupancy?: number;
	arrival?: string;
	departure?: string;
};
