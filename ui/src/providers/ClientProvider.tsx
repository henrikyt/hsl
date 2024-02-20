import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FunctionComponent, ReactNode } from "react";

type Props = {
	children?: ReactNode;
};

export const queryClient = new QueryClient();

export const ClientProvider: FunctionComponent<Props> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{children}
		</QueryClientProvider>
	);
};
