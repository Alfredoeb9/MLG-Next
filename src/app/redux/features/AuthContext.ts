import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authAPI from "../api/authAPI";
import { RootState } from "../store";

export interface UserAuthProps {
    user: any,
    isError: any,
    isSuccess: any,
    isLoading: any,
    message: any
}

const initialState: UserAuthProps = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// register user
// eslint-disable-next-line no-shadow
// export const register = createAsyncThunk(
//   "user/register",
//   async (user, thunkAPI) => {
//     try {
//       const message = await authAPI.register(user);
//       return message;
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// login user
// eslint-disable-next-line no-shadow
// export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
//   try {
//     const message = await authAPI.login(user);
//     console.log("message", message);
//     return message;
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });

// export const verifyEmail = createAsyncThunk(
//   "auth/verifyEmail",
//   async (emailVerificationId, thunkAPI) => {
//     try {
//       return await authAPI.verifyEmail(emailVerificationId);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const resendVerificationEmail = createAsyncThunk(
//   "user/resendVerifyEmail",
//   async (emailVerificationId, thunkAPI) => {
//     try {
//       return await authAPI.resendVerifyEmail(emailVerificationId);
//     } catch (error) {
//       const message =
//         (error.message && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const userAuthSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    login: (state, action) => {
      state.user = action.payload;
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = "USER_SIGNED_IN";
    },

    logout: (state) => {
      state.user = null;
      // state.isError = false;
      // state.isSuccess = false;
      // state.isLoading = false;
      // state.message = "";
    },
    verifyEmail: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = "USER_AUTHORIZED";
      // state.user = action.payload;
    },
    register: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = "USER_REGISTERED";
      // state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<any>) => {
      // console.log(state.workout);
      // console.log(action.payload);
      // state.workout = state.workout.filter(
      //   (workout) => workout._id !== action.payload._id
      // );
      state.user = action.payload;
    },
    // extraReducers: (builder) => {
    //   builder
    //     // register cases
    //     .addCase(register.pending, (state, action) => {
    //       state.isLoading = true;
    //     })
    //     .addCase(register.fulfilled, (state, action) => {
    //       state.isLoading = false;
    //       state.isSuccess = true;
    //     })
    //     .addCase(register.rejected, (state, action) => {
    //       state.isLoading = false;
    //       state.isError = true;
    //       state.message = action.payload;
    //       state.user = null;
    //     });
    // verify email cases
    // .addCase(verifyEmail.pending, (state, action) => {
    //   state.isLoading = true;
    // })
    // .addCase(verifyEmail.fulfilled, (state, action) => {
    //   console.log(state);
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.user = action.payload;
    // })
    // .addCase(verifyEmail.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    //   state.user = null;
    // });
    // login cases
    // .addCase(login.pending, (state, action) => {
    //   console.log("pending");
    //   state.isLoading = true;
    // })
    // .addCase(login.fulfilled, (state, action) => {
    //   console.log("fullfilled", action.payload);
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.user = action.payload;
    // })
    // .addCase(login.rejected, (state, action) => {
    //   console.log("rejected");
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    //   state.user = null;
    // });
    // forgot password cases
    // },
  },
});

export const { login, logout, verifyEmail, register, updateUser } =
  userAuthSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserAuth = (state: { user: { user: any; }; }) => state.user.user;

export default userAuthSlice;