import { FastifyInstance } from "fastify";
import { getVehiclesHandler } from "./vehicle.controller";
import { $ref } from "./vehicle.schema";
import { $ref as $sessionRef } from "../session/session.schema";

async function vehicleRoutes(server: FastifyInstance) {
	server.get(
		"/",
		{
			schema: {
				querystring: $sessionRef("sessionResponseSchema"),
				response: {
					200: $ref("vehiclesResponseSchema"),
				},
			},
		},
		getVehiclesHandler,
	);
}

export default vehicleRoutes;
