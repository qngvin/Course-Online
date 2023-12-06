import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAllowed, redirectPath, children }) => {
  const navigate = useNavigate();
  // console.log(isAllowed, redirectPath, children);
  if (isAllowed === false) {
    navigate(redirectPath);
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
