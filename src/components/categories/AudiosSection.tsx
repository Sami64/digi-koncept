import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"

interface Props {
	jobId: string
	audios: string[] | undefined
}

const AudiosSection: React.FC<Props> = ({ jobId, audios }) => {
	console.log("audios", audios)
	return (
		<div className="grid gap-4 grid-cols-3 auto-rows-auto">
			{audios?.map((audio, index) => (
				<>
					<AudioPlayer src={audio} key={index} volume={0.5} />
				</>
			))}
		</div>
	)
}

export default AudiosSection
