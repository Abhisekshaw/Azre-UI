
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 🔥 Add these two imports
import { Provider } from 'react-redux';
import {store} from './app/store'; // Make sure this points to your Redux store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* ✅ Wrap App with Redux Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Optional: Performance monitoring
reportWebVitals();
