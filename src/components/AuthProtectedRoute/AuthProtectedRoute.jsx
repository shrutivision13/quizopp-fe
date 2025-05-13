import { Navigate } from "react-router-dom";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export const AuthProtectedRoute = ({ children }) => {
  const isAuthenticated = getCookie("authToken");

  return isAuthenticated ? children : <Navigate to="/get-started" replace />;
};

