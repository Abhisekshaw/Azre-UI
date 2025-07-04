import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from '../FlowMeterDashboard/Dashboard';
import LoginPage from '../Pages/LoginPage';
import ForgotPasswordPage from '../Pages/ForgotPasswordPage';
import PLCdashboard from '../PLCDashboard/PLCdashboard';
import ProtectedRoute from '../Route/Protected/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/PLCdashboard" element={<PLCdashboard />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default AppRoutes;
