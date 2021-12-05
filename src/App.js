import React, { useEffect, useReducer, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from "./actions/auth"
import { setCategories } from "./actions/data"
import { getCategories } from "./api"
import { AuthContext } from "./auth/authContext"
import { authReducer } from "./reducers/authReducer"
import AppRouter from './routers/AppRouter'

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || { logged: false }
}

const App = () => {
  
  const [userContext, dispatchContext] = useReducer(authReducer, {}, init)
  
  useEffect(() => {
    if (!userContext) {
      return
    }
    localStorage.setItem('user', JSON.stringify(userContext))
  }, [userContext])
  
  // ---------- //
  
  const [user, setUser] = useState(init)

  const [isLogged, setIsLogged] = useState(Boolean)

  const [isLoading, setIsLoading] = useState(true)
  
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user.logged) {
      setIsLogged(false)
      dispatch( logout() )
    } 
    else {
      setIsLogged(true)
      localStorage.setItem('user', JSON.stringify(user))
      dispatch( login( user.name ) )
    }
  }, [user])

  useEffect(() => {
    if (isLogged === true || isLogged === false) {
      setIsLoading(false)
    }
  }, [isLogged])

  // ----------- //

  // const data = useSelector(state => state.data)

  useEffect(() => {
    getCategories()
    .then(resp => resp.json())
    .then(data => dispatch( setCategories(data) ) )
  }, [])

  if (isLoading) return <span>Cargando...</span>

  return (
    <AuthContext.Provider
      value={
        {
          user: userContext,
          dispatch: dispatchContext
        }
    }>
      <AppRouter isLogged={ isLogged } />
    </AuthContext.Provider>
  )
}

export default App
