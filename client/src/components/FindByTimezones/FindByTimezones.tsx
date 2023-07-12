import { Form } from '../utils/Form/Form';
import { useApi } from '../../hooks/useApi';
import { FormEvent, useState } from 'react';
import { Input } from '../utils/Input/Input';
import styles from './FindByTimezones.module.css';

export const FindByTimezones = () => {
	const [error, setError] = useState('');
	const [timezoneOne, setTimezoneOne] = useState('');
	const [timezoneTwo, setTimezoneTwo] = useState('');
	const { api } = useApi();
	const [result, setResult] = useState<string[]>([]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setError('');
		setResult([]);

		if (!timezoneOne || !timezoneTwo) {
			setError('Both fields are required!');
			return;
		}

		try {
			const res = api.findCountriesByTimezones(timezoneOne, timezoneTwo);
			setResult(res);
		} catch (err: any) {
			setError(err.message);
		}
	};

	return (
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
	);
};
