// @ts-nocheck
import debounce from "lodash/debounce";
import { useRef, useState } from "react";
import { GoogleMap, Marker, Rectangle, TrafficLayer, withGoogleMap, withScriptjs } from "react-google-maps";
import { compose, withProps } from "recompose";
import { useGetApiVehicle } from "../../api/gen";

type Coords = {
	latitudeStart: number;
	longitudeStart: number;
	latitudeEnd: number;
	longitudeEnd: number;
};

export const VehicleMap = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + process.env.API_KEY_GMAP + "&v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `600px`, flexShrink: 0, flexGrow: 0 }} />,
		mapElement: <div style={{ height: `100%` }} />,
	}),
	withScriptjs,
	withGoogleMap,
)((props) => {
	const [cords, setCords] = useState<Coords>({
		latitudeStart: props.initialCoords?.latitudeStart || 60.161693147166,
		longitudeStart: props.initialCoords?.longitudeStart || 24.938047714233,
		latitudeEnd: props.initialCoords?.latitudeEnd || 60.167993122888,
		longitudeEnd: props.initialCoords?.longitudeEnd || 24.951252288818,
	});

	const { data: vehicles } = useGetApiVehicle(cords, { query: { refetchInterval: 500, queryKey: ["myVehicles"] } });
	const ref = useRef<any>();

	const debouncedSearch = debounce(async () => {
		const bounds = ref.current.getBounds();
		if (!bounds) return;
		const start = bounds.getNorthEast();
		const end = bounds.getSouthWest();
		const newCords: Coords = {
			latitudeStart: end.lat().toFixed(12),
			latitudeEnd: start.lat().toFixed(12),
			longitudeStart: end.lng().toFixed(12),
			longitudeEnd: start.lng().toFixed(12),
		};
		setCords(newCords);
	}, 2000);

	const onBoundsChanged = () => {
		debouncedSearch();
	};

	// get initial box
	const bounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(cords.latitudeStart, cords.longitudeStart),
		new google.maps.LatLng(cords.latitudeEnd, cords.longitudeEnd),
	);

	return (
		<>
			<GoogleMap defaultZoom={14} defaultCenter={{ lat: 60.163693147166, lng: 24.948047714233 }}>
				<Rectangle ref={ref} data-testid="selector" onBoundsChanged={onBoundsChanged} draggable editable defaultBounds={bounds}></Rectangle>
				{vehicles?.map((v) => <Marker label={v.description} position={new google.maps.LatLng(v.latitude, v.longitude)}></Marker>)}
				<TrafficLayer autoUpdate />
			</GoogleMap>
		</>
	);
});
