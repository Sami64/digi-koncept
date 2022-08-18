import { useEffect } from "react";
import ReactPlayer from "react-player/lazy";

type Props = {
	jobId: string;
	videos: string[] | undefined;
};

const VideosSection: React.FC<Props> = ({ jobId, videos }) => {
	useEffect(() => {
		console.log("Vids", videos);
	}, []);

	return (
		<div className="grid gap-4 grid-cols-3 auto-rows-auto">
			<ReactPlayer
				url={videos ? videos[0] : ""}
				controls
				light
				width={400}
				height={200}
			/>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
			<div>1</div>
		</div>
	);
};

export default VideosSection;
