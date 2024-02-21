import { beforeMount, afterMount } from "@playwright/experimental-ct-react/hooks";
import { Providers } from "../src/providers/Providers";

export type HooksConfig = {
	enableRouting?: boolean;
};

beforeMount<HooksConfig>(async ({ App, hooksConfig }) => {
	return (
		<Providers>
			<App />
		</Providers>
	);
});
