import React, { useState, useEffect } from "react";
import styles from "./styles";

const FinanceHistory = ({ history }) => {
	const [visibleHistory, setVisibleHistory] = useState([]);
	const [loadedItems, setLoadedItems] = useState(15); // Initially load 15 items

	useEffect(() => {
		// Update visible history whenever the history or loaded items change
		setVisibleHistory(history.slice(0, loadedItems));
	}, [history, loadedItems]);

	const handleScroll = (event) => {
		const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
		// Check if we've scrolled to the bottom
		if (scrollHeight - scrollTop <= clientHeight + 10) {
			// Load more items
			setLoadedItems((prevLoadedItems) =>
				Math.min(prevLoadedItems + 15, history.length)
			);
		}
	};

	return (
		<>
			<h2>Finance History</h2>
			<div
				style={{
					...styles.historyContainer,
					maxHeight: "200px",
					overflowY: "auto",
				}}
				onScroll={handleScroll}
			>
				<ul style={styles.historyList}>
					{visibleHistory.map((item, index) => (
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
		</>
	);
};

export default FinanceHistory;
