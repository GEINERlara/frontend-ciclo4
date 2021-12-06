import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router";
import { login } from "../../actions/auth";
import { loginUser } from "../../api";
import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types";
import "./Login.css";

const Login = () => {

  const navigate = useNavigate();
  const AContext = useContext(AuthContext);

  // -----
  const dispatch = useDispatch()
  // -----

  const setLogin = (data) => { 

    // tokenReturn
    // checkUser

    localStorage.setItem('token', data.tokenReturn)

    const actionContext = {
      type: types.login,
      payload: { name: data.checkUser.name },
    };

    AContext.dispatch(actionContext);

    //
    
      dispatch(login(data.checkUser.name))

    // 

    const lastPath = localStorage.getItem("lastPath");

    navigate(lastPath);
  };

  const LoginForm = () => {

    const [email, setEmail] = useState('juan@mail.com')
    const [password, setPassword] = useState('123456')

    const handleInputChange = (e, setter) => {
      setter(e.target.value)
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      let data = {
        email: email,
        password: password
      }
      // console.log(data)
      loginUser(data)
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          console.log('El coso esta invalñido')
          return resp.json()
        }
      })
      .then(data => {
        if (data.tokenReturn) {
          setLogin(data)
        } else {
          alert(data.message)
        }
      })
      .catch(err => console.log(err))
    }

    return (
      <div className="login-form">
        <h1 className="login-form__title">Acceder</h1>
        <form onSubmit={ handleSubmit }>
          <div>
            <label htmlFor="emailInput">
              Correo
            </label>
              <input 
                id="emailInput"
                type="text"
                name="email"
                value={ email }
                onChange={ (e) => handleInputChange(e, setEmail) }
              />
          </div>
          <div>
            <label htmlFor="passwordInput">
              Contraseña
            </label>
              <input 
                id="passwordInput"
                type="password" 
                name="password"
                value={ password }
                onChange={ (e) => handleInputChange(e, setPassword) }
              />
          </div>
          <div className="conatiner-button">
            <button type="submit" className="login-form__button">Acceder</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="login-page">
      <section className="login-page__col1">

        <LoginForm />

      </section>
      <section className="login-page__col2">
        {/* <img src={imgLogin} alt="" /> */}
        <div 
          className="img"
          style={{ backgroundImage: "url(/images/login/login-background.jpg)" }}
        ></div>
      </section>
    </div>
  );
};

export default Login;
