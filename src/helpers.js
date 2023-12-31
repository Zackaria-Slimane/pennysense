export const waait = () => new Promise((res) => setTimeout(res, Math.random() * 300));

export const getDate = () => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth() + 1;
	const day = currentDate.getDate();
	return `${day}-${month}-${year}`;
};

export const fetchData = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

export const getAllMatchingItems = ({ category, key, value }) => {
	const data = fetchData(category) ?? [];
	return data.filter((item) => item[key] === value);
};

export const getTotalBudgets = () => {
	const budgets = fetchData("budgets") ?? [];
	return budgets.reduce((acc, budget) => (acc += budget.amount), 0);
};

export const getTotalExpenses = () => {
	const expenses = fetchData("expenses") ?? [];
	return expenses.reduce((acc, expense) => (acc += expense.amount), 0);
};

export const deleteItem = ({ key, id }) => {
	const existingData = fetchData(key);
	if (id) {
		const newData = existingData.filter((item) => item.id !== id);
		return localStorage.setItem(key, JSON.stringify(newData));
	}
	return localStorage.removeItem(key);
};

export const createBudget = ({ name, amount }) => {
	const newItem = {
		id: crypto.randomUUID(),
		name: name,
		createdAt: getDate(),
		amount: +amount,
	};
	const existingBudgets = fetchData("budgets") ?? [];
	return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]));
};

export const createExpense = ({ name, amount, budgetId }) => {
	const budgetName = getAllMatchingItems({ category: "budgets", key: "id", value: budgetId })[0]
		.name;
	const newItem = {
		id: crypto.randomUUID(),
		name: name,
		createdAt: getDate(),
		amount: +amount,
		budgetId: budgetId,
		budgetName: budgetName,
	};
	const existingExpenses = fetchData("expenses") ?? [];
	return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]));
};

export const calculateSpentByBudget = (budgetId) => {
	const expenses = fetchData("expenses") ?? [];
	const budgetSpent = expenses.reduce((acc, expense) => {
		if (expense.budgetId !== budgetId) return acc;
		return (acc += expense.amount);
	}, 0);
	return budgetSpent;
};

export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

export const formatPercentage = (amt) => {
	return amt.toLocaleString(undefined, {
		style: "percent",
		minimumFractionDigits: 0,
	});
};

export const formatCurrency = (amt) => {
	return amt.toLocaleString(undefined, {
		style: "currency",
		currency: "USD",
	});
};
