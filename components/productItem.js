import { Card, CardBody, CardHeader, Divider, ScrollShadow } from "@nextui-org/react";

export default function ProductItem({ product }) {

	function productCardOnPress() { }
	console.log(product?.id);
	return <Card isPressable onPress={productCardOnPress} className="max-w-96">
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

}