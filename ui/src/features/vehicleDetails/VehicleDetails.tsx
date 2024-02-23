import { QueryObserver, useQueryClient } from "@tanstack/react-query";
import { FunctionComponent, ReactNode, useEffect, useRef, useState } from "react";
import { VehiclesSchemaVehiclesResponseSchemaItem } from "../../api/gen";
import { makeStyles } from "../../util/theme";
import { useVirtualizer } from "@tanstack/react-virtual";

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

const vehicleStatusMap = {
	vp: "Vehicle position",
	due: "Vehicle will soon arrive to a stop",
	arr: "Vehicle arrives inside of a stop radius",
	dep: "Vehicle departs from a stop and leaves the stop radius",
	ars: "Vehicle has arrived to a stop",
	pde: "Vehicle is ready to depart from a stop",
	pas: "Vehicle passes through a stop without stopping",
	wait: "Vehicle is waiting at a stop",
	doo: "Doors of the vehicle are opened",
	doc: "Doors of the vehicle are closed",
	tlr: "Vehicle is requesting traffic light priority",
	tla: "Vehicle receives a response to traffic light priority request",
	da: "Driver signs in to the vehicle",
	dout: "Driver signs out of the vehicle",
	ba: "Driver selects the block that the vehicle will run",
	bout: "Driver signs out from the selected block (usually from a depot)",
	vja: "Vehicle signs in to a service journey (i.e. a single public transport journey from location A to location B, also known as trip)",
	vjout: "Vehicle signs off from a service journey, after reaching the final stop",
};

type Vehicles = VehiclesSchemaVehiclesResponseSchemaItem[];

export const VehicleDetails: FunctionComponent = () => {
	const { classes } = useStyles();
	const client = useQueryClient();
	const [vehicles, setVehicles] = useState<Vehicles>([]);

	const parentRef = useRef<HTMLTableElement | null>(null);

	// perf: only render visible rows
	const rowVirtualizer = useVirtualizer({
		count: vehicles.length ?? 0,
		getScrollElement: () => parentRef.current as Element,
		estimateSize: () => 38,
	});

	useEffect(() => {
		// there should be a way to make a dummy req with same cache as vehicles, but let's go directly to cache for now
		const observer = new QueryObserver(client, { queryKey: ["myVehicles"] });
		return observer.subscribe((r) => setVehicles((r.data ?? []) as Vehicles));
	}, [client]);

	if (!vehicles || vehicles.length === 0) return;
	const headers = Object.keys(vehicles[0]);

	const renderCell = (k: string, d: unknown): string | ReactNode => {
		switch (k) {
			case "operator":
				return operatorMap[d as keyof typeof operatorMap];
			case "state":
				return <div title={vehicleStatusMap[(d as string).toLocaleLowerCase() as keyof typeof vehicleStatusMap]}>{d as string}</div>;
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
			<table ref={parentRef}>
				<thead>
					<tr>
						{headers.map((headerKey) => (
							<th key={headerKey}>{headerKey}</th>
						))}
					</tr>
				</thead>
				<tbody style={{ height: rowVirtualizer.getTotalSize() + "px", width: "100%" }}>
					{rowVirtualizer.getVirtualItems().map((vItem) => {
						const vehicle = vehicles[vItem.index];
						return (
							<tr key={vItem.key}>
								{Object.keys(vehicle).map((key) => (
									<td key={key}>{renderCell(key, vehicle[key as keyof typeof vehicle])}</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
