import debounce from "lodash/debounce";
import { FunctionComponent, useCallback, useMemo, useRef, useState } from "react";
import { GoogleMap, Marker, RectangleF, TrafficLayer, useJsApiLoader } from "@react-google-maps/api";
import { useGetApiVehicle } from "../../api/gen";
import { makeStyles } from "../../util/theme";

type Props = {
	initialCoords?: Coords;
};

type Coords = {
	latitudeStart: number;
	longitudeStart: number;
	latitudeEnd: number;
	longitudeEnd: number;
};

const useStyles = makeStyles()((theme) => ({
	map: {
		height: "100%",
	},
}));

const center = { lat: 60.163693147166, lng: 24.948047714233 };

export const VehicleMap: FunctionComponent<Props> = (props) => {
	const { classes } = useStyles();

	const { isLoaded: isApiLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.API_KEY_GMAP as string,
	});

	const [cords, setCords] = useState<Coords>({
		latitudeStart: props.initialCoords?.latitudeStart || 60.161693147166,
		longitudeStart: props.initialCoords?.longitudeStart || 24.938047714233,
		latitudeEnd: props.initialCoords?.latitudeEnd || 60.167993122888,
		longitudeEnd: props.initialCoords?.longitudeEnd || 24.951252288818,
	});

	const { data: vehicles, dataUpdatedAt } = useGetApiVehicle(cords, { query: { refetchInterval: 1000, queryKey: ["myVehicles"] } });
	const ref = useRef<google.maps.Rectangle>();

	const debouncedSearch = debounce(async () => {
		const bounds = ref.current?.getBounds();
		if (!bounds) return;
		const start = bounds.getNorthEast();
		const end = bounds.getSouthWest();
		const newCords: Coords = {
			latitudeStart: Number(end.lat().toFixed(12)),
			latitudeEnd: Number(start.lat().toFixed(12)),
			longitudeStart: Number(end.lng().toFixed(12)),
			longitudeEnd: Number(start.lng().toFixed(12)),
		};
		setCords(newCords);
	}, 2000);

	const onBoundsChanged = () => {
		debouncedSearch();
	};

	// memoize markers
	const markers = useMemo(() => {
		if (!isApiLoaded) return [];
		return vehicles?.map((v) => (
			<Marker
				key={v.id}
				label={v.description}
				options={{ optimized: true }}
				position={new google.maps.LatLng(v.latitude ?? 0, v.longitude ?? 0)}
			></Marker>
		));
	}, [dataUpdatedAt, isApiLoaded]);

	// get initial box
	const bounds = useMemo(() => {
		if (!isApiLoaded) return;
		return new google.maps.LatLngBounds(
			new google.maps.LatLng(cords.latitudeStart, cords.longitudeStart),
			new google.maps.LatLng(cords.latitudeEnd, cords.longitudeEnd),
		);
	}, [isApiLoaded, cords]);

	if (!isApiLoaded) {
		return;
	}

	return (
		<GoogleMap mapContainerClassName={classes.map} zoom={13} center={center}>
			<RectangleF onLoad={(r) => (ref.current = r)} onBoundsChanged={onBoundsChanged} draggable editable bounds={bounds}></RectangleF> Rectangle
			<TrafficLayer />
			{markers}
		</GoogleMap>
	);
};
