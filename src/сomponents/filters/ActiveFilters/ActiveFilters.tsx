import styles from "./ActiveFilters.module.css";

type TextFilters = {
	name: string;
	username: string;
	email: string;
};

type DropdownFilters = {
	city: string;
	company: string;
};

type ActiveFiltersProps = {
	textFilters: TextFilters;
	dropdownFilters: DropdownFilters;
	clearTextFilter: (key: keyof TextFilters) => void;
	clearDropdownFilter: (key: keyof DropdownFilters) => void;
};

export const ActiveFilters = ({
	textFilters,
	dropdownFilters,
	clearTextFilter,
	clearDropdownFilter,
}: ActiveFiltersProps) => {
	const hasTextFilters = Object.values(textFilters).some(
		(val) => val.trim() !== "",
	);
	const hasDropdownFilters = Object.values(dropdownFilters).some(
		(val) => val.trim() !== "",
	);

	if (!hasTextFilters && !hasDropdownFilters) return null;

	return (
		<div className={styles.activeFilters}>
			<h3 className={styles.title}>Active Filters:</h3>
			<div className={styles.filtersList}>
				{(Object.entries(textFilters) as [keyof TextFilters, string][]).map(
					([key, value]) =>
						value && (
							<span key={key} className={styles.filterTag}>
								{key}: "{value}"
								<button
									onClick={() => clearTextFilter(key)}
									className={styles.removeButton}
								>
									×
								</button>
							</span>
						),
				)}
				{(
					Object.entries(dropdownFilters) as [keyof DropdownFilters, string][]
				).map(
					([key, value]) =>
						value && (
							<span key={key} className={styles.filterTag}>
								{key}: "{value}"
								<button
									onClick={() => clearDropdownFilter(key)}
									className={styles.removeButton}
								>
									×
								</button>
							</span>
						),
				)}
			</div>
		</div>
	);
};
