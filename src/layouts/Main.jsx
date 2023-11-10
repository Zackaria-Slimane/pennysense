import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchData } from "../helpers";
export function mainLoader() {
	const userName = fetchData("userName");
	return { userName };
}

const Main = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { userName } = useLoaderData();

	return (
		<div className='min-h-full w-full mx-auto overflow-y-scroll bg-gray-900 relative isolate'>
			<div
				className='absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]'
				aria-hidden='true'>
				<div
					className='aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20'
					style={{
						clipPath:
							"polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
					}}
				/>
			</div>
			<Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
			<main className='sm:w-[80dvw] w-full px-8 mx-auto'>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};
export default Main;
