import ExpenseItem from "./ExpenseItem";

const Table = ({ expenses, showBudget = true }) => {
	return (
		<div className=' max-w-full pb-12'>
			<table className='table-auto rounded-lg border-separate w-full bg-slate-100 font-jetBrain'>
				<thead>
					<tr className='rounded-lg bg-gray-100 border-2 border-b-navy'>
						{["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map(
							(item, index) => (
								<th className='py-2 border-b border-slate-600' key={index}>
									{item}
								</th>
							)
						)}
					</tr>
				</thead>
				<tbody className='mx-auto'>
					{expenses.map((expense) => (
						<tr className='m-auto items-center text-navy py-4' key={expense.id}>
							<ExpenseItem expense={expense} showBudget={showBudget} />
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
export default Table;
