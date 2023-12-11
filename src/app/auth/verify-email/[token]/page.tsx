"use client";
import React, { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import Link from "next/link";
import {useAppDispatch} from "../../../redux/hooks"
import authAPI from "../../../redux/api/authAPI";
import { verifyEmail } from "../../../redux/features/AuthContext";
// import {handler} from "../../../../../lib/auth"
// // import authAPI from "../../app/api/authApi";
// // import { verifyEmail } from "../../app/features/AuthContext";
// // import CircularIndeterminate from "../../components/spinner/Spinner";


export default function VerifyEmail() {
  const dispatch = useAppDispatch()
  const params = useParams();

  // const { Header } = Layout;
//   const dispatch = useDispatch();
  // const { isLoading, isError, isSuccess } = useAppSelector((state) => state.user.user);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchVerify = async () => {
    try {
      
      const verify = await fetch("/api/auth/verify-email", {
        method: 'POST',
        headers: {
          'Content-Type': 'application-json'
        },
        body: JSON.stringify({
          token: params.token.toString()
        })
      })

      if (verify.ok) {
        dispatch(verifyEmail(verify));
        setIsSuccess(true);
        setIsLoading(false);
        return verify;
      }

    } catch (error) {
      setIsLoading(false);
      return setIsError(true);
    //   if (error.response && error.response.data && error.response.data.message)
    //     setMessage(error.response.data.message);
    //   else {
    //     setMessage("Error in verifying email!");
    //   }
    }
  };


  useEffect(() => {
    setIsLoading(true);
    if (params.token.toString()) {
      console.log("running")
      fetchVerify();

      redirect('/auth/sign-in')
      
    } else {
      setIsError(true);
      setMessage("Error in verifying email!");
    }

    return () => {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {isLoading ? (
        <p>Im suppose to be a spinner </p>
      ) : (
        <>
          <header className='h-20 relative container mx-auto'>
            <div className='flex items-center justify-between pt-2'>
              <div>
                <Link href='/auth/sign-in'>
                  <img
                    // src={logo}
                    alt='logo'
                    style={{
                      width: 100
                    }}
                  />
                </Link>
              </div>
            </div>
          </header>
          <div className="verify-email__container">
            <p>Verify Email</p>
            {isSuccess && (
              <div className="email-verified text-lg">
                <div className="pb-12">
                  <div style={{ fontSize: "4rem", color: "#82e082" }} />
                </div>
                <span className="font-bold">
                  {" "}
                  Thank you for verifying your email.{" "}
                </span>
                <br />
                Please <Link href={`/login`}>sign-in</Link> to access your
                account.
              </div>
            )}
            {isError && (
              <div className="verified-error text-lg">
                <div className="pb-12">
                  <div style={{ fontSize: "4rem", color: "#FD8282" }} />
                </div>
                <span style={{ fontWeight: "bold" }}> {message} </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}


