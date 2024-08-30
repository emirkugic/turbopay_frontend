import React from "react";

const HomePage = () => {
	return (
		<div style={styles.container}>
			<h1>Welcome to the Homepage!</h1>
			<p>This is the main content of the app.</p>
		</div>
	);
};

const styles = {
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",	
		justifyContent: "center",
		height: "100vh",
	},
};

export default HomePage;
