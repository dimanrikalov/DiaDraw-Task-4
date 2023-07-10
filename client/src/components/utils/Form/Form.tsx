import styles from './Form.module.css';
import { FormEventHandler } from 'react';
import { Button } from '../Button/Button';

export const Form = ({
	handleSubmit,
	children,
	buttonMessage,
}: {
	handleSubmit: FormEventHandler;
	children: React.ReactElement[];
	buttonMessage: string;
}) => {
	return (
		<form onSubmit={handleSubmit} className={styles.formContainer}>
			{children}
			<Button message={buttonMessage} />
		</form>
	);
};
