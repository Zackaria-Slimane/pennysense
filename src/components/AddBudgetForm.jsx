import { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";
import { FaDollarSign } from "react-icons/fa6";

const AddBudgetForm = () => {
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
		<div className='font-jetBrain max-w-[600px] p-6 border-2 rounded-2xl flex-1'>
			<h2 className='text-fluo text-2xl'>Create budget</h2>
			<fetcher.Form method='post' className='grid gap-4 p-4' ref={formRef}>
				<div className='grid gap-4'>
					<label className='text-alice text-lg' htmlFor='newBudget'>
						Budget Name
					</label>
					<input
						className='text-navy rounded-lg py-2 px-4'
						type='text'
						name='newBudget'
						id='newBudget'
						placeholder='... Groceries'
						required
						ref={focusRef}
					/>
				</div>
				<div className='grid gap-4'>
					<label className='text-alice text-lg' htmlFor='newBudgetAmount'>
						Amount
					</label>
					<input
						className='text-navy rounded-lg py-2 px-4'
						type='number'
						step='0.01'
						name='newBudgetAmount'
						id='newBudgetAmount'
						placeholder='... $350'
						required
						inputMode='decimal'
					/>
				</div>
				<input type='hidden' name='_action' value='createBudget' />
				<button
					type='submit'
					className='px-6 py-1 flex gap-2 bg-alice items-center rounded-md hover:bg-fluo transition-all duration-300 max-w-[230px]'
					disabled={isSubmitting}>
					{isSubmitting ? (
						<span className='text-lg'>Submitting…</span>
					) : (
						<>
							<span className='text-lg text-navy'>Create budget</span>
							<FaDollarSign className='w-5 h-5 text-navy' />
						</>
					)}
				</button>
			</fetcher.Form>
		</div>
	);
};
export default AddBudgetForm;
