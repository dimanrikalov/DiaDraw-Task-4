import { Form } from '../utils/Form/Form';
import { Input } from '../utils/Input/Input';
import { useFetch } from '../../hooks/useFetch';
import { findDistance } from '../../utils/findDistance';
import { FormEvent, FormEventHandler, useState } from 'react';

interface Result {
	distance: string;
	country: string;
}

export const ClosestNonNeighbouring = () => {
	const { data, isLoading } = useFetch();
	const [input, setInput] = useState('');
	const [error, setError] = useState('');
	const [result, setResult] = useState<Result>();

	const handleSubmit: FormEventHandler = (e: FormEvent) => {
		e.preventDefault();
		setError('');
		const findClosestNonNeighbouringCountry = () => {
			const country = data.find((x) => x.name.common === input);
			if (!country) {
				setError('Invalid country name!');
				return;
			}
			let smallestDistance: string | null = null;
			let closestCountry: string | null = null;

			data.filter((x) => {
				if (
					!x.borders?.includes(country.cca3) &&
					x.name.common !== country.name.common
				) {
					return x;
				}
			}).forEach((x) => {
				const currDistance = findDistance(country, x);
				if (
					!smallestDistance ||
					Number(currDistance) < Number(smallestDistance)
				) {
					smallestDistance = currDistance;
					closestCountry = x.name.common;
				}
			});

			if (!smallestDistance || !closestCountry) {
				setError('No country found!');
				return;
			}

			setResult({ distance: smallestDistance, country: closestCountry });
		};

		findClosestNonNeighbouringCountry();
	};

	return (
		<>
			{isLoading ? (
				<h1>Fetching data...</h1>
			) : (
				<Form
					buttonMessage={'Find distance'}
					handleSubmit={handleSubmit}
				>
					<h3>Find closest non neighbouring</h3>
					<Input
						labelText={'Enter a country name'}
						placeholder={'Example: Monaco'}
						value={input}
						setValue={setInput}
					/>
					{error ||
						(result && (
							<h4>
								{error
									? error
									: `Closest country: ${result.country} with distance: ${result.distance} kms.`}
							</h4>
						))}
				</Form>
			)}
		</>
	);
};
