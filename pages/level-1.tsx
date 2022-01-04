import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/LevelOne.module.css'
import { useState } from 'react'

const LevelOne: NextPage = ({ url }) => {
	const [input, setInput] = useState('');
	const [error, setError] = useState(false);

	const handleSubmit = async () => {
		const resp = await fetch(`/api/level-one-guess?guess=${encodeURIComponent(input)}`);

		if (resp.status === 200) {
			window.location.pathname = "/level-2";
		} else {
			setError(true);
		}
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Level 1</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Puzzle 1
				</h1>

				<p className={styles.description}>
					<a href={url || ''}>{url ? "Instructions" : "THERE WAS AN ERROR - PLEASE TALK TO CAILYN"}</a>
				</p>

				<div>
					<label htmlFor="input">Guess:{' '}</label>
					<input name="input" defaultValue={input} onInput={e => setInput(e.target.value)} />
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

export function getServerSideProps() {
	return {
		props: {
			url: process.env.LEVEL_ONE_URL || null,
		}
	}
}

export default LevelOne
