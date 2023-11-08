import { forwardRef } from "react";
import { FaCircleExclamation } from "react-icons/fa6";

const InputValidation = forwardRef((props, ref) => {
	const { name, label, type, placeholder, errorMessage, hideLabel } = props;

	return (
		<div>
			<label
				htmlFor={name}
				className={`${
					hideLabel === "true" ? "sr-only" : "block"
				} text-md font-medium leading-6 text-alice`}>
				{label}
			</label>
			<div className='relative mt-2 rounded-md shadow-sm'>
				<input
					required
					ref={ref}
					type={type}
					name={name}
					id={name}
					className='block w-full rounded-md border-0 ring-1 ring-fluo ring-inset- py-2 px-6 text-navy sm:text-sm sm:leading-6'
					placeholder={placeholder}
					aria-label={label}
					autoComplete='email'
					aria-invalid='false'
					aria-describedby={`${name}-error`}
				/>
				<div className='hidden pointer-events-none absolute inset-y-0 right-0  items-center pr-3'>
					<FaCircleExclamation className='h-5 w-5 text-red-500' aria-hidden='true' />
				</div>
			</div>
			<p className='mt-2 text-sm text-red-600' id={`${name}-error`}>
				{errorMessage}
			</p>
		</div>
	);
});

export default InputValidation;
