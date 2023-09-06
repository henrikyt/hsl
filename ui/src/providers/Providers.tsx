import { FunctionComponent, ReactNode } from "react";
import { ClientProvider } from "./ClientProvider";
import { ThemeProvider } from "./ThemeProvider";
import { TokenProvider } from "./TokenProvider";

type Props = {
	rootNode?: ShadowRoot;
	children?: ReactNode;
};

export const Providers: FunctionComponent<Props> = ({ rootNode, children }) => {
	return (
		<ClientProvider>
			<TokenProvider>
				<ThemeProvider>{children}</ThemeProvider>
			</TokenProvider>
		</ClientProvider>
	);
};
