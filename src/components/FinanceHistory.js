import React from "react";
import styles from "./styles";

const FinanceHistory = ({ history }) => {
	return (
		<>
			<h2>Finance History</h2>
			<div style={styles.historyContainer}>
				<ul style={styles.historyList}>
					{history.map((item, index) => (
						<li key={index} style={styles.historyItem}>
							<span>{item.date}</span>
							<span>{item.details}</span>
							<span style={item.type === "send" ? styles.send : styles.receive}>
								{item.type === "send" ? "-" : "+"}${item.amount} ETH
							</span>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default FinanceHistory;
