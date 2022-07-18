import type { NextPage } from "next";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

/// User LongLat Type
type UserLocation = {
	longitude: number;
	latitude: number;
};

const MapHome: NextPage = () => {
	const mapContainer = useRef<any>(null);
	const map = useRef<mapboxgl.Map | any>(null);
	mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? "";

	const [userLocation, setUserLocation] = useState<UserLocation>({
		longitude: 6.675434,
		latitude: 6.675434,
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
		if (map.current) return;

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v11",
			zoom: 16,
			center: [userLocation.longitude, userLocation.latitude],
		});

		map.current.addControl(
			new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true,
				},
				// When active the map will receive updates to the device's location as it changes.
				trackUserLocation: true,
				// Draw an arrow next to the location dot to indicate which direction the device is heading.
				showUserHeading: true,
			})
		);

		
	}, []);

	useEffect(() => {
		if (!map.current) return;
		navigator.geolocation.getCurrentPosition(
			getPositionSuccess,
			getPositionError,
			{ enableHighAccuracy: true }
		);

		map.current.flyTo({
			center: [userLocation.longitude, userLocation.latitude],
			essential: true,
		});

		const marker = new mapboxgl.Marker()
			.setLngLat([userLocation.longitude, userLocation.latitude])
			.addTo(map.current);
	}, [map.current]);

	return (
		<div>
			<div className="h-screen w-full" ref={mapContainer} />
		</div>
	);
};

export default MapHome;
