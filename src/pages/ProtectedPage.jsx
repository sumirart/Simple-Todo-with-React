import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function AuthPage() {
  // const token = localStorage.getItem("token");

  const location = useLocation();
  const auth = useAuth();

  if (!auth.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
