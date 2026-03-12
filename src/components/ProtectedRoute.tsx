import { Navigate, Outlet, useLocation } from "react-router-dom";

const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("auth_token");
  return Boolean(token);
};

export const ProtectedRoute = () => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

