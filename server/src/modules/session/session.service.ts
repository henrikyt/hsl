import prisma from "../../lib/prisma";
import { LatitudeParams } from "./session.schema";

export async function findSession(id: string) {
	return prisma.session.findUnique({
		where: {
			id: id,
		},
	});
}

export async function updateSession(params: { id: string } & LatitudeParams) {
	return prisma.session.upsert({
		create: params,
		update: params,
		where: {
			id: params.id,
		},
	});
}

export async function updateSessionId(params: { id: string }) {
	return prisma.session.upsert({
		create: params,
		update: params,
		where: {
			id: params.id,
		},
	});
}
