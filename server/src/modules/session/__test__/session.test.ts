import { test } from "tap";
import { stub } from "sinon";
import buildServer from "../../../server";
import prisma from "../../../lib/prisma";

const cords = {
	latitudeStart: 60.161693147166,
	longitudeStart: 24.938047714233,
	latitudeEnd: 60.167993122888,
	longitudeEnd: 24.951252288818,
};

test("requests the `/session` route", async (t) => {
	const fastify = buildServer();

	prisma.session.findUnique = stub().resolves(cords);

	t.teardown(() => {
		fastify.close();
	});

	const response = await fastify.inject({
		method: "GET",
		url: "api/session",
	});

	t.equal(response.statusCode, 200);
	t.same(response.json(), cords);
});

test("requests the `/session/token` route", async (t) => {
	const fastify = buildServer();

	t.teardown(() => {
		fastify.close();
	});

	const response = await fastify.inject({
		method: "GET",
		url: "api/session/token",
	});

	t.equal(response.statusCode, 200);
	t.has(response.cookies[0].name, "token");
});
