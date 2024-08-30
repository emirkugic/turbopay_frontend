import React from "react";
import styles from "./styles";

const ConfirmationModal = ({
	amount,
	recipientEmail,
	onConfirmSend,
	onCancelConfirm,
}) => (
	<div style={styles.confirmationModalContainer}>
		<h2>Confirm Transaction</h2>
		<p>Amount: ${amount}</p>
		<p>Recipient's email: {recipientEmail}</p>
		<button style={styles.confirmButton} onClick={onConfirmSend}>
			Confirm
		</button>
		<button style={styles.cancelButton} onClick={onCancelConfirm}>
			Cancel
		</button>
	</div>
);

export default ConfirmationModal;
