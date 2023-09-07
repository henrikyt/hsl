import { FastifyInstance } from "fastify";
import { getSessionHandler, getTokenHandler } from "./session.controller";
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
	server.get(
		"/token",
		{
			schema: {
				response: {
					200: $ref("tokenResponseSchema"),
				},
			},
		},
		getTokenHandler,
	);
}

export default sessionRoutes;
