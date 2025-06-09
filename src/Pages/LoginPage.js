// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AuthStyle.css';

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg('');

//     try {
//       const response = await fetch('http://65.0.176.7:3030/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email,
//           password,
//           role: 'user'
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // ✅ Store authentication flag
//         localStorage.setItem('isAuthenticated', 'true');
//         // Optional: store token if needed
//         // localStorage.setItem('token', data.token);

//         alert('Login successful!');
//         navigate('/'); // Redirect to Dashboard
//       } else {
//         setErrorMsg(data.message || 'Login failed. Please try again.');
//       }
//     } catch (err) {
//       setErrorMsg('Something went wrong. Please try again later.');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <form className="auth-form" onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <p className="link" onClick={() => navigate('/forgot-password')}>
//           Forgot password?
//         </p>
//         {errorMsg && <p className="error">{errorMsg}</p>}
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthStyle.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await fetch('http://65.0.176.7:3030/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          role: 'user'
        })
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Store the token and login flag
        localStorage.setItem('authToken', data.token);          // Store token
        localStorage.setItem('isAuthenticated', 'true');        // Optional

        alert('Login successful!');
        navigate('/'); // Redirect to Dashboard or Home
      } else {
        setErrorMsg(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="link" onClick={() => navigate('/forgot-password')}>
          Forgot password?
        </p>
        {errorMsg && <p className="error">{errorMsg}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginPage;
