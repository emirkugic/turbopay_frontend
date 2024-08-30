import React from "react";
import styles from "./styles";

const ManualSendModal = ({
	sendAmount,
	recipientEmail,
	onAmountChange,
	onEmailChange,
	onSendMoneyClick,
}) => (
	<div style={styles.manualModalContainer}>
		<label style={styles.label}>
			Amount:
			<input
				type="number"
				value={sendAmount}
				onChange={onAmountChange}
				style={styles.input}
				min="0"
			/>
		</label>
		<label style={styles.label}>
			Recipient's email:
			<input
				type="email"
				value={recipientEmail}
				onChange={onEmailChange}
				style={styles.input}
			/>
		</label>
		<button style={styles.submitButton} onClick={onSendMoneyClick}>
			Send Money
		</button>
	</div>
);

export default ManualSendModal;
