import styles from './Button.module.css';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
	message: string;
	url?: string;
}

export const Button: React.FC<ButtonProps> = ({ message, url }) => {
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
