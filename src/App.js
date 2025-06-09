// src/App.js

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Route/AppRoutes';
import './App.css'; // Style as needed

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
