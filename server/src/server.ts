import { fastifyCookie } from "@fastify/cookie";
import { fastifyJwt } from "@fastify/jwt";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastifyStatic } from "@fastify/static";
import { fastifyCors } from "@fastify/cors";
import { fastify as Fastify } from "fastify";
import { withRefResolver } from "fastify-zod";
import { hsl } from "./lib/hsl";
import sessionRoutes from "./modules/session/session.route";
import { sessionSchemas } from "./modules/session/session.schema";
import vehicleRoutes from "./modules/vehicle/vehicle.route";
import { vehicleSchemas } from "./modules/vehicle/vehicle.schema";
import path from "path";

function buildServer() {
	const fastify = Fastify();

	// plugins

	fastify.register(fastifyJwt, {
		secret: "ndkandnan78duy9sau87dbndsa89u7dsy789adb",
		cookie: {
			cookieName: "token",
			signed: false,
		},
	});

	fastify.register(fastifyCors, {
		origin: "*",
	});

	fastify.register(fastifyStatic, {
		root: path.join(__dirname, "public"),
	});

	fastify.register(fastifyCookie);

	fastify.register(
		fastifySwagger,
		withRefResolver({
			openapi: {
				info: {
					title: "HSL Realtime",
					version: "0.0.1",
				},
			},
		}),
	);

	fastify.register(fastifySwaggerUi, { routePrefix: "/doc" });

	// Routes

	for (const schema of [...vehicleSchemas, ...sessionSchemas]) {
		fastify.addSchema(schema);
	}

	fastify.register(sessionRoutes, { prefix: "api/session" });
	fastify.register(vehicleRoutes, { prefix: "api/vehicle" });

	// Hooks

	fastify.addHook("onRequest", async (request, reply) => {
		if (request.originalUrl?.includes("/api") && !request.originalUrl.includes("/session/token")) {
			try {
				await request.jwtVerify();
			} catch (err) {
				reply.send(err);
			}
		}
	});

	fastify.addHook("onClose", () => {
		hsl.disconnect();
	});

	return fastify;
}

export default buildServer;
