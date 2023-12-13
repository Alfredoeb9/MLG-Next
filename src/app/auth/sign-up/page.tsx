"use client";
import { register } from "app/redux/features/AuthContext";
import { useAppDispatch } from "app/redux/hooks";
import React, { useState } from "react";

export default function Regiter() {
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [spinnerLoading, setSpinnerLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    // const { signup, error, isLoading } = useSignup();
    // const { resend, error2, isLoading2 } = useResend();
    // const user = useSelector(selectUserAuth);
    // const { message } = useSelector((state) => state.user);
    

    const handleSubmit = async (e: any) => {
        setError("")
        e.preventDefault();

        if (email === "") return setError("Please provide a proper email");
        if (password === "") return setError("Please provide a proper email");
        if (username === "") return setError("Please provide a proper email");
        if (firstName === "") return setError("Please provide a proper email");
        if (lastName === "") return setError("Please provide a proper email");
    
        const user = {
          username,
          firstName,
          lastName,
          email,
          password,
        };
    
        try {
            const data = await fetch("/api/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application-json'
                },
                body: JSON.stringify(user)
            })

            if (!data.ok) {
                
                let error = await data.json();
                console.log("errorr if block", JSON.stringify(error))
                setError(error.message)
            }

            const registeredUser = await data.json()

            dispatch(register());
            return registeredUser
        } catch (error) {
            console.log("errorrrrrrrrr catch", JSON.stringify(error))
            // console.log("errorrrrrrrrr", error)
        }
    
        
    
        // await signup(user);
    };
    
    return (
        <div>
            {isVerified ? (
                <div>This is a loadeer</div>
            ) : (
                <>
                    {!isVerified ? (
                        <form className="signup" onSubmit={handleSubmit}>
                            <h3>Sign up</h3>

                            <label>Email:</label>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />

                            <label>Password:</label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />

                            <label>Username:</label>
                            <input
                                type="name"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />

                            <label>First Name:</label>
                            <input
                                type="name"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                            />

                            <label>Last Name:</label>
                            <input
                                type="name"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                            />

                            <button >Sign Up</button>

                            {error && <div className="error">{error}</div>}
                        </form>
                    ) : (
                        <div className="reverify">
                            <div className="reverify__container">
                                We have sent a verification email to{" "}
                                <span className="reverify__email">{email}</span>. <br />
                                Click on the link in the email to verify your account.
                            </div>
                            <button
                                // disabled={isLoading2}
                                className="reviery__resendBtn"
                                // onClick={resendEmail}
                            >
                                Resend Email
                            </button>

                            {/* {error2 && <div className="error">{error2}</div>} */}
                                {/* <div className="text-gray-600 py-8 text-sm">
                                <a onClick={resendEmail}>Resend Email</a>
                            </div> */}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}