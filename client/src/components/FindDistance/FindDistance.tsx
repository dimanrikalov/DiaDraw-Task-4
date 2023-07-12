import { ApiContext } from '../../App';
import { Form } from '../utils/Form/Form';
import { Input } from '../utils/Input/Input';
import { useState, FormEvent, useContext } from 'react';

export const FindDistance = () => {
	const { api } = useContext(ApiContext);
	const [error, setError] = useState<string>('');
	const [result, setResult] = useState<string>('');
	const [inputOne, setInputOne] = useState<string>('');
	const [inputTwo, setInputTwo] = useState<string>('');

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		setError('');
		setResult('');

		if (!inputOne || !inputTwo) {
			setError('Fill both CCAs!');
			return '';
		}

		if (api) {
			const countryOne = api.countries.find((x) => x.cca3 === inputOne);
			const countryTwo = api.countries.find((x) => x.cca3 === inputTwo);

			try {
				const res = api.findDistance(countryOne, countryTwo);
				setResult(res);
			} catch (err: any) {
				setError(err.message);
			}
		}
	};

	return (
		<Form buttonMessage={'Find distance'} handleSubmit={handleSubmit}>
			<h3>Find distance between 2 countries</h3>
			<Input
				labelText={'Country 1 CCA3'}
				placeholder={'Example: MCO'}
				value={inputOne}
				setValue={setInputOne}
			/>
			<Input
				labelText={'Country 2 CCA3'}
				placeholder={'Example: ITA'}
				value={inputTwo}
				setValue={setInputTwo}
			/>

			{error ? (
				<p>{error}</p>
			) : (
				result && <h4>{`Result: ${result} kms.`}</h4>
			)}
		</Form>
	);
};
