// // src/routes/AppRoutes.js

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';

// import Dashboard from '../FlowMeterDashboard/Dashboard';
// import LoginPage from '../Pages/LoginPage';
// import ForgotPasswordPage from '../Pages/ForgotPasswordPage';
// import PLCdashboard from '../PLCDashboard/PLCdashboard';

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Dashboard />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//       <Route path="/PLCdashboard" element={<PLCdashboard />} />
//     </Routes>
//   );
// };

// export default AppRoutes;
// src/routes/AppRoutes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from '../FlowMeterDashboard/Dashboard';
import LoginPage from '../Pages/LoginPage';
import ForgotPasswordPage from '../Pages/ForgotPasswordPage';
import PLCdashboard from '../PLCDashboard/PLCdashboard';
import ProtectedRoute from '../Route/Protected/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/PLCdashboard"
        element={
          <ProtectedRoute>
            <PLCdashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
