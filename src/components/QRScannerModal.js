import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import styles from "./styles";

const QRScannerModal = ({
	handleQRScanSuccess,
	handleQRScanError,
	onClose,
}) => {
	const qrCodeRef = useRef(null);
	const qrCodeInstance = useRef(null);
	const isScannerRunning = useRef(false);

	useEffect(() => {
		const startScanner = async () => {
			if (qrCodeInstance.current || isScannerRunning.current) return; // Prevents multiple camera instances

			try {
				const qrCode = new Html5Qrcode(qrCodeRef.current.id);
				qrCodeInstance.current = qrCode;

				await qrCode.start(
					{ facingMode: "environment" },
					{ fps: 10, qrbox: 250 },
					handleQRScanSuccess,
					handleQRScanError
				);
				isScannerRunning.current = true;
			} catch (error) {
				console.error("Error starting QR code scanner:", error);
			}
		};

		startScanner();

		return () => {
			if (qrCodeInstance.current && isScannerRunning.current) {
				qrCodeInstance.current
					.stop()
					.then(() => {
						isScannerRunning.current = false;
					})
					.catch((error) => {
						console.error("Error stopping QR code scanner:", error);
					});
			}
		};
	}, [handleQRScanSuccess, handleQRScanError]);

	return (
		<div style={styles.modalBackdrop}>
			<div style={styles.qrModalContainer}>
				<div id="qr-scanner" ref={qrCodeRef} style={styles.qrScanner}></div>
				<button onClick={onClose} style={styles.cancelButton}>
					Close
				</button>
			</div>
		</div>
	);
};

export default QRScannerModal;
