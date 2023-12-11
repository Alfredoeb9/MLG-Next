// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import {useAppDispatch, useAppSelector} from "../../../redux/hooks"
// import authAPI from "../../../redux/api/authAPI";
// import { verifyEmail } from "../../../redux/features/AuthContext";
// import { useSelector } from "react-redux";
// // import { Link, useParams } from "react-router-dom";
// // import authAPI from "../../app/api/authApi";
// // import { verifyEmail } from "../../app/features/AuthContext";
// // import CircularIndeterminate from "../../components/spinner/Spinner";

import { NextRequest } from "next/server";
import db from "../../../../../lib/db";
import { redirect } from "next/navigation";

// export default function VerifyEmail() {
//   const dispatch = useAppDispatch()
//   //   const { id } = useParams();
//   const { token } = useParams();

//   console.log("token", token)
//   // const { Header } = Layout;
// //   const dispatch = useDispatch();
//   // const { isLoading, isError, isSuccess } = useAppSelector((state) => state.user.user);
//   const [isError, setIsError] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const fetchVerify = async () => {
//     try {
//       const verify = await authAPI.verifyEmail(token);
//       console.log("verify", verify)
//       // dispatch(verifyEmail(verify));
//       // setIsSuccess(true);
//       // setIsLoading(false);
//       // return verify;
//     } catch (error) {
//       setIsLoading(false);
//       setIsError(true);
//       console.log("error", error)
//     //   if (error.response && error.response.data && error.response.data.message)
//     //     setMessage(error.response.data.message);
//     //   else {
//     //     setMessage("Error in verifying email!");
//     //   }
//     }
//   };


//   useEffect(() => {
//     setIsLoading(true);
//     if (token) {
//       console.log("running")
//       fetchVerify();
//     } else {
//       setIsError(true);
//       setMessage("Error in verifying email!");
//     }

//     return () => {
//       setIsLoading(false);
//     }
//   }, []);

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-between p-24">
//         <h1>hello</h1>
//       {/* {isLoading ? (
//         <CircularIndeterminate />
//       ) : (
//         <>
//           <Header className='h-20 relative container mx-auto'>
//             <div className='flex items-center justify-between pt-2'>
//               <div>
//                 <Link to='/'>
//                   <img
//                     src={logo}
//                     alt='logo'
//                     style={{
//                       width: 100
//                     }}
//                   />
//                 </Link>
//               </div>
//             </div>
//           </Header>
//           <div className="verify-email__container">
//             <p>Verify Email</p>
//             {isSuccess && (
//               <div className="email-verified text-lg">
//                 <div className="pb-12">
//                   <div style={{ fontSize: "4rem", color: "#82e082" }} />
//                 </div>
//                 <span className="font-bold">
//                   {" "}
//                   Thank you for verifying your email.{" "}
//                 </span>
//                 <br />
//                 Please <Link to={`/login`}>sign-in</Link> to access your
//                 account.
//               </div>
//             )}
//             {isError && (
//               <div className="verified-error text-lg">
//                 <div className="pb-12">
//                   <div style={{ fontSize: "4rem", color: "#FD8282" }} />
//                 </div>
//                 <span style={{ fontWeight: "bold" }}> {message} </span>
//               </div>
//             )}
//           </div>
//         </>
//       )} */}
//     </div>
//   );
// }


export async function GET(request: NextRequest, {params}: {params: {token: string}}) {
  const {token} = params
  // console.log("params", params)
  const user = await db.user.findFirst({
    where: {
      ActivateToken: {
        some: {
          AND: [
            {
              activatedAt: null,
            },
            {
              createdAt: {
                gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
              },
            },
            {
              token,
            }
          ]
        }
      }
    }
  });

  if (!user) throw new Error("Invalid token");

  await db.user.update({
    where: {
      id: user.id, 
    },
    data: {
      isVerified: true
    }
  })

  await db.activateToken.update({
    where: {
      token,
    },
    data: {
      activatedAt: new Date(),
    }
  })

  redirect("/auth/sign-in")
}