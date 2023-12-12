"use client";
import React, { useState } from "react";

export default function Regiter() {
    // const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [spinnerLoading, setSpinnerLoading] = useState(true);
    // const { signup, error, isLoading } = useSignup();
    // const { resend, error2, isLoading2 } = useResend();
    // const user = useSelector(selectUserAuth);
    // const { message } = useSelector((state) => state.user);
    

    const handleSubmit = async (e: any) => {
        e.preventDefault();
    
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
                console.log('error', await data.json())
                // throw new Error("Sorry! Please refresh and try signing up again!")
            }

            const registeredUser = await data.json()

            return registeredUser
        } catch (error) {
            console.log("error", error)
        }
    
        // dispatch(register(user));
    
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

                            {/* {error && <div className="error">{error}</div>} */}
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