import { useState } from 'react';
import { toast } from 'react-toastify';

export function Import() {
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const jsonData = JSON.parse(e.target.result);
					setData(jsonData);
					setError(null);
					return toast.success('File uploaded!');
				} catch (err) {
					setError('Invalid JSON file');
					console.error('Invalid JSON file');
				}
			};
			reader.readAsText(selectedFile);
		}
	};

	const handleImport = () => {
		if (data) {
			localStorage.setItem('userName', JSON.stringify(data.userName));
			localStorage.setItem('income', JSON.stringify(data.income));
			localStorage.setItem('budgets', JSON.stringify(data.budgets));
			localStorage.setItem('expenses', JSON.stringify(data.expenses));
			return toast.success('Data imported successfully!');
		}
	};

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4 text-alice'>Import Budget Data</h1>
			<input type='file' accept='.json' onChange={handleFileChange} className='p-2 text-alice' />
			<button
				onClick={handleImport}
				disabled={!data}
				className='rounded-md bg-alice gap-2 px-3 py-2 text-sm font-semibold text-navy shadow-sm ring-1 ring-inset ring-navy hover:bg-gray-100'>
				Import data
			</button>
			{error && <p className='text-red-500 mt-2'>{error}</p>}
		</div>
	);
}

export default Import;
