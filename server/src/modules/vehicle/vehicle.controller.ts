import { FastifyReply, FastifyRequest, RouteHandler } from "fastify";
import { getVehicles } from "./vehicle.service";
import { LatitudeParams } from "../session/session.schema";
import { findSession, updateSession } from "../session/session.service";
import { hsl } from "../../lib/hsl";

export async function getVehiclesHandler(req: FastifyRequest<{ Querystring: LatitudeParams }>, rep: FastifyReply) {
	const vehicles = await getVehicles(req.query);
	const token = req.cookies["token"] ?? "dbg";
	const oldSession = await findSession(token);
	const p = await updateSession({ ...req.query, id: token });
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
		hsl.startTracking(req.query, token);
	}
	return vehicles;
}
