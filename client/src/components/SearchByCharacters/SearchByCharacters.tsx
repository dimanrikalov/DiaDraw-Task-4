import { Input } from '../utils/Input/Input';
import { useFetch } from '../../hooks/useFetch';
import styles from './SearchByCharacters.module.css';
import { FormEvent, useEffect, useState } from 'react';
import { Form } from '../../components/utils/Form/Form';

export const SearchByCharacters = () => {
	const { data, isLoading } = useFetch();
	const [results, setResults] = useState<{ [key: string]: string[] }[]>([]);
	const [filteredResults, setFilteredResults] = useState<string[]>([]);
	const [input, setInput] = useState('');
	const [shouldHide, setShouldHide] = useState(true);

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
			setShouldHide(false);
			setFilteredResults(res[input[0]]);
		}
	};

	return (
		<>
			{isLoading ? (
				<h1>Fetching data...</h1>
			) : (
				<>
					<Form handleSubmit={handleSubmit} buttonMessage={'Submit'}>
						<h3>Find countries by characters</h3>
						<Input
							labelText={'Enter up to 2 characters'}
							placeholder={'Example "m/mo"'}
							value={input}
							setValue={setInput}
						/>
						<div
							className={styles.resultDiv}
							style={{ display: shouldHide ? 'none' : 'block' }}
						>
							{filteredResults.map((x, i) => (
								<p key={i}>{x}</p>
							))}
						</div>
					</Form>
				</>
			)}
		</>
	);
};
