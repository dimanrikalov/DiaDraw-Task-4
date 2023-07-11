import { Form } from '../utils/Form/Form';
import { Input } from '../utils/Input/Input';
import { useFetch } from '../../hooks/useFetch';
import { findDistance } from '../../utils/findDistance';
import { FormEvent, FormEventHandler, useState } from 'react';

export const ClosestNonNeighbouring = () => {
	const { data, isLoading } = useFetch();
	const [result, setResult] = useState<{
		distance: string;
		country: string;
	}>();
	const [input, setInput] = useState('');
	const [error, setError] = useState('');

	const handleSubmit: FormEventHandler = (e: FormEvent) => {
		e.preventDefault();
		setError('');
		const country = data.find((x) => x.name.common === input);
		console.log(country);
		let smallestDistance: string | null = null;
		let closestCountry: string | null = null;
		data.filter((x) => x !== country).forEach((x) => {
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
			setError('Error');
			return;
		}

		setResult({ distance: smallestDistance, country: closestCountry });
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
									: `Closest country: ${result.country} with distance: ${result.distance}`}
							</h4>
						))}
				</Form>
			)}
		</>
	);
};
