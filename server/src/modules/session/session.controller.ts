import { RouteHandler } from "fastify";
import { findSession, updateSessionId } from "./session.service";

export const getSessionHandler: RouteHandler = async (request, reply) => {
	const data = await findSession(request.cookies["token"] ?? "dbg");
	return data;
};

export const getTokenHandler: RouteHandler = async (request, reply) => {
	if (request.cookies["token"]) {
		await updateSessionId({ id: request.cookies["token"] });
		return { status: "ok" };
	}
	const token = await reply.jwtSign({
		name: "token",
	});

	reply.setCookie("token", token, {
		path: "/",
	});

	await updateSessionId({ id: token });
	return { status: "ok" };
};
