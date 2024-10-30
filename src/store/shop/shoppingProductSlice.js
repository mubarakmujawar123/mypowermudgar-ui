import { APIConfig } from "@/config/apiConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const fetchFilteredProducts = createAsyncThunk(
  "/shop/fetchFilteredProducts",
  async ({ filterParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
    });
    console.log("query", query);

    try {
      const response = await APIConfig.get(
        `/shop/products/fetch-products?${query}`
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProductSlice",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default shoppingProductSlice.reducer;
