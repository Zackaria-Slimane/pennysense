import { useEffect, useState } from "react";
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";
import { Form, NavLink } from "react-router-dom";
import { fetchData } from "../helpers";

const Navbar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		setUser(fetchData("userName"));
	});

	const confirmLogout = (e) => {
		if (!window.confirm("Are you sure you want to logout?")) {
			e.preventDefault();
		}
	};

	return (
		<nav className='w-full max-w-[1200px] mx-auto flex py-6  justify-between items-center navbar'>
			<NavLink to='/'>
				<img
					className='w-20 h-10 text-alice hover:text-fluo hover:scale-110 hover:rotate-12'
					src='/pennies.svg'
					alt='Pennies stack - Penny sense logo'
				/>
			</NavLink>

			{user && (
				<ul className='list-none sm:flex hidden justify-end items-center'>
					<div>
						<Form
							method='post'
							action='/logout'
							onSubmit={(e) => {
								confirmLogout(e);
							}}>
							<button
								className='group bg-tomato py-1 px-4 rounded-md my-2 inline-flex items-center hover:scale-105 transition-all duration-300'
								type='submit'>
								<span className='text-lg text-alice'> Delete Session </span>
							</button>
						</Form>
					</div>
				</ul>
			)}

			{/* hide nav menu if user logged */}
			{user && (
				<div className='sm:hidden flex  justify-end items-center'>
					<img
						src={mobileMenuOpen ? close : menu}
						alt='menu'
						className='w-[28px] h-[28px] object-contain text-alice'
						onClick={() => setMobileMenuOpen((prev) => !prev)}
					/>

					<div
						className={`${
							mobileMenuOpen ? "flex" : "hidden"
						} p-1 absolute top-20 right-0 mx-2 my-2 min-w-[140px] rounded-lg sidebar justify-center`}>
						<ul className='list-none sm:hidden flex flex-col justify-end items-center'>
							<div>
								<Form
									method='post'
									action='/logout'
									onSubmit={(e) => {
										confirmLogout(e);
									}}>
									<button
										className='text-tomato underline py-1.5 px-6 rounded-sm my-2 inline-flex items-center hover:scale-105 transition-all duration-300'
										type='submit'>
										Delete Session
									</button>
								</Form>
							</div>
						</ul>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
