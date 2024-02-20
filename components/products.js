import useSWR from "swr";
import { mainStoreId } from '../app/constants';
import { Button, CardHeader, CircularProgress, Link } from "@nextui-org/react";
import { Card, CardBody } from '@nextui-org/react';
import ProductItem from "./productItem";
import { useState } from "react";
import { BsGrid3X3GapFill, BsList } from 'react-icons/bs';
import { FaPlusCircle } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa";
import { getFetcher } from "../pages/_app";

export default function Products() {

	const [toggleViewMode, setToggleViewMode] = useState(true);
	const { data: productsData, isLoading: isProductsLoading } = useSWR(`https://us-central1-test-b7665.cloudfunctions.net/api/stores/${mainStoreId}/products`, getFetcher);

	if (isProductsLoading) {
		return (
			<div className="flex justify-center">
				<CircularProgress size="lg" aria-label="Loading..." />
			</div>
		)
	}

	if (productsData?.length) {

		const viewModeClasses = toggleViewMode ? 'grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3' : 'grid-cols-1';

		return (
			<Card className="mx-8 md:w-1/2">
				<CardHeader className="justify-between">
					<Button color="primary" onClick={() => setToggleViewMode(!toggleViewMode)}>
						{toggleViewMode ? <BsGrid3X3GapFill /> : <BsList />}
					</Button>
					<div className="flex flex-col items-center">
						<h2 className="text-xl">Products</h2>
						<Link href="/CreateProduct">
							<FaPlusCircle size='2rem' />
						</Link>
					</div>
					<Button
						href="/CategoriesChart"
						as={Link}
						color="primary"
						variant="solid"
					>
						<FaChartPie />
					</Button>
				</CardHeader>
				<CardBody>
					<div className={`grid ${viewModeClasses} gap-4`}>
						{productsData.map(product => (
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