import { supabaseClient } from "./supabase";

export const waait = () => new Promise((res) => setTimeout(res, Math.random() * 300));

const generateRandomColor = () => {
	const existingBudgetLength = fetchData("budgets")?.length ?? 0;
	return `${existingBudgetLength * 34} 65% 50%`;
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

export const deleteItem = async ({ key, id }) => {
	if (key === "budgets") {
		const { error } = await supabaseClient.from("budgets").delete().eq("id", id);
		if (error) {
			console.log("Error on deleting budget ", id, error);
		}
	}

	if (key === "expenses") {
		const { error } = await supabaseClient.from("expenses").delete().eq("id", id);
		if (error) {
			console.log("Error on deleting expense ", id, error);
		}
	}
	const existingData = fetchData(key);
	if (id) {
		const newData = existingData.filter((item) => item.id !== id);
		return localStorage.setItem(key, JSON.stringify(newData));
	}
	return localStorage.removeItem(key);
};

export const createBudget = async ({ name, amount }) => {
	const newItem = {
		id: crypto.randomUUID(),
		name: name,
		createdAt: Date.now(),
		amount: +amount,
		color: generateRandomColor(),
	};

	const { error } = await supabaseClient.from("budgets").insert(newItem);
	if (error) {
		console.log("Error inserting data in budgets table", error);
	}

	const existingBudgets = fetchData("budgets") ?? [];
	return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]));
};

export const createExpense = async ({ name, amount, budgetId }) => {
	const newItem = {
		id: crypto.randomUUID(),
		name: name,
		createdAt: Date.now(),
		amount: +amount,
		budgetId: budgetId,
	};

	const { error } = await supabaseClient.from("expenses").insert(newItem);
	if (error) {
		console.log("Error inserting data in expenses table", error);
	}

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
