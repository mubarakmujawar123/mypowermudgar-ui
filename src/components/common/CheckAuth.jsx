/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({
  isAuthenticated,
  user,
  children,
  userIdForEmailVerification = false,
}) => {
  const location = useLocation();
  console.log(" location.pathname", location.pathname);
  if (
    !isAuthenticated &&
    userIdForEmailVerification &&
    !location.pathname.includes("/otpVerification")
  ) {
    return <Navigate to="/auth/otpVerification" />;
  }

  if (
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
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
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
    return <Navigate to="/unauthorize" />;
  }
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }
  return <div>{children}</div>;
};

export default CheckAuth;
