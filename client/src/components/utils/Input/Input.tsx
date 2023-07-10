import styles from './Input.module.css';

export const Input = ({
	labelText,
	placeholder,
	value,
	setValue,
}: {
	labelText: string;
	placeholder: string;
	value: string;
	setValue: Function;
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
