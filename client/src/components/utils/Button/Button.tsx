import style from './Button.module.css';
import { useNavigate } from 'react-router-dom';

export const Button = ({ message, url }: { message: string; url?: string }) => {
	const navigate = useNavigate();
	if (url) {
		return (
			<button className={style.button} onClick={() => navigate(url)}>
				{message}
			</button>
		);
	}

	return <button className={style.button}>{message}</button>;
};
