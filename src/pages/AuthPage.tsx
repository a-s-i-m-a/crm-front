// AuthPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/AuthPage.css';
import RegistrationForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

const AuthPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsRegistering(!isRegistering);
  };

  const handleLogin = () => {
    // Perform login logic here

    // Redirect to the main page after login
    navigate('/main');
  };

  const handleRegister = () => {
    // Perform registration logic here

    // Redirect to the main page after registration
    navigate('/main');
  };

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
            <LoginForm onLogin={handleLogin} />
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
