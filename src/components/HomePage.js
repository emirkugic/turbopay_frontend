import React, { useEffect, useRef, useState } from "react";
import ModalManager from "./ModalManager";
import FinanceHistory from "./FinanceHistory";
import styles from "./styles";
import financeData from "../data/financeData";

const HomePage = () => {
	const [balance, setBalance] = useState(0);
	const [history, setHistory] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [modalStage, setModalStage] = useState("initial");

	const modalRef = useRef(null);

	useEffect(() => {
		setBalance(financeData.balance);
		setHistory(financeData.history);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				setShowModal(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [modalRef]);

	useEffect(() => {
		const script1 = document.createElement("script");
		script1.src = "https://cdn.botpress.cloud/webchat/v2.1/inject.js";
		script1.async = true;

		const script2 = document.createElement("script");
		script2.src =
			"https://mediafiles.botpress.cloud/825e8262-4f4d-4039-ac80-aedd4c88caae/webchat/v2.1/config.js";
		script2.async = true;

		document.body.appendChild(script1);
		document.body.appendChild(script2);

		return () => {
			document.body.removeChild(script1);
			document.body.removeChild(script2);
		};
	}, []);

	const handlePlusClick = () => {
		setShowModal(true);
		setModalStage("initial");
	};

	return (
		<div style={styles.container}>
			<h1>Your Balance: ${balance}</h1>
			<FinanceHistory history={history} />
			<button style={styles.addButton} onClick={handlePlusClick}>
				+
			</button>

			{showModal && (
				<ModalManager
					modalRef={modalRef}
					modalStage={modalStage}
					setModalStage={setModalStage}
					setShowModal={setShowModal}
				/>
			)}
		</div>
	);
};

export default HomePage;
