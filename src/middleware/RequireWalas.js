import React from 'react'
import { Navigate } from 'react-router-dom';

const RequireWalas = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));

    if (!user || !token || token === null || user.length === 0) {
        return <Navigate to={'/'} replace />
    }
    if (user.role === 'walas') {
        return children;
    } else {
        return <Navigate to={'/'} replace />
    }
}

export default RequireWalas