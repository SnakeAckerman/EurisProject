import { SWRConfig } from 'swr';
import '../styles/global.css';

export const fetcher = url => fetch(url).then(r => r.json());

export default function App({ Component, pageProps }) {
	return <SWRConfig value={{
		fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
	}}>
		<Component {...pageProps} />;
	</SWRConfig>
}