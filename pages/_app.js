import { SWRConfig } from 'swr';
import '../styles/global_compiled.css';
import { Providers } from '../app/providers';

export const fetcher = url => fetch(url).then(r => r.json());
export const deleteFetcher = url => fetch(url, { method: 'DELETE' }).then(r => r.json());

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