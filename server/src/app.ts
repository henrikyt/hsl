import { Logger } from "./utils/log";
import buildServer from "./server";
import { hsl } from "./lib/hsl";

const server = buildServer();

async function main() {
	try {
		await server.listen({ port: 3500, host: "0.0.0.0" });
		await hsl.connect();
		Logger(`Server ready at http://localhost:3500`);
	} catch (e) {
		Logger.error(e);
		process.exit(1);
	}
}

main();
