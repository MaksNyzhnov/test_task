import type { User } from "../../types/User";

import styles from "./UserCard.module.css";

export const UserCard: React.FC<{ user: User }> = ({ user }) => (
	<div className={styles.card}>
		<h2 className={styles.name}>{user.name}</h2>
		<p className={styles.card_row}>
			<strong>Username:</strong> {user.username}
		</p>
		<p className={styles.card_row}>
			<strong>Email:</strong> {user.email}
		</p>
		<p className={styles.card_row}>
			<strong>Phone:</strong> {user.phone}
		</p>
		<p className={styles.card_row}>
			<strong>Address:</strong>{" "}
			{user.address
				? `${user.address.city}, ${user.address.street}, ${
						user.address.suite
				  }, ${user.address.zipcode} ${
						user.address.geo
							? `(lat: ${user.address.geo.lat}, lat: ${user.address.geo.lng})`
							: ""
				  }`
				: "-"}
		</p>
		<p className={styles.card_row}>
			<strong>Website:</strong> {user.website}
		</p>
		{user.company && (
			<div className={styles.company_block}>
				<p>
					<strong>Company</strong>
				</p>
				<p className={styles.company_name}>{user.company.name}</p>
				<div className={styles.company_block_features}>
					<p style={{ textAlign: "right", flexBasis: "50%" }}>
						{user.company.bs}
					</p>
					<div className={styles.devider}> </div>
					<p style={{ textAlign: "left", flexBasis: "50%" }}>
						{user.company.catchPhrase}
					</p>
				</div>
			</div>
		)}
	</div>
);
