import { useRouter } from "next/router";
import useSWR from "swr";
import { mainStoreId } from "../../app/constants";
import { Card, CardBody, CardHeader, CircularProgress, Divider, Link } from "@nextui-org/react";
import { IoArrowBackCircleSharp } from "react-icons/io5";

export default function ProductDetail() {

	const router = useRouter();
	const { id } = router.query;

	const { data, isLoading } = useSWR(`https://us-central1-test-b7665.cloudfunctions.net/api/stores/${mainStoreId}/products/${id}`);

	const descriptionBlock = data?.description ? (
		<>
			<div className="flex align-start">
				<p className="w-[100px] shrink-0">Description:</p>
				<strong>{data.description}</strong>
			</div>
			<Divider className="my-4" />
		</>
	)
		: '';

	const categoryBlock = data?.category ? (
		<>
			<div className="flex align-start">
				<p className="w-[100px] shrink-0">Category:</p>
				<strong>{data.category}</strong>
			</div>
			<Divider className="my-4" />
		</>
	)
		: '';

	const priceBlock = data?.price ? (
		<>
			<div className="flex align-start">
				<p className="w-[100px] shrink-0">Price:</p>
				<strong>{
					new Intl.NumberFormat('it-IT', {
						style: 'currency',
						currency: 'EUR'
					}).format(data.price)
				}</strong>
			</div>
			<Divider className="my-4" />
		</>
	)
		: '';

	return <>
		<Card className="h-dvh">
			<CardHeader className="text-lg justify-between">
				<Link href="/">
					<IoArrowBackCircleSharp size='2rem' />
				</Link>
				<h2 className="w-full text-center me-[32px]">
					{isLoading ?
						'Product'
						:
						data?.title
					}
				</h2>
			</CardHeader>
			<Divider />
			<CardBody>
				<div className="flex justify-center">
					<div className="md:w-1/2">
						{isLoading ?
							<div className="flex justify-center">
								<CircularProgress size="lg" aria-label="Loading..." />
							</div>
							: ''}
						{descriptionBlock}
						{categoryBlock}
						{priceBlock}
					</div>
				</div>
				{/* DELETE BUTTON */}
			</CardBody>
		</Card>
	</>

}