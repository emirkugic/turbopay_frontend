import React, { useState } from "react";
import styles from "./styles";

const DepositWithdrawModal = ({ transactionType, onClose }) => {
	const [amount, setAmount] = useState("");

	const handleContinue = () => {
		console.log(
			`${
				transactionType === "deposit" ? "Depositing" : "Withdrawing"
			} amount: $${amount}`
		);
		// TODO: Implement the logic for deposit or withdraw here

		onClose();
	};

	return (
		<div style={styles.modalBackdrop}>
			<div style={styles.modalContainer}>
				<h2>{transactionType === "deposit" ? "Deposit" : "Withdraw"} Funds</h2>
				<input
					type="number"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					placeholder="Enter amount"
					style={styles.input}
				/>
				<button style={styles.modalButton} onClick={handleContinue}>
					Continue
				</button>
				<button style={styles.modalButton} onClick={onClose}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default DepositWithdrawModal;
