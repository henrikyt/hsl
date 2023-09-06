import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

export const operatorMap = {
	6: "Oy Pohjolan Liikenne Ab2",
	12: "Helsingin Bussiliikenne Oy",
	17: "Tammelundin Liikenne Oy",
	18: "Oy Pohjolan Liikenne Ab",
	20: "Bus Travel Åbergin Linja Oy",
	21: "Bus Travel Oy Reissu Ruoti",
	22: "Nobina Finland Oy",
	30: "Savonlinja Oy",
	36: "Nurmijärven Linja Oy",
	40: "HKL-Raitioliikenne",
	47: "Taksikuljetus Oy",
	50: "HKL-Metroliikenne",
	51: "Korsisaari Oy",
	54: "V-S Bussipalvelut Oy",
	58: "Koillisen Liikennepalvelut Oy",
	60: "Suomenlinnan Liikenne Oy",
	59: "Tilausliikenne Nikkanen Oy",
	89: "Metropolia",
	90: "VR Oy",
	130: "Matkahuolto1",
	195: "Siuntio1",
};

const vehicleStateSchema = z.enum([
	"VP",
	"DUE",
	"ARR",
	"DEP",
	"ARS",
	"PDE",
	"PAS",
	"WAIT",
	"DOO",
	"DOC",
	"TLR",
	"TLA",
	"DA",
	"DOUT",
	"BA",
	"BOUT",
	"VJA",
	"VJOUT",
]);

const vehicleResponseSchema = z.object({
	id: z.string(), // veh_id + oper
	state: vehicleStateSchema, // veh_id + oper
	description: z.string().optional(),
	operator: z.number(),
	vehicleId: z.number(),
	vehicleTime: z.string(),
	speed: z.number().optional(),
	heading: z.number().optional(),
	latitude: z.number().optional(),
	longitude: z.number().optional(),
	acceleration: z.number().optional(),
	scheduleOffset: z.number().optional(),
	odometer: z.number().optional(),
	doorStatus: z.number().optional(),
	start: z.string().optional(),
	stoppedAt: z.string().optional(),
	route: z.string().optional(),
	occupancy: z.number().optional(),
	arrival: z.string().datetime().optional(),
	departure: z.string().datetime().optional(),
});

const vehiclesRequestSchema = z.object({
	latitudeStart: z.number().optional(),
	longitudeStart: z.number().optional(),
	latitudeEnd: z.number().optional(),
	longitudeEnd: z.number().optional(),
	since: z.string().datetime().optional(),
});

const vehiclesResponseSchema = z.array(vehicleResponseSchema);

export type UpdateVehiclesParams = z.infer<typeof vehiclesResponseSchema>;
export type VehicleState = z.infer<typeof vehicleStateSchema>;
export type GetVehiclesParams = z.infer<typeof vehiclesRequestSchema>;

export const { schemas: vehicleSchemas, $ref } = buildJsonSchemas(
	{
		vehiclesResponseSchema,
		vehiclesRequestSchema,
	},
	{ $id: "vehiclesSchema" },
);
