import { APIConfig } from "@/config/apiConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  shippingChargesList: [],
};

export const setShippingCharges = createAsyncThunk(
  "/shippingCharges/setShippingCharges",
  async ({ charges }) => {
    try {
      const response = await APIConfig.post(
        "/shippingCharges/setShippingCharges",
        {
          charges,
        }
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const getShippingCharges = createAsyncThunk(
  "/shippingCharges/getShippingCharges",
  async () => {
    try {
      const response = await APIConfig.get(
        "/shippingCharges/getShippingCharges"
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

const shippingChargesSlice = createSlice({
  name: "shippingChargesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setShippingCharges.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setShippingCharges.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(setShippingCharges.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getShippingCharges.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShippingCharges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shippingChargesList = action?.payload?.data;
      })
      .addCase(getShippingCharges.rejected, (state) => {
        state.isLoading = false;
        state.shippingChargesList = [];
      });
  },
});

export default shippingChargesSlice.reducer;
