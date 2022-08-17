import { useEffect } from "react";

type Props = {
	jobId: string;
};

const VideosSection: React.FC<Props> = ({ jobId }) => {
	useEffect(() => {}, []);

	return (
		<div className="grid gap-4 grid-cols-3 auto-rows-auto">
			<div>1</div>
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
