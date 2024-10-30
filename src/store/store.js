import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth-slice/authSlice";
import adminProductReducer from "../store/admin/productSlice";
import shopProductReducer from "../store/shop/shoppingProductSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductReducer,
    shopProduct: shopProductReducer,
  },
});

export default store;
