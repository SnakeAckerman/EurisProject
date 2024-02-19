import { SWRConfig } from 'swr';
import '../styles/global_compiled.css';
import { Providers } from '../app/providers';

export const getFetcher = async (url) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to get resource');
	}
	return response.json();
};

export const deleteFetcher = async (url) => {
	const response = await fetch(url, { method: 'DELETE' });
	if (!response.ok) {
		throw new Error('Failed to delete resource');
	}
	return true;
};

export const postFetcher = async (url, data) => {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	if (!response.ok) {
		throw new Error('Failed to create resource');
	}
	return response.json();
};

export default function App({ Component, pageProps }) {
	return <SWRConfig value={
		{
			fetcher: (resource, init) => fetch(resource, init).then(res => res.status == 200 && res.json())
		}
	}>
		<Providers>
			<Component {...pageProps} />
		</Providers>
	</SWRConfig>
}