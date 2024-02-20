import {
	Chart as ChartJS,
	RadialLinearScale,
	ArcElement,
	Tooltip,
	Legend,
} from 'chart.js';
import { PolarArea } from "react-chartjs-2";
import useSWR from "swr";
import { getRandomColor, mainStoreId } from "../app/constants";
import { getFetcher } from "./_app";
import { Card, CardBody, CardHeader, CircularProgress, Divider, Link } from "@nextui-org/react";
import { IoArrowBackCircleSharp } from "react-icons/io5";

export default function CategoriesChart() {

	ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
	const { data: rawData, isLoading: isChartLoading } = useSWR(`https://us-central1-test-b7665.cloudfunctions.net/api/stores/${mainStoreId}/stats/categories`, getFetcher)

	const labels = rawData?.map(item => item.category);
	const data = rawData?.map(item => item.numberOfProducts);
	const backgroundColors = labels?.map(() => getRandomColor());

	if (backgroundColors) {
		debugger;
	}

	const chartData = {
		labels: labels,
		datasets: [
			{
				label: '# of Products per Category',
				data: data,
				backgroundColor: [backgroundColors],
				borderWidth: 1,
			},
		],
	};

	return <>
		<Card className="h-dvh">
			<CardHeader className="text-lg justify-between">
				<Link href="/">
					<IoArrowBackCircleSharp size='2rem' />
				</Link>
				<h2 className="w-full text-center me-[32px]">
					Product categories ratio
				</h2>
			</CardHeader>
			<Divider />
			<CardBody>
				<div className="flex justify-center">
					{isChartLoading ?
						<CircularProgress size="lg" aria-label="Loading..." />
						:
						<PolarArea height={100} width={100} data={chartData} />
					}
				</div>
			</CardBody>
		</Card>
	</>

}