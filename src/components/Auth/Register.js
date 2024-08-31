import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/api";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [ethAddress, setEthAddress] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError("Passwords don't match");
			return;
		}

		try {
			await registerUser(name, email, password, ethAddress);

			navigate("/login");
		} catch (error) {
			setError("Registration failed. Please try again later.");
		}
	};

	return (
		<div style={styles.container}>
			<h2>Register</h2>
			<form onSubmit={handleSubmit} style={styles.form}>
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={styles.input}
					required
				/>
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
				<input
					type="password"
					placeholder="Confirm Password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					style={styles.input}
					required
				/>
				<input
					type="text"
					placeholder="Ethereum Address"
					value={ethAddress}
					onChange={(e) => setEthAddress(e.target.value)}
					style={styles.input}
					required
				/>
				<button type="submit" style={styles.button}>
					Register
				</button>
			</form>
			{error && <p style={styles.error}>{error}</p>}
			<p>
				Already have an account? <a href="/login">Login here</a>
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

export default Register;
