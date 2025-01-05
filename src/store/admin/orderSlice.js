import { APIConfig } from "@/config/apiConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

export const getOrdersOfAllUsers = createAsyncThunk("orders/get", async () => {
  try {
    const response = await APIConfig.get("/admin/orders/get");
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
});

export const getOrderDetailsForAdmin = createAsyncThunk(
  "orders/details",
  async (id) => {
    try {
      const response = await APIConfig.get(`/admin/orders/details/${id}`);
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/update",
  async ({ id, orderStatus, consignmentNumber, logisticsCompany }) => {
    try {
      const response = await APIConfig.put(`/admin/orders/update/${id}`, {
        orderStatus,
        consignmentNumber,
        logisticsCompany,
      });
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    resetAdminOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersOfAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersOfAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getOrdersOfAllUsers.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});
export const { resetAdminOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
