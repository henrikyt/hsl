import { FunctionComponent, ReactNode, useEffect } from "react";
import { useGetApiSession, useGetApiSessionToken } from "../api/gen/index";

type Props = {
	children?: ReactNode;
};

export const TokenProvider: FunctionComponent<Props> = ({ children }) => {

	const { isError: isTokenError, isLoading: isTokenLoading } = useGetApiSessionToken();
	console.log(isTokenError, isTokenLoading)
	const { isError, isLoading } = useGetApiSession({ query: { enabled: !isTokenLoading && !isTokenError, refetchInterval: 5000 } });

	if (isLoading || isTokenLoading) {
		return <p>...</p>;
	}
	if (isError || isTokenError) {
		return <p>This website requires cookies</p>;
	}

	return children;
};
