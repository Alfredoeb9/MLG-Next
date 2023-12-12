import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks";
import { login, selectUserAuth } from "../../app/redux/features/AuthContext";
import {  useRouter } from "next/navigation";


const SignIn = () => {
	
	const dispatch = useAppDispatch()
	const router = useRouter();
    const [email, setEmail] = useState<string>("");
	const user = useAppSelector(selectUserAuth);
    const [loading, setLoading] = useState<boolean>(false);
	const { isSuccess, message } = useSelector((state: { user: any; }) => state.user);
	const [isVerified, setIsVerified] = useState<boolean>(false);
	const [spinnerLoading, setSpinnerLoading] = useState<boolean>(false);
	const [verifyEmail, setVerifyEmail] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	// const { login2, error, isLoading } = useLogin();
	// const { resend, error2, isLoading2 } = useResend();
	const [show, setShow] = useState<Object>({ password: false });

	// const loginUser = async (email, password) => {
	// 	setSpinnerLoading(true);
	// 	setError(null);

	// 	const response = await fetch('/api/auth/sign-in')
	// }

	useEffect(() => {
		if (message === "USER_AUTHORIZED") {
			setIsVerified(true)
		}

		if (user !== null) {
			setSpinnerLoading(true);
			router.push("/")
		}
	}, [isSuccess, user, message, router])

	// console.log("session", session)

    const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
        try {
			const signInData = await signIn("credentials", 
				{ email: email, password: password, redirect: false
			});

			if (signInData?.error) {
				console.log('error', signInData)
			} 
			console.log("sign", signInData)
			dispatch(login({
				user: signInData,
				isError: false,
				isSuccess: true,
				isLoading: false,
				message: undefined
			}));
			// router.push('/');
			return signInData;
			// const user = await fetch("/api/login", {
			// 	method: 'POST',
			// 	headers: {
			// 	'Content-Type': 'application-json'
			// 	},
			// 	body: JSON.stringify({
			// 	email: email,
			// 	password: password,
			// 	test: "test"
			// 	})
			// })

			// localStorage.setItem("user", JSON.stringify(user));
			
		} catch (error) {
			console.log("error", error)
			return error;
		}
        
        
    }
    return (
        <div className="login">
		{ spinnerLoading ? (
			<p>this is suppose to be a spinner</p>
		) : (
			<div className="login__container">
			<form className="login__form" onSubmit={handleSubmit}>
				<h3>Log In</h3>

				<label>Email:</label>
				<input
				type="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				/>
				<label>Password:</label>
				<div className="input_Group">
				<input
					// type={`${show.password ? "text" : "password"}`}
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				{/* <span
					onClick={() => setShow({ ...show, password: !show.password })}
				>
					<InfoIcon size={25} />
				</span> */}
				</div>

				<button onClick={handleSubmit}>
				Log in
				</button>
				{/* {error && <div className="error">{error}</div>} */}
			</form>

			<p>
				<Link href={"/forgot-password"}>Forgot Password?</Link>
			</p>

			{verifyEmail && (
				<div className="login__verify">
				<span className="login__verify__span">
					Your email is not verified.
				</span>
				Please click on the Verify Email link in the email registered
				with.
				<br />
				{/* <button onClick={resendEmail}>RESEND EMAIL</button> */}
				</div>
			)}
			</div>
		)}
		<p>
			Don't have an account <Link href={"/signup"}>Sign up</Link>
		</p>
		</div>
    )
}

export default SignIn;