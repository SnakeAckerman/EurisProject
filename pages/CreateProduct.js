import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

export default function CreateProduct() {

	const validationSchema = Yup.object({
		title: Yup.string().required('Title is required'),
		category: Yup.string().required('Category is required'),
		price: Yup.number().min(1).required('Price is required'),
		employee: Yup.string(),
		description: Yup.string(),
	});

	/* HandleOnSubmit */
	const onSubmit = async (data) => {
		try {
			const res = await fetch('/api/items', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})
			const newItem = await res.json()
			console.log(newItem)
			// log the newly created item to the console
		} catch (error) {
			console.error(error)
		}
	}

	const renderError = (message) => <p className="help is-danger">{message}</p>;

	return (
		<Formik
			validationSchema={validationSchema}
			onSubmit={async (values, { resetForm }) => {
				await onSubmit(values);
				resetForm();
			}}
		>
			<Form>
				<div className="field">
					<label className="label" htmlFor="title">
						Title *
					</label>
					<div className="control">
						<Field
							name="title"
							type="text"
							className="input"
							placeholder="Title"
						/>
						<ErrorMessage name="title" render={renderError} />
					</div>
				</div>
				<div className="field">
					<label className="label" htmlFor="category">
						Category *
					</label>
					<div className="control">
						<Field
							name="category"
							type="text"
							className="input"
							placeholder="Category"
						/>
						<ErrorMessage name="category" render={renderError} />
					</div>
				</div>
				<div className="field">
					<label className="label" htmlFor="price">
						Price *
					</label>
					<div className="control">
						<Field
							name="price"
							type="number"
							className="input"
							placeholder="Price"
						/>
						<ErrorMessage name="price" render={renderError} />
					</div>
				</div>
				<div className="field">
					<label className="label" htmlFor="employee">
						Employee
					</label>
					<div className="control">
						<Field
							name="employee"
							type="text"
							className="input"
							placeholder="Employee"
						/>
						<ErrorMessage name="employee" render={renderError} />
					</div>
				</div>
				<div className="field">
					<label className="label" htmlFor="description">
						Description
					</label>
					<div className="control">
						<Field
							name="description"
							type="text"
							className="input"
							placeholder="Description"
						/>
						<ErrorMessage name="description" render={renderError} />
					</div>
				</div>
				<button type="submit" className="button is-primary">
					Submit
				</button>
			</Form>
		</Formik>
	)

}