'use client';
import React, { useEffect, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks";
import { login, selectUserAuth } from "../../app/redux/features/AuthContext";
import {  redirect, useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { useResend } from "../hooks/resend"


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
	const [error, setError] = useState<string | undefined>("");
	const { resend, error2, isLoading2 } = useResend();
	const [show, setShow] = useState<any>({ password: false });

	// const loginUser = async (email, password) => {
	// 	setSpinnerLoading(true);
	// 	setError(null);

	// 	const response = await fetch('/api/auth/sign-in')
	// }

	if (user !== null) {
		redirect("/")
	}

	useEffect(() => {
		console.log("message", message)
		if (message === "USER_AUTHORIZED") {
			setIsVerified(true)
		}

		// if (user !== null) {
		// 	setSpinnerLoading(true);
		// 	router.push("/")
		// }
	}, [isSuccess, user, message, router])

    const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
        try {
			if (email === "" || password === "") {
				throw new Error("Please provide a email and password")
			}
			const signInData = await signIn("credentials", 
				{ email: email, password: password, redirect: false
			}).then(async (res) => {

				if (res.ok === false) {
					console.log("res", res)
					setError(res.error)
					if (res.error.includes("Email is not verified")) {
						setVerifyEmail(true);
					}
					throw new Error(res.error)
				}

				const session = await getSession();


				if (!session) throw new Error(`Error: cannot find user`)

				dispatch(login(session as any));
				return session
			}).catch((error) => {
				console.log("error", error)
				// throw new Error(`Error: ${error}`)
			});
			
			
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
			
		} catch (error: any) {
			console.log("error", error)
			setError(error)
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
					type={`${show.password ? "text" : "password"}`}
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<span
					onClick={() => setShow({ ...show, password: !show.password })}
				>
					<p>Show Password</p>
				</span>
				</div>

				<button onClick={handleSubmit}>
				Log in
				</button>
				{error && <div className="">{error.toString()}</div>}
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
				<button onClick={() => resend(email, "resend")}>RESEND EMAIL</button>
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