import React, { useEffect, useRef, useState } from "react";
import ModalManager from "./ModalManager";
import FinanceHistory from "./FinanceHistory";
import UserMenu from "./UserMenu";
import DepositWithdrawModal from "./DepositWithdrawModal";
import { useNavigate } from "react-router-dom";
import styles from "./styles";
import { fetchUserBalance, fetchUserFinanceHistory } from "../utils/api";

const HomePage = () => {
	const [balanceInUSD, setBalanceInUSD] = useState(0);
	const [history, setHistory] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [modalStage, setModalStage] = useState("initial");
	const [depositWithdrawModalOpen, setDepositWithdrawModalOpen] =
		useState(false);
	const [transactionType, setTransactionType] = useState("");

	const modalRef = useRef(null);
	const navigate = useNavigate();

	const fetchETHPrice = async () => {
		try {
			const response = await fetch(
				"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
			);
			const data = await response.json();
			return data.ethereum.usd;
		} catch (error) {
			console.error("Failed to fetch ETH price:", error);
			return null;
		}
	};

	useEffect(() => {
		const email = localStorage.getItem("email");

		if (email) {
			// Fetch the user's balance in ETH and convert to USD
			fetchUserBalance(email)
				.then(async (balance) => {
					const ethPrice = await fetchETHPrice();
					if (ethPrice) {
						const balanceInUSD = (balance * ethPrice).toFixed(2);
						setBalanceInUSD(balanceInUSD);
					}
				})
				.catch((error) => {
					console.error("Failed to fetch user balance:", error);
				});

			fetchUserFinanceHistory(email)
				.then((history) => {
					const formattedHistory = history.map((item) => ({
						date: new Date(item.timestamp).toLocaleString(),
						details: `${
							item.type.charAt(0).toUpperCase() + item.type.slice(1)
						} from ${item.from} to ${item.to}`,
						amount: (item.amount / 1e18).toFixed(5),
						type: item.type,
					}));
					setHistory(formattedHistory);
				})
				.catch((error) => {
					console.error("Failed to fetch user finance history:", error);
				});
		} else {
			console.error("No email found in localStorage");
		}
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

		script1.onload = () => {
			const script2 = document.createElement("script");
			script2.src =
				"https://mediafiles.botpress.cloud/825e8262-4f4d-4039-ac80-aedd4c88caae/webchat/v2.1/config.js";
			script2.async = true;

			document.body.appendChild(script2);
		};

		document.body.appendChild(script1);

		return () => {
			document.body.removeChild(script1);
		};
	}, []);

	const handlePlusClick = () => {
		setShowModal(true);
		setModalStage("initial");
	};

	const handleDeposit = () => {
		setTransactionType("deposit");
		setDepositWithdrawModalOpen(true);
	};

	const handleWithdraw = () => {
		setTransactionType("withdraw");
		setDepositWithdrawModalOpen(true);
	};

	const handleLogout = () => {
		localStorage.removeItem("jwt");
		localStorage.removeItem("email");
		navigate("/login");
		window.location.reload();
	};

	return (
		<div style={styles.container}>
			<h1>Your Balance: ${balanceInUSD} USD</h1>
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

			<UserMenu
				onDeposit={handleDeposit}
				onWithdraw={handleWithdraw}
				onLogout={handleLogout}
			/>

			{depositWithdrawModalOpen && (
				<DepositWithdrawModal
					transactionType={transactionType}
					onClose={() => setDepositWithdrawModalOpen(false)}
				/>
			)}
		</div>
	);
};

export default HomePage;
