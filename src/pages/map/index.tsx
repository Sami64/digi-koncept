import "mapbox-gl/dist/mapbox-gl.css";
import type {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from "next";
import { useEffect, useMemo, useRef, useState } from "react";
import Map, { GeolocateControl, MapRef, Marker, Popup } from "react-map-gl";
import { JobLocation } from "../../core/job/types";
import { UserLocation } from "../../core/users/types";
import { retrieveJobLocations } from "../../modules/jobs/retrieve";

const MapHome: NextPage = ({
	jobLocations,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const mapRef = useRef<MapRef>();
	const [popupInfo, setPopupInfo] = useState<JobLocation | null>(null);

	const pins = useMemo(
		() =>
			jobLocations.map((location: JobLocation) => (
				<Marker
					key={location.id}
					latitude={location.lat}
					longitude={location.lng}
					anchor="bottom"
					onClick={(e) => {
						e.originalEvent.stopPropagation();
						setPopupInfo(location);
					}}
				>
					<p className="cursor-pointer text-6xl animate-bounce">🕴 </p>
				</Marker>
			)),
		[]
	);

	const [userLocation, setUserLocation] = useState<UserLocation>({
		longitude: 6.675434,
		latitude: 6.675434,
	});

	const [viewState, setViewState] = useState({
		longitude: userLocation.longitude,
		latitude: userLocation.latitude,
		zoom: 16,
	});

	const getPositionSuccess = (position: GeolocationPosition) => {
		console.log("position success");
		setUserLocation({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		});

		setViewState({
			longitude: userLocation.longitude,
			latitude: userLocation.latitude,
			zoom: 16,
		});
	};

	const getPositionError = () => {
		setUserLocation({ longitude: 4, latitude: 10 });
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			getPositionSuccess,
			getPositionError,
			{ enableHighAccuracy: true }
		);
	}, []);

	const onMapLoad = () => {
		console.log(userLocation);

		mapRef?.current?.flyTo({
			center: [userLocation.longitude, userLocation.latitude],
			essential: true,
		});
	};

	return (
		<>
			<Map
				{...viewState}
				ref={mapRef}
				onMove={(evt) => setViewState(evt.viewState)}
				onLoad={onMapLoad}
				mapStyle="mapbox://styles/mapbox/streets-v11"
				style={{ width: "100vw", height: "100vh" }}
				mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN}
			>
				<GeolocateControl showUserHeading={true} />

				{pins}

				{popupInfo && (
					<Popup
						anchor="top"
						longitude={popupInfo.lng}
						latitude={popupInfo.lat}
						onClose={() => setPopupInfo(null)}
					>
						<p>It is pop up</p>
					</Popup>
				)}
			</Map>
		</>
	);
};

export default MapHome;

export const getServerSideProps: GetServerSideProps = async () => {
	const jobLocations: JobLocation[] = await retrieveJobLocations();
	return {
		props: { jobLocations },
	};
};
