import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Main, mainLoader } from './layouts/Main';

import { deleteBudget } from './actions/deleteBudget';
import { editBudget } from './actions/editBudget';

import { Dashboard, dashboardAction, dashboardLoader } from './pages/Dashboard';
import { BudgetPage, budgetAction, budgetLoader } from './pages/BudgetPage';
import { ExpensesPage, expensesAction, expensesLoader } from './pages/ExpensesPage';
import { Error } from './pages/Error';
import { Stats } from './pages/Stats';
import { Import } from './pages/Import';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		loader: mainLoader,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Dashboard />,
				loader: dashboardLoader,
				action: dashboardAction,
				errorElement: <Error />,
			},
			{
				path: 'budget/:id',
				element: <BudgetPage />,
				loader: budgetLoader,
				action: budgetAction,
				errorElement: <Error />,
				children: [
					{
						path: 'delete',
						action: deleteBudget,
					},
					{
						path: 'edit',
						action: editBudget,
					},
				],
			},
			{
				path: 'expenses',
				element: <ExpensesPage />,
				loader: expensesLoader,
				action: expensesAction,
				errorElement: <Error />,
			},
			{
				path: 'stats',
				element: <Stats />,
				errorElement: <Error />,
			},
			{
				path: 'import',
				element: <Import />,
				errorElement: <Error />,
			},
		],
	},
	{
		path: '*',
		element: <Error />,
	},
]);

export function App() {
	return (
		<div className='App overflow-x-hidden'>
			<RouterProvider router={router} />
			<ToastContainer theme='colored' limit={1} autoClose={1500} />
		</div>
	);
}
