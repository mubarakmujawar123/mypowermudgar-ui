import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth-slice/authSlice";
import currencyRateReducer from "./auth-slice/currencyRateSlice";
import adminProductReducer from "../store/admin/productSlice";
import adminOrderReducer from "../store/admin/orderSlice";
import adminDashboardReducer from "../store/admin/dashboardSlice";
import shopProductReducer from "../store/shop/shoppingProductSlice";
import shopCartReducer from "../store/shop/shoppingCartSlice";
import shopAddressReducer from "../store/shop/shoppingAddressSlice";
import shopOrderReducer from "../store/shop/shoppingOrderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    currencyRate: currencyRateReducer,
    adminProduct: adminProductReducer,
    adminOrder: adminOrderReducer,
    adminDashboard: adminDashboardReducer,
    shopProduct: shopProductReducer,
    shopCart: shopCartReducer,
    shopAddress: shopAddressReducer,
    shopOrder: shopOrderReducer,
  },
});

export default store;
