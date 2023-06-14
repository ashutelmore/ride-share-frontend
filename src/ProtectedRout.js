import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './providers/auth'

function ProtectedRout() {
    const auth = useAuth()

    return (
        auth.user._id
            ?
            auth.user.isVerified
                ?
                <Outlet />
                : <Navigate to={'/VerifyEmail'} />
            : <Navigate to={'/login'} />
    )
}
export default ProtectedRout