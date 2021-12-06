import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation, Navigate } from 'react-router'
// import { Redirect } from 'react-router-dom'
// import { AuthContext } from '../auth/authContext'

const PrivateRouter = ({ children }) => {

  // const { user } = useContext(AuthContext)
  
  const auth = useSelector(state => state.auth)
  
  
  const navigate = useNavigate()

  const { pathname, search } = useLocation()

  localStorage.setItem('lastPath', pathname + search)

  return auth.logged
  ? children
  : <Navigate to="/login" />
}

export default PrivateRouter
