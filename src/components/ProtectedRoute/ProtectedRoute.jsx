// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // أو من Redux: useSelector(state => state.auth.token)

  if (!token) {
    // لو مفيش token → حولي المستخدم لصفحة تسجيل الدخول
    return <Navigate to="/login" replace />;
  }

  // لو في token → خلي الصفحة تتحمل
  return children;
};

export default ProtectedRoute;