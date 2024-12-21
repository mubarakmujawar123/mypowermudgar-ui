/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({
  isAuthenticated,
  user,
  children,
  userIdForEmailVerification = false,
  isLoading = true,
}) => {
  const location = useLocation();
  console.log(" location.pathname", location.pathname);

  if (
    !isAuthenticated &&
    userIdForEmailVerification &&
    !location.pathname.includes("/otpVerification")
  ) {
    console.log("1");
    return <Navigate to="/auth/otpVerification" />;
  }

  if (
    !isLoading &&
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register") ||
      userIdForEmailVerification
    ) &&
    !(
      location.pathname.includes("/capture-payment") ||
      location.pathname.includes("/cancel-payment")
    )
  ) {
    console.log("2");
    return <Navigate to="/auth/login" />;
  }

  if (
    (!isLoading &&
      !isAuthenticated &&
      location.pathname.includes("/capture-payment")) ||
    (!isLoading &&
      !isAuthenticated &&
      location.pathname.includes("/cancel-payment")) ||
    (!isAuthenticated && location.pathname.includes("/shop/account"))
  ) {
    console.log("3");
    return <Navigate to="/auth/login" />;
  }
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    console.log("4");
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }
  if (
    isAuthenticated &&
    user?.role != "admin" &&
    location.pathname.includes("admin")
  ) {
    console.log("5");
    return <Navigate to="/unauthorize" />;
  }
  if (!isAuthenticated && location.pathname.includes("admin")) {
    console.log("51");
    return <Navigate to="/auth/login" />;
  }
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    console.log("6");
    return <Navigate to="/admin/dashboard" />;
  }
  return <div>{children}</div>;
};

export default CheckAuth;
