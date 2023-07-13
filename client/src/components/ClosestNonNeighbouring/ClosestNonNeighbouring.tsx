import { Form } from '../utils/Form/Form';
import { useApi } from '../../hooks/useApi';
import { Input } from '../utils/Input/Input';
import { ClosestNonNeighbouringCountry } from '../../Api';
import { useState, FormEvent, FormEventHandler } from 'react';

export const ClosestNonNeighbouring = () => {
	const { api } = useApi();
	const [input, setInput] = useState('');
	const [error, setError] = useState('');
	const [result, setResult] = useState<
		ClosestNonNeighbouringCountry | undefined
	>(undefined);

	const handleSubmit: FormEventHandler = (e: FormEvent) => {
		e.preventDefault();
		setResult(undefined);
		setError('');

		if (!input) {
			setError('Please enter a country name!');
		}

		try {
			const res = api.findClosestNonNeighbouringCountry(input);
			setResult(res);
		} catch (err: any) {
			if (err.message) {
				setError(err.message);
			}
		}
	};

	return (
		<Form buttonMessage={'Find distance'} handleSubmit={handleSubmit}>
			<h3>Find closest non neighbouring</h3>
			<Input
				labelText={'Enter a country name'}
				placeholder={'Example: Monaco'}
				value={input}
				setValue={setInput}
			/>

			{error && <p>{error}</p>}
			{result && (
				<h4>
					{`Closest country: ${result.country} with distance: ${result.distance} kms.`}
				</h4>
			)}
		</Form>
	);
};
