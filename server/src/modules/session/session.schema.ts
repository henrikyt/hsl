import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

export const sessionResponseSchema = z.object({
	latitudeStart: z.number(),
	longitudeStart: z.number(),
	latitudeEnd: z.number(),
	longitudeEnd: z.number(),
});

export type LatitudeParams = z.infer<typeof sessionResponseSchema>;

export const { schemas: sessionSchemas, $ref } = buildJsonSchemas(
	{
		sessionResponseSchema,
	},
	{ $id: "sessionSchema" },
);
