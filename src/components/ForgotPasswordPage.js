// src/components/ForgotPasswordPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthStyle.css';

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerateOtp = () => {
    if (!email) {
      setMessage('Please enter your email.');
      return;
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    setOtpSent(true);
    setMessage(`OTP sent to your email: ${generatedOtp}`); // Simulated. Don't show OTP in real app.
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (enteredOtp !== otp) {
      setMessage('Invalid OTP. Please try again.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    // Simulate success
    setMessage('Password reset successful!');
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleResetPassword}>
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {!otpSent && (
          <p className="link" onClick={handleGenerateOtp}>
            Generate OTP
          </p>
        )}

        {otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
          </>
        )}

        <p className="link" onClick={() => navigate('/')}>
          ← Back to Login
        </p>

        {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
