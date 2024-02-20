import prisma from "../../lib/prisma";
import { GetVehiclesParams, UpdateVehiclesParams } from "./vehicle.schema";

export async function updateVehicles(data: UpdateVehiclesParams) {
	// prisma does not support upsertMany, use transaction > https://github.com/prisma/prisma/issues/4134
	const collection = await prisma.$transaction(
		data.map((cur) =>
			prisma.vehicle.upsert({
				create: cur,
				update: cur,
				where: { id: cur.id },
			}),
		),
	);
	return collection;
}

export function getVehicles(params: GetVehiclesParams, since?: Date) {
	if (params) {
		const { latitudeStart, longitudeStart, latitudeEnd, longitudeEnd } = params;
		return prisma.vehicle.findMany({
			where: {
				latitude: { gte: latitudeStart, lte: latitudeEnd },
				longitude: { gte: longitudeStart, lte: longitudeEnd },
				vehicleTime: { gte: since },
			},
			orderBy: { id: "asc" }
		});
	} else {
		return prisma.vehicle;
	}
}
