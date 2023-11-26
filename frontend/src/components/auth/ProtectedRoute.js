import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loader from '../Layout/Loader'

const ProtectedRoute = ({children}) => {

    const {isAuthenticated, loading} = useSelector(state => state.auth)

    if(loading) {
        return <Loader/>
    }

    if(!isAuthenticated) {
        return <Navigate to="/login" replace/>
    }

    return children
}

export default ProtectedRoute
