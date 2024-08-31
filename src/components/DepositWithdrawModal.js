import React, { useState } from "react";
import Web3 from "web3";
import styles from "./styles";
import { BASE_URL } from "../utils/api";

const DepositWithdrawModal = ({ transactionType, onClose }) => {
	const [amount, setAmount] = useState("");
	const web3 = new Web3(window.ethereum);

	const handleContinue = async () => {
		const amountInWei = web3.utils.toWei(amount, "ether");

		if (transactionType === "deposit") {
			await handleDeposit(amountInWei);
		} else if (transactionType === "withdraw") {
			await handleWithdraw(amountInWei);
		}

		onClose();
	};

	const handleDeposit = async (amountInWei) => {
		try {
			const response = await fetch(`${BASE_URL}/transactions/prepare-deposit`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ amountInWei }),
			});

			const txData = await response.json();

			await window.ethereum.request({ method: "eth_requestAccounts" });
			const accounts = await web3.eth.getAccounts();
			const account = accounts[0];

			const tx = {
				from: account,
				to: txData.to,
				value: txData.value,
				data: txData.data,
			};

			const txHash = await web3.eth.sendTransaction(tx);
			alert(`Deposit successful! Transaction Hash: ${txHash.transactionHash}`);
		} catch (error) {
			console.error("Deposit Error:", error);
			alert("Deposit failed: " + error.message);
		}
	};

	const handleWithdraw = async (amountInWei) => {
		try {
			const response = await fetch(
				`${BASE_URL}/transactions/prepare-withdraw`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ amountInWei }),
				}
			);

			const txData = await response.json();

			await window.ethereum.request({ method: "eth_requestAccounts" });
			const accounts = await web3.eth.getAccounts();
			const account = accounts[0];

			const tx = {
				from: account,
				to: txData.to,
				value: txData.value,
				data: txData.data,
			};

			const txHash = await web3.eth.sendTransaction(tx);
			alert(`Withdraw successful! Transaction Hash: ${txHash.transactionHash}`);
		} catch (error) {
			console.error("Withdraw Error:", error);
			alert("Withdraw failed: " + error.message);
		}
	};

	return (
		<div style={styles.modalBackdrop}>
			<div style={styles.modalContainer}>
				<h2>{transactionType === "deposit" ? "Deposit" : "Withdraw"} Funds</h2>
				<input
					type="number"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					placeholder="Enter amount in Ether"
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
