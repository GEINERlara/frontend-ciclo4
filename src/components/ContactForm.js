import React, { useEffect, useRef, useState } from "react";
import emailjs, { init } from "emailjs-com";

import "./ContactForm.css";

const EMAILJS = {
  //TODO: Change credentials to PhoneBox account and hide them
  user_id: "user_HD278ebmTPb2FQEswUWJW",
  service_id: "service_jno9n4u",
  template_id: "contact_form",
};

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idle, setIdle] = useState(true);

  const form = useRef();

  const cleanFormFields = () => {
    setName('')
    setEmail('')
    setMessage('')
  }

  const onSendMessage = (e) => {
    e.preventDefault();
    setIdle(true);
    if (email !== "" && name !== "" && message !== "") {
      init(EMAILJS.user_id);
      emailjs
        .sendForm(
          EMAILJS.service_id,
          EMAILJS.template_id,
          form.current,
          EMAILJS.user_id
        )
        .then(
          (response) => {
            console.log(response);
            setSent(true)
            setLoading(false);
            cleanFormFields()
          },
          (err) => {
            console.log(err.text);
            setSent(false)
            setLoading(false);
          }
        );
      setLoading(true);
      setIdle(false)
    } else {
      /* ERROR: Should never reach this point */
    }
  };

  return (
    <div className="contact-form">
      <form ref={form} className="contact-form__form" onSubmit={onSendMessage}>
        <label htmlFor="name">Nombre:</label>
        <input
          name="from_name"
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Correo:</label>
        <input
          name="from_email"
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="message">Mensaje:</label>
        <textarea
          name="message"
          id="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="button" type="submit">
          Enviar
        </button>
      </form>
      <div>
        {!!idle}
        {loading && <div className="loader"></div>}
        {!idle && !!sent && !loading && (
          <div className="text sent">Mensaje enviado</div>
        )}
        {!idle && !sent && !loading && (
          <div className="text not-sent">
            Error enviando el mensaje. Inténtalo una vez mas
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
