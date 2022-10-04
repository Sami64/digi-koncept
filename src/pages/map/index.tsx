import { BriefcaseIcon, PhoneIcon, UserIcon } from "@heroicons/react/outline"
import { isPointWithinRadius } from "geolib"
import "mapbox-gl/dist/mapbox-gl.css"
import type {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from "next"
import Image from "next/image"
import { Ref, useEffect, useMemo, useRef, useState } from "react"
import Map, { GeolocateControl, MapRef, Marker, Popup } from "react-map-gl"
import { retrieveKreators } from "../../modules/users/retrieve"

import { useRouter } from "next/router"
import { JobLocation } from "../../core/job/types"
import { Kreator, UserLocation } from "../../core/users/types"
import { retrieveJobLocations } from "../../modules/jobs/retrieve"

const MapHome: NextPage = ({
	jobLocations,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const mapRef = useRef<MapRef>()
	const [userLocation, setUserLocation] = useState<UserLocation>({
		longitude: 6.675434,
		latitude: 6.675434,
	})
	const [popupInfo, setPopupInfo] = useState<{
		id: string
		lat: number
		lng: number
		kreator: Kreator
	} | null>(null)

	const router = useRouter()

	const pins = useMemo(() => {
		let filteredLocations: {
			id: string
			lat: number
			lng: number
			kreator: Kreator
		}[] = []

		console.log('memo locations', jobLocations)
		console.log('user location', userLocation)

		jobLocations.forEach(
			async  (location: {
				id: string
				lat: number
				lng: number
				kreator: Kreator
			}) => {
				if (
					 isPointWithinRadius(
						{ latitude: location.lat, longitude: location.lng },
						userLocation,
						25000
					)
				) {
					filteredLocations.push(location)

				}
				console.log('locations', filteredLocations)
			}
		)

		return filteredLocations.map(
			(location: {
				id: string
				lat: number
				lng: number
				kreator: Kreator
			}) => (
				<Marker
					key={location.id}
					latitude={location.lat}
					longitude={location.lng}
					anchor="bottom"
					onClick={(e) => {
						e.originalEvent.stopPropagation()
						setPopupInfo(location)
					}}
				>
					<p className="cursor-pointer text-6xl animate-bounce">
						{" "}
						{location.kreator.category.title === "music"
							? "🎶"
							: location.kreator.category.title === "photography"
							? "📷"
							: location.kreator.category.title === "logo design"
							? "💠"
							: location.kreator.category.title === "song writing"
							? "✍"
							: location.kreator.category.title === "voice-over"
							? "🎙"
							: location.kreator.category.title === "animation"
							? "🎞"
							: location.kreator.category.title === "audio editing"
							? "🎧"
							: location.kreator.category.title === "3d modelling"
							? "📐"
							: location.kreator.category.title === "beat making"
							? "🎹"
							: location.kreator.category.title === "graphic design"
							? "🎨"
							: location.kreator.category.title === "sculpting"
							? "🗿"
							: "🎨"}{" "}
					</p>
				</Marker>
			)
		)
	}, [userLocation, jobLocations])

	const [viewState, setViewState] = useState({
		longitude: userLocation.longitude,
		latitude: userLocation.latitude,
		zoom: 16,
	})

	const getPositionSuccess = (position: GeolocationPosition) => {
		console.log("position success")
		setUserLocation({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		})

		setViewState({
			longitude: userLocation.longitude,
			latitude: userLocation.latitude,
			zoom: 16,
		})
	}

	const getPositionError = () => {
		setUserLocation({ longitude: 4, latitude: 10 })
	}

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			getPositionSuccess,
			getPositionError,
			{ enableHighAccuracy: true }
		)
	}, [])

	const onMapLoad = () => {
		console.log(userLocation)

		mapRef?.current?.flyTo({
			center: [userLocation.longitude, userLocation.latitude],
			essential: true,
		})

		mapRef?.current?.flyTo({
			center: [userLocation.longitude, userLocation.latitude],
			essential: true,
		})
	}

	return (
		<>
			<Map
				{...viewState}
				ref={mapRef as Ref<MapRef>}
				onMove={(evt) => setViewState(evt.viewState)}
				onLoad={onMapLoad}
				mapStyle="mapbox://styles/mapbox/streets-v11"
				style={{ width: "100vw", height: "100vh" }}
				mapboxAccessToken={
					"pk.eyJ1Ijoic21hc2hicm9zNTQiLCJhIjoiY2w1anM0ZnI1MDMyaDNqbzRqYmV5cmk4ZSJ9.lsXunh4hppfw6EwrJ5UICA"
				}
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
							src="https://images.unsplash.com/photo-1550418290-a8d86ad674a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
							layout="fill"
							objectFit="cover"
							className="h-2/4"
						/>
						<div className="relative backdrop-opacity-10 bg-black/70 rounded-xl shadow-2xl w-full p-4">
							<h1 className="text-lg flex items-center text-white font-bold my-2">
								<BriefcaseIcon className="h-5 mr-2 flex-none" />
								<span className="line-clamp-1 flex-1 capitalize">
									{popupInfo.kreator.category.title}
								</span>
							</h1>
							<h1 className="text-lg flex items-center text-white font-bold my-2">
								<PhoneIcon className="h-5 mr-2 flex-none" />
								<span>{popupInfo.kreator.phone}</span>
							</h1>
							<h1 className="text-lg flex items-center text-white font-bold my-2">
								<UserIcon className="h-5 mr-2 flex-none" />
								<span>{popupInfo.kreator.name}</span>
							</h1>
							<button
								onClick={() => router.push(`/kreator/${popupInfo.kreator.id}`)}
								className="bg-digi_primary w-full hover:border-white hover:border-2 hover:shadow-lg rounded-lg text-lg uppercase font-bold text-white hover:bg-transparent"
							>
								More
							</button>
						</div>
					</Popup>
				)}
			</Map>
		</>
	)
}

export default MapHome

export const getServerSideProps: GetServerSideProps = async () => {
	let jobLocations: {
		id: string
		lat: number
		lng: number
		kreator: Kreator
	}[] = []

	const locations: JobLocation[] = await retrieveJobLocations()
	console.log('retrieved', locations)
	const kreators: Kreator[] = await retrieveKreators()
	locations.forEach((location) => {
		let k = kreators.filter((kreator) => kreator.id === location.id)
		k.forEach((creator) => {
			jobLocations.push({
				...location,
				kreator: creator,
			})
		})
	})

	console.log('job locatios', jobLocations)

	return {
		props: { jobLocations },
	}
}
