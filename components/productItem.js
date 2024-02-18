'use client';

import { Card, CardBody, CardHeader, Divider, ScrollShadow } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function ProductItem({ product }) {

	const router = useRouter();
	function productCardOnPress() { router.push(`/${product?.id}/ProductDetail`) }

	return <Card isPressable productId={product?.id} onPress={productCardOnPress}>
		<CardHeader className="text-lg justify-center">{product?.data?.title}</CardHeader>
		<Divider />
		<CardBody>
			<ScrollShadow className="w-full h-[100px]">
				{product?.data?.description ? <p>{product.data.description}</p> : ''}
			</ScrollShadow>
			{product?.data?.category ? <p className="font-bold text-end">{product.data.category}</p> : ''}
			{product?.data?.price ? <p className="font-bold text-end">{
				new Intl.NumberFormat('it-IT', {
					style: 'currency',
					currency: 'EUR'
				}).format(product.data.price)
			}</p> : ''}
		</CardBody>
	</Card>

}