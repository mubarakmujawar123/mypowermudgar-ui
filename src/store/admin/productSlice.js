import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIConfig } from "@/config/apiConfig";

const initialState = {
  isLoading: false,
  productList: [],
};
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    try {
      const response = await APIConfig.get("/admin/products/fetch-products");
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const addNewProduct = createAsyncThunk(
  "/products/addNewProduct",
  async (formData) => {
    try {
      const response = await APIConfig.post(
        "/admin/products/add-product",
        formData
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    try {
      const response = await APIConfig.put(
        `/admin/products/edit-product/${id}`,
        formData
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    try {
      const response = await APIConfig.delete(
        `/admin/products/delete-product/${id}`
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});
export default adminProductSlice.reducer;
