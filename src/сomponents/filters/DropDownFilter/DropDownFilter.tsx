import { useState } from "react";
import type { User } from "../../../types/User";
import styles from "../filter.module.css";

type FilterKey = "city" | "company";

type DropdownFiltersProps = {
	users: User[];
	active: {
		city: string;
		company: string;
	};
	setFilter: (key: FilterKey, value: string) => void;
};

export const DropdownFilters = ({
	users,
	active,
	setFilter,
}: DropdownFiltersProps) => {
	const [openDropdown, setOpenDropdown] = useState<FilterKey | null>(null);

	const getUniqueValues = (key: FilterKey): string[] => {
		const set = new Set<string>();
		users.forEach((user) => {
			if (key === "city") set.add(user.address.city);
			if (key === "company") set.add(user.company.name);
		});
		return Array.from(set);
	};

	const toggleDropdown = (key: FilterKey) => {
		setOpenDropdown(openDropdown === key ? null : key);
	};

	const handleSelect = (key: FilterKey, value: string) => {
		setFilter(key, value);
		setOpenDropdown(null);
	};

	return (
		<div className={styles.dropdownFilterWrapper}>
			{(["city", "company"] as FilterKey[]).map((key) => (
				<div key={key} className={styles.dropdownBlock}>
					<button
						onClick={() => toggleDropdown(key)}
						className={styles.dropdownToggle}
					>
						Filter by {key}
					</button>

					{openDropdown === key && (
						<ul className={styles.dropdownMenu}>
							{getUniqueValues(key).map((value) => (
								<li
									key={value}
									onClick={() => handleSelect(key, value)}
									className={`${styles.dropdownItem} ${
										active[key] === value ? styles.active : ""
									}`}
								>
									{value}
								</li>
							))}
						</ul>
					)}
				</div>
			))}
		</div>
	);
};
