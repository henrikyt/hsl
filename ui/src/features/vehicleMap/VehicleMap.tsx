import { useRef, useState } from "react";
import { GoogleMap, Rectangle, withGoogleMap, withScriptjs, Marker } from "react-google-maps";
import { compose, withProps } from "recompose";
import { useGetApiSession, useGetApiVehicle } from "../../api/gen";
import debounce from "lodash/debounce";
import { initial } from "lodash";

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
		containerElement: <div style={{ height: `800px` }} />,
		mapElement: <div style={{ height: `100%` }} />,
	}),
	withScriptjs,
	withGoogleMap,
)((props) => {
	const [cords, setCords] = useState<Coords>(
		(props as any).initialCoords ?? {
			latitudeStart: 60.161693147166,
			longitudeStart: 24.938047714233,
			latitudeEnd: 60.167993122888,
			longitudeEnd: 24.951252288818,
		},
	);
	// typing error in generation?
	const { data: vehicles } = useGetApiVehicle(cords, { query: { refetchInterval: 500, queryKey: ["myVehicles"] } });
	const ref = useRef<any>();

	const debouncedSearch = debounce(async () => {
		const bounds = ref.current.getBounds();
		if (!bounds) return;
		const newCords: Coords = {
			latitudeStart: bounds.Va.lo.toFixed(12),
			latitudeEnd: bounds.Va.hi.toFixed(12),
			longitudeStart: bounds.Ja.lo.toFixed(12),
			longitudeEnd: bounds.Ja.hi.toFixed(12),
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
				<Rectangle ref={ref} onBoundsChanged={onBoundsChanged} draggable editable defaultBounds={bounds}></Rectangle>
				{vehicles?.splice(0, 300).map((v) => <Marker label={v.description} position={new google.maps.LatLng(v.latitude, v.longitude)}></Marker>)}
			</GoogleMap>
			{vehicles && vehicles?.length > 300 && <p>only 300 shown for perf reasons!</p>}
		</>
	);
});
