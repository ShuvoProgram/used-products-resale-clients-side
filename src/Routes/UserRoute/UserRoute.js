import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../../Component/Spinner/Spinner';
import { AuthContext } from '../../Context/UseContext';
import { useUser } from '../../hooks/useUser';


const UserRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isUser, isUserLoading] = useUser(user?.email);
    const location = useLocation();

    if (loading || isUserLoading) {
        return <Spinner />
    }

    if (user && isUser) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default UserRoute;