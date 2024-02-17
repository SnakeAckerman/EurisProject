import useSWR from "swr";
import { mainStoreId } from '../app/constants';
import { Button, CardHeader } from "@nextui-org/react";
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
			<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
				<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
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