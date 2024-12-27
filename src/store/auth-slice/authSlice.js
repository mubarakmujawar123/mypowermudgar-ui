import { APIConfig } from "@/config/apiConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  userIdForEmailVerification: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    try {
      const response = await APIConfig.post("/auth/register", formData);
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const verifyAccount = createAsyncThunk(
  "/auth/verifyAccount",
  async ({ id, otp }) => {
    try {
      const response = await APIConfig.put(`/auth/verifyAccount/${id}`, {
        otp,
      });
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const verifyResetPasswordOTP = createAsyncThunk(
  "/auth/verifyResetPasswordOTP",
  async ({ email, otp }) => {
    try {
      const response = await APIConfig.put(`/auth/verifyResetPasswordOTP`, {
        email,
        otp,
      });
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const updatePassword = createAsyncThunk(
  "/auth/updatePassword",
  async ({ email, newPassword }) => {
    try {
      const response = await APIConfig.put(`/auth/updatePassword`, {
        email,
        newPassword,
      });
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);
export const resendOTP = createAsyncThunk("/auth/resendOTP", async ({ id }) => {
  try {
    const response = await APIConfig.get(`/auth/resendOTP/${id}`);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
});

export const getResetPasswordOTP = createAsyncThunk(
  "/auth/getResetPasswordOTP",
  async ({ email }) => {
    console.log("email", email);
    try {
      const response = await APIConfig.post("/auth/resetPasswordOTP", {
        email,
      });
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const editUserPreference = createAsyncThunk(
  "/auth/editPreference",
  async ({ id, preferredCurrency }) => {
    try {
      const response = await APIConfig.put(`/auth/editPreference/${id}`, {
        preferredCurrency,
      });
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  try {
    const response = await APIConfig.post("/auth/login", formData);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  try {
    const response = await APIConfig.post("/auth/logout", {});
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
});
export const checkAuth = createAsyncThunk("/auth/checkAuth", async () => {
  // const response = await axios.get("http://localhost:5000/api/auth/checkAuth", {
  //   withCredentials: true,
  //   headers: {
  //     "cache-control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  //   },
  try {
    const response = await APIConfig.get("/auth/checkAuth");
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserPreferrence: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    resetUserIdForEmailVerification: (state) => {
      state.userIdForEmailVerification = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action?.payload?.success ? action?.payload?.user : null;
        state.isAuthenticated = false;
        state.userIdForEmailVerification =
          action?.payload?.userIdForEmailVerification ?? null;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.userIdForEmailVerification = null;
      })
      .addCase(verifyAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isAuthenticated = false;
        state.userIdForEmailVerification =
          action?.payload?.userIdForEmailVerification ?? null;
      })
      .addCase(verifyAccount.rejected, (state) => {
        state.isLoading = false;
        // state.isAuthenticated = false;
        state.userIdForEmailVerification = null;
      })
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isAuthenticated = false;
        state.userIdForEmailVerification =
          action?.payload?.userIdForEmailVerification ?? null;
      })
      .addCase(resendOTP.rejected, (state) => {
        state.isLoading = false;
        // state.isAuthenticated = false;
        state.userIdForEmailVerification = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action?.payload?.success;
        state.user = action?.payload?.success ? action?.payload?.user : null;
        state.userIdForEmailVerification =
          action?.payload?.userIdForEmailVerification ?? null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.userIdForEmailVerification = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action?.payload?.success;
        state.user = action?.payload?.success ? action?.payload?.user : null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(getResetPasswordOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getResetPasswordOTP.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getResetPasswordOTP.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyResetPasswordOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyResetPasswordOTP.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyResetPasswordOTP.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { updateUserPreferrence, resetUserIdForEmailVerification } =
  authSlice.actions;
export default authSlice.reducer;
