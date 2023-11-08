import { FaRegCopyright, FaGithub } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Footer = () => {
	let getCurrentYear = new Date().getFullYear();
	return (
		<footer
			id='page-footer'
			className='flex justify-end items-center px-6 gap-6 sm:fixed bottom-0 w-full text-alice my-6'>
			<div className='inline-flex py-2 items-center'>
				<NavLink to='/'>
					<img
						className='w-10 h-5 text-alice hover:text-fluo hover:scale-110 hover:rotate-12'
						src='/pennies.svg'
						alt='Pennies stack - Penny sense logo'
					/>
				</NavLink>
				<NavLink
					to='https://github.com/Zackaria-Slimane'
					target='_blank'
					rel='noreferrer noopener'>
					<FaGithub className='w-10 h-5 text-alice hover:text-fluo hover:scale-110 hover:rotate-12' />
				</NavLink>
				<NavLink
					to='https://github.com/Zackaria-Slimane'
					target='_blank'
					rel='noreferrer noopener'
					className='mx-4 flex gap-2 items-center'>
					<FaRegCopyright className='text-base' />
					<span className='text-xs'>{getCurrentYear}</span>
				</NavLink>
			</div>
		</footer>
	);
};

export default Footer;
