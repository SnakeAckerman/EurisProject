import useSWR from 'swr';

export default function Shop() {

	const mainStoreId = 'ijpxNJLM732vm8AeajMR';
	let shopName = '';

	const { data, error } = useSWR(`https://us-central1-test-b7665.cloudfunctions.net/api/stores/${mainStoreId}`);
	shopName = data?.name;

	if (shopName) {
		return <div>Welcome to {shopName}</div>
	}
	else {
		return <div>Welcome</div>
	}
}