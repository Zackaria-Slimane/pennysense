import { useRouteError, Link, useNavigate } from "react-router-dom";

const Error = () => {
	const error = useRouteError();
	const navigate = useNavigate();

	return (
		<div className='error'>
			<h1 className='text-alice text-xl'>Uh oh! We’ve got a problem.</h1>
			<p>{error.message || error.statusText}</p>
			<div className='flex gap-6'>
				<button className='btn btn--dark' onClick={() => navigate(-1)}>
					<span className='text-tomato text-lg'>Go Back</span>
				</button>
				<Link to='/' className='btn btn--dark'>
					<span className='text-alice text-lg'>Go home</span>
				</Link>
			</div>
		</div>
	);
};
export default Error;
