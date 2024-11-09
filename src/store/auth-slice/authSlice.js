import { APIConfig } from "@/config/apiConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
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
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action?.payload?.success;
        state.user = action?.payload?.success ? action?.payload?.user : null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
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
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
