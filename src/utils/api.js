export const BASE_URL = "http://localhost:3000/api";

export const loginUser = async (email, password) => {
	try {
		const response = await fetch(`${BASE_URL}/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			throw new Error("Login failed");
		}

		const data = await response.json();
		return data.token;
	} catch (error) {
		console.error("Error during login:", error);
		throw error;
	}
};

export const registerUser = async (name, email, password, ethAddress) => {
	try {
		const response = await fetch(`${BASE_URL}/users/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, password, ethAddress }),
		});

		if (!response.ok) {
			throw new Error("Registration failed");
		}

		return await response.json();
	} catch (error) {
		console.error("Error during registration:", error);
		throw error;
	}
};

export const fetchUserBalance = async (email) => {
	try {
		const response = await fetch(
			`${BASE_URL}/transactions/balance?email=${encodeURIComponent(email)}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error("Failed to fetch balance");
		}

		const data = await response.json();
		return data.balance;
	} catch (error) {
		console.error("Error fetching balance:", error);
		throw error;
	}
};

export const fetchUserFinanceHistory = async (email) => {
	try {
		const response = await fetch(
			`${BASE_URL}/transactions/log-email?email=${encodeURIComponent(email)}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error("Failed to fetch finance history");
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching finance history:", error);
		throw error;
	}
};

export const prepareAndSendTransaction = async (
	recipientEmail,
	amountInWei
) => {
	try {
		const response = await fetch(`${BASE_URL}/transactions/prepare-send`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ recipientEmail, amountInWei }),
		});

		if (!response.ok) {
			throw new Error("Failed to prepare transaction");
		}

		return await response.json();
	} catch (error) {
		console.error("Error preparing transaction:", error);
		throw error;
	}
};
