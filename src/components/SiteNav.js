import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import './SiteNav.css'


const SiteNav = ({isMobile}) => {

  const navClass = 'site-nav ' + (isMobile ? 'site-nav--responsive' : 'site-nav--primary')

  return (
    <nav className={ navClass }>
      <ul className="site-nav__list">
        <li className="site-nav__item">
          <Link className="site-nav__link" to="/">Inicio</Link>
        </li>
        <li className="site-nav__item">
          <Link className="site-nav__link" to="/productos">Productos</Link>
        </li>
        <li className="site-nav__item">
          <Link className="site-nav__link" to="/nosotros">Nosotros</Link>
        </li>
        <li className="site-nav__item">
          <Link className="site-nav__link" to="/contacto">Contacto</Link>
        </li>
      </ul>
    </nav>
  )
}

SiteNav.propTypes = {

}

export default SiteNav
