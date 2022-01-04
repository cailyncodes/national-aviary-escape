import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/LevelOne.module.css'
import { useState } from 'react'
import Cookies from 'cookies';

const LevelTwo: NextPage<{ url: string | null }> = ({ url }) => {
	const [input, setInput] = useState('');
	const [error, setError] = useState(false);

	const handleSubmit = async () => {
		const resp = await fetch(`/api/level-two-guess?guess=${encodeURIComponent(input)}`);

		if (resp.status === 200) {
			window.location.pathname = "/level-3";
		} else {
			setError(true);
		}
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Level 2</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Puzzle 2
				</h1>

				<p className={styles.description}>
					<a href={url || ''}>{url ? "Instructions" : "THERE WAS AN ERROR - PLEASE TALK TO CAILYN"}</a>
				</p>

				<div>
					<label htmlFor="input">Guess:{' '}</label>
					<input name="input" defaultValue={input} onInput={e => setInput((e.target as any).value)} />
					<br />
					<br />
					<div style={{ margin: "0 auto", width: "min-content" }}>
						<button onClick={handleSubmit}>Submit</button>
						
					</div>
					<br />
					<div style={{ textAlign: "center" }}>{error && "That was incorrect. Try again."}</div>
				</div>
			</main>
		</div>
	)
}

export function getServerSideProps({ req, res }) {

	const cookies = new Cookies(req, res);

	const levelOne = cookies.get('level-one-ans');

	if (process.env.LEVEL_ONE_ANS && levelOne === process.env.LEVEL_ONE_ANS) {
		return {
			props: {
				url: process.env.LEVEL_TWO_URL || null,
			}
		}
	}

	return {
		redirect: {
			permanent: false,
			destination: '/level-1',
		}
	}
}

export default LevelTwo;
