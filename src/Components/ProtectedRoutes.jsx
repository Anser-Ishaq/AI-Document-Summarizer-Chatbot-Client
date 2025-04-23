import { Navigate } from "react-router-dom";
import useAuthStore from "../Store/authStore";

const ProtectedRoute = ({ children }) => {
  const { token, user } = useAuthStore();
  // console.log("Token on load:", token);
  // console.log("User on load:", user);
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
