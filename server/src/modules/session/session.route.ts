import { FastifyInstance } from "fastify";
import { getSessionHandler } from "./session.controller";
import { $ref } from "./session.schema";

async function sessionRoutes(server: FastifyInstance) {
	server.get(
		"/",
		{
			schema: {
				response: {
					200: $ref("sessionResponseSchema"),
				},
			},
		},
		getSessionHandler,
	);
}

export default sessionRoutes;
