import React from 'react'
import { useAuth } from '../hooks/Auth'
import InitialLoading from '../pages/initialLoading/InitialLoading'
import Login from '../pages/login/Login'
import AppRoutes from './App.stack'

const Routes: React.FC = () => {
  const { name, firstLoadCompleted } = useAuth()

  return (
    <>
      {!!name && !!firstLoadCompleted ? (
        <AppRoutes />
      ) : !!name && !firstLoadCompleted ? (
        <InitialLoading />
      ) : (
        <Login />
      )}
    </>
  )
}

export default Routes
