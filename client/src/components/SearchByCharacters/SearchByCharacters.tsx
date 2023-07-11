import { FormEvent, useState } from 'react';
import { Input } from '../utils/Input/Input';
import styles from './SearchByCharacters.module.css';
import { Form } from '../../components/utils/Form/Form';
import { useSortDataAlphabetically } from '../../hooks/useSortDataAlphabetically';

export const SearchByCharacters = () => {
	const [input, setInput] = useState('');
	const { sortedData, isLoading } = useSortDataAlphabetically();
	const [filteredResults, setFilteredResults] = useState<string[]>([]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!input && input.length > 2) {
			return;
		}
		const res = sortedData.find((x) => input[0] === Object.keys(x)[0]);
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
		<>
			{isLoading ? (
				<h1>Fetching data...</h1>
			) : (
				<Form handleSubmit={handleSubmit} buttonMessage={'Submit'}>
					<h3>Find countries by characters</h3>
					<Input
						labelText={'Enter up to 2 characters'}
						placeholder={'Example "m/mo"'}
						value={input}
						setValue={setInput}
					/>
					{filteredResults.length > 0 && (
						<div className={styles.resultDiv}>
							{filteredResults.map((x, i) => (
								<p key={i}>{x}</p>
							))}
						</div>
					)}
				</Form>
			)}
		</>
	);
};
