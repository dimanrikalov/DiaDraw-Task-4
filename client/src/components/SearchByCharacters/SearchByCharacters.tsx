import { Button } from '../utils/Button/Button';
import { useFetch } from '../../hooks/useFetch';
import styles from './SearchByCharacters.module.css';
import { FormEvent, useEffect, useState } from 'react';

export const SearchByCharacters = () => {
	const { data, isLoading } = useFetch();
	const [input, setInput] = useState('');
	const [results, setResults] = useState<{ [key: string]: string[] }[]>([]);
	const [filteredResults, setFilteredResults] = useState<string[]>([]);

	useEffect(() => {
		if (!isLoading) {
			const updatedResults: { [key: string]: string[] }[] = [];

			data.forEach((x) => {
				const stringArr = x.name.common.toLowerCase().split('');

				stringArr.forEach((letter: string) => {
					const found = updatedResults.find(
						(x) => Object.keys(x)[0] === letter
					);

					if (found) {
						const key = Object.keys(found)[0];
						if (!found[key].includes(x.name.common)) {
							found[key] = [...found[key], x.name.common];
						}
					} else {
						updatedResults.push({
							[letter]: [x.name.common],
						});
					}
				});
			});

			setResults(updatedResults);
		}
	}, [data, isLoading]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!input && input.length > 2) {
			return;
		}

		const res = results.find((x) => input[0] === Object.keys(x)[0]);
		if (res) {
			if (input.length > 1) {
				const realRes = Object.values(res)[0].filter((x: string) => {
					return x.toLowerCase().includes(input.toLowerCase());
				});
				setFilteredResults(realRes);
				return;
			}
			setFilteredResults(res[input[0]]);
		}
	};

	return (
		<div className={styles.container}>
			{isLoading ? (
				<h1>Fetching data...</h1>
			) : (
				<form onSubmit={handleSubmit} className={styles.formContainer}>
					<h3>Find countries by characters</h3>
					<div className={styles.inputDiv}>
						<label htmlFor="input">
							Enter characters to search for:
						</label>
						<input
							type="text"
							id="input"
							placeholder="Enter up to 2 characters"
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
					</div>
					<Button message={'Find countries'} />
					<div className={styles.resultDiv}>
						{filteredResults.map((x, i) => (
							<p key={i}>{x}</p>
						))}
					</div>
				</form>
			)}
		</div>
	);
};
