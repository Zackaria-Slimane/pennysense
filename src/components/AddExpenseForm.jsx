import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import { FaFileCirclePlus } from "react-icons/fa6";

export function AddExpenseForm({ budgets }) {
	const fetcher = useFetcher();
	const isSubmitting = fetcher.state === "submitting";
	const formRef = useRef();
	const focusRef = useRef();

	useEffect(() => {
		if (!isSubmitting) {
			formRef.current.reset();
			focusRef.current.focus();
		}
	}, [isSubmitting]);

	return (
		<div className='font-jetBrain max-w-[600px] p-6 bg-white rounded-2xl flex-1'>
			<h2 className='text-navy text-2xl'>
				Add New{" "}
				<span className='text-fluo'>
					{budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
				</span>{" "}
				Expense
			</h2>
			<fetcher.Form method='post' className='grid gap-4 p-4' ref={formRef}>
				<div className='expense-inputs'>
					<div className='grid gap-4'>
						<label className='text-navy text-lg' htmlFor='newExpense'>
							Expense Name
						</label>
						<input
							className='text-navy rounded-lg ring-2 ring-navy py-2 px-4'
							type='text'
							name='newExpense'
							id='newExpense'
							placeholder='e.g., Coffee'
							ref={focusRef}
							required
						/>
					</div>
					<div className='grid gap-4'>
						<label className='text-navy text-lg' htmlFor='newExpenseAmount'>
							Amount
						</label>
						<input
							className='text-navy rounded-lg ring-2 ring-navy py-2 px-4'
							type='number'
							step='0.01'
							inputMode='decimal'
							name='newExpenseAmount'
							id='newExpenseAmount'
							placeholder='e.g., 3.50'
							required
						/>
					</div>
				</div>
				<div className='grid gap-4' hidden={budgets.length === 1}>
					<label className='text-navy text-lg' htmlFor='newExpenseBudget'>
						Budget Category
					</label>
					<select
						name='newExpenseBudget'
						className='rounded-lg py-2 px-4 ring-2 ring-navy'
						id='newExpenseBudget'
						required>
						{budgets
							.sort((a, b) => a.createdAt - b.createdAt)
							.map((budget) => {
								return (
									<option key={budget.id} value={budget.id}>
										{budget.name}
									</option>
								);
							})}
					</select>
				</div>
				<input type='hidden' name='_action' value='createExpense' />
				<button
					type='submit'
					className='px-6 py-2 mt-2 flex gap-2 bg-fluo items-center rounded-md hover:bg-fluo/80 transition-all duration-300 max-w-[220px]'
					disabled={isSubmitting}>
					{isSubmitting ? (
						<span>Submitting…</span>
					) : (
						<>
							<span className='text-lg text-navy'>Add Expense</span>
							<FaFileCirclePlus className='w-5 h-5 text-navy' />
						</>
					)}
				</button>
			</fetcher.Form>
		</div>
	);
}
