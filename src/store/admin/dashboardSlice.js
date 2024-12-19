import { APIConfig } from "@/config/apiConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const getOrdersStatusDataForAdmin = createAsyncThunk(
  "dashbord/ordersStatusDataForAdmin",
  async () => {
    try {
      const response = await APIConfig.get(
        "/admin/dashbord/ordersStatusDataForAdmin"
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const getUsersStatusForAdmin = createAsyncThunk(
  "dashbord/usersStatusDataForAdmin",
  async () => {
    try {
      const response = await APIConfig.get(
        "/admin/dashbord/usersStatusDataForAdmin"
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersStatusDataForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersStatusDataForAdmin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrdersStatusDataForAdmin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUsersStatusForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersStatusForAdmin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getUsersStatusForAdmin.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export default dashboardSlice.reducer;
