export default async function handler(
	req,
	res
) {

	const bodyData = req.body;
	const { data, isLoading } = useSWR(`https://us-central1-test-b7665.cloudfunctions.net/api/stores/${mainStoreId}/products`);

	if (!isLoading) {
		res.status(200).json({ data });
	}

}