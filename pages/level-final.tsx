import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/LevelOne.module.css'
import { useState } from 'react'
import Cookies from 'cookies';

const LevelThree: NextPage<{ url: string | null }> = ({ url }) => {
	const [input, setInput] = useState('');
	const [error, setError] = useState(false);

	const handleSubmit = async () => {
		const resp = await fetch(`/api/level-final-guess?guess=${encodeURIComponent(input)}`);

		if (resp.status === 200) {
			window.location.pathname = "/congrats";
		} else {
			setError(true);
		}
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Level 3</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Puzzle 3
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

export function getServerSideProps(context: any) {
	const { req, res } = context;

	const cookies = new Cookies(req, res);

	const levelThree = cookies.get('level-three-ans');

	if (process.env.LEVEL_THREE_ANS && levelThree === process.env.LEVEL_THREE_ANS) {
		return {
			props: {
				url: process.env.LEVEL_FINAL_URL || null,
			}
		}
	}

	return {
		redirect: {
			permanent: false,
			destination: '/level-3',
		}
	}
}

export default LevelThree;
