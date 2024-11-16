import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth-slice/authSlice";
import adminProductReducer from "../store/admin/productSlice";
import shopProductReducer from "../store/shop/shoppingProductSlice";
import shopCartReducer from "../store/shop/shoppingCartSlice";
import shopAddressReducer from "../store/shop/shoppingAddressSlice";
import shopOrderReducer from "../store/shop/shoppingOrderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductReducer,
    shopProduct: shopProductReducer,
    shopCart: shopCartReducer,
    shopAddress: shopAddressReducer,
    shopOrder: shopOrderReducer,
  },
});

export default store;
