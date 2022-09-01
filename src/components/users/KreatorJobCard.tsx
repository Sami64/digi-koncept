import { EyeOutlined } from "@ant-design/icons"
import { Card } from "antd"
import { useRouter } from "next/router"
import React from "react"
import { Job } from "../../core/job/types"

const { Meta } = Card

interface Props {
	job: Job
}

const KreatorJobCard: React.FC<Props> = ({ job }) => {
	const router = useRouter()
	const handleClick = async () => {
		router.push(`/categories/${job.category.id}/${job.id}`)
	}
	return (
		<Card
			onClick={handleClick}
			hoverable
			actions={[<EyeOutlined key="eye" onClick={handleClick} />]}
			cover={<img alt="job image" src={job.jobImages[0]} />}
		>
			<Meta title={job.title} description={job.description} />
		</Card>
	)
}

export default KreatorJobCard
