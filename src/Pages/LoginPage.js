
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin, clearError } from "../slices/authSlice";
import "./AuthStyle.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLog, setErrorLog] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const data = { email, password };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ data, navigate }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      setErrorLog(error);
      setTimeout(() => {
        setErrorLog([]);
      }, 2000);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-email"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <p className="link" onClick={() => navigate("/forgot-password")}>
          Forgot password?
        </p>
        {errorLog && <p className="error">{errorLog.message}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
