import React, { useState } from "react";
import ManualSendModal from "./ManualSendModal";
import QRScannerModal from "./QRScannerModal";
import ConfirmationModal from "./ConfirmationModal";
import RequestMoneyModal from "./RequestMoneyModal";
import QRCodeDisplayModal from "./QRCodeDisplayModal";
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

	const handleSendMoneyClick = () => {
		if (sendAmount && recipientEmail) {
			console.log("Preparing to send money");
			setQrData({ amount: sendAmount, recipientEmail });
			setShowConfirmationModal(true);
		} else {
			alert("Please fill in both fields.");
		}
	};

	const handleConfirmSend = () => {
		console.log("Sending money...");
		console.log("Amount:", qrData.amount);
		console.log("Recipient's email:", qrData.recipientEmail);
		setShowConfirmationModal(false);
		setShowModal(false);
		setSendAmount("");
		setRecipientEmail("");
		setQrData(null);
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
