import useSWR from 'swr';
import { mainStoreId } from '../app/constants';

export default function Shop() {

	let shopName = '';

	const { data, error } = useSWR(`https://us-central1-test-b7665.cloudfunctions.net/api/stores/${mainStoreId}`);
	shopName = data?.name;

	return shopName ? <div>Welcome to {shopName}</div> : <div>Welcome</div>
}