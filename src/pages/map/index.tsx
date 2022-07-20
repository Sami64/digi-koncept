import type { NextPage } from "next";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef, useState } from "react";
import Map, { GeolocateControl, MapRef } from "react-map-gl";
import { UserLocation } from "../../core/users/types";


const MapHome: NextPage = () => {
	const mapRef = useRef<MapRef>();
	
	const [userLocation, setUserLocation] = useState<UserLocation>({
		longitude: 6.675434,
		latitude: 6.675434,
	});

	const [viewState, setViewState] = useState({
		longitude: userLocation.longitude,
		latitude: userLocation.latitude,
		zoom: 10,
	});

	const getPositionSuccess = (position: GeolocationPosition) => {
		console.log("position success");
		setUserLocation({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
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
			</Map>
		</>
	);
};

export default MapHome;
