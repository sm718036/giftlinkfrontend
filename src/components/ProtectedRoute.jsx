import React from "react";
import { useAppContext } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "./Loader";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoadingUser } = useAppContext();
  const location = useLocation();
  if (isLoadingUser) {
    return <Loader />;
  }
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
