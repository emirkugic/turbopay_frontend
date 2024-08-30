import React, { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import styles from "./styles";

const QRScannerModal = ({ handleQRScanSuccess, handleQRScanError }) => {
	useEffect(() => {
		const qrCode = new Html5Qrcode("qr-scanner");
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

		return () => {
			qrCode.stop().catch((error) => {
				console.error("Error stopping QR code scanner:", error);
			});
		};
	}, [handleQRScanSuccess, handleQRScanError]);

	return (
		<div style={styles.modalBackdrop}>
			<div style={styles.qrModalContainer}>
				<div id="qr-scanner" style={styles.qrScanner}></div>
			</div>
		</div>
	);
};

export default QRScannerModal;
