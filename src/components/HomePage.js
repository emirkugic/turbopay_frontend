import React, { useEffect, useRef, useState } from "react";
import financeData from "../data/financeData.json";

const HomePage = () => {
	const [balance, setBalance] = useState(0);
	const [history, setHistory] = useState([]);
	const [showModal, setShowModal] = useState(false);
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
			}
		};

		if (showModal) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showModal]);

	const handlePlusClick = () => {
		setShowModal(!showModal);
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
				<div ref={modalRef} style={styles.modalContainer}>
					<button style={styles.modalButton}>SEND</button>
					<button style={styles.modalButton}>REQUEST</button>
				</div>
			)}
		</div>
	);
};

const styles = {
	container: {
		position: "relative",
		padding: "20px",
		textAlign: "center",
	},
	historyContainer: {
		marginTop: "20px",
		height: "200px", // Adjust as needed
		overflowY: "scroll",
		border: "1px solid #ccc",
		borderRadius: "5px",
	},
	historyList: {
		listStyleType: "none",
		padding: "0",
	},
	historyItem: {
		display: "flex",
		justifyContent: "space-between",
		padding: "10px 0",
		borderBottom: "1px solid #ccc",
	},
	send: {
		color: "red",
	},
	receive: {
		color: "green",
	},
	addButton: {
		position: "fixed",
		bottom: "20px",
		left: "50%",
		transform: "translateX(-50%)",
		backgroundColor: "#4CAF50",
		color: "white",
		fontSize: "24px",
		border: "none",
		borderRadius: "50%",
		width: "60px",
		height: "60px",
		cursor: "pointer",
		zIndex: 10,
	},
	modalContainer: {
		position: "fixed",
		bottom: "80px",
		left: "50%",
		transform: "translateX(-50%)",
		display: "flex",
		justifyContent: "center",
		gap: "10px",
		zIndex: 10,
	},
	modalButton: {
		padding: "10px 20px",
		backgroundColor: "#4CAF50",
		color: "white",
		border: "none",
		borderRadius: "5px",
		cursor: "pointer",
	},
};

export default HomePage;
