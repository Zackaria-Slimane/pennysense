import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateBudget } from '../helpers';

export function editBudget({ params }) {
	const editData = JSON.parse(localStorage.getItem('budgetToEdit'));

	try {
		updateBudget({
			key: 'budgets',
			id: params.id,
			name: editData.newBudgetName,
			amount: editData.newBudgetAmount,
		});
		toast.success('Budget updated successfully!');
	} catch (e) {
		throw new Error('There was a problem updating your budget.');
	}
	return redirect('/');
}
