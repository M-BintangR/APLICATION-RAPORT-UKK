import React from 'react'
import { Navigate } from 'react-router-dom';

const RequireLogin = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));

    if (!user || !token || token === null || user.length === 0) {
        return children;
    }

    if (token && user) {
        if (user.role === 'admin') {
            return <Navigate to={'/dashboard'} replace />
        } else {
            return children;
        }
    }
}

export default RequireLogin