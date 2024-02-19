import { useRouter } from "next/router";
import useSWR from "swr";
import { mainStoreId } from "../../app/constants";
import { Button, Card, CardBody, CardHeader, CircularProgress, Divider, Link } from "@nextui-org/react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useState } from "react";
import { deleteFetcher, getFetcher } from "../_app";

export default function ProductDetail() {

	const router = useRouter();
	const { id } = router.query;

	const { data: productData, isLoading: isProductLoading } = useSWR(id ? `https://us-central1-test-b7665.cloudfunctions.net/api/stores/${mainStoreId}/products/${id}` : '', getFetcher);
	const [isProductDeleting, setIsProductDeleting] = useState(false);

	const descriptionBlock = productData?.description ? (
		<>
			<div className="flex align-start">
				<p className="w-[100px] shrink-0">Description:</p>
				<strong>{productData.description}</strong>
			</div>
			<Divider className="my-4" />
		</>
	) : '';

	const categoryBlock = productData?.category ? (
		<>
			<div className="flex align-start">
				<p className="w-[100px] shrink-0">Category:</p>
				<strong>{productData.category}</strong>
			</div>
			<Divider className="my-4" />
		</>
	) : '';

	const priceBlock = productData?.price ? (
		<>
			<div className="flex align-start">
				<p className="w-[100px] shrink-0">Price:</p>
				<strong>{
					new Intl.NumberFormat('it-IT', {
						style: 'currency',
						currency: 'EUR'
					}).format(productData.price)
				}</strong>
			</div>
			<Divider className="my-4" />
		</>
	) : '';

	const deleteButtonOnPress = async () => {

		setIsProductDeleting(!isProductDeleting);

		if (id) {

			const deleteResponse = await fetch(`https://us-central1-test-b7665.cloudfunctions.net/api/stores/${mainStoreId}/products/${id}`, { method: 'DELETE' });

			if (deleteResponse.ok) {
				router.push('/');
			}

		}

	}

	return <>
		<Card className="h-dvh">
			<CardHeader className="text-lg justify-between">
				<Link href="/">
					<IoArrowBackCircleSharp size='2rem' />
				</Link>
				<h2 className="w-full text-center me-[32px]">
					{isProductLoading ?
						'Product'
						:
						productData?.title
					}
				</h2>
			</CardHeader>
			<Divider />
			<CardBody>
				{isProductLoading ?
					<div className="flex justify-center">
						<CircularProgress size="lg" aria-label="Loading..." />
					</div>
					:
					<>
						<div className="flex justify-center">
							<div className="md:w-1/2">
								{descriptionBlock}
								{categoryBlock}
								{priceBlock}
							</div>
						</div>
						<div className="flex justify-center">
							{id ? (<Button className="w-[200px]" onPress={deleteButtonOnPress} color="danger" size="lg" isDisabled={isProductDeleting}>{isProductDeleting ? 'Deleting...' : 'Delete'}</Button>) : ''}
						</div>
					</>
				}
			</CardBody>
		</Card>
	</>

}