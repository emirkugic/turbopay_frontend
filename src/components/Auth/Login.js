import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/api";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = await loginUser(email, password);
			localStorage.setItem("token", token);
			localStorage.setItem("email", email);
			navigate("/home");
		} catch (error) {
			setError("Invalid email or password");
		}
	};

	return (
		<div style={styles.container}>
			<h2>Login</h2>
			<form onSubmit={handleSubmit} style={styles.form}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					style={styles.input}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					style={styles.input}
					required
				/>
				<button type="submit" style={styles.button}>
					Login
				</button>
			</form>
			{error && <p style={styles.error}>{error}</p>}
			<p>
				Don't have an account? <a href="/register">Register here</a>
			</p>
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
	form: {
		display: "flex",
		flexDirection: "column",
		width: "80%",
		maxWidth: "300px",
	},
	input: {
		marginBottom: "10px",
		padding: "10px",
		fontSize: "16px",
	},
	button: {
		padding: "10px",
		fontSize: "16px",
		backgroundColor: "#4CAF50",
		color: "white",
		border: "none",
		cursor: "pointer",
	},
	error: {
		color: "red",
		marginTop: "10px",
	},
};

export default Login;
