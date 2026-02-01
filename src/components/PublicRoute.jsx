import React from "react";
import { useAppContext } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "./Loader";

const PublicRoute = () => {
  const { isAuthenticated, isLoadingUser } = useAppContext();
  const location = useLocation();
  if (isLoadingUser) {
    return <Loader />;
  }
  return isAuthenticated ? (
    <Navigate to="/" replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
