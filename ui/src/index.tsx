import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

async function enableMocking() {
	if (process.env.NODE_ENV !== "mock") {
		return;
	}
	const { worker } = await import("../test/fixturesBrowser");
	return worker.start();
}

// @ts-ignore
const root = createRoot(document.getElementById("root"));

enableMocking().then(() =>
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	),
);
