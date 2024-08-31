const financeData = {
	balance: 1200,
	history: Array.from({ length: 100 }, (_, i) => ({
		type: i % 3 === 0 ? "receive" : "send",
		amount: Math.floor(Math.random() * 100) + 1,
		date: `2024-08-${String((i % 30) + 1).padStart(2, "0")}`,
		details: i % 3 === 0 ? "Salary" : i % 3 === 1 ? "Dinner" : "Freelance",
	})),
};

export default financeData;
