import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthLayout from "./components/auth/AuthLayout";
import AdminLayout from "./components/admin-view/AdminLayout";
import AdminDashboard from "./pages/admin-view/AdminDashboard";
import AdminProducts from "./pages/admin-view/AdminProducts";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import NotFound from "./pages/NotFound";
import ShoppingHome from "./pages/shopping-view/ShoppingHome";
import Listing from "./pages/shopping-view/Listing";
import Checkout from "./pages/shopping-view/Checkout";
import Accounts from "./pages/shopping-view/Accounts";
import CheckAuth from "./components/common/CheckAuth";
import UnAuthorize from "./pages/UnAuthorize";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice/authSlice";
import { ProductDetails } from "./pages/shopping-view/ProductDetails";
import Loader from "./components/common/Loader";
import Home from "./pages/auth/Home";
import AdminOrders from "./components/admin-view/AdminOrders";
import PaymentCancle from "./pages/shopping-view/PaymentCancle";
import PaymentCapture from "./pages/shopping-view/PaymentCapture";
import { getCurrencyRates } from "./store/auth-slice/currencyRateSlice";
import Footer from "./pages/auth/Footer";
import OTPVerification from "./pages/auth/OTPVerification";
import UpdateCurrencyRates from "./components/admin-view/UpdateCurrencyRates";
import UpdateShippingCharges from "./components/admin-view/UpdateShippingCharges";
import { getShippingCharges } from "./store/admin/shippingChargesSlice";

function App() {
  const { isAuthenticated, user, isLoading, userIdForEmailVerification } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(getCurrencyRates());
    dispatch(getShippingCharges());
  }, [dispatch]);

  // if (isLoading) return <Loader />;
  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white min-h-[100vh]">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/auth"
              element={
                <CheckAuth
                  isAuthenticated={isAuthenticated}
                  user={user}
                  userIdForEmailVerification={userIdForEmailVerification}
                >
                  <AuthLayout />
                </CheckAuth>
              }
            >
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="otpVerification" element={<OTPVerification />} />
            </Route>
            <Route
              path="/admin"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <AdminLayout />
                </CheckAuth>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route
                path="UpdateCurrencyRates"
                element={<UpdateCurrencyRates />}
              />
              <Route
                path="updateShippingCharges"
                element={<UpdateShippingCharges />}
              />
            </Route>
            <Route
              path="/shop"
              element={
                // <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout />
                // </CheckAuth>
              }
            >
              <Route path="home" element={<ShoppingHome />} />
              <Route path="listing" element={<Listing />} />

              <Route
                path="checkout"
                element={
                  <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                    <Checkout />
                  </CheckAuth>
                }
              />

              <Route
                path="account"
                element={
                  <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                    <Accounts />
                  </CheckAuth>
                }
              />
              <Route path=":category/:id" element={<ProductDetails />} />
              <Route
                path="capture-payment"
                element={
                  <CheckAuth
                    isAuthenticated={isAuthenticated}
                    user={user}
                    isLoading={isLoading}
                  >
                    <PaymentCapture />
                  </CheckAuth>
                }
              />
              <Route
                path="cancel-payment"
                element={
                  <CheckAuth
                    isAuthenticated={isAuthenticated}
                    user={user}
                    isLoading={isLoading}
                  >
                    <PaymentCancle />
                  </CheckAuth>
                }
              />
            </Route>
            <Route path="/unauthorize" element={<UnAuthorize />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="bg-black text-white h-[150px]">
          <Footer />
        </footer>
        {isLoading && <Loader />}
      </div>
    </>
  );
}

export default App;
