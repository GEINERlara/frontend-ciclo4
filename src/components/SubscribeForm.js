import { useState } from 'react'
import { storeSubscriber } from '../api'
import './SubscribeForm.css'

const SubscribeForm = ({ setShowSubscribeForm }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleInputChange = (e, setter) => {
    setter(e.target.value)
  }

  const formSubmit = (e) => {
    e.preventDefault()

    let data = {
      name,
      email
    }
    // console.log(data)
    // Acá hay que chequear la validación manejar y el envío de los datos
    storeSubscriber(data)
    .then(resp => resp.json())
    .then(data => { 
      setShowSubscribeForm(false)
      alert('Suscripción exitosa!')
     })
  }

  const handleCancelBtn = () => {
    setShowSubscribeForm(false)
  }

  const validateFields = () => {
    // Acá debería validar los datos
  }

  return (
    <aside className="subscribe-form__wraper box">

      <div className="subscribe-form">
        <h2 className="subscribe-form__title">Ingresa tus datos</h2>
        <form onSubmit={ formSubmit }>
          <div className="subscribe-form__field">
            <label htmlFor="subscriberName"
              className="subscribe-form__label">Nombre:</label>
            <input 
              id="subscriberName"
              type="text"
              value={ name }
              onChange={ (e) => handleInputChange(e, setName) }
              className="subscribe-form__input"
            />
          </div>
          <div className="subscribe-form__field">
            <label htmlFor="subscriberEmail"
              className="subscribe-form__label">Email:</label>
            <input 
              id="subscriberEmail"
              type="email"
              value={ email }
              onChange={ (e) => handleInputChange(e, setEmail) }
              className="subscribe-form__input"
            />
          </div>
          <button 
            type="submit"
            className="subscribe-form__action-btn button primary-button"
          >SUBSCRIBIRSE</button>
          <button 
            onClick={ handleCancelBtn }
            className="subscribe-form__cancel-btn"
          >X</button>
        </form>
      </div>

    </aside>
  )
}

export default SubscribeForm
