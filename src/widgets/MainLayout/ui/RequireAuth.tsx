
import { Navigate, useLocation } from 'react-router-dom';
import {JSX} from 'react';

type Props = {
    children: JSX.Element;
};

export const RequireAuth = ({ children }: Props) => {
    const isAuthenticated = Boolean(localStorage.getItem('isLogged'))
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};
