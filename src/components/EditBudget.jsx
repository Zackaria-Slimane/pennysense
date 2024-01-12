import { useState, useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import { getAllMatchingItems } from "../helpers";

export function EditBudget({ budgetId }) {
	const fetcher = useFetcher();
	const isSubmitting = fetcher.state === "submitting";
	const formRef = useRef();
	const focusRef = useRef();
	const [budget, setBudget] = useState({});

	useEffect(() => {
		console.log("budgetId", budgetId);
		async function getBudget() {
			let result = await getAllMatchingItems({
				category: "budgets",
				key: "id",
				value: budgetId,
			})[0];
			console.log("budget", budget);
			setBudget(result);
		}
		getBudget();
	}, []);

	useEffect(() => {
		if (!isSubmitting) {
			formRef.current.reset();
			focusRef.current.focus();
		}
	}, [isSubmitting]);

	return (
		<div className='font-jetBrain max-w-[600px] p-6 bg-white rounded-2xl flex-1'>
			<h2 className='text-navy text-2xl'>Edit budget</h2>
			<fetcher.Form method='post' className='grid gap-4 p-4' ref={formRef}>
				<div className='grid gap-4'>
					<label className='text-navy text-lg' htmlFor='newBudget'>
						Budget Name
					</label>
					<input
						className='text-navy rounded-lg ring-2 ring-navy py-2 px-4'
						type='text'
						name='newBudget'
						id='newBudget'
						placeholder={budget.name}
						required
						ref={focusRef}
					/>
				</div>
				<div className='grid gap-4'>
					<label className='text-navy text-lg' htmlFor='newBudgetAmount'>
						Amount
					</label>
					<input
						className='text-navy rounded-lg ring-2 ring-navy py-2 px-4'
						type='number'
						step='0.01'
						name='newBudgetAmount'
						id='newBudgetAmount'
						placeholder={budget.amount}
						required
						inputMode='decimal'
					/>
				</div>
				<input type='hidden' name='_action' value='editBudget' />
				<button
					type='submit'
					className='px-6 py-2 mt-2 flex gap-2 bg-fluo items-center rounded-md hover:bg-fluo/80 transition-all duration-300 max-w-[230px]'
					disabled={isSubmitting}>
					{isSubmitting ? (
						<span className='text-lg'>Submitting…</span>
					) : (
						<>
							<span className='w-full text-md text-navy'>Edit budget</span>
						</>
					)}
				</button>
			</fetcher.Form>
		</div>
	);
}
