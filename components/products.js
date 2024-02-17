import useSWR from "swr";
import { mainStoreId } from '../app/constants';
import { CardHeader, Divider, ScrollShadow } from "@nextui-org/react";
import { Card, CardBody } from '@nextui-org/react';

export default function Products() {

	const { data, error, isLoading } = useSWR(`https://us-central1-test-b7665.cloudfunctions.net/api/stores/${mainStoreId}/products`);

	function productCardOnPress() { }

	if (isLoading) {
		return (
			<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
				<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
			</div>
		)
	}

	if (data?.length) {

		return (
			<Card className="mx-8">
				<CardHeader className="justify-center">
					<h2 className="text-xl">Products</h2>
				</CardHeader>
				<CardBody>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
						{data.map(product => (
							<Card key={product?.id} isPressable onPress={productCardOnPress} className="max-w-96">
								<CardHeader className="text-lg justify-center">{product?.data?.title}</CardHeader>
								<Divider />
								<CardBody>
									<ScrollShadow className="w-100 h-[100px]">
										{product?.data?.description ? <p>{product?.data?.description}</p> : ''}
									</ScrollShadow>
									{product?.data?.category ? <p className="font-bold text-end">{product?.data?.category}</p> : ''}
									{product?.data?.price ? <p className="font-bold text-end">{product?.data?.price} €</p> : ''}
								</CardBody>
							</Card>
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