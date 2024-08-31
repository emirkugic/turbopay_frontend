const styles = {
	container: {
		position: "relative",
		padding: "10px",
		textAlign: "center",
		fontFamily: "'Arial', sans-serif", // Consistent font for the entire app
	},
	historyContainer: {
		marginTop: "20px",
		height: "auto", // Auto height for flexible content display
		overflowY: "auto",
		border: "1px solid #e1e1e1", // Lighter border color
		borderRadius: "8px",
		backgroundColor: "#fafafa", // Light background for the list
		padding: "10px",
	},
	historyList: {
		listStyleType: "none",
		padding: "0",
		margin: "0",
	},
	historyItem: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "12px 20px", // More padding for better touch targets
		borderBottom: "1px solid #e1e1e1",
		fontSize: "16px", // Larger font for readability on mobile
	},
	send: {
		color: "#e57373", // Softer red
	},
	receive: {
		color: "#81c784", // Softer green
	},
	addButton: {
		position: "fixed",
		bottom: "20px",
		right: "20px", // Changed from left to right for better accessibility
		backgroundColor: "#4CAF50", // Keep the button visually prominent
		color: "white",
		fontSize: "24px",
		border: "none",
		borderRadius: "50%",
		width: "56px", // Slightly reduced for aesthetics
		height: "56px",
		cursor: "pointer",
		boxShadow: "0 2px 5px rgba(0,0,0,0.2)", // Subtle shadow for depth
	},
	modalBackdrop: {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1000,
	},
	modalContainer: {
		backgroundColor: "#fff",
		borderRadius: "8px",
		padding: "20px",
		width: "90%", // Responsive width
		maxWidth: "400px", // Maximum width for larger devices
		boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
		textAlign: "center",
	},
	manualModalContainer: {
		backgroundColor: "white",
		padding: "20px",
		borderRadius: "10px",
		display: "flex",
		flexDirection: "column",
		gap: "15px",
	},
	label: {
		display: "flex",
		flexDirection: "column",
		marginBottom: "10px",
	},
	input: {
		width: "100%",
		padding: "10px",
		margin: "10px 0",
		borderRadius: "4px",
		border: "1px solid #ccc",
		fontSize: "16px",
	},
	submitButton: {
		padding: "10px",
		backgroundColor: "#4CAF50",
		color: "white",
		border: "none",
		borderRadius: "5px",
		cursor: "pointer",
	},
	modalButton: {
		width: "100%",
		padding: "10px",
		marginTop: "10px",
		borderRadius: "4px",
		border: "none",
		cursor: "pointer",
		fontSize: "16px",
		backgroundColor: "#007BFF",
		color: "#fff",
	},
	userMenuContainer: {
		position: "fixed",
		bottom: "20px",
		left: "20px",
		zIndex: 1000,
	},
	userIcon: {
		width: "60px",
		height: "60px",
		borderRadius: "50%",
		backgroundColor: "#007BFF",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
	},
	userIconImage: {
		width: "70%",
		height: "70%",
	},
	menu: {
		position: "absolute",
		bottom: "60px",
		left: "0",
		backgroundColor: "#ffffff",
		borderRadius: "8px",
		boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
		padding: "10px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	menuItem: {
		background: "none",
		border: "none",
		padding: "10px 20px",
		cursor: "pointer",
		width: "100%",
		textAlign: "center",
		borderRadius: "4px",
		margin: "5px 0",
		fontSize: "16px",
		color: "#333",
	},
	menuItemHover: {
		backgroundColor: "#f0f0f0",
	},
	modalButtonCancel: {
		backgroundColor: "#ccc",
	},
};

export default styles;
