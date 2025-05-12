import { useEffect, useState } from "react";
import type { User } from "./types/User";
import { UserCard } from "./сomponents/UserCard/UserCard";
import styles from "./App.module.css";
import { InputFilter } from "./сomponents/filters/InputFilter/InputFilter";
import { DropdownFilters } from "./сomponents/filters/DropDownFilter/DropDownFilter";
import { ActiveFilters } from "./сomponents/filters/ActiveFilters/ActiveFilters";
const App = () => {
	const [users, setUsers] = useState<User[]>([]);

	const [textFilters, setTextFilters] = useState({
		name: "",
		username: "",
		email: "",
	});

	const [dropdownFilters, setDropdownFilters] = useState({
		city: "",
		company: "",
	});
	const setDropdownFilter = (key: "city" | "company", value: string) => {
		setDropdownFilters((prev) => ({
			...prev,
			[key]: value,
		}));
	};
	const clearTextFilter = (key: keyof typeof textFilters) => {
		setTextFilters((prev) => ({ ...prev, [key]: "" }));
	};

	const clearDropdownFilter = (key: keyof typeof dropdownFilters) => {
		setDropdownFilters((prev) => ({ ...prev, [key]: "" }));
	};

	const clearFilters = () => {
		setTextFilters({ name: "", username: "", email: "" });
		setDropdownFilters({ city: "", company: "" });
	};

	const filteredUsers = users.filter((user) => {
		const matchesTextFilters = Object.entries(textFilters).every(
			([key, value]) =>
				user[key as keyof typeof textFilters]
					.toLowerCase()
					.includes(value.toLowerCase().trim()),
		);

		const matchesCity =
			!dropdownFilters.city || user.address.city === dropdownFilters.city;

		const matchesCompany =
			!dropdownFilters.company || user.company.name === dropdownFilters.company;

		return matchesTextFilters && matchesCity && matchesCompany;
	});

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((res) => res.json())
			.then((data) => setUsers(data));
	}, []);
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>User List</h1>

			<div className={styles.filters_block}>
				<h2 className={styles.filterTitle}>Filters:</h2>
				<div className={styles.filters}>
					<InputFilter filters={textFilters} setFilters={setTextFilters} />
					<div className={styles.filter_btns}>
						<DropdownFilters
							users={users}
							active={dropdownFilters}
							setFilter={setDropdownFilter}
						/>
						<button onClick={clearFilters} className={styles.clearButton}>
							Clear Filters
						</button>
					</div>
				</div>
			</div>
			<ActiveFilters
				textFilters={textFilters}
				clearTextFilter={clearTextFilter}
				dropdownFilters={dropdownFilters}
				clearDropdownFilter={clearDropdownFilter}
			/>
			<div className={styles.cardGrid}>
				{filteredUsers.map((user) => (
					<UserCard key={user.id} user={user} />
				))}
			</div>
		</div>
	);
};

export default App;
