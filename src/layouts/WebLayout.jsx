import React from 'react'
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

// Style
import '../reset.css';
import './WebLayout.css';

const WebLayout = props => {
  return (
    <div className="web-layout">
      <div className="web-layout__container">
        <SiteHeader />
        { props.children }
        <SiteFooter />
      </div>
    </div>
  )
}

export default WebLayout
