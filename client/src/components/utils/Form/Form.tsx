import styles from './Form.module.css';
import { FormEventHandler } from 'react';
import { Button } from '../Button/Button';

interface FormProps {
	handleSubmit: FormEventHandler;
	children: React.ReactNode;
	buttonMessage: string;
}

export const Form: React.FC<FormProps> = ({
	handleSubmit,
	children,
	buttonMessage,
}) => {
	return (
		<form onSubmit={handleSubmit} className={styles.formContainer}>
			{children}
			<Button message={buttonMessage} />
		</form>
	);
};
