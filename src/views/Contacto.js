import React from 'react'
import SiteHeader from "../components/SiteHeader";
import PageTitle from '../components/PageTitle';
import ContactForm from '../components/ContactForm';
import SiteFooter from '../components/SiteFooter';

import './Contacto.css'

const Contacto = props => {
  return (
    <div>
      <SiteHeader />
      <PageTitle title="CONTACTO"/>
      <main className="contact-page box">
        <div className="box__container">
          <h2 className="contact-page__title">¡ESCRIBANOS UN MENSAJE!</h2>
          <div className="contact-page__form">
            <ContactForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default Contacto
