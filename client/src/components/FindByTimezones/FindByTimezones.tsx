import { Form } from '../utils/Form/Form';
import { FormEvent, useState } from 'react';
import { Input } from '../utils/Input/Input';
import styles from './FindByTimezones.module.css';
import { useSortTimezonesData } from '../../hooks/useSortTimezonesData';

export const FindByTimezones = () => {
	const [error, setError] = useState('');
	const [timezoneOne, setTimezoneOne] = useState('');
	const [timezoneTwo, setTimezoneTwo] = useState('');
	const [result, setResult] = useState<string[]>([]);
	const { sortedData, isLoading } = useSortTimezonesData();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setError('');
		
		if (!timezoneOne || !timezoneTwo) {
			setError('Both fields are required!');
			return;
		}
		const indexOne = sortedData.findIndex(
			(x) => Object.keys(x)[0] === timezoneOne
		);
		const indexTwo = sortedData.findIndex(
			(x) => Object.keys(x)[0] === timezoneTwo
		);
		if (indexOne === -1 || indexTwo === -1) {
			setError('Enter valid timezones!');
			return;
		}
		const res = Array.from(
			new Set(
				sortedData
					.slice(
						Math.min(indexOne, indexTwo),
						Math.max(indexOne, indexTwo) + 1
					)
					.flatMap((x) => Object.values(x)[0])
			)
		);

		setResult(res);
	};

	return (
		<>
			{isLoading ? (
				<h1>Fetching data...</h1>
			) : (
				<Form handleSubmit={handleSubmit} buttonMessage={'Submit'}>
					<h3>Find countries by timezones</h3>
					<Input
						labelText={'Enter timezone 1:'}
						placeholder={'Example "UTC-02:00"'}
						value={timezoneOne}
						setValue={setTimezoneOne}
					/>
					<Input
						labelText={'Enter timezone 2:'}
						placeholder={'Example "UTC+03:00"'}
						value={timezoneTwo}
						setValue={setTimezoneTwo}
					/>
					{error && <p>{error}</p>}
					{result.length > 0 && (
						<div className={styles.resultDiv}>
							{result.map((x, i) => (
								<p key={i}>{x}</p>
							))}
						</div>
					)}
				</Form>
			)}
		</>
	);
};
