import React, { useEffect, useRef, useState } from "react";
import ManualSendModal from "./ManualSendModal";
import QRScannerModal from "./QRScannerModal";
import ConfirmationModal from "./ConfirmationModal";
import financeData from "../data/financeData.json";
import styles from "./styles";

const HomePage = () => {
	const [balance, setBalance] = useState(0);
	const [history, setHistory] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [modalStage, setModalStage] = useState("initial"); // "initial", "send", or "manual"
	const [sendAmount, setSendAmount] = useState("");
	const [recipientEmail, setRecipientEmail] = useState("");
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [qrData, setQrData] = useState(null);
	const [showQrModal, setShowQrModal] = useState(false);

	const modalRef = useRef(null);

	useEffect(() => {
		setBalance(financeData.balance);
		setHistory(financeData.history);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				setShowModal(false);
				setShowConfirmationModal(false);
				setShowQrModal(false);
			}
		};

		if (showModal || showConfirmationModal || showQrModal) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showModal, showConfirmationModal, showQrModal]);

	const handlePlusClick = () => {
		setShowModal(true);
		setModalStage("initial");
	};

	const handleSendClick = () => {
		setModalStage("send");
	};

	const handleRequestClick = () => {
		alert("REQUEST clicked");
		setShowModal(false);
	};

	const handleScanQRClick = () => {
		setShowQrModal(true);
	};

	const handleSendManuallyClick = () => {
		setModalStage("manual");
	};

	const handleAmountChange = (event) => {
		setSendAmount(event.target.value);
	};

	const handleEmailChange = (event) => {
		setRecipientEmail(event.target.value);
	};

	const handleSendMoneyClick = () => {
		if (sendAmount && recipientEmail) {
			setShowConfirmationModal(true);
		} else {
			alert("Please fill in both fields.");
		}
	};

	const handleConfirmSend = () => {
		console.log("Sending money");
		console.log("Amount:", sendAmount);
		console.log("Recipient's email:", recipientEmail);
		setShowConfirmationModal(false);
		setShowModal(false);
		setSendAmount("");
		setRecipientEmail("");
	};

	const handleCancelConfirm = () => {
		setShowConfirmationModal(false);
	};

	const handleQRScanSuccess = (decodedText) => {
		try {
			const data = JSON.parse(decodedText);
			setQrData(data);
			setShowQrModal(false);
			setShowConfirmationModal(true);
		} catch (error) {
			console.error("Failed to parse QR code data:", error);
		}
	};

	const handleQRScanError = (error) => {
		console.error("QR scan error:", error);
	};

	return (
		<div style={styles.container}>
			<h1>Your Balance: ${balance}</h1>
			<h2>Finance History</h2>

			<div style={styles.historyContainer}>
				<ul style={styles.historyList}>
					{history.map((item, index) => (
						<li key={index} style={styles.historyItem}>
							<span>{item.date}</span>
							<span>{item.details}</span>
							<span style={item.type === "send" ? styles.send : styles.receive}>
								{item.type === "send" ? "-" : "+"}${item.amount}
							</span>
						</li>
					))}
				</ul>
			</div>

			<button style={styles.addButton} onClick={handlePlusClick}>
				+
			</button>

			{showModal && (
				<div style={styles.modalBackdrop}>
					<div ref={modalRef} style={styles.modalContainer}>
						{modalStage === "initial" ? (
							<>
								<button style={styles.modalButton} onClick={handleSendClick}>
									SEND
								</button>
								<button style={styles.modalButton} onClick={handleRequestClick}>
									REQUEST
								</button>
							</>
						) : modalStage === "send" ? (
							<>
								<button style={styles.modalButton} onClick={handleScanQRClick}>
									Scan QR
								</button>
								<button
									style={styles.modalButton}
									onClick={handleSendManuallyClick}
								>
									Send manually
								</button>
							</>
						) : modalStage === "manual" ? (
							<ManualSendModal
								sendAmount={sendAmount}
								recipientEmail={recipientEmail}
								onAmountChange={handleAmountChange}
								onEmailChange={handleEmailChange}
								onSendMoneyClick={handleSendMoneyClick}
							/>
						) : null}
					</div>
				</div>
			)}

			{showQrModal && (
				<QRScannerModal
					handleQRScanSuccess={handleQRScanSuccess}
					handleQRScanError={handleQRScanError}
					onClose={() => setShowQrModal(false)}
				/>
			)}

			{showConfirmationModal && qrData && (
				<ConfirmationModal
					amount={qrData.amount}
					recipientEmail={qrData.recipientEmail}
					onConfirmSend={handleConfirmSend}
					onCancelConfirm={handleCancelConfirm}
				/>
			)}
		</div>
	);
};

export default HomePage;
