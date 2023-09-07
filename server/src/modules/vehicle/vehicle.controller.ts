import { FastifyReply, FastifyRequest, RouteHandler } from "fastify";
import { getVehicles } from "./vehicle.service";
import { LatitudeParams } from "../session/session.schema";
import { findSession, updateSession } from "../session/session.service";
import { hsl } from "../../lib/hsl";

export async function getVehiclesHandler(req: FastifyRequest<{ Querystring: LatitudeParams }>, rep: FastifyReply) {
	const token = req.cookies["token"] ?? "dbg";
	const oldSession = await findSession(token);
	await updateSession({ ...req.query, id: token });
	const vehicles = await getVehicles(req.query);
	// reset polling if needed
	const { latitudeStart, latitudeEnd, longitudeEnd, longitudeStart } = req.query;
	if (
		!oldSession ||
		(oldSession &&
			(oldSession.latitudeEnd !== latitudeEnd ||
				oldSession.latitudeStart !== latitudeStart ||
				oldSession.longitudeEnd !== longitudeEnd ||
				oldSession.longitudeStart !== longitudeStart))
	) {
		if (latitudeEnd && latitudeStart && longitudeEnd && longitudeStart)
			hsl.startTracking(req.query, token);
	}
	return vehicles;
}
