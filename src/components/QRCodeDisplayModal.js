import React from "react";
import { QRCodeSVG } from "qrcode.react";
import styles from "./styles";

const QRCodeDisplayModal = ({ qrData, onClose }) => {
	return (
		<div style={styles.modalBackdrop}>
			<div style={styles.modalContainer}>
				<h2>QR Code</h2>
				<QRCodeSVG value={JSON.stringify(qrData)} size={256} level={"H"} />
				<button style={styles.modalButton} onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	);
};

export default QRCodeDisplayModal;
