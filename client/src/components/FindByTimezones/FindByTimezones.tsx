import { Form } from '../utils/Form/Form';
import { Input } from '../utils/Input/Input';
import { useFetch } from '../../hooks/useFetch';
import styles from './FindByTimezones.module.css';
import { FormEvent, useEffect, useState } from 'react';
import {
	extractNegativeValues,
	extractNeutralValues,
	extractPositiveValues,
} from '../../utils/getNeutralValues';

export const FindByTimezones = () => {
	const { data, isLoading } = useFetch();
	const [orderdData, setOrderedData] = useState<
		{ [key: string]: string[] }[]
	>([]);
	const [error, setError] = useState('');
	const [timezoneOne, setTimezoneOne] = useState('');
	const [timezoneTwo, setTimezoneTwo] = useState('');
	const [result, setResult] = useState<string[]>([]);

	useEffect(() => {
		const sortedData: { [key: string]: string[] }[] = [];

		data.forEach((country: any) => {
			country.timezones.forEach((timezone: string) => {
				const foundTimezone = sortedData.find(
					(sortedTimezone: any) =>
						Object.keys(sortedTimezone)[0] === timezone
				);
				//if there is no such timezone in the array add it and add the country name
				if (foundTimezone) {
					const sortedEntryKey = Object.keys(foundTimezone)[0];
					const sortedEntryValue = Object.values(foundTimezone)[0];

					if (!sortedEntryValue.includes(country.name.common)) {
						foundTimezone[sortedEntryKey] = [
							...foundTimezone[sortedEntryKey],
							country.name.common,
						];
					}
				} else {
					//if there is already such timezone just add the country name
					sortedData.push({ [timezone]: [country.name.common] });
				}
			});
		});

		const negativeValues = extractNegativeValues(sortedData);
		const positiveValues = extractPositiveValues(sortedData);
		const neutralValues = extractNeutralValues(sortedData);

		setOrderedData([
			...negativeValues,
			...neutralValues,
			...positiveValues,
		]);
	}, [data]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		setError('');
		if (!timezoneOne || !timezoneTwo) {
			setError('Both fields are required!');
			return;
		}
		const indexOne = orderdData.findIndex(
			(x) => Object.keys(x)[0] === timezoneOne
		);
		const indexTwo = orderdData.findIndex(
			(x) => Object.keys(x)[0] === timezoneTwo
		);
		if (indexOne === -1 || indexTwo === -1) {
			setError('Enter valid timezones!');
			return;
		}
		const res = Array.from(
			new Set(
				orderdData
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
				<>
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
				</>
			)}
		</>
	);
};
