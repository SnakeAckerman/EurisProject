import { SWRConfig } from 'swr';
import '../styles/global_compiled.css';
import { Providers } from '../app/providers';

export const fetcher = url => fetch(url).then(r => r.json());

export default function App({ Component, pageProps }) {
	return <SWRConfig value={
		{
			fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
		}
	}>
		<Providers>
			<Component {...pageProps} />
		</Providers>
	</SWRConfig>
}