import { useState, useEffect } from "react";
import piggybank from "../../assets/landing/piggybank.svg";
import calendar from "../../assets/landing/calendar.svg";
import datapig from "../../assets/landing/datapig.svg";
import topup from "../../assets/landing/topup.svg";

let getId = () => crypto.randomUUID();
const ImageTiles = [
	{
		id: getId(),
		image: calendar,
	},
	{
		id: getId(),
		image: datapig,
	},
	{
		id: getId(),
		image: piggybank,
	},
	{
		id: getId(),
		image: topup,
	},
];

const ImageSlider = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % ImageTiles.length);
		}, 4500);

		return () => clearInterval(interval);
	}, []);

	return (
		<div key={ImageTiles[currentIndex].id} className='sm:mt-4 mx-auto backdrop-blur-zs'>
			<img
				className='w-full mx-auto max-h-[380px] max-w-[600px] sm:animate-bounce-slow animate-mobile-slow'
				src={ImageTiles[currentIndex].image}
				alt='Personal finance and budgetting illustration'
			/>
		</div>
	);
};

export default ImageSlider;
