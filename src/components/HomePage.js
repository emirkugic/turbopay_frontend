import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import financeData from "../data/financeData.json";
import ManualSendModal from "./ManualSendModal";
import QRScannerModal from "./QRScannerModal";
import ConfirmationModal from "./ConfirmationModal";
import styles from "./styles";

const HomePage = () => {
	const [balance, setBalance] = useState(0);
	const [history, setHistory] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [modalStage, setModalStage] = useState("initial"); // "initial" or "send"
	const [sendAmount, setSendAmount] = useState("");
	const [recipientEmail, setRecipientEmail] = useState("");
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [qrData, setQrData] = useState(null); // Store QR code data
	const [showQrModal, setShowQrModal] = useState(false);
	const [html5Qrcode, setHtml5Qrcode] = useState(null);

	const modalRef = useRef(null); // Ref for the modal container

	useEffect(() => {
		// Load balance and history data from JSON file
		setBalance(financeData.balance);
		setHistory(financeData.history);
	}, []);

	useEffect(() => {
		// Close the modal if clicking outside of it
		const handleClickOutside = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				setShowModal(false);
				setShowConfirmationModal(false); // Also close confirmation modal
				setShowQrModal(false); // Also close QR modal
				if (html5Qrcode) {
					html5Qrcode.stop().catch((error) => {
						console.error("Error stopping QR code scanner:", error);
					});
				}
			}
		};

		if (showModal || showConfirmationModal || showQrModal) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showModal, showConfirmationModal, showQrModal, html5Qrcode]);

	const handlePlusClick = () => {
		setShowModal(true);
		setModalStage("initial");
	};

	const handleSendClick = () => {
		setModalStage("send");
	};

	const handleRequestClick = () => {
		// Handle the REQUEST button logic here
		alert("REQUEST clicked");
		setShowModal(false);
	};

	const handleScanQRClick = () => {
		setShowQrModal(true);
		setModalStage("send");
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
		const data = JSON.parse(decodedText);
		setQrData(data);
		setShowQrModal(false);
		setShowConfirmationModal(true);
	};

	const handleQRScanError = (error) => {
		console.error("QR scan error:", error);
	};

	useEffect(() => {
		if (showQrModal && !html5Qrcode) {
			const qrCode = new Html5Qrcode("qr-scanner");
			setHtml5Qrcode(qrCode);
			qrCode
				.start(
					{ facingMode: "environment" },
					{ fps: 10, qrbox: 250 },
					handleQRScanSuccess,
					handleQRScanError
				)
				.catch((error) => {
					console.error("Error starting QR code scanner:", error);
				});
		}
		return () => {
			if (html5Qrcode) {
				html5Qrcode.stop().catch((error) => {
					console.error("Error stopping QR code scanner:", error);
				});
			}
		};
	}, [showQrModal, html5Qrcode]);

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
