import { FunctionComponent, ReactNode } from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

type Props = {
	children?: ReactNode;
};

export const ThemeProvider: FunctionComponent<Props> = ({ children }) => {
	const tssCache = createCache({
		key: "tss",
		container: document.body,
	});
	return <CacheProvider value={tssCache}>{children}</CacheProvider>;
};
