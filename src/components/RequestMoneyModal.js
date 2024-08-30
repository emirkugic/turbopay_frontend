import React, { useState, useEffect, forwardRef } from "react";
import styles from "./styles";
import usersData from "../data/users.json";

const RequestMoneyModal = forwardRef(
	({ onRequestClose, onGenerateQR, onSendEmail }, ref) => {
		const [requestAmount, setRequestAmount] = useState("");
		const [emailEnabled, setEmailEnabled] = useState(false);
		const [recipientEmail, setRecipientEmail] = useState("");
		const [userEmail, setUserEmail] = useState("");

		useEffect(() => {
			const currentUser = usersData.find((user) => user.id === 1);
			if (currentUser) {
				setUserEmail(currentUser.email);
			}
		}, []);

		// Enhanced event propagation handling
		const handleModalInteraction = (event) => {
			event.stopPropagation();
		};

		return (
			<div style={styles.modalBackdrop} onClick={onRequestClose}>
				<div
					style={styles.modalContainer}
					onClick={handleModalInteraction}
					ref={ref}
				>
					<h2>Request Money</h2>
					<input
						type="number"
						id="requestAmount"
						name="requestAmount"
						value={requestAmount}
						onChange={(e) => setRequestAmount(e.target.value)}
						style={styles.input}
						placeholder="Enter amount"
						min="0"
					/>
					{emailEnabled && (
						<>
							<input
								type="email"
								id="recipientEmail"
								name="recipientEmail"
								value={recipientEmail}
								onChange={(e) => setRecipientEmail(e.target.value)}
								style={styles.input}
								placeholder="Recipient's email"
							/>
						</>
					)}
					<div>
						<label>
							<input
								type="checkbox"
								id="emailEnabled"
								name="emailEnabled"
								checked={emailEnabled}
								onChange={() => setEmailEnabled(!emailEnabled)}
							/>
							Request via Email
						</label>
					</div>
					{emailEnabled && (
						<button
							style={styles.modalButton}
							onClick={() =>
								onSendEmail({
									amount: requestAmount,
									recipientEmail: recipientEmail,
								})
							}
						>
							Send via Email
						</button>
					)}
					{!emailEnabled && (
						<button
							style={styles.modalButton}
							onClick={() =>
								onGenerateQR({
									amount: requestAmount,
									recipientEmail: userEmail,
								})
							}
						>
							Generate QR Code
						</button>
					)}
					<button style={styles.modalButton} onClick={onRequestClose}>
						Close
					</button>
				</div>
			</div>
		);
	}
);

export default RequestMoneyModal;
