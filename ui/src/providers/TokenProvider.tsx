import { FunctionComponent, ReactNode, useEffect } from "react";
import { useGetApiSession } from "../api/gen/index";

type Props = {
	children?: ReactNode;
};

export const TokenProvider: FunctionComponent<Props> = ({ children }) => {
	useEffect(() => {
		fetch(process.env.API_SERVER + "/token");
	}, []);

	const { isError, isLoading } = useGetApiSession();

	if (isLoading) {
		return <p>...</p>;
	}
	if (isError) {
		return <p>This website requires cookies</p>;
	}

	return children;
};
