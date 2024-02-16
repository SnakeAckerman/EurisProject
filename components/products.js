import useSWR from "swr";
import { mainStoreId } from '../app/constants';
import { Button } from "@nextui-org/react";
import styles from "./products.module.css";

export default function Products() {

	const { data, error } = useSWR(`https://us-central1-test-b7665.cloudfunctions.net/api/stores/${mainStoreId}/products`);

	if (data?.length) {

		return (
			<div className={styles.productsContainer}>
				{data.map(product => (
					<Button color="primary" size="lg" className={styles.productItem}>
						{product?.data?.title}
					</Button>
				))}
			</div>
		)

	}
	else {
		return <div>No results here</div>
	}

}