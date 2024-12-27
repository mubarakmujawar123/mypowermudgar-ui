import { APIConfig } from "@/config/apiConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createNewOrder = createAsyncThunk(
  "order/CreateNewOrder",
  async (orderData) => {
    try {
      const response = await APIConfig.post(`/shop/order/create`, orderData);
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const capturePayment = createAsyncThunk(
  "order/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    try {
      const response = await APIConfig.post(`/shop/order/capture-payment`, {
        paymentId,
        payerId,
        orderId,
      });
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const canclePayment = createAsyncThunk(
  "order/canclePayment",
  async ({ orderId }) => {
    try {
      const response = await APIConfig.post(`/shop/order/cancle-payment`, {
        orderId,
      });
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  "order/orders-list",
  async (userId) => {
    try {
      const response = await APIConfig.get(`/shop/order/orders-list/${userId}`);
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "order/order-details",
  async (id) => {
    try {
      const response = await APIConfig.get(`/shop/order/order-details/${id}`);
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action?.payload?.approvalURL;
        state.orderId = action?.payload?.data?.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action?.payload?.data?.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
