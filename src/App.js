// import React from 'react';
// import Dashboard from './components/Dashboard';

// import './App.css'; // Style as needed

// function App() {
//   return <Dashboard />;
// }

// export default App;
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
// import other components if you have them, like:
// import Login from './components/Login';
// import Home from './components/Home';

import './App.css'; // Style as needed
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Add more routes as needed */}
        <Route path="/login" element={<LoginPage></LoginPage>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage></ForgotPasswordPage>} />
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

