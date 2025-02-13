import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../AuthProvider/Authprovider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(authContext);

    // use the location for the go to the desired location after login
    const location = useLocation();

    if (loading) {
        // Spinner for the loading state using DaisyUI
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-md"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate state={{ from: location.pathname }} to="/login" />;
    }

    return children;
};

export default PrivateRoute;
