import type { NextPage } from "next";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

const MapHome: NextPage = () => {
	const mapContainer = useRef<any>(null);
	const map = useRef<mapboxgl.Map | any>(null);

	useEffect(() => {
		mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? "";
		if (map.current) return;

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/light-v10",
			zoom: 16,
			center: [-1.5838873, 6.675434],
		});
	}, []);

	return (
		<div>
			<div className="h-screen w-full" ref={mapContainer} />
		</div>
	);
};

export default MapHome;
