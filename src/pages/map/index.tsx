import { BriefcaseIcon, PhoneIcon, UserIcon } from "@heroicons/react/outline";
import "mapbox-gl/dist/mapbox-gl.css";
import type {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from "next";
import Image from "next/image";
import { Ref, useEffect, useMemo, useRef, useState } from "react";
import Map, { GeolocateControl, MapRef, Marker, Popup } from "react-map-gl";
import bannerImg from "../../../public/slider1.jpg";
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
				ref={mapRef as Ref<MapRef>}
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
						className="w-full"
					>
						<Image
							src={bannerImg}
							layout="fill"
							objectFit="cover"
							className="h-2/4"
						/>
						<div className="relative backdrop-opacity-10 bg-black/70 rounded-xl shadow-2xl w-full p-4">
							<h1 className="text-lg flex items-center text-white font-bold my-2">
								<BriefcaseIcon className="h-5 mr-2 flex-none" />
								<span className="line-clamp-1 flex-1">
									Title Name asdwasd asdasdasdasdasdefassdasdasdsad
								</span>
							</h1>
							<h1 className="text-lg flex items-center text-white font-bold my-2">
								<PhoneIcon className="h-5 mr-2 flex-none" />
								<span>+233501083601</span>
							</h1>
							<h1 className="text-lg flex items-center text-white font-bold my-2">
								<UserIcon className="h-5 mr-2 flex-none" />
								<span>Samuel Paintsil</span>
							</h1>
							<button className="bg-digi_primary w-full hover:border-white hover:border-2 hover:shadow-lg rounded-lg text-lg uppercase font-bold text-white hover:bg-transparent">
								More
							</button>
						</div>
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
