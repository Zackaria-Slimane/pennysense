import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
	formatCurrency,
	formatDateToLocaleString,
	getAllMatchingItems,
} from "../helpers";

const ExpenseItem = ({ expense, showBudget }) => {
	const fetcher = useFetcher();

	const budget = getAllMatchingItems({
		category: "budgets",
		key: "id",
		value: expense.budgetId,
	})[0];

	return (
		<>
			<td className='text-navy text-center'>{expense.name}</td>
			<td className='text-navy text-center'>{formatCurrency(expense.amount)}</td>
			<td className='text-navy text-center'>
				{formatDateToLocaleString(expense.createdAt)}
			</td>
			{showBudget && (
				<td className='text-navy text-center'>
					<Link
						to={`/budget/${budget.id}`}
						style={{
							"--accent": budget.color,
						}}>
						{budget.name}
					</Link>
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
						<TrashIcon className='text-navy' width={20} />
					</button>
				</fetcher.Form>
			</td>
		</>
	);
};
export default ExpenseItem;
