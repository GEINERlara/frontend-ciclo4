import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { AuthContext } from '../auth/authContext'

const PublicRouter = ({ children }) => {
  
  const auth = useSelector(state => state.auth)

  const { user } = useContext(AuthContext)

  const lastPath = localStorage.getItem('lastPath')

  return !auth.logged
  ? children
  : <Navigate to={ lastPath } />
}

export default PublicRouter
