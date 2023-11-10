import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

import { createBudget, createExpense, deleteItem, fetchData, waait } from "../helpers";

export function dashboardLoader() {
	const userName = fetchData("userName");
	const budgets = fetchData("budgets");
	const expenses = fetchData("expenses");
	return { userName, budgets, expenses };
}

export async function dashboardAction({ request }) {
	await waait();

	const data = await request.formData();
	const { _action, ...values } = Object.fromEntries(data);

	if (_action === "newUser") {
		try {
			localStorage.setItem("userName", JSON.stringify(values.userName));
			return toast.success(`Welcome, ${values.userName}`);
		} catch (e) {
			throw new Error("There was a problem creating your account.");
		}
	}

	if (_action === "createBudget") {
		try {
			createBudget({
				name: values.newBudget,
				amount: values.newBudgetAmount,
			});
			return toast.success("Budget created!");
		} catch (e) {
			throw new Error("There was a problem creating your budget.");
		}
	}

	if (_action === "createExpense") {
		try {
			createExpense({
				name: values.newExpense,
				amount: values.newExpenseAmount,
				budgetId: values.newExpenseBudget,
			});
			return toast.success(`Expense ${values.newExpense} created!`);
		} catch (e) {
			throw new Error("There was a problem creating your expense.");
		}
	}

	if (_action === "deleteExpense") {
		try {
			deleteItem({
				key: "expenses",
				id: values.expenseId,
			});
			return toast.success("Expense deleted!");
		} catch (e) {
			throw new Error("There was a problem deleting your expense.");
		}
	}
}

const Dashboard = () => {
	const { userName, budgets, expenses } = useLoaderData();

	return (
		<>
			{userName ? (
				<div className='px-0 mx-auto overflow-x-hidden'>
					<h1 className='text-3xl sm:text-5xl text-alice font-jetBrain py-6'>
						Welcome back, <span className='text-fluo capitalize'>{userName}</span>
					</h1>
					<div className='grid gap-2 w-full px-2 pt-2'>
						{budgets && budgets.length > 0 ? (
							<div className='grid gap-4 w-full mx-auto'>
								<div className='flex flex-wrap gap-4'>
									<AddBudgetForm />
									<AddExpenseForm budgets={budgets} />
								</div>
								<div className='max-w-[1200px]'>
									<h2 className='text-alice text-xl font-heebo mt-8'>Existing Budgets</h2>
									<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
										{budgets.map((budget) => (
											<BudgetItem key={budget.id} budget={budget} />
										))}
									</div>
									{expenses && expenses.length > 0 && (
										<div className='grid gap-6'>
											<h2 className='text-alice text-xl font-heebo mt-12'>
												Recent Expenses
											</h2>
											<Table
												expenses={expenses
													.sort((a, b) => b.createdAt - a.createdAt)
													.slice(0, 8)}
											/>
											{expenses.length > 8 && (
												<Link to='expenses' className='btn btn--dark'>
													View all expenses
												</Link>
											)}
										</div>
									)}
								</div>
							</div>
						) : (
							<div className='grid grid-cols-1 gap-2 text-alice font-heebo py-6'>
								<p>Personal budgeting is the secret to financial freedom.</p>
								<p className='pb-6'>Create a budget to get started!</p>
								<AddBudgetForm />
							</div>
						)}
					</div>
				</div>
			) : (
				<Intro />
			)}
		</>
	);
};
export default Dashboard;
