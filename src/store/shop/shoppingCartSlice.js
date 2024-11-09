import { APIConfig } from "@/config/apiConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity, productDescription }) => {
    try {
      const response = await APIConfig.post(`/shop/cart/add`, {
        userId,
        productId,
        quantity,
        productDescription,
      });
      return response?.data;
    } catch (error) {
      console.log("error", error);
      return error?.response?.data;
    }
  }
);
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    try {
      const response = await APIConfig.get(`/shop/cart/get/${userId}`);
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, productDescription, quantity }) => {
    try {
      const response = await APIConfig.put(`/shop/cart/update-cart`, {
        userId,
        productId,
        productDescription,
        quantity,
      });
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deletCartItem",
  async ({ userId, productId, productDescription }) => {
    try {
      const response = await APIConfig.delete(
        `/shop/cart/${userId}/${productId}/${productDescription}`
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingCartSlice",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingProductSlice.reducer;
