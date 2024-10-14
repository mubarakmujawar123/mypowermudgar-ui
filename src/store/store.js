import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../store/auth-slice/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
