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
// src/App.js

// import React, { useEffect } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import AppRoutes from './Route/AppRoutes';
// // import { checkAuth } from '../src/slices/authSlice'; // 👈 Import the thunk
// import './App.css'; // Optional styling

// function App() {
//   const dispatch = useDispatch();

//   // Dispatch checkAuth when app loads
//   useEffect(() => {
//     dispatch(checkAuth());
//   }, [dispatch]);

//   return (
//     <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   );
// }

// export default App;
