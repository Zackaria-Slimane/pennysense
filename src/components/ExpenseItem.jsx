import { Link, useFetcher } from "react-router-dom";
import { FiXCircle } from "react-icons/fi";
import { formatCurrency, getAllMatchingItems, formatDate } from "../helpers";

const ExpenseItem = ({ expense, showBudget }) => {
	const fetcher = useFetcher();

	const budget = getAllMatchingItems({
		category: "budgets",
		key: "id",
		value: expense.budgetId,
	})[0];

	return (
		<>
			<td className='text-navy text-xs sm:text-base text-center'>{expense.name}</td>
			<td className='text-center text-sm sm:text-base text-tomato'>
				{formatCurrency(expense.amount)}
			</td>
			<td className='text-navy text-xs sm:text-base text-center'>
				{formatDate(expense.createdAt)}
			</td>
			{showBudget && (
				<td className='text-navy text-sm sm:text-base text-center'>
					<Link to={`/budget/${budget.id}`}>{budget.name}</Link>
				</td>
			)}
			<td>
				<fetcher.Form method='post'>
					<input type='hidden' name='_action' value='deleteExpense' />
					<input type='hidden' name='expenseId' value={expense.id} />
					<button
						type='submit'
						className='text-center btn btn--warning'
						aria-label={`Delete ${expense.name} expense`}>
						<FiXCircle className='text-tomato' width={20} />
					</button>
				</fetcher.Form>
			</td>
		</>
	);
};
export default ExpenseItem;
