"use client";
import React from "react";
import { useParams } from "next/navigation";
import {useAppDispatch} from "../../../redux/hooks"
// import { Link, useParams } from "react-router-dom";
// import authAPI from "../../app/api/authApi";
// import { verifyEmail } from "../../app/features/AuthContext";
// import CircularIndeterminate from "../../components/spinner/Spinner";

export default function VerifyEmail() {
  const dispatch = useAppDispatch()
  //   const { id } = useParams();
  const { token } = useParams();


  // const { Header } = Layout;
//   const dispatch = useDispatch();
  // const { isLoading, isError, isSuccess } = useSelector((state) => state.auth);
  // const [isError, setIsError] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  // const [message, setMessage] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const fetchVerify = async () => {
  //   try {
  //     const verify = await authAPI.verifyEmail(id);
  //     dispatch(verifyEmail(verify));
  //     setIsSuccess(true);
  //     setIsLoading(false);
  //     return verify;
  //   } catch (error) {
  //     setIsLoading(false);
  //     setIsError(true);
  //     if (error.response && error.response.data && error.response.data.message)
  //       setMessage(error.response.data.message);
  //     else {
  //       setMessage("Error in verifying email!");
  //     }
  //   }
  // };
  // useEffect(() => {
  //   setIsLoading(true);
  //   if (id) {
  //     fetchVerify();
  //   } else {
  //     setIsError(true);
  //     setMessage("Error in verifying email!");
  //   }
  // }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>hello</h1>
      {/* {isLoading ? (
        <CircularIndeterminate />
      ) : (
        <>
          <Header className='h-20 relative container mx-auto'>
            <div className='flex items-center justify-between pt-2'>
              <div>
                <Link to='/'>
                  <img
                    src={logo}
                    alt='logo'
                    style={{
                      width: 100
                    }}
                  />
                </Link>
              </div>
            </div>
          </Header>
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
                Please <Link to={`/login`}>sign-in</Link> to access your
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
      )} */}
    </div>
  );
}