// src/components/LoginPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthStyle.css';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2>Login</h2>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <p className="link" onClick={() => navigate('/forgot-password')}>
          Forgot password?
        </p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginPage;
