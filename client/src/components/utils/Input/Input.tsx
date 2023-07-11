import styles from './Input.module.css';

interface InputProps {
	labelText: string;
	placeholder: string;
	value: string;
	setValue: Function;
}

export const Input: React.FC<InputProps> = ({
	labelText,
	placeholder,
	value,
	setValue,
}) => {
	const id = labelText.toLowerCase().split(' ').join('-');

	return (
		<div className={styles.inputDiv}>
			<label htmlFor={id}>{labelText}</label>
			<input
				type="text"
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
};
