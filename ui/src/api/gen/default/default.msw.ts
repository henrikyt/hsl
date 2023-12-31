/**
 * Generated by orval 🍺
 * Do not edit manually.
 * HSL Realtime
 * OpenAPI spec version: 0.0.1
 */
import { rest } from "msw";
import { faker } from "@faker-js/faker";

export const getGetApiSessionMock = () => ({
	latitudeStart: faker.datatype.number({ min: undefined, max: undefined }),
	longitudeStart: faker.datatype.number({ min: undefined, max: undefined }),
	latitudeEnd: faker.datatype.number({ min: undefined, max: undefined }),
	longitudeEnd: faker.datatype.number({ min: undefined, max: undefined }),
});

export const getGetApiSessionTokenMock = () => ({ status: faker.random.word() });

export const getGetApiVehicleMock = () =>
	Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
		id: faker.random.word(),
		state: faker.helpers.arrayElement([
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
		]),
		description: faker.helpers.arrayElement([faker.random.word(), undefined]),
		operator: faker.datatype.number({ min: undefined, max: undefined }),
		vehicleId: faker.datatype.number({ min: undefined, max: undefined }),
		vehicleTime: faker.random.word(),
		speed: faker.helpers.arrayElement([faker.datatype.number({ min: undefined, max: undefined }), undefined]),
		heading: faker.helpers.arrayElement([faker.datatype.number({ min: undefined, max: undefined }), undefined]),
		latitude: faker.helpers.arrayElement([faker.datatype.number({ min: undefined, max: undefined }), undefined]),
		longitude: faker.helpers.arrayElement([faker.datatype.number({ min: undefined, max: undefined }), undefined]),
		acceleration: faker.helpers.arrayElement([faker.datatype.number({ min: undefined, max: undefined }), undefined]),
		scheduleOffset: faker.helpers.arrayElement([faker.datatype.number({ min: undefined, max: undefined }), undefined]),
		odometer: faker.helpers.arrayElement([faker.datatype.number({ min: undefined, max: undefined }), undefined]),
		doorStatus: faker.helpers.arrayElement([faker.datatype.number({ min: undefined, max: undefined }), undefined]),
		start: faker.helpers.arrayElement([faker.random.word(), undefined]),
		stoppedAt: faker.helpers.arrayElement([faker.random.word(), undefined]),
		route: faker.helpers.arrayElement([faker.random.word(), undefined]),
		occupancy: faker.helpers.arrayElement([faker.datatype.number({ min: undefined, max: undefined }), undefined]),
		arrival: faker.helpers.arrayElement([`${faker.date.past().toISOString().split(".")[0]}Z`, undefined]),
		departure: faker.helpers.arrayElement([`${faker.date.past().toISOString().split(".")[0]}Z`, undefined]),
	}));

export const getDefaultMSW = () => [
	rest.get("*/api/session/", (_req, res, ctx) => {
		return res(ctx.delay(0), ctx.status(200, "Mocked status"), ctx.json(getGetApiSessionMock()));
	}),
	rest.get("*/api/session/token", (_req, res, ctx) => {
		return res(ctx.delay(0), ctx.status(200, "Mocked status"), ctx.json(getGetApiSessionTokenMock()));
	}),
	rest.get("*/api/vehicle/", (_req, res, ctx) => {
		return res(ctx.delay(0), ctx.status(200, "Mocked status"), ctx.json(getGetApiVehicleMock()));
	}),
];
