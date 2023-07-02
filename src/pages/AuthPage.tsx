

import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/AuthPage.css';
import RegistrationForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import {AuthStore} from "../store/authStore";
import { observer } from "mobx-react-lite"
import {appStoreContext} from "../store/context.store";



const AuthPage: React.FC <{ authStore?: AuthStore }>  = observer(( ) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const {authStore} = useContext(appStoreContext);

  const handleToggle = () => {
    setIsRegistering(!isRegistering);
  };

  const handleLogin = async (email: string,password: string) => {
    await authStore?.login({ email, password });
   // navigate('/main');
  };

  const handleRegister = () => {
    // Perform registration logic here

    // Redirect to the main page after registration
    navigate('/main');
  };

  // @ts-ignore
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="toggle-button">
          <button
            className={!isRegistering ? 'active' : ''}
            onClick={handleToggle}
          >
            Login
          </button>
          <button
            className={isRegistering ? 'active' : ''}
            onClick={handleToggle}
          >
            Register
          </button>
        </div>
        {isRegistering ? (
          <>
            <h2 className="auth-title">Register</h2>
            <RegistrationForm onRegister={handleRegister} />
          </>
        ) : (
          <>
            <h2 className="auth-title">Login</h2>
            <LoginForm onLogin={handleLogin}/>
          </>
        )}
      </div>
    </div>
  );
});

export default AuthPage;
