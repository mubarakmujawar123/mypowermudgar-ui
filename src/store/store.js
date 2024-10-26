import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth-slice/authSlice";
import adminProductReducer from "../store/admin/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductReducer,
  },
});

export default store;
