import React, { useState } from "react";
import ManualSendModal from "./ManualSendModal";
import QRScannerModal from "./QRScannerModal";
import ConfirmationModal from "./ConfirmationModal";
import RequestMoneyModal from "./RequestMoneyModal";
import QRCodeDisplayModal from "./QRCodeDisplayModal";
import { prepareAndSendTransaction } from "../utils/api";
import Web3 from "web3";
import styles from "./styles";

const ModalManager = ({
	modalRef,
	modalStage,
	setModalStage,
	setShowModal,
}) => {
	const [sendAmount, setSendAmount] = useState("");
	const [recipientEmail, setRecipientEmail] = useState("");
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [qrData, setQrData] = useState(null);
	const [showQrModal, setShowQrModal] = useState(false);
	const [showRequestMoneyModal, setShowRequestMoneyModal] = useState(false);
	const [showQrDisplayModal, setShowQrDisplayModal] = useState(false);

	const handleSendMoneyClick = async () => {
		if (sendAmount && recipientEmail) {
			try {
				const web3 = new Web3(window.ethereum); // Initialize Web3
				const amountInWei = web3.utils.toWei(sendAmount, "ether"); // Convert to Wei

				// Prepare the transaction with the backend
				const txData = await prepareAndSendTransaction(
					recipientEmail,
					amountInWei
				);

				if (typeof window.ethereum !== "undefined") {
					await window.ethereum.request({ method: "eth_requestAccounts" });
					const accounts = await web3.eth.getAccounts();
					const account = accounts[0];

					const tx = {
						from: account,
						to: txData.to,
						value: txData.value,
						data: txData.data,
					};

					// Send the transaction
					const txHash = await web3.eth.sendTransaction(tx);
					console.log("Transaction Hash:", txHash);
					alert("Send successful! Transaction Hash: " + txHash.transactionHash);

					setShowConfirmationModal(false);
					setShowModal(false);
					setSendAmount("");
					setRecipientEmail("");
					setQrData(null);
				} else {
					alert(
						"MetaMask is not installed. Please install MetaMask and try again."
					);
				}
			} catch (error) {
				console.error("Error sending money:", error);
				alert("Failed to send money: " + error.message);
			}
		} else {
			alert("Please fill in both fields.");
		}
	};

	const handleConfirmSend = () => {
		setShowConfirmationModal(false);
		handleSendMoneyClick();
	};

	const handleGenerateQR = (data) => {
		setQrData(data);
		setShowQrDisplayModal(true);
	};

	const handleSendEmail = (data) => {
		console.log("Requesting money:", data);
		alert(`Money request of $${data.amount} sent to ${data.recipientEmail}`);
		setShowRequestMoneyModal(false);
		setShowModal(false);
	};

	return (
		<div style={styles.modalBackdrop}>
			<div ref={modalRef} style={styles.modalContainer}>
				{modalStage === "initial" && (
					<>
						<button
							style={styles.modalButton}
							onClick={() => setModalStage("send")}
						>
							SEND
						</button>
						<button
							style={styles.modalButton}
							onClick={() => setShowRequestMoneyModal(true)}
						>
							REQUEST
						</button>
					</>
				)}
				{modalStage === "send" && (
					<>
						<button
							style={styles.modalButton}
							onClick={() => setShowQrModal(true)}
						>
							Scan QR
						</button>
						<button
							style={styles.modalButton}
							onClick={() => setModalStage("manual")}
						>
							Send manually
						</button>
					</>
				)}
				{modalStage === "manual" && (
					<ManualSendModal
						sendAmount={sendAmount}
						recipientEmail={recipientEmail}
						onAmountChange={(e) => setSendAmount(e.target.value)}
						onEmailChange={(e) => setRecipientEmail(e.target.value)}
						onSendMoneyClick={handleSendMoneyClick}
					/>
				)}

				{showQrModal && (
					<QRScannerModal
						handleQRScanSuccess={(decodedText) => {
							try {
								const data = JSON.parse(decodedText);
								setQrData(data);
								setShowQrModal(false);
								setShowConfirmationModal(true);
							} catch (error) {
								console.error("Failed to parse QR code data:", error);
							}
						}}
						handleQRScanError={(error) => {
							console.error("QR scan error:", error);
						}}
						onClose={() => setShowQrModal(false)}
					/>
				)}

				{showConfirmationModal && qrData && (
					<ConfirmationModal
						amount={qrData.amount}
						recipientEmail={qrData.recipientEmail}
						onConfirmSend={handleConfirmSend}
						onCancelConfirm={() => setShowConfirmationModal(false)}
					/>
				)}

				{showRequestMoneyModal && (
					<RequestMoneyModal
						ref={modalRef}
						onRequestClose={() => {
							setShowRequestMoneyModal(false);
							setShowModal(false);
						}}
						onGenerateQR={handleGenerateQR}
						onSendEmail={handleSendEmail}
					/>
				)}

				{showQrDisplayModal && (
					<QRCodeDisplayModal
						qrData={qrData}
						onClose={() => setShowQrDisplayModal(false)}
					/>
				)}
			</div>
		</div>
	);
};

export default ModalManager;
