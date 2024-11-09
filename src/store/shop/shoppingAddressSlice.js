import { APIConfig } from "@/config/apiConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addAddress = createAsyncThunk(
  "/shop/address/add-address",
  async (formData) => {
    try {
      const response = await APIConfig.post(
        `/shop/address/add-address`,
        formData
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const fecthAllAddress = createAsyncThunk(
  "/shop/address/fetch-address",
  async (userId) => {
    try {
      const response = await APIConfig.get(
        `/shop/address/fetch-address/${userId}`
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const editAddress = createAsyncThunk(
  "/shop/address/update-address/",
  async ({ userId, addressId, formData }) => {
    try {
      const response = await APIConfig.put(
        `/shop/address/update-address/${userId}/${addressId}`,
        formData
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "/shop/address/delete-address/",
  async ({ userId, addressId }) => {
    try {
      const response = await APIConfig.delete(
        `/shop/address/delete-address/${userId}/${addressId}`
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

const shoppingAddressSlice = createSlice({
  name: "shoppingAddressSlice",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fecthAllAddress.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(fecthAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fecthAllAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default shoppingAddressSlice.reducer;
