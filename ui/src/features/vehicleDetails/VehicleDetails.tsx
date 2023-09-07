import { QueryObserver, useQueryClient } from "@tanstack/react-query";
import { FunctionComponent, useEffect, useState } from "react";
import { VehiclesSchemaVehiclesResponseSchemaItem } from "../../api/gen";
import { makeStyles } from "../../util/theme";

const useStyles = makeStyles()((theme) => ({
	root: {
		height: "100%",
		flexShrink: 1,
		flexGrow: 1,
		overflow: "auto",
		"& >table": { width: "100%" },
		"& th": {
			position: "sticky",
			top: "0",
			backgroundColor: "#F9F8F8",
		},
	},
}));

export const operatorMap = {
	6: "Oy Pohjolan Liikenne Ab2",
	12: "Helsingin Bussiliikenne Oy",
	17: "Tammelundin Liikenne Oy",
	18: "Oy Pohjolan Liikenne Ab",
	20: "Bus Travel Åbergin Linja Oy",
	21: "Bus Travel Oy Reissu Ruoti",
	22: "Nobina Finland Oy",
	30: "Savonlinja Oy",
	36: "Nurmijärven Linja Oy",
	40: "HKL-Raitioliikenne",
	47: "Taksikuljetus Oy",
	50: "HKL-Metroliikenne",
	51: "Korsisaari Oy",
	54: "V-S Bussipalvelut Oy",
	58: "Koillisen Liikennepalvelut Oy",
	60: "Suomenlinnan Liikenne Oy",
	59: "Tilausliikenne Nikkanen Oy",
	89: "Metropolia",
	90: "VR Oy",
	130: "Matkahuolto1",
	195: "Siuntio1",
};

type Vehicles = VehiclesSchemaVehiclesResponseSchemaItem[];

export const VehicleDetails: FunctionComponent = () => {
	const { classes } = useStyles();
	const client = useQueryClient();
	const [vehicles, setVehicles] = useState<Vehicles>([]);

	useEffect(() => {
		// there should be a way to make a dummy req with same cache as vehicles, but let's go directly to cache for now
		const observer = new QueryObserver(client, { queryKey: ["myVehicles"] });
		return observer.subscribe((r) => setVehicles((r.data ?? []) as Vehicles));
	}, [client]);

	if (!vehicles || vehicles.length === 0) return;
	const headers = Object.keys(vehicles[0]);

	const renderCell = (k: string, d: unknown): string => {
		switch (k) {
			case "operator":
				return operatorMap[d as keyof typeof operatorMap];
			case "doorStatus":
				return d === 1 ? "open" : "closed";
			case "vehicleTime":
			case "arrival":
			case "departure": {
				if (!d) return "";
				const date = new Date(d as string);
				return date.toLocaleTimeString();
			}
			default:
				return d as string;
		}
	};

	return (
		<div className={classes.root}>
			<table>
				<tr>
					{headers.map((headerKey) => (
						<th>{headerKey}</th>
					))}
				</tr>
				<tbody>
					{vehicles.map((vehicle) => (
						<tr>
							{Object.keys(vehicle).map((key) => (
								<td>{renderCell(key, vehicle[key as keyof typeof vehicle])}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
