import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import { Button } from '@nextui-org/react';

export default function Home() {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section>
				<Button>Click me</Button>
			</section>
		</Layout>
	);
}