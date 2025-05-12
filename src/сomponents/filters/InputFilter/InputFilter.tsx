import styles from "../filter.module.css";

type TextFiltersProps = {
	filters: {
		name: string;
		username: string;
		email: string;
	};
	setFilters: (filters: {
		name: string;
		username: string;
		email: string;
	}) => void;
};

export const InputFilter = ({ filters, setFilters }: TextFiltersProps) => {
	const handleChange = (key: keyof typeof filters, value: string) => {
		setFilters({ ...filters, [key]: value });
	};

	return (
		<div className={styles.textFilterContainer}>
			{(Object.keys(filters) as (keyof typeof filters)[]).map((key) => (
				<div key={key} className={styles.inputGroup}>
					<label htmlFor={key} className={styles.label}>
						{key}:
					</label>
					<input
						id={key}
						type="text"
						value={filters[key]}
						onChange={(e) => handleChange(key, e.target.value)}
						className={styles.input}
						placeholder={`Search by ${key}`}
					/>
				</div>
			))}
		</div>
	);
};
