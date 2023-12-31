import { useEffect, useState } from "react";
import { Form, NavLink } from "react-router-dom";
import { fetchData } from "../helpers";
import { DropMenu } from "./utility/DropMenu";

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
		<nav className='w-full max-w-[1200px] mx-auto flex py-6 justify-between items-center navbar'>
			<NavLink to='/'>
				<img
					className='w-20 h-10 text-alice hover:text-fluo hover:scale-110 hover:rotate-12'
					src='/pennies.svg'
					alt='Pennies stack - Penny sense logo'
				/>
			</NavLink>

			{user && (
				<div className='list-none mr-4  justify-end items-center'>
					<DropMenu />
				</div>
			)}
		</nav>
	);
};

export default Navbar;
