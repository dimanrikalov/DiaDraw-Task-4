import { FormEvent, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { Input } from '../utils/Input/Input';
import styles from './SearchByCharacters.module.css';
import { Form } from '../../components/utils/Form/Form';

export const SearchByCharacters = () => {
	const [input, setInput] = useState('');
	const [error, setError] = useState('');
	const { api } = useApi();
	const [result, setResult] = useState<string[]>([]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setResult([]);
		setError('');

		if (input.length < 1 || input.length > 2) {
			setError('Enter between 1-2 characters!');
			return;
		}

		try {
			const res = api.findCountriesByCharacters(input);
			setResult(res);
		} catch (err: any) {
			setError(err.message);
		}
	};

	return (
		<Form handleSubmit={handleSubmit} buttonMessage={'Submit'}>
			<h3>Find countries by characters</h3>
			<Input
				labelText={'Enter up to 2 characters'}
				placeholder={'Example "m/mo"'}
				value={input}
				setValue={setInput}
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
	);
};
