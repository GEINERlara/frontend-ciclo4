import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../actions/auth'
import { AuthContext } from '../../auth/authContext'
import { types } from '../../types/types'

const Logout = props => {

  const navigate = useNavigate()
  const AContext = useContext(AuthContext)

  // -----

    const dispatch = useDispatch()

  // -----

  const handleLogout = () => {

    const action = {
      type: types.logout
    }

    AContext.dispatch(action)

    // -----

      dispatch( logout() )

    // -----

    navigate('/login', {
      replace: true
    })
  }

  return (
    <div onClick={ handleLogout }>
      { props.children }
    </div>
  )
}

export default Logout
