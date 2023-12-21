import { useEffect, useRef, useState } from "react";
import { supabaseClient } from "../utils/supabase";
import { FaUserPlus, FaXTwitter, FaGithub, FaArrowRightToBracket } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { insertUser, getUserbyId } from "../utils/helpers";
import loader from "../assets/loader.svg";

export function UserForm() {
	const emailRef = useRef(null);
	const passWordRef = useRef(null);
	const signupFormRef = useRef(null);
	const LoginFormRef = useRef(null);

	const [user, setUser] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitting3rdParty, setIsSubmitting3rdParty] = useState(false);
	const [error, setError] = useState(null);
	const [isSignup, setIsSignup] = useState(true);
	const [cookies, setCookie] = useCookies(["pennyuser"]);

	function handleCookies(user) {
		setCookie("pennyuser", user, { path: "/" });
	}

	function toggleForms() {
		setIsSignup((prev) => !prev);
	}

	async function Signup(event) {
		setIsSubmitting(true);
		event.preventDefault();
		console.log(
			"Creating account with ",
			emailRef.current.value,
			passWordRef.current.value
		);
		const { data, error } = await supabaseClient.auth.signUp({
			email: emailRef.current.value,
			password: passWordRef.current.value,
		});

		if (error) {
			setError(error);
			setIsSubmitting(false);
			console.log("Error signing up ===", error);
			return toast.error(`Could not create your account, please try again`);
		}

		if (!error || data) {
			signupFormRef.current.reset();
			setIsSubmitting(false);
			setUser(data);
			console.log("Sign up data ===", data);
			handleCookies(data?.user?.id ?? data?.user?.email.split("@")[0]);
			return toast.success(`Welcome ! please check your email for confirmation link`);
		}
	}

	async function LoginWithEmail(event) {
		setIsSubmitting(true);
		event.preventDefault();

		const { data, error } = await supabaseClient.auth.signInWithPassword({
			email: emailRef.current.value,
			password: passWordRef.current.value,
		});

		if (error) {
			setIsSubmitting(false);
			setError(error);
			console.log("Error login ===", error);
			return toast.error(`Could not login, please try again`);
		}

		if (!error || data) {
			LoginFormRef.current.reset();
			setIsSubmitting(false);
			setUser(data.user);
			let username = data?.user?.email.split("@")[0];
			let id = data?.user?.id;
			let email = data?.user?.email;
			handleCookies(data?.user?.id ?? username);
			insertUser(id, email, username);
			getUserbyId(id);
			return toast.success(`Welcome back ! ${username}`);
		}
	}

	async function LoginWithGithub() {
		setIsSubmitting3rdParty(true);
		const { data, error } = await supabaseClient.auth.signInWithOAuth({
			provider: "github",
		});

		if (error) {
			setError(error);
			setIsSubmitting3rdParty(false);
			console.log("Error login with github ===", error);
			return toast.error(`Could not login, please try again`);
		}

		if (!error || data) {
			console.log("Login with github data ===", data);
			setIsSubmitting3rdParty(false);
			setUser(data?.user);
			let username = data?.user?.email.split("@")[0];
			let id = data?.user?.id;
			let email = data?.user?.email;
			handleCookies(data?.user?.id ?? username);
			insertUser(id, email, username);
			getUserbyId(id);
			return toast.success(`Welcome back ! `);
		}
	}

	async function LoginWithTwitter() {
		setIsSubmitting3rdParty(true);
		const { data, error } = await supabaseClient.auth.signInWithOAuth({
			provider: "twitter",
		});

		if (error) {
			setError(error);
			setIsSubmitting3rdParty(false);
			console.log("Error login with twitter ===", error);
			return toast.error(`Could not login, please try again`);
		}

		if (!error || data) {
			console.log("Login with twitter data ===", data);
			setIsSubmitting3rdParty(false);
			setUser(data?.user);
			let username = data?.user?.email.split("@")[0];
			let id = data?.user?.id;
			let email = data?.user?.email;
			handleCookies(data?.user?.id ?? username);
			insertUser(id, email, username);
			return toast.success(`Welcome back ! ${data?.user?.email.split("@")[0]} `);
		}
	}

	useEffect(() => {
		async function getSession() {
			const { data, error } = await supabaseClient.auth.getSession();
			if (data) {
				console.log("Session data ===", data);
				let token = data?.session?.access_token;
				let userID = data?.user?.id;
				localStorage.setItem("token", token);
				localStorage.setItem("userID", userID);
			}
			if (error) {
				console.log("session error ===", error);
			}
		}
		getSession();
	}, [user]);

	return (
		<>
			{" "}
			{isSignup ? (
				<>
					<form
						ref={signupFormRef}
						onSubmit={(event) => Signup(event)}
						className='grid grid-cols-1 gap-2 mx-auto bg-gray-950 shadow-inner shadow-gray-600 backdrop-blur-sm p-3 rounded-lg '>
						<div className='text-alice pb-4 font-jetBrain'>
							<h2 className='font-semibold text-xl pb-1'>Sign up</h2>
							<p className='text-alice text-sm'>
								Create your account and start budgetting
							</p>
						</div>
						<div className='grid grid-cols-1 gap-4'>
							<div className='grid grid-cols-1 gap-2'>
								<label htmlFor='email' className='text-alice'>
									{" "}
									Email{" "}
								</label>
								<input
									className='text-navy rounded-lg py-2 px-4'
									type='text'
									name='email'
									required
									placeholder='Enter your email'
									aria-label='Email'
									autoComplete='email'
									ref={emailRef}
								/>
							</div>
							<div className='grid grid-cols-1 gap-2'>
								<label htmlFor='password' className='text-alice'>
									{" "}
									Password{" "}
								</label>
								<input
									className='text-navy rounded-lg py-2 px-4'
									type='password'
									name='password'
									aria-label='Your password'
									autoComplete='password'
									required
									ref={passWordRef}
								/>
							</div>
						</div>
						<button
							onClick={Signup}
							className='text-center group shadow-md bg-fluo text-black py-1.5 px-6 rounded-md my-2 hover:bg-fluo/80 transition-all duration-300 flex justify-center gap-2 items-center'
							type='submit'>
							{isSubmitting ? (
								<span className='py-1.5'>
									<img className='animate-spin' src={loader} alt='loading animation' />
								</span>
							) : (
								<>
									<span className='text-lg px-2 text-navy'>Create account</span>
									<span>
										<FaUserPlus
											className='group-transition-all group-duration-300 ml-2 text-navy'
											aria-hidden='true'
										/>
									</span>
								</>
							)}
						</button>
					</form>
					<div className='grid grid-cols-1 gap-4'>
						<div className='grid grid-cols-2 gap-4'>
							<button
								onClick={LoginWithTwitter}
								className='flex justify-center items-center gap-4 bg-gray-900 py-2 px-2 rounded-lg border border-fluo hover:bg-gray-800/80'>
								{isSubmitting3rdParty ? (
									<span className='py-1.5'>
										<img className='animate-spin' src={loader} alt='loading animation' />
									</span>
								) : (
									<FaXTwitter className='w-5 h-5 text-alice' />
								)}
								<span className='text-alice'>Twitter</span>
							</button>

							<button
								onClick={LoginWithGithub}
								className='flex justify-center items-center gap-4 bg-gray-900 py-2 px-2 rounded-lg border border-fluo hover:bg-gray-800/80'>
								{isSubmitting3rdParty ? (
									<span className='py-1.5'>
										<img className='animate-spin' src={loader} alt='loading animation' />
									</span>
								) : (
									<FaGithub className='w-5 h-5 text-alice' />
								)}
								<span className='text-alice'>GitHub</span>
							</button>
						</div>
						<div className='text-alice text-end font-jetBrain'>
							<span className='text-alice px-2'>Already have an account?</span>
							<button
								onClick={toggleForms}
								className='text-fluo underline hover:text-fluo/70'>
								{" "}
								Login{" "}
							</button>
						</div>
					</div>
				</>
			) : (
				<>
					<form
						ref={LoginFormRef}
						onSubmit={(event) => LoginWithEmail(event)}
						className='grid grid-cols-1 gap-2 mx-auto bg-gray-950 shadow-inner shadow-gray-600 backdrop-blur-sm p-3 rounded-lg '>
						<div className='text-alice pb-4 font-jetBrain'>
							<h2 className='font-semibold text-xl pb-1'>Log in </h2>
							<p className='text-alice text-sm'>
								Pick up where you left and make every penny count !
							</p>
						</div>
						<div className='grid grid-cols-1 gap-4'>
							<div className='grid grid-cols-1 gap-2'>
								<label htmlFor='email' className='text-alice'>
									{" "}
									Email{" "}
								</label>
								<input
									className='text-navy rounded-lg py-2 px-4'
									type='text'
									name='email'
									required
									placeholder='Enter your email'
									aria-label='Email'
									autoComplete='email'
									ref={emailRef}
								/>
							</div>
							<div className='grid grid-cols-1 gap-2'>
								<label htmlFor='password' className='text-alice'>
									{" "}
									Password{" "}
								</label>
								<input
									className='text-navy rounded-lg py-2 px-4'
									type='password'
									name='password'
									aria-label='Your password'
									autoComplete='password'
									required
									ref={passWordRef}
								/>
							</div>
						</div>
						<button
							onClick={LoginWithEmail}
							className='text-center group shadow-md bg-fluo text-black py-1.5 px-6 rounded-md my-2 hover:bg-fluo/80 transition-all duration-300 flex justify-center gap-2 items-center'
							type='submit'>
							{isSubmitting ? (
								<span className='py-1.5'>
									<img className='animate-spin' src={loader} alt='loading animation' />
								</span>
							) : (
								<>
									<span className='text-lg px-2 text-navy'>Log in</span>
									<span>
										<FaArrowRightToBracket
											className='group-transition-all group-duration-300 ml-2 text-navy'
											aria-hidden='true'
										/>
									</span>
								</>
							)}
						</button>
					</form>
					<div className='grid grid-cols-1 gap-4'>
						<div className='grid grid-cols-2 gap-4'>
							<button
								onClick={LoginWithTwitter}
								type='button'
								className='flex justify-center items-center gap-4 bg-gray-900 py-2 px-2 rounded-lg border border-fluo hover:bg-gray-800/80'>
								{isSubmitting3rdParty ? (
									<span className='py-1.5'>
										<img className='animate-spin' src={loader} alt='loading animation' />
									</span>
								) : (
									<FaXTwitter className='w-5 h-5 text-alice' />
								)}
								<span className='text-alice'>Twitter</span>
							</button>

							<button
								onClick={LoginWithGithub}
								type='button'
								className='flex justify-center items-center gap-4 bg-gray-900 py-2 px-2 rounded-lg border border-fluo hover:bg-gray-800/80'>
								{isSubmitting3rdParty ? (
									<span className='py-1.5'>
										<img className='animate-spin' src={loader} alt='loading animation' />
									</span>
								) : (
									<FaGithub className='w-5 h-5 text-alice' />
								)}
								<span className='text-alice'>GitHub</span>
							</button>
						</div>
						<div className='text-alice text-end font-jetBrain'>
							<span className='text-alice px-2'>Don't have an account? Create one </span>
							<button
								onClick={toggleForms}
								className='text-fluo underline hover:text-fluo/70'>
								{" "}
								Register{" "}
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
}
