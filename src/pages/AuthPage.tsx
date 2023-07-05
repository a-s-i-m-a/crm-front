

import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/AuthPage.css';
import LoginForm from '../components/LoginForm';
import {AuthStore} from "../store/authStore";
import { observer } from "mobx-react-lite"
import {appStoreContext} from "../store/context.store";



const AuthPage: React.FC <{ authStore?: AuthStore }>  = observer(( ) => {
  const navigate = useNavigate();
  const {authStore} = useContext(appStoreContext);

  const handleLogin = async (email: string,password: string) => {
    await authStore?.login({ email, password });
    if (authStore.token) {
      localStorage.setItem('token', authStore.token);
      navigate('/main');
    }
  };


  return (
    <div className="auth-page">
      <div className="auth-container">
        {authStore.error && (
            <p style={{ color: 'red' }}>{authStore.error}</p>
        )}
            <h2 className="auth-title">Login</h2>
            <LoginForm onLogin={handleLogin}/>
      </div>
    </div>
  );
});

export default AuthPage;
