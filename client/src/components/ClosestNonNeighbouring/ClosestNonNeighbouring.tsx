import { Form } from '../utils/Form/Form';
import { Input } from '../utils/Input/Input';
import { useFetch } from '../../hooks/useFetch';
import { FormEvent, FormEventHandler, useEffect, useState } from 'react';

class CountryNode {
	name: string;
	borders: CountryNode[];

	constructor(name: string, borders: CountryNode[]) {
		this.name = name;
		this.borders = borders;
	}

	addNeighbour(neighbour: CountryNode) {
		this.borders.push(neighbour);
	}
}

export const ClosestNonNeighbouring = () => {
	const { data, isLoading } = useFetch();
	const [result, setResult] = useState('');
	const [input, setInput] = useState('');
	const [error, setError] = useState('');

	const handleSubmit: FormEventHandler = (e: FormEvent) => {
		e.preventDefault();
		const country = data.find((x) => x.name.common === input);
		country.
		console.log(country);
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
									: `Closest country: ${result} with distance: ${result}`}
							</h4>
						))}
				</Form>
			)}
		</>
	);
};
