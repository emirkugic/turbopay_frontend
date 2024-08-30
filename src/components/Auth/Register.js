import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords don't match");
			return;
		}

		try {
			// Simulate sending a POST request
			const userData = {
				name,
				email,
				password,
			};
			console.log("Sending user data:", userData);

			// Future: Replace with actual POST request
			// await axios.post('/api/register', userData);

			// Navigate to the login page
			navigate("/login");
		} catch (error) {
			console.error("Error during registration:", error);
			alert("Registration failed. Please try again later.");
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
				<button type="submit" style={styles.button}>
					Register
				</button>
			</form>
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
};

export default Register;
