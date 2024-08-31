import React, { useState } from "react";
import styles from "./styles";

const UserMenu = ({ onDeposit, onWithdraw, onLogout }) => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<div style={styles.userMenuContainer}>
			<div style={styles.userIcon} onClick={toggleMenu}>
				<img
					src={`${process.env.PUBLIC_URL}/icon2.png`}
					alt="User Menu"
					style={styles.userIconImage}
				/>
			</div>
			{menuOpen && (
				<div style={styles.menu}>
					<button style={styles.menuItem} onClick={onDeposit}>
						Deposit
					</button>
					<button style={styles.menuItem} onClick={onWithdraw}>
						Withdraw
					</button>
					<button style={styles.menuItem} onClick={onLogout}>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
