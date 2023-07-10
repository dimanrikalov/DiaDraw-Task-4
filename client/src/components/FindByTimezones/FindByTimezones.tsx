import { Form } from '../utils/Form/Form';
import { Input } from '../utils/Input/Input';
import { useFetch } from '../../hooks/useFetch';
import styles from './FindByTimezones.module.css';
import { FormEvent, useEffect, useState } from 'react';

export const FindByTimezones = () => {
	const { data, isLoading } = useFetch();
	const [orderdData, setOrderedData] = useState<
		{ [key: string]: string[] }[]
	>([]);
	const [timezoneOne, setTimezoneOne] = useState('');
	const [timezoneTwo, setTimezoneTwo] = useState('');
	const [shouldHide, setShouldHide] = useState(true);
	const [error, setError] = useState('');
	const [result, setResult] = useState<string[]>([]);

	useEffect(() => {
		const sortedData: { [key: string]: string[] }[] = [];
		data.forEach((country: any) => {
			country.timezones.forEach((timezone: string) => {
				//if there is no such timezone in the array add it and add the country name
				//if there is already such timezone just add the country name
				const foundTimezone = sortedData.find(
					(sortedTimezone: any) =>
						Object.keys(sortedTimezone)[0] === timezone
				);
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
					sortedData.push({ [timezone]: [country.name.common] });
				}
			});
		});

		const negativeValues = sortedData
			.filter((x) => Object.keys(x)[0].includes('-'))
			.sort((a, b) => {
				const utcA = Object.keys(a)[0];
				const utcB = Object.keys(b)[0];

				if (utcA < utcB) {
					return 1;
				} else if (utcA > utcB) {
					return -1;
				}
				return 0;
			});
		const positiveValues = sortedData
			.filter((x) => Object.keys(x)[0].includes('+'))
			.sort((a, b) => {
				const utcA = Object.keys(a)[0];
				const utcB = Object.keys(b)[0];

				if (utcA > utcB) {
					return 1;
				} else if (utcA < utcB) {
					return -1;
				}
				return 0;
			});
		const neutralValues = sortedData.filter(
			(x) =>
				!Object.keys(x)[0].includes('+') &&
				!Object.keys(x)[0].includes('-')
		);

		setOrderedData([
			...negativeValues,
			...neutralValues,
			...positiveValues,
		]);
	}, [data]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		setError('');
		setShouldHide(false);
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
						{error ? (
							<p>{error}</p>
						) : (
							<div
								className={styles.resultDiv}
								style={{
									display: shouldHide ? 'none' : 'block',
								}}
							>
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
