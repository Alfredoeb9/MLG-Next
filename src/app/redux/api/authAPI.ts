import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const register = async (userData: any) => {
  console.log("userData", userData);
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const json = await response.json();

  if (!response.ok) {
    return json.error;
    //   setError(json.error);
  }
  return json;

  // const response = await axios.post(
  //   `http://localhost:4000/api/auth/register`,
  //   userData
  // );
  // return response.data;
};

const resendVerifyEmail = async (email: any) => {
  const response = await axios.post(
    `${API_URL}/api/auth/resend-verification-email`,
    { email: email },
    {}
  );
  if (response.data) {
    // setSessionUserAndToken(response.data.data);
  }
  return response.data;
};

const verifyEmail = async (id: any) => {
    console.log("id", id)
  const response = await axios.post(`${API_URL}/api/auth/verify-email`, id, {
    headers: {
      authorization: id,
    },
  });
  if (response.data) {
    // setSessionUserAndToken(response.data.data);
  }
  return response.data;
};
// login user
const login = async (userData: any) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const json = await response.json();

  console.log(json);

  if (!response.ok) {
    return json.error;
    //   setError(json.error);
  }
  return json;
};

const authAPI = {
  register,
  login,
  //   forgotPassword,
  //   resetPassword,
  //   logout,
  verifyEmail,
  resendVerifyEmail,
};

export default authAPI;