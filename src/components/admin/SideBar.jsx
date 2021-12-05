import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/authContext'
import { types } from '../../types/types'

const SideBar = () => {

  const navigate = useNavigate()
  const { user, dispatch } = useContext(AuthContext)

  const handleLogout = () => {

    const action = {
      type: types.logout
    }

    dispatch(action)

    navigate('/login', {
      replace: true
    })
  }

  return (
    <nav className="site-nav">
      <ul className="site-nav__list">
        <li className="site-nav__item">
          <Link className="site-nav__link" to="/admin">Dashboard</Link>
        </li>
        <li className="site-nav__item">
          <Link className="site-nav__link" to="/admin/products">Productos</Link>
        </li>
        <li className="site-nav__item">
          <Link className="site-nav__link" to="/admin/categories">Categorias</Link>
        </li>
        <li className="site-nav__item">
          <Link className="site-nav__link" to="/admin/users">Usuarios</Link>
        </li>
      </ul>
      <button onClick={ handleLogout }>Logout</button>
    </nav>
  )
}

export default SideBar
