import { Image } from "antd";
import React from "react";

const MultiImagePreview: React.FC = () => {
	return (
		<div className="grid gap-4 grid-cols-3 auto-rows-auto">
			<Image.PreviewGroup>
				<Image
					width={200}
					src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
				/>
				<Image
					width={200}
					src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
				/>
				<Image
					width={200}
					src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
				/>
				<Image
					width={200}
					src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
				/>
			</Image.PreviewGroup>
		</div>
	);
};

export default MultiImagePreview;
