import { useState } from 'react';
import './CallToAction.css'
import SubscribeForm from "./SubscribeForm";

const CallToAction = () => {

  const [showSubscribeForm, setShowSubscribeForm] = useState(false)

  const emitClick = () => {
    setShowSubscribeForm(true)
  }

  return (
    <>
    <section className="call-to-action box">
      <div className="call-to-action__container box__container">
        <p className="call-to-action__text">SUSCRIBETE A NUESTRO NEWSLETTER Y CONSIGUE 15% DE DESCUENTO.</p>
        <button onClick={ emitClick }
          className="button primary-button">SUBSCRIBETE</button>
      </div>
    </section>
    {
      showSubscribeForm ? <SubscribeForm setShowSubscribeForm={ setShowSubscribeForm }/> : ''
    }
    </>
  )
}

export default CallToAction
