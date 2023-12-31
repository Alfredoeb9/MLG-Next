'use client';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyEmail } from "@/redux/features/AuthContext";

export const useResend = () => {
  const dispatch = useDispatch();
  const [error2, setError] = useState<any>(null);
  const [isLoading2, setIsLoading] = useState<boolean>(false);

  const resend = async (e: any, email: string, path: string) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      '/api/auth/verify-email',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, path: path }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log("error33", json.error)
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // save to localStorage

      // localStorage.setItem("user", JSON.stringify(json));
      dispatch(verifyEmail(json));
      setIsLoading(false);
    }
  };

  return { resend, error2, isLoading2 };
};