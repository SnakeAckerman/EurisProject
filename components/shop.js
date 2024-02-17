import useSWR from 'swr';
import { mainStoreId } from '../app/constants';

export default function Shop() {

	let shopName = '';

	const { data, error } = useSWR(`https://us-central1-test-b7665.cloudfunctions.net/api/stores/${mainStoreId}`);
	shopName = data?.name;

	return shopName ? <h1 className='text-4xl'>Welcome to <strong>{shopName}</strong></h1> : <h1 className='text-4xl'>Welcome</h1>
}