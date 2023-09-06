import { createMakeStyles } from "tss-react";

export const theme = {
	border: "1px solid black",
	backgroundColor: { light: "greay", dark: "darkblue" },
};

export type Theme = typeof theme & { [key: string]: unknown };

export function useTheme() {
	return theme;
}

export const { makeStyles, useStyles } = createMakeStyles({ useTheme });
