import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { mainStoreId } from '../app/constants';
import { Input, Button, Card, CardHeader, Link, Divider, CardBody } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { IoArrowBackCircleSharp } from 'react-icons/io5';

export default function CreateProduct() {

	const router = useRouter();
	const { register, handleSubmit, trigger, formState: { errors } } = useForm({
		defaultValues: {
			title: '',
			category: '',
			price: 0,
			employee: '',
			description: ''
		}
	});

	const [submitting, setSubmitting] = useState(false);

	const onSubmit = async (data) => {

		try {

			setSubmitting(true);

			const response = await fetch(`https://us-central1-test-b7665.cloudfunctions.net/api/stores/${mainStoreId}/products`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const respondeData = await response.text();

			if (respondeData) {
				router.push(`/${respondeData}/ProductDetail`);
			}

		} catch (error) {
			console.error('Error adding product:', error);
		} finally {
			setSubmitting(false);
		}
	};

	const [isTitleInvalid, setIsTitleInvalid] = useState(false);
	const [isCategoryInvalid, setIsCategoryInvalid] = useState(false);
	const [isPriceInvalid, setIsPriceInvalid] = useState(false);
	const [isEmployeeInvalid, setIsEmployeeInvalid] = useState(false);
	const [isDescriptionInvalid, setIsDescriptionInvalid] = useState(false);

	const fieldOnChange = async () => {

		const titleValid = await trigger('title');
		setIsTitleInvalid(!titleValid);
		const categoryValid = await trigger('category');
		setIsCategoryInvalid(!categoryValid);
		const priceValid = await trigger('price');
		setIsPriceInvalid(!priceValid);
		const employeeValid = await trigger('employee');
		setIsEmployeeInvalid(!employeeValid);
		const descriptionValid = await trigger('description');
		setIsDescriptionInvalid(!descriptionValid);

	}

	return (
		<Card className="h-dvh">
			<CardHeader className="text-lg justify-between">
				<Link href="/">
					<IoArrowBackCircleSharp size='2rem' />
				</Link>
				<h2 className="w-full text-center me-[32px]">
					New product
				</h2>
			</CardHeader>
			<Divider />
			<CardBody>
				<div className="flex justify-center">
					<div className="md:w-1/2">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="mb-4">
								<Input
									isInvalid={isTitleInvalid}
									onValueChange={fieldOnChange}
									isRequired
									label="Title"
									type="text"
									name="title"
									id="title"
									{...register("title", { required: 'The title is required', maxLength: 20 })}
								/>
							</div>
							<div className="mb-4">
								<Input
									isInvalid={isCategoryInvalid}
									onValueChange={fieldOnChange}
									isRequired
									label="Category"
									type="text"
									name="category"
									id="category"
									{...register("category", { required: 'The category is required', maxLength: 20 })}
								/>
							</div>
							<div className="mb-4">
								<Input
									isInvalid={isPriceInvalid}
									onValueChange={fieldOnChange}
									isRequired
									label="Price"
									type="number"
									name="price"
									id="price"
									{...register("price", {
										required: 'The price is required',
										min: {
											value: 0,
											message: 'The minimum price is 0'
										}
									})}
								/>
							</div>
							<div className="mb-4">
								<Input
									isInvalid={isEmployeeInvalid}
									onValueChange={fieldOnChange}
									label="Employee"
									type="text"
									name="employee"
									id="employee"
									{...register("employee", {
										maxLength: {
											value: 20,
											message: 'The employee name max length is 20'
										}
									})}
								/>
							</div>
							<div className="mb-4">
								<Input
									isInvalid={isDescriptionInvalid}
									onValueChange={fieldOnChange}
									label="Description"
									type="text"
									name="description"
									id="description"
									{...register("description", {
										maxLength: {
											value: 40,
											message: 'The description name max length is 40'
										}
									})}
								/>
							</div>
							<div className='flex justify-center'>
								<Button type="submit" size='lg' color='primary' disabled={submitting}>
									Save
								</Button>
							</div>
						</form>
					</div>
				</div>
			</CardBody>
		</Card>
	);

}