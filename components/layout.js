import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';
import Shop from './shop';

export const siteTitle = 'Euris Test Project';

export default function Layout({ children, home }) {

	return (
		<>
			<Head>
				<link rel="icon" href="https://www.euris.it/wp-content/themes/website/dist/images/favicon/android-icon-192x192_0b309ebd.png" />
				<meta
					name="description"
					content="Test Project for Euris"
				/>
				<meta
					property="og:image"
					content={`https://www.euris.it/wp-content/themes/website/dist/images/logo_e82c83bd.svg`}
				/>
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
				<link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
			</Head>
			<header className={styles.header}>
				{home ?
					(
						<Shop></Shop>
					) :
					(
						<>
							<Link href="/">
								<Shop></Shop>
							</Link>
						</>
					)}
			</header>
			<main>
				{children}
			</main>
		</>
	);
}