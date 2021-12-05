import React, { useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router";
import { login } from "../../actions/auth";
import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types";
import "./Login.css";

const Login = () => {

  const navigate = useNavigate();
  const AContext = useContext(AuthContext);

  // 

  const dispatch = useDispatch()

  // 

  const handleLogin = () => {
    const actionContext = {
      type: types.login,
      payload: { name: "Fernando Torres" },
    };

    AContext.dispatch(actionContext);

    //
    
      dispatch(login('Fernando'))

    // 

    const lastPath = localStorage.getItem("lastPath");

    navigate(lastPath);
  };

  const LoginForm = () => {
    return (
      <div className="login-form">
        <h1 className="login-form__title">Acceder</h1>
        <form action="">
          <div>
            <label>
              Correo
              <input type="text" />
            </label>
          </div>
          <div>
            <label>
              Contraseña
              <input type="password" />
            </label>
          </div>
          <div className="conatiner-button">
            <button className="login-form__button" onClick={handleLogin}>Acceder</button>
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
