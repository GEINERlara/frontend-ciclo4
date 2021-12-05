import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router'
// import { AuthContext } from '../auth/authContext'

const PrivateRouter = ({ children }) => {

  // const { user } = useContext(AuthContext)
  
  const auth = useSelector(state => state.auth)
  
  const navigate = useNavigate()

  const { pathname, search } = useLocation()

  localStorage.setItem('lastPath', pathname + search)

  return auth.logged
  ? children
  : navigate("/login")
}

export default PrivateRouter
