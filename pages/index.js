import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import { Button } from '@nextui-org/react';
import Products from '../components/products';

export default function Home() {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className='flex justify-center font-sans py-8'>
				<Products></Products>
			</section>
		</Layout>
	);
}