import { Form } from '../utils/Form/Form';
import { useState, FormEvent } from 'react';
import { Input } from '../utils/Input/Input';
import { useFetch } from '../../hooks/useFetch';
import { findDistance } from '../../utils/findDistance';

export const FindDistance = () => {
	const { data, isLoading } = useFetch();
	const [error, setError] = useState<string>('');
	const [result, setResult] = useState<string>('');
	const [inputOne, setInputOne] = useState<string>('');
	const [inputTwo, setInputTwo] = useState<string>('');

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setError('');
		
		if (!inputOne || !inputTwo) {
			setError('Fill both CCAs!');
			return '';
		}

		const countryOne = data.find((x) => x.cca3 === inputOne);
		const countryTwo = data.find((x) => x.cca3 === inputTwo);

		const res = findDistance(countryOne, countryTwo);
		if (!Number(res)) {
			setError(result);
			setResult('');
		}
		setResult(res);
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
					{error ||
						(result && (
							<h4>{error ? error : `Result: ${result} kms.`}</h4>
						))}
				</Form>
			)}
		</>
	);
};
