import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    // console.log("currentUser", currentUser);
    if (!currentUser) {
      // console.log("No hay usuario logueado");
      navigate("/register");
    }
  }, [currentUser, navigate]);

  return children;
};

export default ProtectedRoute;
