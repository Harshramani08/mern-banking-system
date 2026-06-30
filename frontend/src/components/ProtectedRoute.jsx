import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../service/api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        await api.get("/auth/me");
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return isAuth ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;