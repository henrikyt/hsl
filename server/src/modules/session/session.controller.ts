import { RouteHandler } from "fastify";
import { updateSessionId } from "./session.service";

export const getSessionHandler: RouteHandler = async (request, reply) => {
	const token = await reply.jwtSign({
		name: "token",
	});

	reply.setCookie("token", token, {
		path: "/",
	});

	const data = await updateSessionId({ id: "dbg" });
	return data;
};
