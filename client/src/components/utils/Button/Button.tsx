import styles from './Button.module.css';
import { useNavigate } from 'react-router-dom';

export const Button = ({ message, url }: { message: string; url?: string }) => {
	const navigate = useNavigate();
	if (url) {
		return (
			<button className={styles.button} onClick={() => navigate(url)}>
				{message}
			</button>
		);
	}

	return <button className={styles.button}>{message}</button>;
};
