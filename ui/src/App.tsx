import { FunctionComponent } from "react";
import { MainPage } from "./features/mainPage/MainPage";
import { Providers } from "./providers/Providers";

export const App: FunctionComponent = () => {
	return (
		<Providers>
			<MainPage></MainPage>
		</Providers>
	);
};
