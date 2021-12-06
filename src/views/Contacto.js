import React from 'react'
import PageTitle from '../components/PageTitle';
import ContactForm from '../components/ContactForm';
import WebLayout from '../layouts/WebLayout';
import './Contacto.css'

const Contacto = props => {
  return (      
    <WebLayout>
      <PageTitle title="CONTACTO"/>
      <main className="contact-page box">
        <div className="box__container">
          <h2 className="contact-page__title">¡ESCRIBANOS UN MENSAJE!</h2>
          <div className="contact-page__form">
            <ContactForm />
          </div>
        </div>
      </main>
    </WebLayout>
  )
}

export default Contacto
