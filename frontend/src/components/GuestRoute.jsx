import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../service/api";

const GuestRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                await api.get("/auth/me");
                setLoggedIn(true);
            } catch {
                setLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    if (loading) return <h1>Loading...</h1>;

    return loggedIn ? <Navigate to="/transaction" replace /> : children;
};

export default GuestRoute;