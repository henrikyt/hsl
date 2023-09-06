import { FunctionComponent } from "react";
import { VehicleMap } from "../vehicleMap/VehicleMap";
import { makeStyles } from "../../util/theme";
import { useGetApiSession } from "../../api/gen";
import { VehicleDetails } from "../vehicleDetails/VehicleDetails";

const useStyles = makeStyles()((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		"& >h2": {
			alignSelf: "center",
		},
	},
}));

export const MainPage: FunctionComponent = () => {
	const { classes } = useStyles();
	const { data, isLoading } = useGetApiSession();

	if (isLoading) return <p>...</p>;

	return (
		<div className={classes.root}>
			<VehicleMap initialCoords={data}></VehicleMap>
			<h2>HSL Realtime Tracker</h2>
			<VehicleDetails></VehicleDetails>
		</div>
	);
};
