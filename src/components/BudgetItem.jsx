import { Form, Link } from "react-router-dom";
import { FaRegTrashCan, FaMoneyCheckDollar } from "react-icons/fa6";
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers";

const BudgetItem = ({ budget, showDelete = false }) => {
	const { id, name, amount, color } = budget;
	const spent = calculateSpentByBudget(id);

	return (
		<div className='budget mt-6 grid auto-cols-fr gap-6 border-fluo rounded-2xl p-4 border-2 text-alice'>
			<div className='progress-text'>
				<h3>{name}</h3>
				<p>{formatCurrency(amount)} Budgeted</p>
			</div>

			<progress max={amount} value={spent}>
				{formatPercentage(spent / amount)}
			</progress>
			<div className='progress-text'>
				<small>{formatCurrency(spent)} spent</small>
				<small>{formatCurrency(amount - spent)} remaining</small>
			</div>
			{showDelete ? (
				<div className='flex flex-wrap gap-4'>
					<Form
						method='post'
						action='delete'
						onSubmit={(event) => {
							if (!confirm("Are you sure you want to permanently delete this budget?")) {
								event.preventDefault();
							}
						}}>
						<button
							type='submit'
							className='px-6 py-1 flex gap-2 bg-alice items-center rounded-md hover:bg-tomato transition-all duration-300 max-w-[230px]'>
							<span className='text-lg text-navy'>Delete Budget</span>
							<FaRegTrashCan className='w-5 h-5 text-navy' />
						</button>
					</Form>
				</div>
			) : (
				<div className='flex flex-wrap gap-4'>
					<Link
						to={`/budget/${id}`}
						className='px-6 py-1 flex gap-2 bg-alice items-center rounded-md hover:bg-fluo transition-all duration-300 max-w-[230px]'>
						<span className='text-lg text-navy'>View Details</span>
						<FaMoneyCheckDollar className='w-5 h-5 text-navy' />
					</Link>
				</div>
			)}
		</div>
	);
};
export default BudgetItem;
