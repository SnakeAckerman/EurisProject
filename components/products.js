import useSWR from "swr";
import { mainStoreId } from '../app/constants';
import { Button, CardHeader, CircularProgress } from "@nextui-org/react";
import { Card, CardBody } from '@nextui-org/react';
import ProductItem from "./productItem";
import { useState } from "react";
import { BsGrid3X3GapFill, BsList } from 'react-icons/bs';
import { FaChartPie } from "react-icons/fa";

export default function Products() {

	const [toggleViewMode, setToggleViewMode] = useState(true);
	const { data, isLoading } = useSWR(`https://us-central1-test-b7665.cloudfunctions.net/api/stores/${mainStoreId}/products`);

	if (isLoading) {
		return (
			<div className="flex justify-center">
				<CircularProgress size="lg" aria-label="Loading..." />
			</div>
		)
	}

	if (data?.length) {

		const viewModeClasses = toggleViewMode ? 'grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3' : 'grid-cols-1';

		return (
			<Card className="mx-8 md:w-1/2">
				<CardHeader className="justify-between">
					<Button onClick={() => setToggleViewMode(!toggleViewMode)}>
						{toggleViewMode ? <BsGrid3X3GapFill /> : <BsList />}
					</Button>
					<h2 className="text-xl">Products</h2>
					<Button onClick={() => { }}>
						<FaChartPie />
					</Button>
				</CardHeader>
				<CardBody>
					<div className={`grid ${viewModeClasses} gap-4`}>
						{data.map(product => (
							<ProductItem key={product?.id} product={product}></ProductItem>
						))}
					</div>
				</CardBody>
			</Card>
		)

	}
	else {
		return <div>No results here</div>
	}

}