import './SubscribeForm.css'

const SubscribeForm = ({ setShowSubscribeForm }) => {

  const formSubmit = (e) => {
    e.preventDefault()
    // console.log(e)
    // Acá hay que chequear la validación manejar y el envío de los datos
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
              className="subscribe-form__input"
            />
          </div>
          <div className="subscribe-form__field">
            <label htmlFor="subscriberEmail"
              className="subscribe-form__label">Email:</label>
            <input 
              id="subscriberEmail"
              type="text"
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
